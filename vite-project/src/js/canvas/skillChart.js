export function initSkillChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId;
    
    // Animation State
    let progress = 0; 
    let targetProgress = 0; 
    
    // Theme State (Default to Dark)
    let isDarkMode = !document.body.getAttribute('data-theme') || document.body.getAttribute('data-theme') !== 'light';

    const skills = [
        { name: "ASP.NET CORE / C#", level: 0.95, color: "#0ea5e9" }, 
        { name: "PHP & MYSQL", level: 0.88, color: "#10b981" },       
        { name: "THREE.JS / WEBGL", level: 0.75, color: "#8b5cf6" },  
        { name: "CANVAS API", level: 0.82, color: "#f43f5e" },        
        { name: "SYSTEMS ANALYSIS", level: 0.90, color: "#3b82f6" }   
    ];

    // 1. Resize & DPI
    function resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = (rect.width - 48) * dpr; 
        canvas.height = 400 * dpr;
        ctx.scale(dpr, dpr);
        width = (rect.width - 48);
        height = 400;
    }

    // 2. Drawing Logic
    function draw() {
        ctx.clearRect(0, 0, width, height);

        const barHeight = 36;
        const gap = 30;
        const startY = 20;

        // --- THEME COLORS DEFINITION ---
        const labelColor = isDarkMode ? "#94a3b8" : "#64748b"; // Slate-400 (Dark) vs Slate-500 (Light)
        const percentColor = isDarkMode ? "#f8fafc" : "#0f172a"; // White (Dark) vs Slate-900 (Light)
        const trackColor = isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"; // Glassy White vs Glassy Black

        skills.forEach((skill, index) => {
            const y = startY + index * (barHeight + gap);
            
            // A. Label
            ctx.fillStyle = labelColor; 
            ctx.font = "bold 12px 'Space Grotesk', sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(skill.name, 0, y - 8);

            // B. Percentage
            ctx.fillStyle = percentColor; 
            ctx.font = "12px 'Inter', sans-serif";
            ctx.textAlign = "right";
            const currentLevel = Math.floor(skill.level * 100 * progress);
            ctx.fillText(`${currentLevel}%`, width, y - 8);

            // C. Background Track (Dynamic)
            ctx.fillStyle = trackColor;
            ctx.beginPath();
            ctx.roundRect(0, y, width, barHeight, 8); 
            ctx.fill();

            // D. Progress Bar
            const barWidth = width * skill.level * progress;
            if (barWidth > 0) {
                const gradient = ctx.createLinearGradient(0, 0, barWidth, 0);
                gradient.addColorStop(0, skill.color);
                gradient.addColorStop(1, adjustColorOpacity(skill.color, 0.6)); 

                ctx.fillStyle = gradient;
                ctx.shadowBlur = 15;
                ctx.shadowColor = skill.color;

                ctx.beginPath();
                ctx.roundRect(0, y, barWidth, barHeight, 8);
                ctx.fill();

                ctx.shadowBlur = 0;
            }
        });
    }

    // 3. Animation Loop
    function animate() {
        progress += (targetProgress - progress) * 0.05;
        draw();
        if (Math.abs(targetProgress - progress) > 0.001) {
            animationFrameId = requestAnimationFrame(animate);
        }
    }

    // 4. Listeners
    
    // A. Scroll Trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                targetProgress = 1; 
                progress = 0; 
                resize(); 
                animate();
            } else {
                targetProgress = 0; 
            }
        });
    }, { threshold: 0.3 });
    observer.observe(canvas);
    
    // B. Resize
    window.addEventListener('resize', () => {
        resize();
        draw();
    });

    // C. THEME CHANGE LISTENER (The Fix)
    window.addEventListener('theme-change', (e) => {
        // Update state based on the event payload
        isDarkMode = (e.detail.theme !== 'light');
        // Force a redraw immediately
        draw();
    });
}

function adjustColorOpacity(hex, opacity) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}