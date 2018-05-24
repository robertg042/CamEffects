export const boxBlurWeights = [1/9, 1/9, 1/9,
                               1/9, 1/9, 1/9,
                               1/9, 1/9, 1/9];

export const gaussianBlurWeights = [1/16, 2/16, 1/16,
                                    2/16,  4/16, 2/16,
                                    1/16, 2/16, 1/16];

export const sharpenWeights = [ 0,  -1,  0,
                               -1,   5, -1,
                                0,  -1,  0];

export const sepiaWeights = [0.393, 0.769, 0.189,
                             0.349, 0.686, 0.168,
                             0.272, 0.534, 0.131];

export const greyscaleWeights = [1/3, 1/3, 1/3,
                                 1/3, 1/3, 1/3,
                                 1/3, 1/3, 1/3];

export const negativeWeights = [-1,  0,  0,
                                 0, -1,  0,
                                 0,  0, -1];

export const edgeWeights = [0, 1, 0,
                            1, 4, 1,
                            0, 1, 0];

export const edge2Weights = [0, 1, 0,
                             1, 8, 1,
                             0, 1, 0];


export const embossWeights = [2, 1, 0,
                              1, 1, 1,
                              0, 1, 2];

export const sobelWeights = [1, 0, 1,
                             2, 0, 1,
                             1, 0, 1];

export const grainWeights = [ 1,  1,   1,
                               1, 0.7, -1,
                              -1, -1,  -1];
