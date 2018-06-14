var canvas=document.getElementById("bg");
var ctx=canvas.getContext("2d");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

class Star{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.r=Math.random()*2+0.5;
    this.color={
      r:Math.random()*255,
      g:Math.random()*255,
      b:Math.random()*255
    };
  }
}


function drawStars(){
  let star=new Star();
  ctx.beginPath();
  ctx.arc(star.x, star.y,star.r,0,Math.PI*2);
  ctx.fillStyle='rgb('+star.color.r+","+star.color.g+","+star.color.b+")";
  ctx.fill();
}

function display(){
  for(let i=0;i<Math.random()*(60-20+1)+20;i++){
    drawStars();
  }
}
display();

function moveStars(){
  this.x+=Math.floor(Math.random()*(5-(-5)+1)-5);
  this.y+=Math.floor(Math.random()*(5-(-5)+1)-5);
  console.log("Stars moved");
  //setTimeout(moveStars, 500);
}
//moveStars();

function redrawCanvas(){
  canvas.height=window.innerHeight;
  canvas.width=window.innerWidth;
  display();
}