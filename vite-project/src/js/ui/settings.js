export function initSettings() {
    console.log("Initializing Settings Panel...");

    // --- 0. LOAD SAVED THEME ON STARTUP ---
    // Check if the user previously selected 'light'
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        // Apply Light Mode
        document.body.setAttribute('data-theme', 'light');
        
        // Update the Radio Button UI to match
        const lightRadio = document.getElementById('themeLight');
        if (lightRadio) lightRadio.checked = true;

        // Update Close Button style
        const closeBtn = document.querySelector('.btn-close');
        if (closeBtn) closeBtn.classList.remove('btn-close-white');
    }

    // 1. Theme Switcher (Light/Dark)
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            let theme = 'dark'; // Default
            
            if (e.target.id === 'themeLight') {
                document.body.setAttribute('data-theme', 'light');
                const closeBtn = document.querySelector('.btn-close');
                if (closeBtn) closeBtn.classList.remove('btn-close-white');
                theme = 'light';
            } else {
                document.body.removeAttribute('data-theme');
                const closeBtn = document.querySelector('.btn-close');
                if (closeBtn) closeBtn.classList.add('btn-close-white');
                theme = 'dark';
            }
            
            // --- CRITICAL FIX: SAVE TO LOCAL STORAGE ---
            localStorage.setItem('theme', theme);

            // DISPATCH EVENT so Three.js knows!
            window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: theme } }));
        });
    });

    // 2. Accent Color Logic
    window.updateAccent = (colorName) => {
        // Update CSS Variable
        const newColorVar = `var(--accent-${colorName})`;
        document.documentElement.style.setProperty('--current-accent', newColorVar);
        
        // Update Active Button UI
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`button[data-color="${colorName}"]`);
        if(activeBtn) activeBtn.classList.add('active');

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