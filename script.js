document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .project, .hero-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add class for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Email Copy Functionality
    const emailBtn = document.getElementById('emailCopyBtn');
    const feedback = document.getElementById('copyFeedback');

    if (emailBtn) {
        emailBtn.addEventListener('click', async () => {
            const email = emailBtn.innerText.trim();
            try {
                await navigator.clipboard.writeText(email);

                // Visual Feedback
                const originalText = feedback.innerText;
                feedback.innerText = "✅ Email copied to clipboard!";
                feedback.style.color = "#4ade80"; // Green success color
                feedback.style.opacity = "1";

                // Reset after 2 seconds
                setTimeout(() => {
                    feedback.innerText = originalText;
                    feedback.style.color = ""; // Reset to CSS default
                    feedback.style.opacity = "0.7";
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                feedback.innerText = "❌ Failed to copy";
                feedback.style.color = "#ef4444";
            }
        });
    }
});
