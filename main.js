const musicContainer = document.querySelector(".music-container");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progresscontainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const songList = document.querySelector(".list");
// const songList=document.querySelector('#song-select');
// Song titles array
const songs = [
  "Doja Cat - Get Into It (yuh)",
  "Doja Cat - Kiss Me More ft. SZA",
  "BTS - Butter",
  "Lil Nas X - Industry Baby ft. Jack Harlow",
  "Doja Cat - Need To Know",
  "Lisa - Money",
  "Doja Cat - Woman",
];

// Inserting the songs in a list
for (i in songs) {
  let liTag = `
  <li class="songs">${songs[i]}</li>
  `;
  songList.innerHTML += liTag;
}

const list = document.querySelectorAll(".songs");
// console.log(list);

// Keep track of the songs
let songIndex = 0;

// Making the list functional by adding the click event so that the user can navigate through songs by clicking on the list items
list.forEach((element) => {
  element.addEventListener("click", () => {
    for (let i in songs) {
      if (songs[i] == element.innerText) {
        songIndex=i;
        loadSong(songs[i]);
        playSong();
        console.log(songs[i]);
        // element.setAttribute('style','color:blue');
      }
    }
  });
});

// songList.addEventListener("click", (e) => {
//   console.log(e);
//   for (let i in songs) {
//     if (songs[i] == e.target.innerText) {
//       loadSong(songs[i]);
//       playSong();
//       console.log(songs[i]);
//     }
//   }
// });



// Select default value on reload
// function defaultselect(){
//     songList.value="Select a song";
// }

// Select a song
// songList.addEventListener('click',()=>{
//     for (let i in songs){
//         if(songs[i]==songList.value){
//             loadSong(songs[i]);
//             playSong();
//             console.log(songs[i]);
//         }

//     }
// })

// Initially load songs into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  list.forEach((element) => {
    if (element.innerText === song) {
      element.setAttribute("style", "background-color:purple");
    } else {
      element.removeAttribute("style", "background-color:purple");
    }
  });
}

function playSong() {
  // element.setAttribute('style','color:black');
  musicContainer.classList.add("play");
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
  // songList.value=songs[songIndex];
}

function pauseSong() {
  musicContainer.classList.remove("play");
  play.querySelector("i.fas").classList.remove("fa-pause");
  play.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  // songList.value=songs[songIndex];
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  // console.log(songIndex);
  // songList.value=songs[songIndex];
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  console.log(width);
  const clickX = e.offsetX;
  console.log(clickX);
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function playing() {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

// Event listeners
play.addEventListener("click", playing);

// Change song events
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);

progresscontainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

// Keyboard functionality
document.addEventListener("keydown", (e) => {
  // console.log(e);
  // if(e.keyCode===32){
  //   playing();
  // }
  switch (e.keyCode) {
    case 32:
      playing();
      break;
    case 39:
      nextSong();
      break;
    case 37:
      prevSong();
      break;
  }
});
