let globalVolume = 0.5;
document.addEventListener('volumechange', () => {
    const video = document.querySelector('video');
    if (video && video.volume !== globalVolume) {
        video.volume = globalVolume;
    }
}, true);

document.addEventListener('keydown', (e) => {
    const tagName = document.activeElement.tagName;
    if (tagName === 'INPUT' || tagName === 'TEXTAREA') return;

    const video = document.querySelector('video');
    if (!video) return;

    switch(e.key) {
        case 'ArrowRight':
            video.currentTime += 5;
            break;

        case 'ArrowLeft':
            video.currentTime = Math.max(0, video.currentTime - 5);
            break;

        case 'ArrowUp':
            globalVolume = Math.min(1, globalVolume + 0.1);
            video.volume = globalVolume;
            break;
            
        case 'ArrowDown':
            globalVolume = Math.max(0, globalVolume - 0.1);
            video.volume = globalVolume;
            break;

        default:
            return;
    }
    e.stopImmediatePropagation();
    e.preventDefault();
}, true);

function waitForVideo(callback) {
    const video = document.querySelector('video');
    if (video) { callback(video); return; }

    const observer = new MutationObserver(() => {
        const video = document.querySelector('video');
        if (video) {
            callback(video);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

function applyVolume(video) {
    video.volume = globalVolume;
}

waitForVideo(applyVolume);
document.addEventListener('yt-navigate-finish', () => waitForVideo(applyVolume));