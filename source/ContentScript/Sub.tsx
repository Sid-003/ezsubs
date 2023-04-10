import * as React from 'react';
import ReactDOM from 'react-dom';

import SubUI from './SubUI';
import { browser } from 'webextension-polyfill-ts';
import { getSubtitle } from '../helpers/converter';


// const findSubtitle = async () => {
//     // just target 9anime for now
    
//     let episode = document.getElementById('episodes-page-1')?.dataset.page
//     let nameElem  = document.getElementsByClassName('film-name dynamic-name');

//     if (nameElem.length > 0) {
//         let anime = 
//     }
// }
 

const execute = async () => {
    let videoPlayers = document.getElementsByTagName('video')

    for (const player of videoPlayers) {
        if (player) {
            let uiContainer = document.createElement("div");
            uiContainer.setAttribute('id', 'ui');

            player.parentElement?.appendChild(uiContainer);

            ReactDOM.render(<SubUI title={document.URL.toString()} player={player}/>, uiContainer);
        }
    }
}

execute();

export {};