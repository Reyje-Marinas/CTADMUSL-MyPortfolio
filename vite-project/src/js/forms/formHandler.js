import { validateInput, showFeedback } from './validation.js';

export function initFormHandler(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    // 1. Live Validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const result = validateInput(input);
            showFeedback(input, result.isValid, result.message);
        });
        input.addEventListener('input', () => {
            input.classList.remove('is-invalid');
        });
    });

    // 2. Submit Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Check all fields
        inputs.forEach(input => {
            const result = validateInput(input);
            showFeedback(input, result.isValid, result.message);
            if (!result.isValid) isFormValid = false;
        });

        if (isFormValid) {
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // A. Loading State
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Processing...`;

            // Simulate Network Request (2 seconds)
            setTimeout(() => {
                
                // B. CHECK FOR MODAL SPECIFIC LOGIC
                const modalContent = form.closest('.modal-body');
                const successDiv = modalContent ? modalContent.querySelector('#hireSuccess') : null;

                if (modalContent && successDiv) {
                    // --- MODAL SUCCESS SCENARIO ---
                    // 1. Hide Form
                    form.classList.add('d-none');
                    // 2. Show Success Message (The "Dopamine Hit")
                    successDiv.classList.remove('d-none');

                    // 3. Close Modal automatically after 2.5 seconds
                    setTimeout(() => {
                        const modalEl = form.closest('.modal');
                        const modalInstance = bootstrap.Modal.getInstance(modalEl);
                        if (modalInstance) modalInstance.hide();

                        // 4. Reset Form for next time
                        setTimeout(() => {
                            form.reset();
                            form.classList.remove('d-none');
                            successDiv.classList.add('d-none');
                            inputs.forEach(i => i.classList.remove('is-valid'));
                            btn.innerHTML = originalText;
                            btn.disabled = false;
                        }, 500); // Wait for modal to fade out
                    }, 2500);

                } else {
                    // --- STANDARD FORM SUCCESS (Contact Form) ---
                    const alertDiv = document.getElementById('successMessage');
                    if(alertDiv) {
                         alertDiv.classList.remove('d-none');
                         setTimeout(() => alertDiv.classList.add('d-none'), 5000);
                    }
                    
                    form.reset();
                    inputs.forEach(i => i.classList.remove('is-valid'));
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }

            }, 2000);
        }
    });
}