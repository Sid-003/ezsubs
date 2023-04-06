import * as React from 'react';
import {browser} from 'webextension-polyfill-ts';

import './styles.scss';
//;import { browser } from 'webextension-polyfill-ts';

// function openWebPage(url: string): Promise<Tabs.Tab> {
//   return browser.tabs.create({url});
// }

const searchVideo = async () => {
  try {
    await browser.tabs.insertCSS({file: 'css/subs.css', allFrames: true});
    await browser.tabs.executeScript({file: "js/subs.bundle.js", allFrames: true});
  }
  catch (e){
    console.log(e);
  }
  
};

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <h2>EzSubs</h2>
      <button
        id="popupbtn"
        type="button"
        onClick={searchVideo}
      >
        Add Subs
      </button>
    </section>
  );
};

export default Popup;
