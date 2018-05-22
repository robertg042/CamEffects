import './app.scss';

let width = 500, height = 0, streaming = false;

const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const filteredCanvas = document.getElementById("filteredCanvas");
const snapButton = document.getElementById("snap");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const duplicateStreamButton = document.getElementById("duplicate");
const photoDiv = document.getElementById("photos");
const filterSelect = document.getElementById("filter-select");

const startStream = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.log(err);
    });
};

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

duplicateStreamButton.addEventListener("click", event => {
  outputVideoOnCanvas();

  event.preventDefault();
}, false);

startButton.addEventListener("click", event => {
  startStream();

  event.preventDefault();
}, false);

stopButton.addEventListener("click", event => {
  stopStream();

  event.preventDefault();
}, false);

const snapPhoto = () => {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const imageDataUrl = canvas.toDataURL("image/png");
    const image = document.createElement("img");
    image.setAttribute("src", imageDataUrl);
    photoDiv.appendChild(image);
  }
};

const outputVideoOnCanvas = () => {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    let pixels = context.getImageData( 0, 0, width, height );

    let selectedFilter = filterSelect.value;
    switch (selectedFilter) {
      case "original":
        break;
      case "greyscale":
        pixels = greyscaleFilter(pixels);
        break;
      default:
    }
    context.putImageData( pixels, 0, 0 );

    requestAnimationFrame( outputVideoOnCanvas );
  }
};

const greyscaleFilter = (pixels) => {
  for( let i = 0; i < pixels.data.length; i += 4 ) {
    const average = (
      pixels.data[i] +
      pixels.data[i + 1] +
      pixels.data[i + 2]
    ) / 3;
    pixels.data[i] = average;
    pixels.data[i + 1] = average;
    pixels.data[i + 2] = average;
  }
  return pixels;
};

const stopStream = () => {
  video.srcObject = null;
};
