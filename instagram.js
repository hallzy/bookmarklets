javascript:(function() {
    const url = window.location.href;

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

    function next() {
        Array.from(document.getElementsByTagName('img'))
            .filter(el => el.src !== '')
            .filter(imgFilter)
            .map(el => el.src)
            .forEach(src => { imgsAndVids[src] = true });

        Array.from(document.querySelectorAll('video, video source'))
            .filter(el => el.src !== '')
            .map(el => el.src)
            .forEach(src => { imgsAndVids[src] = true });

        console.log(imgsAndVids);

        /* Only advance to the next image/video if this isn't a story */
        if (!isStory && nextImg.length >= 1) {
            nextImg[0].click();
            setTimeout(next, 500);
        } else {
            imgsAndVids = Object.keys(imgsAndVids);
            imgsAndVids.forEach(src => window.open(src, '_blank'));
        }
    }

    /* If this is a story, then don't advance to the next. Just get the current */
    if (isStory) {
        next();
        return;
    }

    var prevImg = document.getElementsByClassName('coreSpriteLeftChevron');
    var nextImg = document.getElementsByClassName('coreSpriteRightChevron');

    /* Only 1 image/video, or we are already at the beginning of the carousel */
    if (prevImg.length === 0) {
        /* We can just open it instantly if we are at the beginning. */
        next();
        return;
    }

    /* If we have previous images then go to the beginning of all the images */

    /* Move to first image in Carousel   */
    while (prevImg.length >= 1) {
        prevImg[0].click();
    }
    /* Wait a bit otherwise stuff can mess up */
    setTimeout(next, 500);
}());
