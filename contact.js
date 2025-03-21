document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add animation to button
    const button = this.querySelector('.submit-btn');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
        button.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        // Reset form
        setTimeout(() => {
            this.reset();
            button.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            button.style.background = '';
        }, 3000);
    }, 2000);
});

// Add floating label functionality
document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
    element.addEventListener('input', function() {
        if (this.value) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
});