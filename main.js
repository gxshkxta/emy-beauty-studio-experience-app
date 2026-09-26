import { Calendar } from './components/Calendar.js';

document.addEventListener('DOMContentLoaded', () => {
    // Инициализираме Календара и подаваме какво да се случи при клик на дата
    const calendar = new Calendar('calendar-mount', (selectedDate) => {
        console.log('Избрана дата:', selectedDate);
        // Тук ще стартираме Phase 2: Показване на часовете
    });
});