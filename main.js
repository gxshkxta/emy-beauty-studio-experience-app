// main.js
import { Calendar } from './components/Calendar.js';
import { TimeSlots } from './components/TimeSlots.js';
import { ServiceSelector } from './components/ServiceSelector.js';
import { BookingForm } from './components/BookingForm.js';
import { Confirmation } from './components/Confirmation.js';
import { getAvailableTimes } from './data/services.js';

document.addEventListener('DOMContentLoaded', () => {
    const timeView = document.getElementById('time-view');
    const serviceView = document.getElementById('service-view');
    const formView = document.getElementById('form-view');
    const confirmationView = document.getElementById('confirmation-view');
    const dateDisplay = document.getElementById('selected-date-display');
    
    const bookingData = {
        date: null,
        time: null,
        service: null,
        clientName: '',
        clientPhone: ''
    };

    // 1. Календар
    const calendar = new Calendar('calendar-mount', (selectedDate) => {
        bookingData.date = selectedDate;
        
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateDisplay.textContent = selectedDate.toLocaleDateString('bg-BG', options);
        
        timeView.style.display = 'block';
        serviceView.style.display = 'none';
        formView.style.display = 'none';
        confirmationView.style.display = 'none';
        
        bookingData.time = null;
        bookingData.service = null;
        
        timeView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // 2. Часове
        const times = getAvailableTimes(selectedDate);
        const timeSlots = new TimeSlots('time-mount', times, (selectedTime) => {
            bookingData.time = selectedTime;
            
            serviceView.style.display = 'block';
            formView.style.display = 'none';
            confirmationView.style.display = 'none';
            serviceView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // 3. Процедури
            const serviceSelector = new ServiceSelector('service-mount', (selectedService) => {
                bookingData.service = selectedService;
                
                formView.style.display = 'block';
                confirmationView.style.display = 'none';
                formView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
            serviceSelector.render();
        });
        
        timeSlots.render();
    });

    // 4. Форма за данни и реално изпращане към Formspree
    const bookingForm = new BookingForm('form-view', async (clientData) => {
        bookingData.clientName = clientData.name;
        bookingData.clientPhone = clientData.phone;

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = bookingData.date.toLocaleDateString('bg-BG', options);

        // Подготовка на данните за изпращане
        const formData = {
            _subject: `Нова резервация от ${bookingData.clientName} за ${formattedDate}`,
            Дата: formattedDate,
            Час: bookingData.time,
            Процедура: bookingData.service.name,
            Име: bookingData.clientName,
            Телефон: bookingData.clientPhone
        };

        try {
            // Изпращане към твоето Formspree хранилище
            const response = await fetch('https://formspree.io/f/moevnrej', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // 5. Успешно изпращане -> Показваме екран за потвърждение
                const confirmation = new Confirmation('confirmation-view', bookingData, () => {
                    window.location.reload();
                });
                
                formView.style.display = 'none';
                confirmation.render();
            } else {
                alert('Възникна проблем при изпращането. Моля, опитайте отново.');
            }

        } catch (error) {
            console.error('Грешка:', error);
            alert('Няма връзка с мрежата. Моля, проверете интернет връзката си.');
        }
    });
});