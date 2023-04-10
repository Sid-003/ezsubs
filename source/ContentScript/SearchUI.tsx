import * as React from 'react'

import './styles.scss';
import { getSubtitle, getSubtitleFromFile } from '../helpers/converter';

const SearchUI: React.FC<{onSubtitleFound: (subs: Blob) => void}> = ({onSubtitleFound}) => {

    const [url, setUrl] = React.useState<string | null>(null);
    const [searching, setSearching] = React.useState(false);
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setSearching(true);
        if (url) {
            try {
                let subtitle = await getSubtitle(url);
                console.log(subtitle);
                onSubtitleFound(subtitle);
            }
            catch(e) {
                console.log(e);
                setSearching(false);
            }
        }
    }

    const stopProp = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setUrl(e.target.value);
    };

    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setSearching(true);
        if (e.target.files) {
            let file = e.target.files[0];
            let subtitle = await getSubtitleFromFile(file);
            onSubtitleFound(subtitle);
            return;
        }
        
        setSearching(false);
    }
    
    return (
    <React.Fragment>
        <div className="flex items-center self-start w-full px-10" style={{pointerEvents: 'auto'}}>   
                <label htmlFor='simple=search' className="sr-only">Search</label>
                <div className="relative w-full">
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter subtitle url: .ass, .srt. .vtt" required
                        onChange={handleChange}
                        onClick={stopProp}
                    />
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-purple-700 rounded-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                    onClick={handleClick}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    <span className="sr-only">Url</span>
                </button>     
        </div>
        <div className="absolute flex items-center justify-center self-center w-3/4" style={{pointerEvents: 'auto'}} onClick={stopProp}>
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">.ass, .srt, .vtt</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onClick={stopProp} onChange={handleFileSelected}/>
            </label>
        </div> 
        {
            searching &&
            <div className="absolute" role="status">
                <svg aria-hidden="true" className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        }
    </React.Fragment>
    );
};

export default SearchUI;
