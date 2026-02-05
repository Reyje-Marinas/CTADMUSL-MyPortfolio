import './css/style.css';
import * as bootstrap from 'bootstrap';
console.log("Portfolio loaded!");

window.heroRotationSpeed = 0.005; 

import { initSettings } from './js/ui/settings.js';
import { initHeroAnimation } from './js/three/heroAnimation.js';
import { initSkillChart } from './js/canvas/skillChart.js';
import { initFormHandler } from './js/forms/formHandler.js';
import { initAOS } from './js/ui/aosInit.js';

document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initSettings();
    initHeroAnimation('three-container');
    initSkillChart('skillsCanvas');
    initFormHandler('contactForm'); 
    initFormHandler('hireForm');
});