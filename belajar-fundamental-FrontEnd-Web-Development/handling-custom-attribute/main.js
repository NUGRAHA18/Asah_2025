import "./paragraph.js";
const paragraphButton = document.querySelector("my-paragraph");
const changeColorButton = document.getElementById("changeColor");
const changeSizeButton = document.getElementById("changeSize");

changeColorButton.onclick = (event) => {
  console.log("button clicked", event.type);
  paragraphButton.setAttribute("color", "blue");
};

changeSizeButton.onclick = (event) => {
  console.log("button clicked", event.type);
  paragraphButton.setAttribute("size", "24");
};
