const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
}

const myCarousel = document.getElementById('hackathonCarousel');

// Listen for the slide transition event
myCarousel.addEventListener('slide.bs.carousel', event => {
    // 1. Find the currently active button and remove the class
    document.querySelector('.custom-indicators .active').classList.remove('active');
    
    // 2. Add the class to the new button (based on the index)
    const indicators = document.querySelectorAll('.custom-indicators button');
    indicators[event.to].classList.add('active');
});
