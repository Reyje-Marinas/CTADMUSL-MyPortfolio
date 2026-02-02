import './css/style.css';
import * as bootstrap from 'bootstrap';
console.log("Portfolio loaded!");

// Add this line at the very top of main.js
window.heroRotationSpeed = 0.005; 

// ... existing imports
import { initSettings } from './js/ui/settings.js';

document.addEventListener('DOMContentLoaded', () => {
    initSettings();
});