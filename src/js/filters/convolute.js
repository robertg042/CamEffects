const convolute = (subpixels, weights) => {
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side/2);
  const src = subpixels.data;
  const sw = subpixels.width;
  const sh = subpixels.height;
  const width = sw;
  const height = sh;
  const dst = subpixels.data.slice();
  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      const sy = y;
      const sx = x;
      const dstOff = (y*width+x)*4;
      let r=0, g=0, b=0, a=0;
      for (let cy=0; cy<side; cy++) {
        for (let cx=0; cx<side; cx++) {
          const scy = sy + cy - halfSide;
          const scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            const srcOff = (scy*sw+scx)*4;
            const wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a;
    }
  }
  subpixels.data.set(dst);

  return subpixels;
};

export default convolute;
