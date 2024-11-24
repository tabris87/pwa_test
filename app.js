if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    });
}

const backgrounds = ['white', 'red', 'aqua', 'green', 'blue', 'deeppink', 'aquamarine', 'yellow', 'black'];
const brightnesses = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];
//swipe direction
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;
let beIndex = 0;
let brIndex = 0;

function checkDirection() {
    const xDifference = Math.abs(touchstartX - touchendX);
    const yDifference = Math.abs(touchstartY - touchendY);
    if (xDifference > yDifference && xDifference > 20 && yDifference > 20) {
        if (touchendX < touchstartX) {
            beIndex -= 1;
        }
        if (touchendX > touchstartX) {
            beIndex += 1;
        }
    }
    if (xDifference < yDifference && xDifference > 20 && yDifference > 20) {
        if (touchendY < touchstartY) {
            brIndex -= 1;
        }
        /* if (touchendY > touchstartY) {
            brIndex += 1;
        } */
    }
    if (xDifference < 20 && yDifference < 20) {
        console.log("tab");
    }
    let body = document.getElementById("body");
    if (beIndex > backgrounds.length - 1) {
        beIndex = 0;
    }
    if (beIndex < 0) {
        beIndex = backgrounds.length - 1;
    }

    if (brIndex > brightnesses.length - 1) {
        brIndex = 0;
    }
    if (brIndex < 0) {
        brIndex = brightnesses.length - 1;
    }
    body.style.setProperty('--background', backgrounds[beIndex]);
    body.style.setProperty('--opacityVal', brightnesses[brIndex]);
}

document.addEventListener("touchstart", e => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", e => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    checkDirection();
});
