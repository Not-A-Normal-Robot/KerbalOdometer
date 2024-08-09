"use strict";
const odometer = document.getElementById('odo');
const digitElements = document.getElementsByClassName('digit');
/** @type HTMLInputElement */
const input = document.getElementById('num');

function start() {
    input.addEventListener('input', update);
}

function update() {
    let num = Number(input.value);

    if(!isFinite(num)) {
        for(let i = 0; i < digitElements.length - 1; i++) {
            digitElements[i].style.setProperty('--digit', 6);
        }
        digitElements[digitElements.length - 1].style.setProperty('--digit', 9);

        odometer.classList.add('neg');
        return;
    }

    odometer.classList.toggle('neg', num < 0);

    num = Math.abs(num);

    let divisorLog1000 = 0;
    /** @type number[] */
    let digits = [];

    while(Math.log10(num) >= digitElements.length - 1) {
        num = Math.round(num / 1000);
        divisorLog1000++;
    }

    digits = num
        .toFixed(0)
        .padStart(digitElements.length - 1, '0')
        .split('')
        .map(Number);

    for(let i = 0; i < digitElements.length - 1; i++) {
        digitElements[i].style.setProperty('--digit', digits[i].toFixed(0));
    }

    digitElements[digitElements.length - 1].style.setProperty(
        '--digit',
        (divisorLog1000 % 10).toFixed(0)
    );
}

start();