let globalVolume = 0.3;

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
            video.volume = Math.min(1, video.volume + 0.1);
            globalVolume = video.volume;
            break;

        case 'ArrowDown':
            video.volume = Math.max(0, video.volume - 0.1);
            globalVolume = video.volume;
            break;

        default:
            return;
    }
    e.stopImmediatePropagation();
    e.preventDefault();
}, true)

document.addEventListener('yt-navigate-finish', () => {
    const observer = new MutationObserver(() => {
        const video = document.querySelector('video');
        if (video) {
            video.volume = globalVolume;
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})