import * as React from 'react';
import ReactDOM from 'react-dom';

import SubUI from './SubUI';
import { browser } from 'webextension-polyfill-ts';
import { getSubtitle } from '../helpers/converter';

const createTrackElement = async () => {
    let track = document.createElement('track');
    track.id = 'custom-subs';
    track.src = URL.createObjectURL(await getSubtitle('https://www.kitsunekko.net/subtitles/japanese/Banana%20Fish/[Kamigami]%20Banana%20Fish%20-%2001%20[1080p%20x265%20Ma10p%20AAC].ass'));
    track.kind = 'subtitles';
    track.default = true;
    return track;
}

const execute = async () => {
    let videoPlayers = document.getElementsByTagName('video')

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