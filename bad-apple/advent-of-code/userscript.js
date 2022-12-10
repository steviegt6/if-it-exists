// ==UserScript==
// @name        Bad Apple - Advent of Code
// @namespace   Tomat
// @match       https://adventofcode.com/
// @grant       none
// @version     1.0.0
// @author      Tomat
// @description Bad Apple? At this time of year! At this time of day! In this part of the internet! Localized entirely within your Advent of Code?!?
// ==/UserScript==

const playButtonCss = `
.play-button:hover {
  cursor: pointer;
}
`;

const infoDiv = `
<div>
  <div class="quiet"><a href="https://github.com/steviegt6/if-it-exists">AOC in Bad Apple</a> is made possible by:</div>

  <div class="sponsor">
    <a href="https://githun.com/steviegt6">Tomat</a> - for creating this userscript.
    <br />
    <a href="http://was.tl/">Eric Wastl</a> - for creating Advent of Code.
    <br />
    <a href="https://www.nicovideo.jp/user/10731211">あにら</a> - for creating the <a href="https://www.nicovideo.jp/watch/sm8628149">original PV</a>.
  </div>
</div>
`;

appendPlayButton();
appendInfoToSidebar();

function appendPlayButton() {
  const nav = document.getElementsByTagName("nav")[1];
  const ul = nav.children[0];

  const listItem = document.createElement("li");
  const linkItem = document.createElement("a");
  linkItem.classList.add("play-button");
  linkItem.addEventListener("click", playBadApple, false);
  linkItem.innerText = "[Play Bad Apple]";

  listItem.appendChild(linkItem);
  ul.appendChild(listItem);

  injectCss(playButtonCss);
}

function appendInfoToSidebar() {
  const sidebar = document.getElementById("sidebar");

  sidebar.innerHTML += infoDiv;
}

function playBadApple() {
  alert("test 2");
}

function injectCss(css) {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerText = css;
  document.body.appendChild(style);
}
