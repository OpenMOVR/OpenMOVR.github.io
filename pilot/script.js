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
});

// Form Submission
document.getElementById('pilot-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Convert to JSON
    const data = {};
    formData.forEach((value, key) => {
        if (key === 'multiPlatform') {
            data[key] = value;
        } else if (key !== 'attestation') {
            data[key] = value;
        }
    });
    
    // Your Power Automate URL here
    const flowURL = 'YOUR_POWER_AUTOMATE_URL_HERE';
    
    // Show loading state
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    fetch(flowURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        form.style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';
        
        // Scroll to confirmation
        document.getElementById('confirmation').scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error').style.display = 'block';
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

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
