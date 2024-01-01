let songIndex = 1;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let time = 0;

let songs = [
    {songName: "Warriyo", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"}
];

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Handle play/pause upon clicking 
masterPlay.addEventListener('click',function(){
    if (audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove("bi-play-circle");
        masterPlay.classList.add("bi-pause-circle");
        let element = document.getElementById(`${songIndex}`);
        element.classList.remove('bi-play-circle');
        element.classList.add('bi-pause-circle');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove("bi-pause-circle");
        masterPlay.classList.add("bi-play-circle");
        let element = document.getElementById(`${songIndex}`);
        element.classList.remove('bi-pause-circle');
        element.classList.add('bi-play-circle');
        gif.style.opacity = 0;
    }
})

//update progress bar as music plays
audioElement.addEventListener('timeupdate',function(){
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*1000);
    myProgressBar.value = progress;
    if (progress == 1000){
        audioElement.pause();
        masterPlay.classList.remove("bi-pause-circle");
        masterPlay.classList.add("bi-play-circle");
        gif.style.opacity = 0;
    }
})

//change the current time of audio when value of progress bar is changed 
myProgressBar.addEventListener("change",function(){
    audioElement.currentTime = myProgressBar.value * audioElement.duration/1000;
})

//play and pause button on each song functionality 
Array.from(document.getElementsByClassName("songItemPlay")).forEach((btn)=>{
    btn.addEventListener("click",(element)=>{
        if (element.target.classList.contains('bi-play-circle')){
            let t = (parseInt(element.target.id) == songIndex) ? time : 0
            makeAllPlays();
            songIndex = parseInt(element.target.id);
            document.getElementById("songName").innerText = songs[songIndex - 1].songName;
            element.target.classList.remove('bi-play-circle');
            element.target.classList.add('bi-pause-circle');
            audioElement.src = `songs/${songIndex}.mp3`;
            audioElement.currentTime = t;
            audioElement.play();
            masterPlay.classList.remove("bi-play-circle");
            masterPlay.classList.add("bi-pause-circle");
            gif.style.opacity = 1;
        }else{
            songIndex = parseInt(element.target.id);
            element.target.classList.remove('bi-pause-circle');
            element.target.classList.add('bi-play-circle');
            time = audioElement.currentTime; 
            audioElement.pause();
            masterPlay.classList.remove("bi-pause-circle");
            masterPlay.classList.add("bi-play-circle");
            gif.style.opacity = 0;
        }
        
    })
})

let makeAllPlays = function(){
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("bi-pause-circle");
        element.classList.add("bi-play-circle");
    })
}

//next button functionality
document.getElementById("previous").addEventListener('click',()=>{
    if (songIndex == 1){
        songIndex = 5;
    }else{
        songIndex --;
    }
    document.getElementById("songName").innerText = songs[songIndex - 1].songName;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currenTime = 0;
    audioElement.play();
    masterPlay.classList.remove("bi-play-circle");
    masterPlay.classList.add("bi-pause-circle");
    makeAllPause();
    let element = document.getElementById(`${songIndex}`);
    element.classList.remove('bi-play-circle');
    element.classList.add('bi-pause-circle');
    gif.style.opacity = 1;
})

//pause button functionality
document.getElementById("next").addEventListener('click',()=>{
    if (songIndex == 5){
        songIndex = 1;
    }else{
        songIndex ++;
    }

    document.getElementById("songName").innerText = songs[songIndex - 1].songName;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currenTime = 0;
    audioElement.play();
    masterPlay.classList.remove("bi-play-circle");
    masterPlay.classList.add("bi-pause-circle");
    makeAllPause();
    let element = document.getElementById(`${songIndex}`);
    element.classList.remove('bi-play-circle');
    element.classList.add('bi-pause-circle');
    gif.style.opacity = 1;
})

let makeAllPause = function(){
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("bi-pause-circle");
        element.classList.add("bi-play-circle");
    })
}
