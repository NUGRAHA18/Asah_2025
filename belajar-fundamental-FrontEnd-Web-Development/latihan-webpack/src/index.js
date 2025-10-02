import moment from "moment";
import "./style.css";

const app = document.getElementById("app");

const title = document.createElement("h1");
title.textContent = "Latihan Webpack 🚀";

const time = document.createElement("p");
time.textContent = `Waktu sekarang: ${moment().format("LLLL")}`;

app.appendChild(title);
app.appendChild(time);
