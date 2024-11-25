if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    });
}

const oColorPane = document.getElementById("colored_pane");
const oDialog = document.getElementById("color_select");
const oColorPicker = document.getElementById("color_picker");
const oBrightnessPicker = document.getElementById("brightness_picker");
const oCloseButton = document.querySelector("#color_select button");

oColorPane.addEventListener("click", () => {
    oDialog.showModal();
});

oCloseButton.addEventListener("click", () => {
    oDialog.close();
});

oColorPicker.addEventListener("input", (event) => {
    body.style.setProperty('--background', event.target.value);
});

oBrightnessPicker.addEventListener("input", (event) => {
    body.style.setProperty('--opacityVal', event.target.value / 100.00);
})
