var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var padding = 0;
var width = 400;

function getHue(red, green, blue) {

    var min = Math.min(Math.min(red, green), blue);
    var max = Math.max(Math.max(red, green), blue);

    var hue = 0;
    if (max == red) {
        hue = (green - blue) / (max - min);

    } else if (max == green) {
        hue = 2 + (blue - red) / (max - min);

    } else {
        hue = 4 + (red - green) / (max - min);
    }

    hue = hue * 60;
    if (hue < 0) hue = hue + 360;

    return Math.round(hue);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - rect.left),
        y: Math.round(evt.clientY - rect.top)
    };
}
function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = width;
            canvas.height = width * img.height / img.width;
            ctx.drawImage(img,0,0, canvas.width, canvas.height);

            canvas.addEventListener('click', function(evt) {
                var mousePos = getMousePos(canvas, evt);
                var color = undefined;

                if(mousePos.x > padding && mousePos.x < padding + canvas.width && mousePos.y > padding && mousePos.y < padding + canvas.height) {

                    // color picker image is 256x256 and is offset by 10px
                    // from top and bottom
                    var imageData = ctx.getImageData(padding, padding, canvas.width, canvas.height);
                    var data = imageData.data;
                    var x = mousePos.x - padding;
                    var y = mousePos.y - padding;
                    var red = data[((canvas.width * y) + x) * 4];
                    var green = data[((canvas.width * y) + x) * 4 + 1];
                    var blue = data[((canvas.width * y) + x) * 4 + 2];
                    var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
                    console.log(color);
                    var hue = getHue(red, green, blue);

                    showVal(hue);
                }
            }, false);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}