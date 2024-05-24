import moment from "moment";

const fileformat = (url='')=>{
    
    const fileExt = url.split('.').pop();
    if(fileExt==='mp4' || fileExt==='webm'|| fileExt==='ogg')
        return 'video';
    else if(fileExt==='mp3' || fileExt==='wav'|| fileExt==='flac')
        return 'audio';
    else if(fileExt==='jpg' || fileExt==='jpeg'|| fileExt==='png'|| fileExt==='gif')
        return 'image';
    
    
    return 'file';
}

const transformimage=(url='',width=100)=>url;


const getLastPath = ()=>{
    const currenDate= moment();

    const last7days=[];

    for(let i=0;i<7;i++){
        const dayDate =currenDate.clone().subtract(i, 'days');
        const dayName=dayDate.format('dddd');

        last7days.unshift(dayName)
    }
    return last7days;
    
}

export {fileformat,transformimage,getLastPath};


