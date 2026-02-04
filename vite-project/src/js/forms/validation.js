/**
 * Generic Validation Logic
 * Checks input validity based on HTML5 attributes + Regex
 */
export function validateInput(input) {
    let isValid = true;
    let message = '';

    // 1. Check Required (Empty Field)
    if (input.required && !input.value.trim()) {
        return { isValid: false, message: 'This field is required.' };
    }

    // 2. Check Email Format (Regex)
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            return { isValid: false, message: 'Please enter a valid email address.' };
        }
    }

    // 3. Check Minimum Length
    if (input.minLength > 0 && input.value.trim().length < input.minLength) {
        return { isValid: false, message: `Must be at least ${input.minLength} characters.` };
    }

    return { isValid: true, message: '' };
}

/**
 * Updates the Bootstrap UI classes to show Red/Green borders
 */
export function showFeedback(input, isValid, message) {
    // Find the error message div below the input
    const feedbackDiv = input.parentElement.querySelector('.invalid-feedback');
    
    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid'); // This triggers the red border
        if (feedbackDiv) feedbackDiv.textContent = message; // Updates the text
    }
}