import "normalize.css/normalize.css";
import "font-awesome/css/font-awesome.css";

import "index/index.css";
import core from "core/core.js";

core.initializeWebApp();

import img from "images/landing.jpg";

const imgEl = document.getElementById("landing-img");
const btnContent1 = document.getElementById("btn-content1");
const btnContent2 = document.getElementById("btn-content2");
const btnContent3 = document.getElementById("btn-content3");
const btnContent4 = document.getElementById("btn-content4");

imgEl.src = img;

btnContent1.addEventListener("click", () => {
    //this import could be a normal js file import, loading a full graph o dependencies
    /* jshint ignore:start */
    import("../../assets/images/page-1.jpg").then(content1Img => {
        let content1 = document.getElementById("content1");
        content1.style.display = "block";
        content1.src = content1Img;
    });
    /* jshint ignore:end */
});

btnContent2.addEventListener("click", () => {
    //this import could be a normal js file import, loading a full graph o dependencies
    /* jshint ignore:start */
    import("../../assets/images/page-2.jpg").then(content2Img => {
        let content2 = document.getElementById("content2");
        content2.style.display = "block";
        content2.src = content2Img;
    });
    /* jshint ignore:end */
});

btnContent3.addEventListener("click", () => {
    //this import could be a normal js file import, loading a full graph o dependencies
    /* jshint ignore:start */
    import("../../assets/images/page-3.png").then(content3Img => {
        let content3 = document.getElementById("content3");
        content3.style.display = "block";
        content3.src = content3Img;
    });
    /* jshint ignore:end */
});

btnContent4.addEventListener("click", () => {
    /* jshint ignore:start */
    import("core/404.html").then(_404 => {
        console.log(_404);
        document.body.innerHTML = _404;
    });
    /* jshint ignore:end */
});

console.log("index.js loaded.");
