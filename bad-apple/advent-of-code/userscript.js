// ==UserScript==
// @name        Bad Apple - Advent of Code
// @namespace   Tomat
// @match       https://adventofcode.com/*
// @grant       none
// @version     1.0.0
// @author      Tomat
// @description Bad Apple? At this time of year! At this time of day! In this part of the internet! Localized entirely within your Advent of Code?!?
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// width of 14
const titles = [
  `&nbsp;&nbsp;&nbsp;<span class="title-event-wrap">bad(</span><a href="https://github.com/steviegt6/if-it-exists">apple</a><span class="title-event-wrap">);</span>`
];

const playButtonCss = `
.clickable-button:hover {
  cursor: pointer;
}
`;

function titleHeader(title) { return `<h1 class="title-event">${title}<span class="title-event-wrap"></span></h1>`; }

const navElement = `
<nav>
  <ul>
    <li><a class="clickable-button" id="play-bad-apple">[Play Bad Apple]</a></li>
    <li><a class="clickable-button" id="stop-bad-apple">[Stop Bad Apple]</a></li>
  </ul>
</nav>
`.trim();

function titleDiv() {
  return `
<div>
  ${titleHeader(titles[Math.floor(Math.random() * titles.length)])}${navElement}
</div>
`;
}

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

addTitleButtons();
appendInfoToSidebar();
// moveScriptsToBody();
const calendarScript = getCalendarScriptText();

function addTitleButtons() {
  document.body.getElementsByTagName("header")[0].innerHTML += titleDiv();

  document.getElementById("play-bad-apple").addEventListener("click", playBadApple);
  document.getElementById("stop-bad-apple").addEventListener("click", stopBadApple);

  injectCss(playButtonCss);
}

function appendInfoToSidebar() {
  const sidebar = document.getElementById("sidebar");

  sidebar.innerHTML += infoDiv;
}

/*function moveScriptsToBody() {
  const scripts = document.getElementsByTagName("script");
  for (var script of scripts)
    if (script.parentElement != document.body) {
      script.parentElement.removeChild(script);
      document.body.appendChild(script);
    }

}*/

function getCalendarScriptText() {
  const scripts = document.getElementsByTagName("script");
  for (var script of scripts){
    if (script.parentElement.tagName.toLowerCase() == "span") {
      return script.innerText;
    }}

  return "console.error('could not find calendar script')";
}

function playBadApple() {
  running = true;

  renderFrame();
}

var rep = 0;
var currentFrame = 0;
function renderFrame() {
  if (currentFrame == data.frameCount) running = false;
  if (!running) {
    cancelAnimationFrame(rep);
    return;
  }

  const frame = data.frames[currentFrame];
  updateInfoLine(currentFrame);
  eval(calendarScript);
  playFrame(frame.width, frame.height, frame.data);
  setTimeout(() => {
    currentFrame++;
    rep = requestAnimationFrame(renderFrame);
  }, 1000 / data.fps);
}

function stopBadApple() {
  running = false;
}

function playFrame(frameWidth, frameHeight, frameData) {
  for (var y = 0; y < frameHeight; y++) {
    const preserved = lines[y + 1][0].innerHTML.substring(width);
    lines[y + 1][0].innerHTML = "";

    for (var x = 0; x < frameWidth; x++) lines[y + 1][0].innerHTML += frameData[(y * frameWidth) + x];

    lines[y + 1][0].innerHTML += preserved;
  }
}

function updateInfoLine(currFrame) {
  const preserved = lines[0][0].innerHTML.substring(width);
  var text = `Frame: ${paddedNumber(currFrame, 5)}/${paddedNumber(data.frameCount - 1, 5)}   FPS: ${paddedNumber(data.fps, 3)}            by Tomat`;
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
