import * as React from 'react';
import ReactDOM from 'react-dom';

import SubUI from './SubUI';
import { browser } from 'webextension-polyfill-ts';





const createTrackElement = async () => {
    let track = document.createElement('track');
    track.id = 'custom-subs';
    track.src = browser.runtime.getURL('assets/subtitles/banana.vtt');
    track.kind = 'subtitles';
    track.default = true;
    return track;
}

const execute = async () => {
    let videoPlayers = document.getElementsByTagName('video');

    for (const player of videoPlayers) {
        if (player) {
            let uiContainer = document.createElement("div");
            uiContainer.setAttribute('id', 'ui');
            player.parentElement?.appendChild(uiContainer);

            let trackElem = await createTrackElement();
            player.appendChild(trackElem);
            trackElem.track.mode = "hidden";
            
            ReactDOM.render(<SubUI title={document.URL.toString()} track={trackElem}/>, uiContainer);
        }
    }
}

execute();

export {};