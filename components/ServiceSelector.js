// components/ServiceSelector.js
import { services } from '../data/services.js';

export class ServiceSelector {
    constructor(containerId, onSelect) {
        this.container = document.getElementById(containerId);
        this.onSelect = onSelect;
    }

    render() {
        let html = '<div class="service-list">';
        services.forEach(srv => {
            html += `
                <div class="service-card" data-id="${srv.id}">
                    <span class="service-icon">${srv.icon}</span>
                    <span class="service-name">${srv.name}</span>
                </div>
            `;
        });
        html += '</div>';

        this.container.innerHTML = html;
        this.attachEvents();
    }

    attachEvents() {
        const cards = this.container.querySelectorAll('.service-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                cards.forEach(c => c.classList.remove('selected'));
                const target = e.currentTarget;
                target.classList.add('selected');
                
                const serviceId = target.getAttribute('data-id');
                const selectedService = services.find(s => s.id === serviceId);
                this.onSelect(selectedService);
            });
        });
    }
}