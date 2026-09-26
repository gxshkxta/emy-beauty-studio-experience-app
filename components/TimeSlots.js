// components/TimeSlots.js
export class TimeSlots {
    constructor(containerId, times, onSelect) {
        this.container = document.getElementById(containerId);
        this.times = times;
        this.onSelect = onSelect;
    }

    render() {
        if (!this.times || this.times.length === 0) {
            this.container.innerHTML = '<p style="text-align:center; color:var(--text-dim); font-size: 0.9rem;">Няма свободни часове за тази дата.</p>';
            return;
        }

        let html = '<div class="time-grid">';
        this.times.forEach(time => {
            html += `<button class="time-btn" data-time="${time}">${time}</button>`;
        });
        html += '</div>';
        
        this.container.innerHTML = html;
        this.attachEvents();
    }

    attachEvents() {
        const btns = this.container.querySelectorAll('.time-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                btns.forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.onSelect(e.target.getAttribute('data-time'));
            });
        });
    }
}