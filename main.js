var frameContainer = document.getElementById('frame-container');
var frameSelectElt = document.getElementById('frame-select');
var frameDurationElt = document.getElementById('frameDuration');
var frames = [];

// Cube is like a sandwich.
// 8 layers on top of each other.
var numRows = 8;
var numCols = 8;
var numSlices = 8;

function addFrame() {
    console.log('adding frame');
    var sliceContainerElt = document.createElement('div');
    sliceContainerElt.class='slice-container';
    sliceContainerElt.style.display = 'none';
    frameContainer.appendChild(sliceContainerElt);
    var frame = {
        frameId: frames.length,
        frameDuration: 100, // Milliseconds
        slices: [],
        elt: sliceContainerElt
    };
    
    for (var i = 0; i < numSlices; i++) {
        var sliceElt = document.createElement('div');
        sliceElt.className = 'slice';
        var colorPickers = [];
        for (var x = 0; x < numRows; x++) {
            for (var y = 0; y < numCols; y++) {
                var colorPickerElt = document.createElement('input');
                var picker = new jscolor(colorPickerElt);
                colorPickerElt.className = 'color-box';
                colorPickerElt.jscolor = picker;
                picker.fromRGB(0, 0, 0);
                colorPickers.push(colorPickerElt);
                sliceElt.appendChild(colorPickerElt);
            }
        }
        frame.slices.push({
            colorPickers: colorPickers
        });
        sliceContainerElt.appendChild(sliceElt);
    }
    var frameOption = document.createElement('option');
    frameOption.innerHTML = frames.length.toString();
    frameOption.value = frames.length;
    frameSelectElt.appendChild(frameOption);
    frameSelectElt.value = frames.length;
    frames.push(frame);
    changeFrame(frames.length - 1);
}

function changeFrame() {
    var index = frameSelectElt.value;
    console.log(index);
    for (var i = 0; i < frames.length; i++) {
        frames[i].elt.style.display = 'none';
    }
    frames[index].elt.style.display = 'block';
}

function convertToOutput() {
    var output = '';
    for (var f = 0; f < frames.length; f++) {
        for (var s = 0; s < frames[0].slices.length; s++) {
            var slice = frames[0].slices[s];
            for (var x = 0; x < numRows; x++) { 
                for (var y = 0; y < numCols; y++) {
                    var colorPickerElt = slice.colorPickers[y * numRows + x];
                    var red = Math.floor(colorPickerElt.jscolor.rgb[0]);
                    var green = Math.floor(colorPickerElt.jscolor.rgb[1]);
                    var blue = Math.floor(colorPickerElt.jscolor.rgb[2]);
                    if (red == 0 && green == 0 && blue == 0)
                        continue;
                    var line = 'writeLED(' + (y * numRows + x) + ', ' + red + ', ' + green + ', ' + blue + ');';
                    output += line + '\n';
                }
            }
        }
    }
    var outputElt = document.getElementById('output');
    outputElt.value = output;
}

addFrame();