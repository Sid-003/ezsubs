const createTrackElement = async (blob: Blob) => {
    let track = document.createElement('track');
    track.id = 'custom-subs';
    track.src = URL.createObjectURL(blob);
    track.kind = 'subtitles';
    track.default = true;
    return track;
}

export const addSubtitlesToPlayer = async (player: HTMLVideoElement, subtitles: Blob) => {
    let trackElem = await createTrackElement(subtitles);
    player.appendChild(trackElem);
    trackElem.track.mode = "hidden";
    return trackElem;
}

