// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Initialize form enhancements
    generateCSRFToken();
    trackPageView();
});

// Rate limiting
let lastSubmission = 0;
const RATE_LIMIT_MS = 5000; // 5 seconds between submissions

function generateCSRFToken() {
    const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
    const csrfField = document.getElementById('csrf_token');
    if (csrfField) {
        csrfField.value = token;
    }
}

function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'MOVR Pilot Registration',
            page_location: window.location.href
        });
    }
}

function validateEmail(email) {
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const disposableEmailDomains = ['tempmail.org', '10minutemail.com', 'guerrillamail.com'];
    
    if (!emailRegex.test(email)) return false;
    
    const domain = email.split('@')[1].toLowerCase();
    return !disposableEmailDomains.includes(domain);
}

function validateForm() {
    clearErrors();
    let isValid = true;

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    if (!validateEmail(email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }

    // Required field validation
    const requiredFields = ['disease', 'relationship'];
    requiredFields.forEach(field => {
        if (!document.getElementById(field).value) {
            showError(field + '-error', 'This field is required');
            isValid = false;
        }
    });

    // Attestation validation
    if (!document.querySelector('input[name="attestation"]').checked) {
        showError('attestation-error', 'You must consent to participate');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// Form Submission with enhanced features
document.getElementById('pilot-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmission < RATE_LIMIT_MS) {
        showError('email-error', 'Please wait before submitting again');
        return;
    }

    // Validate form
    if (!validateForm()) {
        trackEvent('form_validation_failed');
        return;
    }
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Update UI to show loading state
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    
    if (submitBtn && submitText && submitSpinner) {
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitSpinner.style.display = 'inline';
    }
    
    // Convert to JSON with enhanced data
    const data = {};
    formData.forEach((value, key) => {
        if (key === 'multiPlatform') {
            data[key] = value;
        } else if (key !== 'attestation' && key !== 'csrf_token') {
            data[key] = value.trim();
        }
    });
    
    // Add submission metadata
    data.submissionTime = new Date().toISOString();
    data.userAgent = navigator.userAgent;
    data.referrer = document.referrer;
    
    // Your Power Automate URL here
    const flowURL = 'YOUR_POWER_AUTOMATE_URL_HERE';
    
    // Submit with retry logic
    submitWithRetry(flowURL, data, 3)
        .then(response => response.json())
        .then(data => {
            lastSubmission = now;
            form.style.display = 'none';
            
            if (data.status === 'success') {
                document.getElementById('confirmation').style.display = 'block';
                trackEvent('form_submitted_success');
                // Scroll to confirmation
                document.getElementById('confirmation').scrollIntoView({ behavior: 'smooth' });
            } else if (data.status === 'waitlist') {
                document.getElementById('waitlist').style.display = 'block';
                trackEvent('form_submitted_waitlist');
                // Scroll to waitlist message
                document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
            } else {
                throw new Error('Unknown response status');
            }
        })
        .catch(error => {
            console.error('Submission error:', error);
            document.getElementById('error').style.display = 'block';
            trackEvent('form_submission_failed');
            resetSubmitButton();
        });
});

async function submitWithRetry(url, data, maxRetries) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                return response;
            }
            throw new Error(`HTTP ${response.status}`);
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
    }
}

function resetSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitSpinner = document.getElementById('submit-spinner');
    
    if (submitBtn && submitText && submitSpinner) {
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitSpinner.style.display = 'none';
    }
}

function resetForm() {
    document.getElementById('pilot-form').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('confirmation').style.display = 'none';
    document.getElementById('waitlist').style.display = 'none';
    resetSubmitButton();
    clearErrors();
}

function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            custom_parameter: 'movr_pilot',
            ...parameters
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});