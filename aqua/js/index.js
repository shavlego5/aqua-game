let winnerNumber = 150;

let bubbles = document.getElementById("bubbles");
let point = document.getElementById("points");
let star = document.getElementById("start");
let rule = document.getElementById("rules");
let container = document.getElementById("container");
let top0 = document.getElementById("top");
let mute = document.getElementById("muted");
let back = document.getElementById("back");
let loser = document.getElementById("loser");
let lose = document.getElementById("lose");
let victory = document.getElementById("victory");
let winner = document.getElementById("winner");
let bubblesCount = 5;
let points = 0;
let audio = document.querySelectorAll("audio");
let nerd = "nerd";
let left = document.getElementById("left");
let right = document.getElementById("right");
let pop0 = document.getElementById("pop-0");
let pop1 = document.getElementById("pop-1");
let pop2 = document.getElementById("pop-2");
let bubbleMinWidth = 60;
let bubbleMaxWidth = 160;

function resize() {
  if (window.innerWidth <= 1024 && window.innerWidth > 824) {
    bubbleMinWidth = 50;
    bubbleMaxWidth = 140;
  } else if (window.innerWidth <= 824 && window.innerWidth > 424) {
    bubbleMinWidth = 40;
    bubbleMaxWidth = 120;
  } else if (window.innerWidth <= 424) {
    bubbleMinWidth = 40;
    bubbleMaxWidth = 100;
  }
}

resize();

window.addEventListener("load", () => {
  left.style.transform = "scale(1.2)";
  setTimeout(() => {
    left.style.transform = "scale(1)";
  }, 500);
  setTimeout(() => {
    right.style.transform = "scale(1.2)";
  }, 400);
  setTimeout(() => {
    right.style.transform = "scale(1)";
  }, 900);
  setTimeout(() => {
    star.style.transform = "scale(1.2)";
  }, 800);
  setTimeout(() => {
    star.style.transform = "scale(1)";
  }, 1300);
});

function muted() {
  if (nerd === "nerd") {
    mute.setAttribute("src", "images/muted.png");
    nerd = "muted";
    for (let i = 0; i < audio.length; i++) {
      audio[i].muted = false;
    }

    back.play();
  } else {
    mute.setAttribute("src", "images/nerd.png");
    nerd = "nerd";
    for (let i = 0; i < audio.length; i++) {
      audio[i].muted = true;
    }
    back.pause();
  }
}

function rules() {
  rule.style.transform = "scale(1)";
  star.style.transform = "scale(0)";
  top0.style.marginTop = "-100vh";
  point.style.transform = "scale(1)";
}

let createBubbles;

function start() {
  checkPoints();
  bubblesCount = 5;
  points = 0;
  point.innerHTML = "points : " + points;
  loser.style.transform = "scale(0)";
  winner.style.transform = "scale(0)";
  rule.style.transform = "scale(0)";
  createBubbles = setInterval(() => {
    for (let i = 0; i < bubblesCount; i++) {
      let img = document.createElement("img");
      img.setAttribute(
        "src",
        `images/bubble-${Math.floor(Math.random() * 7)}.png`
      );
      img.style.width =
        bubbleMinWidth +
        Math.floor(Math.random() * (bubbleMaxWidth - bubbleMinWidth)) +
        "px";
      img.style.left = 10 + Math.floor(Math.random() * 80) + "%";
      img.style.top = 100 + Math.floor(Math.random() * 100) + "%";
      img.setAttribute("onclick", "burst(event)");
      img.setAttribute("draggable", false);
      img.classList.add("bubbles");
      img.style.animationDelay = Math.floor(Math.random() * 8) + "s";

      bubbles.appendChild(img);
    }
  }, 5000);
}

let audioArray = [pop0, pop1, pop2];

function burst(event) {
  event.target.setAttribute("src", "images/burst.gif");
  setTimeout(() => {
    event.target.remove();
  }, 400);
  points++;
  point.innerHTML = "points : " + points;
  audioArray[Math.floor(Math.random() * 3)].play();
}

let reduceTransition = setInterval(() => {
  bubblesCount++;
}, 10000);

let checkPoint;

function checkPoints() {
  checkPoint = setInterval(() => {
    let bubble = document.getElementsByClassName("bubbles");
    for (let i = 0; i < bubble.length; i++) {
      if (bubble[i].getBoundingClientRect().top < 0) {
        bubble[i].remove();
        points--;
        point.innerHTML = "points : " + points;
      }
    }
    if (points < 0) {
      bubbles.innerHTML = "";
      clearInterval(createBubbles);
      clearInterval(checkPoint);
      loser.style.transform = "scale(1)";
      back.pause();
      setTimeout(() => {
        back.play();
      }, 2200);
      lose.play();
    } else if (points >= winnerNumber) {
      bubbles.innerHTML = "";
      clearInterval(createBubbles);
      clearInterval(checkPoint);
      winner.style.transform = "scale(1)";
      back.pause();
      setTimeout(() => {
        back.play();
      }, 2200);
      victory.play();
    }
  }, 100);
}
