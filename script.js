document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling Offset for Fixed Header ---
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    const header = document.querySelector('header');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate position to scroll to, accounting for header height + extra space
                const headerOffset = header.offsetHeight + 15; // Adjust the offset as needed
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition
                    // 'behavior: smooth' is handled by CSS 'scroll-behavior: smooth;'
                });

                // Optional: Close mobile menu if you implement one
            }
        });
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

     // --- Fade-in effect for sections on scroll ---
     // Uses Intersection Observer API for performance
     const sections = document.querySelectorAll('main section');
     const options = {
         root: null, // Use the viewport as the root
         rootMargin: '0px',
         threshold: 0.1 // Trigger when 10% of the section is visible
     };

     const observer = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
             // If the section is intersecting (visible)
             if (entry.isIntersecting) {
                 // Add the 'visible' class (CSS handles the transition)
                 entry.target.classList.add('visible');
                 // Optional: Unobserve the element after it becomes visible
                 // to prevent repeated triggering and save resources.
                 // observer.unobserve(entry.target);
             }
             // Optional: Remove class if you want fade-out effect when scrolling up
             // else {
             //     entry.target.classList.remove('visible');
             // }
         });
     }, options);

     // Observe each section in the main content
     sections.forEach(section => {
         // Initial state (opacity: 0, transform: translateY(20px)) is set in CSS
         observer.observe(section);
     });

});