// JavaScript source code
    const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //time display
    const timeDisplay = document.querySelector(".time-display");
    //get length of outline
    const outlineLength = outline.getTotalLength();
    //duration
    const timeSelect = document.querySelectorAll(".time-select button");
    let fakeDuration = 600;

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
    fakeDuration % 60
    )}`;

    //choosing the sonunds
    sounds.forEach(sound => {
    sound.addEventListener("click", function () {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlay(song);
     });
    });



    //play sound
    play.addEventListener("click", function () {
        checkPlay(song);
    });

    replay.addEventListener("click", function () {
        restartSong(song);
    });

    const restartSong = song => {
        let currentTime = song.currentTime;
        song.currentTime = 0;
        console.log("song1")
    }

    //select sound
    timeSelect.forEach(option => {
        option.addEventListener("click", function () {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    //this function stops and plays the sound
    const checkPlay = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg'
            messages();
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
            fadeOutMessage();
        }
    };
//circle animation
    song.ontimeupdate = function () {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        //time animation
        timeDisplay.textContent = `${minutes}:${seconds}`;
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        if (currenTime >= fakeDuration) {
            song.pause();
            song.currenTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
};

function messages() {
    document.getElementById("textbox").className = "";
    document.getElementById("textbox").innerHTML = "Don't think about anything.";
    animate = setTimeout(function () {
        document.getElementById("textbox").classList.add("animatee");
    }, 300);
};

function fadeOutMessage() {
    clearTimeout(animate);
}



