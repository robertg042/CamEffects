const blackAndWhite = (subpixels, factor = 50) => {
  const factorScaled = factor * 255 / 100;
  for( let i = 0; i < subpixels.data.length; i += 4 ) {
    const average = (
      subpixels.data[i] +
      subpixels.data[i + 1] +
      subpixels.data[i + 2]
    ) / 3;

    const newValue = average < factorScaled ? 0 : 255;

    subpixels.data[i] = newValue;
    subpixels.data[i + 1] = newValue;
    subpixels.data[i + 2] = newValue;
  }
  return subpixels;
};

export default blackAndWhite;
