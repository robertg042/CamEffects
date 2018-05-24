import './app.scss';
import * as Filters from "./js/filters/";
import * as FilterTypes from "./js/filters/types";

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
const filterLevelContainer = document.getElementById("filter-level-container");
const filterLevelSlider = document.getElementById("filter-level-slider");
const levelValueOutput = document.getElementById("level-value");
levelValueOutput.innerHTML = filterLevelSlider.value;
const yearSpan = document.getElementById("year");
yearSpan.innerHTML = new Date().getFullYear().toString();

// Event listeners
startButton.addEventListener("click", event => {
  event.preventDefault();
  startStream();
}, false);

stopButton.addEventListener("click", event => {
  event.preventDefault();
  stopStream();
  startButton.disabled = false;
  stopButton.disabled = true;
}, false);

filterSelect.addEventListener("change", event => {
  if (event.target.value === FilterTypes.ORIGINAL) {
    filterLevelContainer.style.display = "none";
  } else {
    filterLevelContainer.style.display = "flex";

  }
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
        case FilterTypes.ORIGINAL:
          break;
        case FilterTypes.GREYSCALE:
          subpixels = Filters.greyscale(subpixels, factor);
          break;
        case FilterTypes.BRIGHTNESS:
          subpixels = Filters.brightness(subpixels, factor);
          break;
        case FilterTypes.BLACK_AND_WHITE:
          subpixels = Filters.blackAndWhite(subpixels, factor);
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
        .then(() => {
          outputVideoOnCanvas();
          startButton.disabled = true;
          stopButton.disabled = false;
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      alert(err);
    });
};

const stopStream = () => {
  canvas.style.display = "none";
  canvasPlaceholder.style.display = "block";
  playVideo = false;
  video.srcObject = null;
};
