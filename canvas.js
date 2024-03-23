const canvas = document.getElementById("vis");
let ctx = canvas.getContext("2d");
let height = window.innerHeight;
canvas.height = height;
let width = window.innerWidth;
canvas.width = width;
let visData = [[],[]];
window.addEventListener("resize", e => {
    height = window.innerHeight;
    canvas.height = height;
    width = window.innerWidth;
    canvas.width = width;
});
let i = 0;
const clear = () => {
    ctx.clearRect(0, 0, width, height);
    i=0;
}
let coolBug = "0";
let Multiplier = Math.exp((Math.abs(3)-100)/20*-1);
var gradient = ctx.createLinearGradient(0, 0, width/1.5, height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1 / 6, 'orange');
gradient.addColorStop(2 / 6, 'yellow');
gradient.addColorStop(3 / 6, 'green');
gradient.addColorStop(4 / 6, 'blue');
gradient.addColorStop(5 / 6, 'indigo');
gradient.addColorStop(1, 'violet');
const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for(let j = 0; j < i-1; j++){
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        let x = width/1.1-width/25/2-visData[0][1]*(i-j)*Multiplier;
        let y = -visData[1][j]*Multiplier+height/2-width/25/2;
        ctx.moveTo(x, y);
        x = width/1.1-width/25/2-visData[0][1]*(i-j-1+eval(coolBug))*Multiplier;
        y = -visData[1][j+1]*Multiplier+height/2-width/25/2;
        ctx.lineTo(x, y);
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    ctx.fillStyle = "rgb(245,0,0)";
    ctx.fillRect(width/1.1-width/25, -visData[1][i]*Multiplier+height/2-width/25, width/25, width/25);
    if(++i > visData[0].length) i = 0;
    window.requestAnimationFrame(draw);
}

const init = () => {
    window.requestAnimationFrame(draw)
}
init();