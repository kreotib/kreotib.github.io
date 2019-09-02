var video = document.getElementById("video");

var btnStart = document.getElementById("videoBtnStart");
var btnStop = document.getElementById("videoBtnStop");
function videoFunction() {
  if (video.paused) {
    video.play();
    btnStart.classList.add('activeBtn');
    btnStop.classList.add('activeBtn');
  } else {
    video.pause();
    btnStop.classList.remove('activeBtn');
    btnStart.classList.remove('activeBtn');
  }
}