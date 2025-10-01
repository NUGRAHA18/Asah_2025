import "./my-paragraph.js";
const paragraphs = document.querySelectorAll("my-paragraph");
const changeColorButton = document.querySelector("#changeColor");
const changeSizeButton = document.querySelector("#changeSize");

changeColorButton.onclick = () => {
  paragraphs.forEach((el) => el.setAttribute("size", "24"));
};

changeSizeButton.onclick = () => {
  paragraphs.forEach((el) => el.setAttribute("color", "lightblue"));
};
