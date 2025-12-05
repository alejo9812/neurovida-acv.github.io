// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Add click event to each FAQ item
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre');
            const telefono = formData.get('telefono');
            const email = formData.get('email');
            const mensaje = formData.get('mensaje');
            
            // Basic validation
            if (!nombre || !telefono || !email || !mensaje) {
                showFormMessage('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Simulate form submission (in a real scenario, you would send this to a server)
            // For now, we'll just show a success message
            showFormMessage('¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Optionally, you could send the data via WhatsApp or email
            // Example: window.open(`https://wa.me/573114768213?text=Consulta de ${nombre}: ${mensaje}`);
        });
    }
    
    // Phone button click handler
    const phoneButton = document.querySelector('.phone-button');
    if (phoneButton) {
        phoneButton.addEventListener('click', function() {
            const phoneNumber = '573114768213';
            // Open WhatsApp
            window.open(`https://wa.me/${phoneNumber}`, '_blank', 'noopener');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect (optional enhancement)
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });

});

// Function to show form messages
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert before submit button
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    form.insertBefore(messageDiv, submitButton);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s';
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

