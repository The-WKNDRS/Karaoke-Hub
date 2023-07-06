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
