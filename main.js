// main.js
import { Calendar } from './components/Calendar.js';
import { TimeSlots } from './components/TimeSlots.js';
import { ServiceSelector } from './components/ServiceSelector.js';
import { getAvailableTimes } from './data/services.js';

document.addEventListener('DOMContentLoaded', () => {
    const timeView = document.getElementById('time-view');
    const serviceView = document.getElementById('service-view');
    const dateDisplay = document.getElementById('selected-date-display');
    
    // Обектът, който ще събере цялата резервация за Фаза 3
    const bookingData = {
        date: null,
        time: null,
        service: null
    };

    // 1. Инициализация на календара
    const calendar = new Calendar('calendar-mount', (selectedDate) => {
        bookingData.date = selectedDate;
        
        // Форматираме датата на български (напр. "24 октомври 2026")
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateDisplay.textContent = selectedDate.toLocaleDateString('bg-BG', options);
        
        // Показваме панела с часове и скриваме услугите (ако сме избрали нова дата)
        timeView.style.display = 'block';
        serviceView.style.display = 'none';
        bookingData.time = null;
        bookingData.service = null;
        
        // Плъзгаме екрана леко надолу към часовете
        timeView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // 2. Инициализация на часовете
        const times = getAvailableTimes(selectedDate);
        const timeSlots = new TimeSlots('time-mount', times, (selectedTime) => {
            bookingData.time = selectedTime;
            
            // Показваме панела с процедури
            serviceView.style.display = 'block';
            serviceView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // 3. Инициализация на услугите
            const serviceSelector = new ServiceSelector('service-mount', (selectedService) => {
                bookingData.service = selectedService;
                
                // Всичко е избрано, готови сме за формата
                console.log('Готови за Фаза 3! Данни:', bookingData);
            });
            serviceSelector.render();
        });
        
        timeSlots.render();
    });
});