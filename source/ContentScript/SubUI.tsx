import * as React from 'react';
import './styles.scss';
import SearchUI from './SearchUI';
import { addSubtitlesToPlayer } from '../helpers/track';

const SubUI: React.FC<{title?: string, player: HTMLVideoElement}> = ({title, player}) => {


  const [showSubs, setShowSubs] = React.useState(true);

  const [loaded, setLoaded] = React.useState(false);

  const [currentSubs, setCurrentSubs] = React.useState<string[]>([]);

  const addSubtitles = async (subs: Blob) => {
    let track = await addSubtitlesToPlayer(player, subs);

    track.addEventListener('cuechange', (_) => {
      const cues = track.track.activeCues;
      
      if (cues) {
          setCurrentSubs([...cues].map((c) => (c as VTTCue).text));
      }
      }
    );
    setLoaded(true);
  }

  return (
    <div id='mainContainer' style={styles.uiContainer}>
      {loaded ?
      (
        <React.Fragment>
        { showSubs && 
          <div style={styles.subtitleContainer}>
            {
              currentSubs.map((sub, i) => (<span><text key={i} id="subtext">{sub}</text></span>))
            }
          </div>
        }
        <div style={styles.buttonContainer}>
          <button type="button" id="okbutton" onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
            {
              e.stopPropagation();
              setShowSubs(!showSubs);
              }}>
            {showSubs? 'Hide' : 'Show'} Subs
          </button>
        </div>
      </React.Fragment>
      ) :
      (<SearchUI onSubtitleFound={async (subtitle: Blob) => 
        {
          await addSubtitles(subtitle);
         }}>

         </SearchUI>)
      }
    </div>
  );
};

const styles: {[key: string]: React.CSSProperties} = {
  uiContainer: {
    padding: 10, 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0,
    right: 0, 
    alignItems: 'center', 
    justifyContent: 'center',
    display: 'flex',
    zIndex: 1,
    pointerEvents: 'none',
  },
  subtitleContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column', 
    marginBottom: '8%',
    pointerEvents: 'auto', 
  },
  buttonContainer: {
    width: 100, 
    height: 40, 
    position: 'absolute', 
    right: 10, 
    top: 10, 
    pointerEvents: 'auto'
  },
  text: {
    color: 'white',
    fontSize: 30
  }
};

export default SubUI;
