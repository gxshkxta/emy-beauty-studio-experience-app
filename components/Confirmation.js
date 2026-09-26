// components/Confirmation.js
export class Confirmation {
    constructor(containerId, bookingData, onReset) {
        this.container = document.getElementById(containerId);
        this.bookingData = bookingData;
        this.onReset = onReset;
    }

    render() {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = this.bookingData.date ? this.bookingData.date.toLocaleDateString('bg-BG', options) : '';

        const detailsHtml = `
            <div><strong style="color:var(--text-dim);">Дата:</strong> ${formattedDate}</div>
            <div><strong style="color:var(--text-dim);">Час:</strong> ${this.bookingData.time}</div>
            <div><strong style="color:var(--text-dim);">Процедура:</strong> ${this.bookingData.service ? this.bookingData.service.name : ''}</div>
            <div><strong style="color:var(--text-dim);">Име:</strong> ${this.bookingData.clientName}</div>
            <div><strong style="color:var(--text-dim);">Телефон:</strong> ${this.bookingData.clientPhone}</div>
        `;

        document.getElementById('confirmation-details').innerHTML = detailsHtml;
        this.container.style.display = 'block';
        this.container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        document.getElementById('reset-booking-btn').onclick = () => {
            if (this.onReset) this.onReset();
        };
    }
}