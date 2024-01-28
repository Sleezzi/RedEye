function handkeScroll() {
    document.querySelectorAll(".fade-up").forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
    document.querySelectorAll(".fade-down").forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}
handkeScroll();
window.addEventListener('scroll', handkeScroll);