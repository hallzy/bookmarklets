javascript:(function() {
    const wait = delay => new Promise(resolve => setTimeout(resolve, delay));

    function updateVideoIDs() {
        const videos = Array.from(document.querySelectorAll('ytd-playlist-video-renderer'))
            .forEach(videoEl => {
                const url = new URL(videoEl.querySelector('[href]').href);
                const videoID = `id__${url.searchParams.get('v')}`;

                videoEl.id = videoID;
            })
        ;
    }

    async function moveVideos(videos) {
        for (let video of videos) {
            console.log(video.duration, video.videoID);
            await moveToBottom(video);
        }
        alert('Sorting Finished');
    }

    async function moveToBottom(video) {
        const actionBtn = document.querySelector(`#${video.videoID} button`);

        actionBtn.click();
        await wait(500);

        const btn = Array.from(document.querySelectorAll('ytd-menu-service-item-renderer'))
            .filter(btn => btn.textContent.trim() === 'Move to bottom')
        ;

        if (btn.length !== 1) {
            alert("btn error");
        }
        btn[0].click();

        await wait(500);
        updateVideoIDs();
    }

    const videos = Array.from(document.querySelectorAll('ytd-playlist-video-renderer'))
        .map(videoEl => {
            const durationStr = videoEl.querySelector('span.ytd-thumbnail-overlay-time-status-renderer').textContent.trim();
            let duration = 0;

            const timeArr = durationStr.split(':');
            timeArr.forEach((timeNumStr, idx) => {
                const timeNum = parseInt(timeNumStr, 10);
                if (isNaN(timeNum)) {
                    return;
                }
                duration += Math.pow(60, timeArr.length - (idx + 1)) * timeNum;
            });

            const url = new URL(videoEl.querySelector('[href]').href);
            const videoID = `id__${url.searchParams.get('v')}`;

            videoEl.id = videoID;

            return { duration, videoID };
        })
        .sort((a, b) => a.duration - b.duration)
    ;

    moveVideos(videos);
})();
