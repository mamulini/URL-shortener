const hamburger = () => {
    const navToggle = document.querySelector('.nav__toggle'),
          nav = document.querySelector('.nav'),
          navLinks = document.querySelectorAll('.nav__links')

    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav__open');
    });

    navLinks.forEach( link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav__open');
        });
    });
};

module.exports = {hamburger};