// data/services.js
export const services = [
    { id: 'manicure', name: 'Маникюр', icon: '💅' },
    { id: 'pedicure', name: 'Педикюр', icon: '🦶' },
    { id: 'combo', name: 'Комбинирани', icon: '✨' },
    { id: 'facial', name: 'Грижа за лице', icon: '💆‍♀️' }
];

// Симулация на свободни часове (в бъдеще това може да идва от сървър/календар)
export const getAvailableTimes = (date) => {
    return ['10:00', '11:30', '13:00', '15:30', '17:00'];
};