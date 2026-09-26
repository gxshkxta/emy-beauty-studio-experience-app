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

    // 4. Форма за данни
    const bookingForm = new BookingForm('form-view', async (clientData) => {
        bookingData.clientName = clientData.name;
        bookingData.clientPhone = clientData.phone;

        // Подготовка на данните за изпращане (напр. към Formspree)
        const payload = {
            date: bookingData.date.toLocaleDateString('bg-BG'),
            time: bookingData.time,
            service: bookingData.service.name,
            name: bookingData.clientName,
            phone: bookingData.clientPhone
        };

        try {
            // Тук може да сложеш твоя Formspree ендпойнт (напр. https://formspree.io/f/xyzkqwer)
            // Засега симулираме успешно изпращане и визуализираме потвърждението
            console.log('Изпращане на заявка към имейл...', payload);
            
            // 5. Потвърждение
            const confirmation = new Confirmation('confirmation-view', bookingData, () => {
                window.location.reload(); // Рестартиране на приложението при клик на Начало
            });
            
            formView.style.display = 'none';
            confirmation.render();

        } catch (error) {
            alert('Възникна грешка при изпращането. Моля, опитайте отново.');
        }
    });
});