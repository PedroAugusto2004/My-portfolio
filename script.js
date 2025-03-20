/*===== MENU SHOW =====*/ 
document.getElementById('nav-toggle').addEventListener('click', function () {
    const navMenu = document.getElementById('nav-menu');
    const checkbox = this.querySelector('input');

    if (checkbox.checked) {
        navMenu.classList.add('show');
    } else {
        navMenu.classList.remove('show');
    }
});

// Close the hamburger menu when a shortcut link is clicked
document.querySelectorAll('.nav_link').forEach(link => {
    link.addEventListener('click', () => {
        const checkbox = document.querySelector('#nav-toggle input');
        const navMenu = document.getElementById('nav-menu');

        if (checkbox) {
            checkbox.checked = false; // Uncheck the checkbox
            navMenu.classList.remove('show'); // Hide the menu
        }
    });
});

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav_link');   

function linkAction(){
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  
  /*Remove menu mobile*/
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
function activateMenuOnScroll() {
    // Include all sections AND specifically target skills/education elements
    const sections = document.querySelectorAll('section[id]');
    const subsections = document.querySelectorAll('div[id="skills"], h2[id="education"]');
    const navLinks = document.querySelectorAll('.nav_link');
    
    // Function to update active navigation item
    const updateActiveNav = (id) => {
        if (!id) return;
        
        // Get the matching nav link
        const activeLink = document.querySelector(`.nav_link[href="#${id}"]`);
        
        if (activeLink) {
            // Only update if the active link is changing
            const currentActive = document.querySelector('.nav_link.active');
            if (!currentActive || currentActive !== activeLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        }
    };
    
    // Create separate observer for main sections with different settings
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Only process sections that are entering the viewport
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Don't highlight the about section when skills/education are visible
                if (id === 'about') {
                    // Check if we're currently in skills or education subsection
                    const scrollY = window.scrollY;
                    const skillsEl = document.getElementById('skills');
                    const educationEl = document.getElementById('education');
                    
                    if (skillsEl && scrollY >= skillsEl.offsetTop - 100) {
                        return; // Don't highlight about if skills is visible
                    }
                    
                    if (educationEl && scrollY >= educationEl.offsetTop - 100) {
                        return; // Don't highlight about if education is visible
                    }
                }
                
                updateActiveNav(id);
            }
        });
    }, {
        rootMargin: '-10% 0px -80% 0px', // Top margin reduced, bottom margin increased
        threshold: 0.1 // Lower threshold for main sections
    });
    
    // Create separate observer for subsections with different settings
    const subsectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) { // Higher threshold for subsections
                const id = entry.target.getAttribute('id');
                updateActiveNav(id);
            }
        });
    }, {
        rootMargin: '-5% 0px -70% 0px', // Special settings for subsections
        threshold: [0.3, 0.5] // Higher threshold for better subsection detection
    });
    
    // Use different observers for different types of elements
    sections.forEach(section => sectionObserver.observe(section));
    subsections.forEach(subsection => subsectionObserver.observe(subsection));
    
    // Also handle scroll events directly for more precise control
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        // Check for education section specifically with higher priority
        const educationEl = document.getElementById('education');
        if (educationEl && 
            scrollPosition >= educationEl.offsetTop - 50 && 
            scrollPosition < educationEl.offsetTop + educationEl.offsetHeight + 100) {
            updateActiveNav('education');
            return;
        }
        
        // Check for skills section specifically with higher priority
        const skillsEl = document.getElementById('skills');
        if (skillsEl && 
            scrollPosition >= skillsEl.offsetTop - 50 && 
            scrollPosition < skillsEl.offsetTop + skillsEl.offsetHeight + 100) {
            updateActiveNav('skills');
            return;
        }
        
        // Handle all other sections normally
        let currentMainSection = null;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            // Skip the about section check if we're in skills or education area
            if (section.id === 'about' && 
                ((educationEl && scrollPosition >= educationEl.offsetTop - 100) || 
                (skillsEl && scrollPosition >= skillsEl.offsetTop - 100))) {
                return;
            }
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentMainSection = section;
            }
        });
        
        // Update based on main section if we found one
        if (currentMainSection) {
            updateActiveNav(currentMainSection.id);
        }
    }, { passive: true }); // passive for better scroll performance
}

// Initialize scroll observation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    activateMenuOnScroll();
    
    // Set initial active menu item with a delay to ensure all is loaded
    setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        const sections = document.querySelectorAll('section[id], div[id="skills"], h2[id="education"]');
        let currentSection = null;
        
        // Find which section is currently visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Add some offset
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = section;
            }
        });
        
        // Update active menu item
        if (currentSection) {
            const id = currentSection.getAttribute('id');
            document.querySelectorAll('.nav_link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`.nav_link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }, 300);
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});


/*SCROLL HOME*/
sr.reveal('.home_title',{}); 
sr.reveal('.button',{delay: 200}); 
sr.reveal('.home_img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 

/*SCROLL ABOUT*/
sr.reveal('.about_img',{}); 
sr.reveal('.about_subtitle',{delay: 400}); 
sr.reveal('.about_text',{delay: 400}); 

ScrollReveal().reveal('.about_skills li, .about_education li', {
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    delay: 100,
    interval: 200, // Adds a delay between each list item reveal
    opacity: 0,
    easing: 'ease-out',
});

// Open the image in the modal
function openImageModal(image) {
    var modal = document.getElementById("imageModal");
    var modalImage = document.getElementById("modalImage");
    modal.style.display = "block"; // Show the modal
    modalImage.src = image.src; // Set the image source to the clicked image
}

// Close the modal
function closeImageModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Hide the modal
}

/*SCROLL WORK*/
ScrollReveal().reveal('.work_main_project', {
    distance: '40px',
    duration: 1200,
    delay: 200,
    origin: 'bottom',
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200
});

ScrollReveal().reveal('.work_card', {
    distance: '30px',
    duration: 1000,
    delay: 100,
    origin: 'bottom',
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200
});

/*SCROLL CONTACT*/
sr.reveal('.contact_input',{interval: 200});
