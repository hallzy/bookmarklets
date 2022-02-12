javascript:(function() {
    const doRemoval = () => {
        document.querySelectorAll('article > div:first-child > div > div > div').forEach(el => {
            const svgClip = el.querySelector('svg[aria-label="clip"i]');
            const svgVid  = el.querySelector('svg[aria-label="video"i]');
            if (svgClip || svgVid) {
                el.style.opacity = '0.1';
            }
        });
    };

    doRemoval();
    setInterval(doRemoval, 500);
})()
