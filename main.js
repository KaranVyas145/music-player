const musicContainer=document.querySelector('.music-container');
const play=document.querySelector('#play');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const audio=document.querySelector('#audio');
const progress=document.querySelector('.progress');
const progresscontainer=document.querySelector('.progress-container');
const title=document.querySelector('#title');
const cover=document.querySelector('#cover');
const songList=document.querySelector('#song-select');

// Song title 
const songs= ['Doja Cat - Get Into It (yuh)','Doja Cat - Kiss Me More ft. SZA','Doja Cat - Need To Know','Doja Cat - Woman'];

// Keep track of the songs 
let songIndex=0;

// Select default value on reload
function defaultselect(){
    songList.value="Select a song";
}

// Select a song 
songList.addEventListener('click',()=>{
    for (let i in songs){
        if(songs[i]==songList.value){
            loadSong(songs[i]);
            playSong();
            console.log(songs[i]);
        }
        
    }
})

// Initially load songs into DOM 
loadSong(songs[songIndex]);

// Update song details 
function loadSong(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
    // songList.value=songs[songIndex];
}

function pauseSong(){
    musicContainer.classList.remove('play');
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    songList.value=songs[songIndex];
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    songList.value=songs[songIndex];
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e){
    const {duration,currentTime}=e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width= `${progressPercent}%`
}

function setProgress(e){
    const width=this.clientWidth;
    console.log(width);
    const clickX=e.offsetX;
    console.log(clickX);
    const duration=audio.duration;

    audio.currentTime=(clickX/width)*duration;
}

// Event listeners 
play.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})


// Change song events 
prev.addEventListener('click',prevSong);
next.addEventListener('click',nextSong);

audio.addEventListener('timeupdate',updateProgress);

progresscontainer.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);