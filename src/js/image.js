
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

exports.getVariations = function(h) {
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