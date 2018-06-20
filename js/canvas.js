var canvas=document.getElementById("bg");
var ctx=canvas.getContext("2d");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

var starField=[];

function Star(x,y,radius){
  this.x=x;
  this.y=y;
  this.r=radius;
  this.color={
      r:Math.random()*255,
      g:Math.random()*255,
      b:Math.random()*255
    };
  this.draw=function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
    ctx.fillStyle='rgb('+this.color.r+","+this.color.g+","+this.color.b+")";
    ctx.fill();
  }
  this.move=function(){
    this.x+=Math.random()*(2-1)-1;
    this.y+=Math.random()*(2-1)-1;
    this.draw();
  }
}

for(let i=0;i<(Math.random()*(50-13)+13);i++){
  starField.push(new Star(Math.random()*canvas.width,Math.random()*canvas.height,Math.random()*2));
  console.log(starField[i]);
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  starField.forEach(star=>{
    star.move();
  });
}
animate();

function redrawCanvas(){
  canvas.height=window.innerHeight;
  canvas.width=window.innerWidth;
  /* EXPERIMENTAL - DRAW STARS AGAIN AFTER RESIZE;
  starField=[];
  for(let i=0;i<13;i++){
    starField.push(new Star(Math.random()*canvas.width,Math.random()*canvas.height,5));
    console.log(starField[i]);
  }
  */
  animate();
}