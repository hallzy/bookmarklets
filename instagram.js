javascript:(function() {
    const url = window.location.href;
    const igDownloader = "https://igram.io/";

    if (url.indexOf('instagram.com') === -1) {
        alert("This bookmarklet only works on instagram");
        return;
    }

    const isStory = url.indexOf('/stories/') !== -1;

    const imgSrcRegex = RegExp('/[a-z][0-9]+x[0-9]+/');

    var imgsAndVids = {};

    function imgFilter(img) {
        const use1 = img.style.objectFit === 'cover';
        const use2 = parseInt(img.sizes, 10) > 400;
        const use3 = img.sizes === '';

        return isStory ? use2 : use1 && (use2 || use3);
    }

    let hasVids = false;
    function next() {
        Array.from(document.querySelectorAll('div > div > div > img'))
            .filter(el => el.src !== '')
            .filter(imgFilter)
            .map(el => el.src)
            .forEach(src => { imgsAndVids[src] = true });

        const vids = Array.from(document.querySelectorAll('video, video source'))
            .filter(el => el.src !== '')
            .map(el => el.src)
        ;

        hasVids = hasVids || vids.length > 0;

        vids.forEach(src => { imgsAndVids[src] = true });

        console.log(imgsAndVids);

        const nextImg = document.querySelectorAll('article button[aria-label="Next"]');

        /* Only advance to the next image/video if this isn't a story */
        if (!isStory && nextImg.length >= 1) {
            nextImg[0].click();
            setTimeout(next, 500);
        } else {
            if (hasVids) {
                window.open(igDownloader, '_blank');
            }

            imgsAndVids = Object.keys(imgsAndVids);
            imgsAndVids.forEach(src => window.open(src, '_blank'));
        }
    }

    function getPrevImg() {
        return document.querySelectorAll('article button[aria-label="Go back"]');
    }

    function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

    /* If this is a story, then don't advance to the next. Just get the current */
    if (isStory) {
        next();
        return;
    }

    /* Only 1 image/video, or we are already at the beginning of the carousel */
    if (getPrevImg().length === 0) {
        /* We can just open it instantly if we are at the beginning. */
        next();
        return;
    }

    /* If we have previous images then go to the beginning of all the images */
    (
        async () => {
            /* Move to first image in Carousel   */
            while (getPrevImg().length >= 1) {
                getPrevImg()[0].click();
                await wait(500);
            }
            /* Wait a bit otherwise stuff can mess up */
            await wait(500);
            next();
        }
    )();
}());
