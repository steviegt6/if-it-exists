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
.clickable-button:hover {
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
const width = 49;

var running = false;

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

appendButtons();
appendInfoToSidebar();

function appendButtons() {
  const nav = document.getElementsByTagName("nav")[1];
  const ul = nav.children[0];

  const playListItem = document.createElement("li");
  const playItem = document.createElement("a");
  playItem.classList.add("clickable-button");
  playItem.addEventListener("click", playBadApple, false);
  playItem.innerText = "[Play Bad Apple]";
  playListItem.appendChild(playItem);

  const stopListItem = document.createElement("li");
  const stopItem = document.createElement("a");
  stopItem.classList.add("clickable-button");
  stopItem.addEventListener("click", stopBadApple, false);
  stopItem.innerText = "[Stop Bad Apple]";
  stopListItem.appendChild(stopItem);

  ul.appendChild(playListItem);
  ul.appendChild(stopListItem);

  injectCss(playButtonCss);
}

function appendInfoToSidebar() {
  const sidebar = document.getElementById("sidebar");

  sidebar.innerHTML += infoDiv;
}

function playBadApple() {
  running = true;

  playFramesWithFps();
}

function stopBadApple() {
  running = false;
}

function playFramesWithFps() {
  if (!running) return;

  const time = 1000 / data.fps;
  const frame = data.frames[currentFrame];
  const frameData = frame.data;

  updateInfoLine();

  for (var y = 0; y < frame.height; y++) {
    const preserved = lines[y + 1][0].innerHTML.substring(width);
    lines[y + 1][0].innerHTML = "";

    for (var x = 0; x < frame.width; x++) lines[y + 1][0].innerHTML += frameData[(y * frame.width) + x];


    lines[y + 1][0].innerHTML += preserved;
  }

  currentFrame++;
  setTimeout(playFramesWithFps, time);
}

function updateInfoLine() {
  const preserved = lines[0][0].innerHTML.substring(width);
  var text = `Frame: ${paddedNumber(currentFrame, 4)}/${paddedNumber(data.frameCount, 4)}   FPS: ${paddedNumber(data.fps, 3)}              by Tomat`;
  lines[0][0].innerHTML = text + preserved;
}

function injectCss(css) {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerText = css;
  document.body.appendChild(style);
}

function paddedNumber(numStr, length) {
  if (typeof numStr === "number") numStr = String(numStr);
  length = length - numStr.length;
  if (length <= 0) return numStr;
  for (var i = 0; i < length; i++) numStr = "0" + numStr;
  return numStr;
}
