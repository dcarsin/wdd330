const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0, 0, width, height);

// example 1 mozilla        ***********************************************************************
// const image = new Image();
// image.src = "firefox.png";
// image.addEventListener("load", () => ctx.drawImage(image, 20, 20, 185, 175, 50, 50, 185, 175));
// canvas.setAttribute("aria-label", "Firefox Logo");


//example for circles       ************************************************************************
// ctx.translate(width / 2, height / 2);
// function degToRad(degrees) {
//     return (degrees * Math.PI) / 180;
// }

// function rand(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// let length = 250;
// let moveOffset = 20;

// for (let i = 0; i < length; i++) {
//     ctx.fillStyle = `rgba(${255 - length},0,${255 - length},0.9)`;
//     ctx.beginPath();
//     ctx.moveTo(moveOffset, moveOffset);
//     ctx.lineTo(moveOffset + length, moveOffset);
//     const triHeight = (length / 2) * Math.tan(degToRad(60));
//     ctx.lineTo(moveOffset + length / 2, moveOffset + triHeight);
//     ctx.lineTo(moveOffset, moveOffset);
//     ctx.fill();

//     length--;
//     moveOffset += 0.7;
//     ctx.rotate(degToRad(5));
// }


//example jonny walker!             **********************************************************************************
ctx.translate(width / 2, height / 2);
const image = new Image();
image.src = "walk-right.png";
image.onload = draw;

let sprite = 0;
let posX = 0;
function draw() {
    ctx.fillRect(-(width / 2), -(height / 2), width, height);
    ctx.drawImage(image, sprite * 102, 0, 102, 148, 0 + posX, -74, 102, 148);
    if (posX % 13 === 0) {
        if (sprite === 5) {
          sprite = 0;
        } else {
          sprite++;
        }
      }
      if (posX > width / 2) {
        let newStartPos = -(width / 2 + 102);
        posX = Math.ceil(newStartPos);
        console.log(posX);
      } else {
        posX += 2;
      }
      window.requestAnimationFrame(draw);
}