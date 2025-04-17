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
            }
        });
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

     // --- Fade-in effect for sections on scroll ---
     const sections = document.querySelectorAll('main section');
     const options = {
         root: null, // Use the viewport as the root
         rootMargin: '0px',
         threshold: 0.1 // Trigger when 10% of the section is visible
     };

     const observer = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.classList.add('visible');
                 // Optional: Unobserve the element after it becomes visible
                 // observer.unobserve(entry.target);
             }
         });
     }, options);

     sections.forEach(section => {
         observer.observe(section);
     });


    // --- NEW: Gallery Carousel Arrow Controls ---
    const galleryContainer = document.querySelector('.gallery-scroll-container');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');

    if (galleryContainer && prevButton && nextButton) {
        // Function to calculate the scroll amount (approximates one item width + gap)
        const getScrollAmount = () => {
            const firstItem = galleryContainer.querySelector('.gallery-item');
            if (firstItem) {
                // Get item width and the gap from the parent flex container
                const itemStyle = window.getComputedStyle(firstItem);
                const containerStyle = window.getComputedStyle(galleryContainer.querySelector('.gallery-items'));
                const itemWidth = firstItem.offsetWidth; // Includes padding/border
                const gap = parseFloat(containerStyle.gap) || 15; // Use defined gap or fallback
                return itemWidth + gap;
            }
            return galleryContainer.clientWidth * 0.85; // Fallback scroll amount
        };

        // Previous button click
        prevButton.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            galleryContainer.scrollBy({
                left: -scrollAmount, // Scroll left
                behavior: 'smooth' // Use smooth scrolling
            });
        });

        // Next button click
        nextButton.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            galleryContainer.scrollBy({
                left: scrollAmount, // Scroll right
                behavior: 'smooth' // Use smooth scrolling
            });
        });

        // Optional: Hide/show arrows based on scroll position (more advanced)
        // You could add an event listener for the 'scroll' event on galleryContainer
        // and check conditions like:
        // prevButton.style.display = galleryContainer.scrollLeft > 10 ? 'flex' : 'none';
        // nextButton.style.display = galleryContainer.scrollWidth - galleryContainer.clientWidth - galleryContainer.scrollLeft > 10 ? 'flex' : 'none';
        // Remember to handle initial state and potential resize events if using this.
    }
    // --- End of Gallery Controls ---

}); // End of DOMContentLoaded listener