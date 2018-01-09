import 'bootstrap-italia/dist/css/bootstrap-italia-0.0.1.css'
import 'bootstrap-italia/dist/js/bootstrap-italia-0.0.1.js'
import '../sass/main.sass'
import './scroll.js'

const Vibrant = require('node-vibrant');
const doT = require('dot');

var getHue = require('./image.js').getHue;
var getVariations = require('./image.js').getVariations;

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var context = canvas.getContext('2d');
var padding = 0;
const initialValue = 210;
var data;

init();

function init() {
    data = getVariations(initialValue);
    document.getElementById("colour-range").value = initialValue;
    document.getElementById("color-value").innerHTML = initialValue;
    document.getElementById('content').innerHTML = doT.template(document.getElementById('colours-template').text)(data);
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





document.getElementById("colour-range").addEventListener('input', meow);
document.getElementById("colour-range").addEventListener('change', meow);
function meow(e){
    var val = e.target.value;
    data = getVariations(val);
    document.getElementById('content').innerHTML = doT.template(document.getElementById('colours-template').text)(data);
    document.getElementById('color-value').innerHTML = val;
    e.target.value = val;
};
