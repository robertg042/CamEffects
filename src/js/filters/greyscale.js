const greyscaleFilter = (subpixels, factor = 100) => {
  console.log(subpixels);
  console.log(subpixels.data);
  for( let i = 0; i < subpixels.data.length; i += 4 ) {
    const average = (
      subpixels.data[i] +
      subpixels.data[i + 1] +
      subpixels.data[i + 2]
    ) / 3;

    const newValues = [];
    newValues.push((subpixels.data[i] - average) * (100 - factor) / 100 + average);
    newValues.push((subpixels.data[i + 1] - average) * (100 - factor) / 100 + average);
    newValues.push((subpixels.data[i + 2] - average) * (100 - factor) / 100 + average);
    subpixels.data[i] = newValues[0];
    subpixels.data[i + 1] = newValues[1];
    subpixels.data[i + 2] = newValues[2];
  }
  return subpixels;
};

export default greyscaleFilter;
