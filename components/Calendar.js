export class Calendar {
    constructor(containerId, onDateSelect) {
        this.container = document.getElementById(containerId);
        this.onDateSelect = onDateSelect;
        
        // Вземаме днешна дата (забраняваме миналите дни)
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);

        this.currentMonth = this.today.getMonth();
        this.currentYear = this.today.getFullYear();
        this.selectedDate = null;

        this.monthNames = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
        this.weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

        this.render();
    }

    render() {
        const firstDayIndex = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const shiftDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Понеделник да е първи ден
        
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

        let html = `
            <div class="calendar-wrapper">
                <div class="calendar-nav">
                    <i class="fas fa-chevron-left" id="prev-month"></i>
                    <span>${this.monthNames[this.currentMonth]} ${this.currentYear}</span>
                    <i class="fas fa-chevron-right" id="next-month"></i>
                </div>
                <div class="calendar-weekdays">
                    ${this.weekDays.map(day => `<span>${day}</span>`).join('')}
                </div>
                <div class="calendar-days">
        `;

        // Празни клетки за предния месец
        for (let i = 0; i < shiftDay; i++) {
            html += `<span></span>`;
        }

        // Дните от месеца
        for (let day = 1; day <= daysInMonth; day++) {
            const dateToCheck = new Date(this.currentYear, this.currentMonth, day);
            const isPast = dateToCheck < this.today;
            
            const disabledClass = isPast ? 'disabled' : '';
            const hasSlotsClass = !isPast ? 'has-slots' : ''; // В следващи фази тук ще правим реална проверка
            const selectedClass = (this.selectedDate && this.selectedDate.getTime() === dateToCheck.getTime()) ? 'selected' : '';

            html += `<span class="calendar-day ${disabledClass} ${hasSlotsClass} ${selectedClass}" data-day="${day}">${day}</span>`;
        }

        html += `</div></div>`;
        this.container.innerHTML = html;
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; }
            this.render();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; }
            this.render();
        });

        const dayElements = this.container.querySelectorAll('.calendar-day:not(.disabled)');
        dayElements.forEach(el => {
            el.addEventListener('click', (e) => {
                const day = parseInt(e.target.getAttribute('data-day'));
                this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
                this.render(); // Презареждаме, за да покажем златното кръгче
                if (this.onDateSelect) {
                    this.onDateSelect(this.selectedDate);
                }
            });
        });
    }
}