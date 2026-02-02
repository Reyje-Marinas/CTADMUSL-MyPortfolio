export function initSettings() {
    console.log("Initializing Settings Panel...");

    // 1. Theme Switcher (Light/Dark)
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.id === 'themeLight') {
                document.body.setAttribute('data-theme', 'light');
                document.querySelector('.btn-close').classList.remove('btn-close-white'); // Fix close button color
            } else {
                document.body.removeAttribute('data-theme');
                document.querySelector('.btn-close').classList.add('btn-close-white');
            }
        });
    });

    // 2. Accent Color Logic
    window.updateAccent = (colorName) => {
        // Update CSS Variable
        const newColorVar = `var(--accent-${colorName})`;
        document.documentElement.style.setProperty('--current-accent', newColorVar);
        
        // Update Active Button UI
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`button[data-color="${colorName}"]`).classList.add('active');

        // Optional: Dispatch event if Three.js needs to know
        window.dispatchEvent(new CustomEvent('accent-change', { detail: { color: colorName } }));
    };

    // 3. Rotation Speed (Global Variable for Three.js to read)
    const speedSlider = document.getElementById('animSpeed');
    if(speedSlider) {
        speedSlider.addEventListener('input', (e) => {
            window.heroRotationSpeed = parseFloat(e.target.value);
        });
    }

    // 4. Nebula Toggle
    const nebulaToggle = document.getElementById('nebulaToggle');
    const nebulaContainer = document.querySelector('.nebula-container');
    
    if(nebulaToggle && nebulaContainer) {
        nebulaToggle.addEventListener('change', (e) => {
            if(e.target.checked) {
                nebulaContainer.style.opacity = '1';
            } else {
                nebulaContainer.style.opacity = '0';
            }
        });
    }
}