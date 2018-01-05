import '../sass/main.sass'

var Vibrant = require('node-vibrant');
var doT = require("dot");

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var context = canvas.getContext('2d');
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
            canvas.width = 300;
            canvas.height = 300 * img.height / img.width;
            context.drawImage(img, 0, 0, canvas.width, canvas.height);


            var imageData = context.getImageData(0, 0, img.width, img.height);

            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            Vibrant.from(image).getPalette().then(function(palette) {
                document.getElementById('vibrant').innerHTML = doT.template(document.getElementById('vibrant-template').text)(palette);
            });
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}





/* CT */
var initialValue = 210
var data = generateData(initialValue);
document.getElementById("colour--range").value = initialValue
document.getElementById("x").innerHTML = initialValue


function HSVtoRGB(_h, _s, _v) {
    var h = _h/360;
    var s = _s/100;
    var v = _v/100;
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        rgb: {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        },
        hsv: {
            h:_h,
            s:_s,
            v:_v
        }
    };
}

function generateData(h) {
    return {
        tintArray:[
            HSVtoRGB(h, 100, 80),
            HSVtoRGB(h, 5, 99),
            HSVtoRGB(h, 15, 96),
            HSVtoRGB(h, 30, 93),
            HSVtoRGB(h, 45, 90),
            HSVtoRGB(h, 60, 87),
            HSVtoRGB(h, 75, 84),
            HSVtoRGB(h, 100, 80),
            HSVtoRGB(h, 100, 70),
            HSVtoRGB(h, 100, 60),
            HSVtoRGB(h, 100, 50),
            HSVtoRGB(h, 100, 40),
            HSVtoRGB(h, 100, 30),
            HSVtoRGB(h, 100, 20)
        ],
        toneArray: [
            HSVtoRGB(h, 100, 80),
            HSVtoRGB(h, 90, 70),
            HSVtoRGB(h, 80, 60),
            HSVtoRGB(h, 70, 50),
            HSVtoRGB(h, 60, 40),
            HSVtoRGB(h, 50, 30),
            HSVtoRGB(h, 40, 20)
        ],
        lightnessArray: [
            HSVtoRGB(h, 10, 100),
            HSVtoRGB(h, 20, 100),
            HSVtoRGB(h, 30, 100),
            HSVtoRGB(h, 40, 100),
            HSVtoRGB(h, 50, 100),
            HSVtoRGB(h, 60, 100),
            HSVtoRGB(h, 70, 100),
            HSVtoRGB(h, 80, 100),
            HSVtoRGB(h, 90, 100),
            HSVtoRGB(h, 100, 100),
            HSVtoRGB(h, 100, 90),
            HSVtoRGB(h, 100, 80)
        ]
    }
}

function showVal(val){
    data = generateData(val);
    document.getElementById('content').innerHTML = doT.template(document.getElementById('colours-template').text)(data);
    document.getElementById('x').innerHTML = val
    document.getElementById("colour--range").value = val
}

document.getElementById('content').innerHTML = doT.template(document.getElementById('colours-template').text)(data);
