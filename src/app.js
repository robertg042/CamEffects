import './app.scss';

let width = 500, height = 0, streaming = false;

const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const snapButton = document.getElementById("snap");

navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    console.log(err);
  });

video.addEventListener("canplay", event => {
  if(!streaming) {
    height = video.videoHeight / (video.videoWidth / width);
    video.setAttribute("width", width);
    video.setAttribute("height", height);
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    streaming = true
  }
}, false);

snapButton.addEventListener("click", event => {
  snapPhoto();

  event.preventDefault();
}, false);

const snapPhoto = () => {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
  }
};
