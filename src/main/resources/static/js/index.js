

const appear = document.querySelectorAll('.appear');
const cb = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('inview');
        } else {
            entry.target.classList.remove('inview');
        }
    });
}
const io = new IntersectionObserver(cb);
appear.forEach(el => io.observe(el));


// JavaScript to remove the overlay after 3 seconds
const overlay = document.getElementById('overlay');
const isSplashDisplayed = sessionStorage.getItem('splashDisplayed');
if (!isSplashDisplayed) {
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            sessionStorage.setItem('splashDisplayed', true);
        }, 5000); // Hide the overlay after 5 seconds
    }, 3000); // Keep the overlay visible for 3 seconds
} else {
    overlay.style.display = 'none';
}