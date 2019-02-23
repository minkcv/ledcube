var frameContainer = document.getElementById('frame-container');
var frameSelectElt = document.getElementById('frame-select');
var frameDurationElt = document.getElementById('frameDuration');
var frames = [];

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
    // Cube is like a sandwich.
    // 8 layers on top of each other.
    var numSlices = 8;
    for (var i = 0; i < numSlices; i++) {
        var sliceElt = document.createElement('div');
        sliceElt.className = 'slice';
        var numRows = 8;
        var colorPickers = [];
        for (var x = 0; x < numRows; x++) {
            var numCols = 8;
            for (var y = 0; y < numCols; y++) {
                var colorPickerElt = document.createElement('input');
                var picker = new jscolor(colorPickerElt);
                colorPickerElt.className = 'color-box';
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

