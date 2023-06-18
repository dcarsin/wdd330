const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext("2d");

// rectangle examples       *************************************************
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, width, height);

// ctx.fillStyle = "rgb(255, 0, 0)";
// ctx.fillRect(50, 50, 100, 150);

// ctx.fillStyle = "rgb(0, 255, 0)";
// ctx.fillRect(75, 75, 100, 100);

// ctx.fillStyle = "rgba(255, 0, 255, 0.75)";
// ctx.fillRect(25, 100, 175, 50);

// ctx.fillStyle = "rgb(125, 155, 155)";
// ctx.fillRect(55, 125, 140, 20);

// ctx.fillStyle = "rgb(0, 255, 255)";
// ctx.fillRect(75, 105, 90, 80);

// ctx.strokeStyle = "rgb(255, 255, 255)";
// ctx.strokeRect(25, 25, 175, 200);



// packman examples         *************************************************
// ctx.fillStyle = "rgb(255, 0, 0)";
// ctx.beginPath();
// ctx.moveTo(50, 50);
// // draw your path
// ctx.fill();

// ctx.fillStyle = "rgb(255, 0, 0)";
// ctx.beginPath();
// ctx.moveTo(50, 50);

// ctx.lineTo(150, 50);
// const triHeight = 50 * Math.tan(degToRad(60));
// ctx.lineTo(100, 50 + triHeight);
// ctx.lineTo(50, 50);
// ctx.fill();

// ctx.fillStyle = "rgb(0, 0, 255)";
// ctx.beginPath();
// ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
// ctx.fill();

// ctx.fillStyle = "yellow";
// ctx.beginPath();
// ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
// ctx.lineTo(200, 106);
// ctx.fill();

//text example              *************************************************
ctx.strokeStyle = "white";
ctx.lineWidth = 1;
ctx.font = "36px arial";
ctx.strokeText("Canvas text", 50, 50);

ctx.fillStyle = "red";
ctx.font = "48px georgia";
ctx.fillText("Canvas text", 50, 150);

canvas.setAttribute("aria-label", "Canvas text");

function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }
  
  