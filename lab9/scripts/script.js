function animate({timing, draw, duration}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction змінюється від 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // обчислюємо поточний стан анімації
        let progress = timing(timeFraction);

        draw(progress); // малюємо

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}


function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}

function makeEaseOut(timing) {
    return function (timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}

function linear(timeFraction) {
    return timeFraction;
}

function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}

function circ(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
}

function back(timeFraction, x=5) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

function elastic(timeFraction, x=5) {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}

function upsideParabolic(timeFraction) {
    return -Math.pow(2 * timeFraction - 1, 2) + 1;
}

function makeEaseInOut(timing) {
    return function (timeFraction) {
        if (timeFraction < .5)
            return timing(2 * timeFraction) / 2;
        else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
}