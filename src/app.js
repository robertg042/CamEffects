import './app.scss';
import greyscaleFilter from "./js/filters/greyscale";

// Global variables
let width = 500, height = 0, streaming = false;
let playVideo = true;

// DOM elements
const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const canvasPlaceholder = document.getElementById("canvas-placeholder");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
stopButton.disabled = true;
const filterSelect = document.getElementById("filter-select");
const filterLevelSlider = document.getElementById("filter-level-slider");
const levelValueOutput = document.getElementById("level-value");
levelValueOutput.innerHTML = filterLevelSlider.value;
const yearSpan = document.getElementById("year");
yearSpan.innerHTML = new Date().getFullYear().toString();

// Event listeners
startButton.addEventListener("click", event => {
  event.preventDefault();
  startStream();
  startButton.disabled = true;
  stopButton.disabled = false;
}, false);

stopButton.addEventListener("click", event => {
  event.preventDefault();
  stopStream();
  startButton.disabled = false;
  stopButton.disabled = true;
}, false);

filterLevelSlider.oninput = event => {
  levelValueOutput.innerHTML = event.target.value;
};

video.addEventListener("canplay", () => {
  if (!streaming) {
    height = video.videoHeight / (video.videoWidth / width);
    video.setAttribute("width", width);
    video.setAttribute("height", height);
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    streaming = true
  }
}, false);


const outputVideoOnCanvas = () => {
  if (playVideo) {
    canvasPlaceholder.style.display = "none";
    canvas.style.display = "block";
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      let subpixels = context.getImageData( 0, 0, width, height );
      const factor = filterLevelSlider.value;

      let selectedFilter = filterSelect.value;
      switch (selectedFilter) {
        case "original":
          break;
        case "greyscale":
          subpixels = greyscaleFilter(subpixels, factor);
          break;
        default:
      }
      context.putImageData( subpixels, 0, 0 );

      requestAnimationFrame(outputVideoOnCanvas);
    }
  }
};

const startStream = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
      video.srcObject = stream;
      playVideo = true;
      video.play()
        .then(() => outputVideoOnCanvas())
        .catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
    });
};

const stopStream = () => {
  canvas.style.display = "none";
  canvasPlaceholder.style.display = "block";
  playVideo = false;
  video.srcObject = null;
};


// const duplicateStreamButton = document.getElementById("duplicate");
// duplicateStreamButton.addEventListener("click", event => {
//   outputVideoOnCanvas();
//
//   event.preventDefault();
// }, false);
