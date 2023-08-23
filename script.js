console.log("I am connected");
const playList = [
  "Songs/Em Beihold - Numb Little Bug.mp3",
  "Songs/JAANI TERA NAA (MUMMY NU PASAND)  SUNANDA SHARMA  JAANI  New Punjabi Songs 2017  MAD 4 MUSIC.mp3",
  "Songs/Peg 90 Ml (Full Song) Deep Fateh  Mista Baaz  Latest Punjabi Songs 2020.mp3",
  "Songs/Qismat Badalti Dekhi - Ammy Virk (Full Video)  Sargun Mehta  Jaani  B Praak  Punjabi Song 2023.mp3",
];
const fullLength = document.querySelector(".fullLength");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const play = document.querySelector(".play");
const shuffle = document.querySelector(".shuffle");
let artist = document.querySelector(".artist");
const currentSong = document.querySelector(".song");
let pause = false;
const progressBar = document.querySelector("#progressBar");
let loop = document.querySelector(".loop");
let currentPlaying = 0;
let loaded = false;

play.addEventListener("click", () => {
  if (pause == false) {
    pause = true;
    if (loaded == false) {
      currentSong.src = playList[currentPlaying];
      currentSong.load();
      currentSong.addEventListener("loadedmetadata", () => {
        loaded = true;
        currentSong.play();
        changeLength(currentSong);
      });
    } else {
      currentSong.play();
    }
  } else {
    pause = false;
    currentSong.pause();
  }
});

const changeLength = (song) => {
  let songDuration = formatTime(song.duration);
  fullLength.innerHTML = songDuration;
};
const music = document.querySelector(".song");

const nextButton = () => {
  if (currentPlaying >= playList.length - 1) {
    return;
  }
  currentPlaying = currentPlaying + 1;

  music.src = `${playList[currentPlaying]}`;
  changeLength(music);
};

const handleLoop = (song) => {
  if (song.ended && currentPlaying < playList.length - 1) {
    currentPlaying = currentPlaying + 1;
    music.src = playList[currentPlaying];
  }
};

const previousButton = () => {
  if (currentPlaying <= 0) {
    return;
  }
  const music = document.querySelector(".song");
  currentPlaying = currentPlaying - 1;
  music.src = `${playList[currentPlaying]}`;
  changeLength(music);
};

// const updateTime = (song) => {
//   const currentPlayingTime = document.querySelector(".currentPlayingTime");
//   console.log(song.currentTime);
//   currentPlayingTime.innerHTML = song.currentTime;
//   updateProgressBar(song, currentPlayingTime);
//   console.log(progressBar.value);
// };

// const updateProgressBar = (song, currentPlayingTime) => {
//   progressBar.max = song.duration;
//   progressBar.value = currentPlayingTime;
// };

const updateTime = (song) => {
  const currentPlayingTime = document.querySelector(".currentPlayingTime");
  currentPlayingTime.innerHTML = formatTime(song.currentTime);
  updateProgressBar(song);
  handleLoop(song);
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const updateProgressBar = (song) => {
  progressBar.max = song.duration;
  progressBar.value = song.currentTime;
};

progressBar.addEventListener("input", () => {
  seekSong(currentSong);
});

const seekSong = (song) => {
  const seekTime = progressBar.value;
  song.currentTime = seekTime;
};

next.addEventListener("click", nextButton);
previous.addEventListener("click", previousButton);
