var optsNormal = {
  angle: 0, // The span of the gauge arc
  lineWidth: 0.25, // The line thickness
  radiusScale: 0.8, // Relative radius
  pointer: {
    length: 0, // // Relative to gauge radius
    strokeWidth: 0, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6FADCF',   // Colors
  colorStop: '#b2c831',    // just experiment with them
  strokeColor: '#222',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support

};

var optsAmbientTemp = {
    angle: 50, // The span of the gauge arc
    lineWidth: 0.35, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0, // // Relative to gauge radius
      strokeWidth: 0, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#b2c831',    // just experiment with them
    strokeColor: '#222',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    percentColors: [[0.0, "#b2c831" ], [0.49, "#b2c831"], [0.5, "#c84731 "], [1.0, "#c84731"]],

  };


  var optsUsage = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.25, // The line thickness
    radiusScale: 0.8, // Relative radius
    pointer: {
      length: 0, // // Relative to gauge radius
      strokeWidth: 0, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#b2c831',    // just experiment with them
    strokeColor: '#222',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    percentColors: [[0.0, "#c84731 "], [0.5, "#c84731"], [0.51, "#b2c831" ], [1.0, "#b2c831"]],

  };
