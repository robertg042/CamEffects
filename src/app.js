import './app.scss';

const video = document.getElementById("camera");

navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    console.log(err);
  });
