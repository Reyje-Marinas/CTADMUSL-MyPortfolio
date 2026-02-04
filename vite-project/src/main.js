import './css/style.css';
import * as bootstrap from 'bootstrap';
console.log("Portfolio loaded!");

// Add this line at the very top of main.js
window.heroRotationSpeed = 0.005; 

// ... existing imports
import { initSettings } from './js/ui/settings.js';
import { initHeroAnimation } from './js/three/heroAnimation.js';
import { initSkillChart } from './js/canvas/skillChart.js';
import { initFormHandler } from './js/forms/formHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    initSettings();
    initHeroAnimation('three-container');
    initSkillChart('skillsCanvas');
    initFormHandler('contactForm'); 
    initFormHandler('hireForm');
});