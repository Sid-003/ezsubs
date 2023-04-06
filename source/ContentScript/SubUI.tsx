import * as React from 'react';
import './styles.scss';

const SubUI: React.FC<{title?: string, track: HTMLTrackElement}> = ({title, track}) => {
  const [showSubs, setShowSubs] = React.useState(true);

  const [currentSubs, setCurrentSubs] = React.useState<string[]>([]);

  React.useEffect(() => {
    track.addEventListener('cuechange', (_) => {
      const cues = track.track.activeCues;
      
      if (cues) {
          setCurrentSubs([...cues].map((c) => (c as VTTCue).text));
      }
  })
  }, []);

  return (
    <div style={{
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
      pointerEvents: 'none'}}>
        { showSubs && 
          <div style={{alignSelf: 'flex-end', 
          marginBottom: '8%',
          pointerEvents: 'auto', 
         }}>
            {
              currentSubs.map((sub, i) => (<text key={i} id="subtext">{sub}</text>))
            }
          </div>
        }
      <div style={{width: 100, height: 40, position: 'absolute', right: 10, top: 10, pointerEvents: 'auto'}}>
        <button type="button" id="okbutton" onClick={() => {setShowSubs(!showSubs)}}>
          {showSubs? 'Hide' : 'Show'} Subs
        </button>
      </div>
    </div>
  );
};

export default SubUI;
