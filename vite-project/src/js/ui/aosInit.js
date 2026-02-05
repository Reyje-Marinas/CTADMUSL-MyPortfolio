import AOS from 'aos';
import 'aos/dist/aos.css';

export function initAOS() {
    AOS.init({
        duration: 600,       // Fast and punchy
        once: true,          // Animate only once per scroll
        offset: 50,          // Trigger sooner
        easing: 'ease-out-cubic',
        anchorPlacement: 'top-bottom', // Helps with elements partially off-screen
    });

    // Refresh after a slight delay to account for dynamic content (like Three.js or Charts)
    setTimeout(() => {
        AOS.refresh();
    }, 500);
}