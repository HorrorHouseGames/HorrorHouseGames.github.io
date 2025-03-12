// Header Background Rotation
const header = document.getElementById('header');
const headerImages = JSON.parse(header.getAttribute('data-images'));
let headerIndex = 0;

function rotateHeaderBackground() {
    headerIndex = (headerIndex + 1) % headerImages.length;
    header.style.backgroundImage = `url('${headerImages[headerIndex]}')`;
}

setInterval(rotateHeaderBackground, 5000); // Rotate every 5 seconds
rotateHeaderBackground(); // Initial call to set the first image

// Hero Background Crossfade
const heroBackground = document.querySelector('.hero-background');
const heroLayers = heroBackground.querySelectorAll('.background-layer');
const heroImages = JSON.parse(heroBackground.getAttribute('data-images'));
let heroIndex = 0;

// Set initial layer as active
heroLayers[0].classList.add('active');

function crossfadeHeroBackground() {
    // Remove active class from all layers
    heroLayers.forEach(layer => layer.classList.remove('active'));

    // Move to next index
    heroIndex = (heroIndex + 1) % heroLayers.length;

    // Add active class to the current layer
    heroLayers[heroIndex].classList.add('active');
}

setInterval(crossfadeHeroBackground, 7000); // Crossfade every 7 seconds
setTimeout(crossfadeHeroBackground, 100); // Initial call with a slight delay to ensure DOM is ready

// Project Image Slide Effect
const projectImages = document.querySelectorAll('.project-image');
projectImages.forEach(project => {
    const images = JSON.parse(project.getAttribute('data-images'));
    let index = 0;
    const slider = project.querySelector('.image-slider');
    let interval;

    function slideProjectImage() {
        index = (index + 1) % images.length;

        // Create new image element
        const newImg = document.createElement('img');
        newImg.src = images[index];
        newImg.alt = slider.querySelector('img').alt;

        // Append the new image to the slider
        slider.appendChild(newImg);

        // Slide the container to the left
        slider.style.transform = 'translateX(-100%)';

        // After the animation, remove the old image and reset the transform
        setTimeout(() => {
            slider.removeChild(slider.firstElementChild);
            slider.style.transition = 'none'; // Disable transition for reset
            slider.style.transform = 'translateX(0)';
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
            }, 50);
        }, 500); // Match the CSS transition duration
    }

    // Start sliding
    interval = setInterval(slideProjectImage, 4000); // Slide every 4 seconds

    // Pause on hover
    project.addEventListener('mouseenter', () => clearInterval(interval));
    project.addEventListener('mouseleave', () => {
        interval = setInterval(slideProjectImage, 4000);
    });

    // Initial call
    slideProjectImage();
});