javascript:(function() {
    var imgs = {};

    function hrefIsImage(el) {
        if (!el.href) {
            return false;
        }

        const extensions = [
            "jpg",
            "jpeg",
            "png",
            "webp",
        ];

        for (const ext of extensions) {
            if (el.href.endsWith(`.${ext}`)) {
                return true;
            }
        }
        return false;
    }

    Array.from(document.querySelectorAll('img'))
        .filter(el => el.src !== '')
        .filter(img => img.naturalWidth > 700 && img.naturalHeight > 700)
        .map(el => el.src)
        .forEach(src => { imgs[src] = true })
    ;

    Array.from(document.querySelectorAll('a'))
        .filter(hrefIsImage)
        .map(el => el.href)
        .forEach(src => { imgs[src] = true })
    ;

    const imgsArr = Object.keys(imgs);

    if (imgsArr.length > 15) {
        const resp = confirm(`This page will open ${imgsArr.length} images. Continue?`);
        if (!resp) {
            return;
        }
    }

    imgsArr.forEach(src => window.open(src, '_blank'));
}());
