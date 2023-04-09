interface Timestamp {
    hour: number,
    minute: number,
    second: number
}


interface Subtitle {
    start: Timestamp,
    end: Timestamp,
    text: string
}

const padInteger = (n: number, d: number) => n.toLocaleString('en-US', {minimumIntegerDigits: d});
const padDecimal = (n: number, d: number) => n.toLocaleString('en-US', {minimumFractionDigits: d});

const formatTimestamp = (ts: Timestamp) => `${padInteger(ts.hour, 2)}:${padInteger(ts.minute, 2)}:${padDecimal(ts.second, 3)}`;

const convertToVtt = (subs: Subtitle[]) => {
    const res = [];

    res.push('WEBVTT\n')

    for (const sub of subs) {
        res.push(`${formatTimestamp(sub.start)} --> ${formatTimestamp(sub.end)}`);
        res.push(sub.text);
        res.push('\n');
    }

    return res.join('\n');
}

const createTimestamp = (str: string): Timestamp => {
    let ts = str.split(':');
    return {hour: parseInt(ts[0]), minute: parseInt(ts[1]), second: parseFloat(ts[2])};
};

const convertAss = (data: string) => {

    let dialouges: Subtitle[] = data.split('\n').filter(x => x.startsWith("Dialogue"))
    .map(x => 
    {
        let dialogue = x.split(',');


        let start: Timestamp = createTimestamp(dialogue[1]);
        let end: Timestamp = createTimestamp(dialogue[2]);

        let text = dialogue[dialogue.length - 1];
        
        return {
            start: start,
            end: end,
            text: text.substring(text.lastIndexOf('}') + 1).trim()
        };
    });

    return new Blob([convertToVtt(dialouges)], {type: 'plain/text'});
}

const convertSrt = (data: string) => {
    return new Blob([], {type: 'plain/text'});
}

export const getSubtitle = async (url: string) => {
    let ext = url.split('.').pop();
    let data =  await (await fetch(url)).text();
    
    switch(ext) {
        case 'ass':
            return convertAss(data);
        case 'srt':
            return convertSrt(data);
        default:
            throw new Error('fuck you');
    }
}