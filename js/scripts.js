document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const bgImage = document.querySelector('.bg-image');
    const profileContainer = document.querySelector('.profile-main-container');

    const backgrounds = [
        { url: 'images/bg1.jpg', theme: 'dark-theme' },
        { url: 'images/bg2.jpg', theme: 'dark-theme' },
        { url: 'images/bg3.jpg', theme: 'dark-theme' },
        { url: 'images/bg4.jpg', theme: 'light-theme' },
        { url: 'images/bg5.jpg', theme: 'light-theme' },
        { url: 'images/bg6.jpg', theme: 'light-theme' },
        { url: 'images/bg7.jpg', theme: 'light-theme' },
        { url: 'images/bg8.jpg', theme: 'light-theme' },
        { url: 'images/bg9.jpg', theme: 'light-theme' },
    ];

    let currentIndex = 0;

    // Function to preload images
    function preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    function applyBackground(index) {
        bgImage.style.backgroundImage = `url(${backgrounds[index].url})`;
        nav.className = '';
        footer.className = '';
        profileContainer.className = 'profile-main-container'; // reset profile container class

        nav.classList.add(backgrounds[index].theme);
        footer.classList.add(backgrounds[index].theme);
        profileContainer.classList.add(backgrounds[index].theme);
    }

    function changeBackground() {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        applyBackground(currentIndex);
        localStorage.setItem('currentBackgroundIndex', currentIndex);
    }

    // Preload background images
    const imageUrls = backgrounds.map(bg => bg.url);
    preloadImages(imageUrls);

    // Set initial background and theme
    const storedIndex = localStorage.getItem('currentBackgroundIndex');
    if (storedIndex !== null) {
        currentIndex = parseInt(storedIndex);
    }
    applyBackground(currentIndex);

    setInterval(changeBackground, 5000);

    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        if (targetId.startsWith('#')) {
            window.scrollTo({
                top: document.querySelector(targetId).offsetTop - 50,
                behavior: 'smooth'
            });
        } else {
            window.location.href = targetId;
        }
    }
});
