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
ScrollReveal().reveal('.work_main_project, .work_card', {
    distance: '20px',
    duration: 1000,
    delay: 300,
    opacity: 0,
    easing: 'ease-in-out',
});
/*SCROLL CONTACT*/
sr.reveal('.contact_input',{interval: 200}); 
