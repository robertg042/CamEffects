const brightnessFilter = (subpixels, factor = 50) => {
  // scale factor variable from range: 0 - 100 to 0 - 2
  const factorScaled = factor * 2 / 100;
  for( let i = 0; i < subpixels.data.length; i++ ) {
    subpixels.data[i] = Math.floor(subpixels.data[i] * factorScaled);
  }
  return subpixels;
};

export default brightnessFilter;
