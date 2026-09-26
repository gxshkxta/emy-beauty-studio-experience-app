// components/BookingForm.js
export class BookingForm {
    constructor(containerId, onSubmit) {
        this.container = document.getElementById(containerId);
        this.onSubmit = onSubmit;
        this.attachEvents();
    }

    attachEvents() {
        const form = document.getElementById('booking-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('client-name').value.trim();
            const phone = document.getElementById('client-phone').value.trim();
            
            if (name && phone) {
                this.onSubmit({ name, phone });
            }
        });
    }
}