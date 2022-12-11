// ==UserScript==
// @name        Bad Apple - Advent of Code
// @namespace   Tomat
// @match       https://adventofcode.com/
// @grant       none
// @version     1.0.0
// @author      Tomat
// @description Bad Apple? At this time of year! At this time of day! In this part of the internet! Localized entirely within your Advent of Code?!?
// @grant       GM_xmlhttpRequest
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

const height = 25;

// Data
// frameCount: number
// fps: number
// frames: Frame[]
// Frame
// width: number
// height: number
// data: string
var data;
var currentFrame = 0;

GM_xmlhttpRequest({
  method: "GET",
  url: "https://raw.githubusercontent.com/steviegt6/if-it-exists/master/bad-apple/advent-of-code/data.json",
  responseType: "json",
  onload: (result) => {
    data = JSON.parse(result.responseText);
  }
});

const lines = [];
for (var i = 0; i < height; i++) lines.push(document.getElementsByClassName("calendar-day" + (i + 1)));
lines.reverse();

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
  console.log(lines);

  playFramesWithFps();
}

function playFramesWithFps() {
  const time = 1000 / data.fps;

  const frame = data.frames[currentFrame];
  const frameLines = frame.data.split

  for (var y = 0; y < frame.height; y++) {
    lines[y][0].innerText = "";

    for (var x = 0; x < frame.width; x++) lines[y][0].innerText += frame.data[y * frame.width + x];
    console.log(lines[y][0].innerText);
  }

  currentFrame++;
  setTimeout(playFramesWithFps, time);
}

function injectCss(css) {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerText = css;
  document.body.appendChild(style);
}
