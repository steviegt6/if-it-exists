// ==UserScript==
// @name        Bad Apple - Advent of Code
// @namespace   Tomat
// @match       https://adventofcode.com/
// @grant       none
// @version     1.0.0
// @author      Tomat
// @description Bad Apple? At this time of year! At this time of day! In this part of the internet! Localized entirely within your Advent of Code?!?
// ==/UserScript==

const infoDiv = `
<div>
  <div class="quiet"><a href="https://github.com/steviegt6/if-it-exists">AOC in Bad Apple</a> is made possible by:</div>

  <div class="sponsor">
    <a href="https://githun.com/steviegt6">Tomat</a> - for creating this userscript.
    <br />
    <a href="http://was.tl/">Eric Wastl</a> - for creating Advent of Code.
  </div>
</div>
`;

appendPlayButton();
appendInfoToSidebar();

function appendPlayButton() {
  const nav = document.getElementsByTagName("nav")[1];
  const ul = nav.children[0];

  ul.innerHTML += `<li><a class="play-button" onclick="playBadApple()">[Play Bad Apple]</a></li>`

  const style = document.createElement("style");
  style.type = "text/css";
  style.innerText = ".play-button:hover { cursor: pointer; }";
  document.body.appendChild(style);
}

function appendInfoToSidebar() {
  const sidebar = document.getElementById("sidebar");

  sidebar.innerHTML += infoDiv;
}

function playBadApple() {
  alert("test 2");
}
