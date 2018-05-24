const canvas = document.getElementById("canvas");
const snapButton = document.getElementById("snap");
const photoDiv = document.getElementById("photos");

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

    const imageDataUrl = canvas.toDataURL("image/png");
    const image = document.createElement("img");
    image.setAttribute("src", imageDataUrl);
    photoDiv.appendChild(image);
  }
};
