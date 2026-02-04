import * as THREE from 'three';
import { createScene } from './sceneSetup.js';

let outerShell, innerCore; // Variables to hold our 3D objects
let animationFrameId; // To stop animation if needed

export function initHeroAnimation(containerId) {
    // 1. Run the Setup
    const setup = createScene(containerId);
    if (!setup) return; // Stop if setup failed

    const { scene, camera, renderer } = setup;
    let currentAccent = 0x8b5cf6; // Default Violet

    // --- 2. CREATE OBJECTS ---
    
    // Outer Shell (Wireframe)
    const shellGeometry = new THREE.IcosahedronGeometry(2.2, 0);
    const shellMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, // Default White for Dark Mode
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    outerShell = new THREE.Mesh(shellGeometry, shellMaterial);
    scene.add(outerShell);

    // Inner Core (Solid)
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
        color: currentAccent,
        emissive: currentAccent,
        emissiveIntensity: 0.6,
        roughness: 0.4,
        metalness: 0.8
    });
    innerCore = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(innerCore);

    // --- 3. EVENT LISTENERS ---
    
    // Accent Color Listener
    window.addEventListener('accent-change', (e) => {
        const colorMap = {
            'emerald': 0x10b981, 'sky': 0x0ea5e9,
            'violet': 0x8b5cf6, 'rose': 0xf43f5e
        };
        const newColor = colorMap[e.detail.color];
        if (newColor && innerCore) {
            innerCore.material.color.setHex(newColor);
            innerCore.material.emissive.setHex(newColor);
        }
    });

    // Theme Change Listener
    window.addEventListener('theme-change', (e) => {
        if (!outerShell) return;
        if (e.detail.theme === 'light') {
            outerShell.material.color.setHex(0x000000); // Black lines
            outerShell.material.opacity = 0.8;
        } else {
            outerShell.material.color.setHex(0xffffff); // White lines
            outerShell.material.opacity = 0.5;
        }
    });

    // --- 4. ANIMATION LOOP ---
    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        // Get Speed
        const speed = window.heroRotationSpeed || 0.005;

        // Rotation
        if (outerShell) {
            outerShell.rotation.x += speed;
            outerShell.rotation.y += speed;
        }
        if (innerCore) {
            innerCore.rotation.x -= (speed * 0.6);
            innerCore.rotation.y -= (speed * 0.8);

            // Pulse
            const time = Date.now() * 0.002;
            const pulse = 1 + Math.sin(time) * 0.05;
            innerCore.scale.set(pulse, pulse, pulse);
        }

        renderer.render(scene, camera);
    }

    animate();
}