// ==UserScript==
// @name        Bad Apple - Advent of Code
// @namespace   Tomat
// @match       https://adventofcode.com/
// @grant       none
// @version     1.0.0
// @author      Tomat
// @description Bad Apple? At this time of year! At this time of day! In this part of the internet! Localized entirely within your Advent of Code?!?
// ==/UserScript==

const header = document.body.getElementsByTagName("header")[0];
const headerDivs = header.getElementsByTagName("div");

appendPlayButton();

function appendPlayButton() {
  const nav = document.getElementsByTagName("nav")[1];
  const ul = nav.children[0];

  ul.innerHTML += `<li><a class="play-button" onclick="alert('test')">[Play Bad Apple]</a></li>`

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerText = ".play-button:hover { cursor: pointer; }";
  document.body.appendChild(style);
}
