javascript:(function() {
    var vids = {};

    function searchDocument(doc) {
        if (!doc) {
            return;
        }

        Array.from(doc.querySelectorAll('video, video source'))
            .filter(el => el.src != "")
            .map(el => el.src)
            .forEach(src => { vids[src] = true })
        ;

        doc.querySelectorAll('iframe')
            .forEach(iframe => searchDocument(iframe.contentDocument))
    }

    searchDocument(document);

    Object.keys(vids).forEach(src => window.open(src, '_blank'));
}());
