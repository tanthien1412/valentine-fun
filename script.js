// Pig & Moods
const pig = document.getElementById("pig");
function setMood(mood) {
  pig.removeAttribute("data-mood");
  if (mood) pig.setAttribute("data-mood", mood);
}

// Step Navigation with Custom Moods per Step
function nextStep(id) {
  document.querySelectorAll(".step").forEach((s) => s.classList.remove("active"));
  document.getElementById("step" + id).classList.add("active");

  // Reset transform
  const pigSvg = pig.querySelector("svg");
  pigSvg.style.transform = "none";

  // Mood Mapping
  if (id === 2) {
    setMood("cute"); // Smiling eyes
    pigSvg.style.transform = "rotate(-5deg)";
  } else if (id === 3) {
    setMood("love"); // Heart bubble
  } else if (id === 4) {
    setMood("shocked"); // Wide eyes because "you are my world"
  } else if (id === 5) {
    setMood("cute"); // Laugh/smile -> simple cute
    pigSvg.style.transform = "translateY(5px)";
  } else if (id === 6) {
    setMood("shocked"); // A bit serious/nervous (reusing shocked for wide eyes)
    pigSvg.style.transform = "none";
  } else if (id === 7) {
    setMood("default"); // Earnest
    pigSvg.style.transform = "translateY(8px)"; // Peeking up
  } else {
    setMood(""); // Default happy/normal
  }
}

// No Button Dodge Logic
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
let noCount = 0;
const noTexts = ["No? 😢", "Are you sure?", "Please? 🥺", "Don't do this!", "Think again!", "Heartbreaker! 💔"];

function dodgeBtn(e) {
  if (e.type === "touchstart") e.preventDefault();

  const margin = 20;
  const maxX = window.innerWidth - noBtn.offsetWidth - margin;
  const maxY = window.innerHeight - noBtn.offsetHeight - margin;

  const randomX = Math.max(margin, Math.random() * maxX);
  const randomY = Math.max(margin, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  noBtn.innerText = noTexts[noCount % noTexts.length];
  noCount++;

  setMood("sad");
  setTimeout(() => setMood(""), 1500);
}


["mouseover", "touchstart", "click"].forEach((evt) => noBtn.addEventListener(evt, dodgeBtn));

// Success
function acceptLove() {
  nextStep(8);
  setMood("excited"); // Dancing
  setMood("love"); // Also hearts
  pig.setAttribute("data-mood", "love"); // Keep love hearts
  pig.querySelector("svg").style.animation = "dance 0.6s infinite alternate";

  yesBtn.style.transform = "scale(1)";
  startSparkles();
  createConfetti();
  for (let i = 0; i < 20; i++) createFloatingEmoji(true);
}

// Background - dùng ảnh thay emoji
const FLOATING_IMAGES = [
  'images/cuoi.jpg',
  'images/dalat1.jpg',
  'images/dalat2.jpg',
  'images/sn.jpg',
  'images/troll.jpg',
  'images/twoyears.jpg',
  'images/vt1.jpg',
  'images/vt2.jpg',
  'images/vt3.jpg'
];

function createFloatingEmoji(isInstant = false) {
  const el = document.createElement("div");
  el.classList.add("floating-emoji");

  const img = document.createElement("img");
  img.src = FLOATING_IMAGES[Math.floor(Math.random() * FLOATING_IMAGES.length)];
  img.alt = "";
  img.loading = "lazy";

  const size = Math.random() * 200 + 50;
  img.style.width = size + "px";
  img.style.height = size + "px";
  img.style.borderRadius = "10%";
  img.style.objectFit = "cover";

  el.appendChild(img);
  el.style.left = Math.random() * 100 + "vw";

  const duration = Math.random() * 5 + 5;
  el.style.animationDuration = duration + "s";

  if (isInstant) {
    el.style.animationDelay = -(Math.random() * duration) + "s";
    el.style.opacity = 0.8;
  }

  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration * 2000);
}

setInterval(() => createFloatingEmoji(false), 1000);
for (let i = 0; i < 20; i++) createFloatingEmoji(true);

// Sparkles
function startSparkles() {
  const colors = ["#ff4d6d", "#ffb3c1", "#ffffff", "#ffd700"];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const spark = document.createElement("div");
      spark.classList.add("sparkle");
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.left = Math.random() * 100 + "vw";
      spark.style.animationDuration = Math.random() * 2 + 3 + "s";
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 5000);
    }, Math.random() * 300);
  }
}

function createConfetti() {
  // Create a canvas element and get its context
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Define the emoji shape
  const emojiShape = confetti.shapeFromText({
    text: "❤️", // You can use any emoji here
    scalar: 3,
  });

  // Call the confetti function with the emoji shape and other options
  confetti({
    particleCount: 225, // You can change the number of confetti particles
    scalar: 3, // Make it a bit larger
    angle: 90, // You can change the angle of the confetti launch
    spread: 360, // You can change the spread of the confetti launch
    startVelocity: 25, // You can change the initial velocity of the confetti particles
    decay: 0.95, // You can change the decay rate of the confetti particles
    shapes: [emojiShape], // You can pass an array of shapes to use as confetti particles
    origin: { x: 0.5, y: 0.4 }, // You can change the origin of the confetti launch
    zIndex: -1, // You can change the z-index of the confetti canvas
  });
}


// Draw text

var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

// Khi draw text xong (intro xong) thì hiện card game
let introDone = false;
let introScheduled = false;
function showCardAfterIntro() {
  if (introDone) return;
  introDone = true;
  const card = document.getElementById("card");
  if (card) card.classList.remove("card--hidden");
}

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // glow effect - Valentine pink/rose
    context.shadowColor = "rgba(255, 77, 109, 0.9)";
    context.shadowBlur = 12;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if(frameNumber < 250){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;
        context.fillText("everyday day I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    //fades out the text by decreasing the opacity
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;
        context.fillText("everyday day I cannot believe how lucky I am", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if(frameNumber == 500){
        opacity = 0;
    }
    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;
        
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 1000){
        opacity = 0;
    }
    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;
        context.fillText("to be alive, and to get to spend this life with you", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;
        context.fillText("to be alive, and to get to spend this life with you", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 1500){
        opacity = 0;
    }
    if(frameNumber > 1500 && frameNumber < 1750){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2000){
        opacity = 0;
    }
    if(frameNumber > 2000 && frameNumber < 2250){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here I am to get the impossible", "chance to get to know you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here I am to get the impossible chance to get to know you", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here I am to get the impossible", "chance to get to know you"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here I am to get the impossible chance to get to know you", canvas.width/2, canvas.height/2);
        }
        
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2500){
        opacity = 0;
    }
    if(frameNumber > 2500 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 77, 109, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I love you so much Bé iuuu 💖, more than", "all the time and space in the universe can contain"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I love you so much Bé iuuu 💖, more than all the time and space in the universe can contain", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    
    if(frameNumber >= 2750 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 77, 109, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and I can't wait to spend all the time in", "the world to share that love with you!"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("and I can't wait to spend all the time in the world to share that love with you!", canvas.width/2, (canvas.height/2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if(frameNumber >= 3000 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 77, 109, ${thirdOpacity})`;
        context.fillText("Happy Valentine's Day 💖", canvas.width/2, (canvas.height/2 + 120));
        thirdOpacity = thirdOpacity + 0.01;
    }   

     // Reset the shadow effect after drawing the text
     context.shadowColor = "transparent";
     context.shadowBlur = 0;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    // Chỉ vẽ chữ trong phase intro; sau khi intro xong chỉ giữ sao làm nền
    if (!introDone) {
        drawText();
        if (frameNumber >= 3200 && !introScheduled) {
            introScheduled = true;
            setTimeout(showCardAfterIntro, 2500);
        }
        if (frameNumber < 99999) frameNumber++;
    }

    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);

// Nhạc nền: phát sau lần click/touch đầu (trình duyệt yêu cầu tương tác)
const bgMusic = document.getElementById("bgMusic");
function startBgMusic() {
  if (!bgMusic || bgMusic.started) return;
  bgMusic.started = true;
  bgMusic.volume = 0.6;
  bgMusic.play().catch(() => {});
  document.removeEventListener("click", startBgMusic);
  document.removeEventListener("touchstart", startBgMusic);
}
if (bgMusic) {
  document.addEventListener("click", startBgMusic, { once: true });
  document.addEventListener("touchstart", startBgMusic, { once: true });
}