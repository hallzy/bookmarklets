javascript:(function() {
    let videos = document.getElementsByTagName('video');
    let val = 1;

    if (videos.length <= 0) {
        alert('No videos found on this page.');
        return;
    }

    if (videos.length !== 1) {
        let str = "There are " + videos.length + " Videos on this page. Which video to use?";
        do {
            val = parseInt(prompt(str), 10);
        } while (isNaN(val) || val < 1 || val > videos.length);
    }
    videos[val - 1].requestPictureInPicture();
}());
