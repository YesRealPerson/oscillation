const canvas = document.getElementById("vis");
let ctx = canvas.getContext("2d");
let height = window.innerHeight;
canvas.height = height;
let width = window.innerWidth;
canvas.width = width;
let visData = [[], []];
window.addEventListener("resize", e => {
    height = window.innerHeight;
    canvas.height = height;
    width = window.innerWidth;
    canvas.width = width;
});
let i = 0;
const clear = () => {
    ctx.clearRect(0, 0, width, height);
    i = 0;
}
function drawSpring(x1, y1, x2, y2, windings, width, offset, col1, col2, lineWidth) {
    var x = x2 - x1;
    var y = y2 - y1;
    var dist = Math.sqrt(x * x + y * y);

    var nx = x / dist;
    var ny = y / dist;
    ctx.strokeStyle = col1
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    x1 += nx * offset;
    y1 += ny * offset;
    x2 -= nx * offset;
    y2 -= ny * offset;
    var x = x2 - x1;
    var y = y2 - y1;
    var step = 1 / (windings);
    for (var i = 0; i <= 1 - step; i += step) {  // for each winding
        for (var j = 0; j < 1; j += 0.05) {
            var xx = x1 + x * (i + j * step);
            var yy = y1 + y * (i + j * step);
            xx -= Math.sin(j * Math.PI * 2) * ny * width;
            yy += Math.sin(j * Math.PI * 2) * nx * width;
            ctx.lineTo(xx, yy);
        }
    }
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 + nx * offset, y2 + ny * offset)
    ctx.stroke();
    ctx.strokeStyle = col2
    ctx.lineWidth = lineWidth - 4;
    var step = 1 / (windings);
    ctx.beginPath();
    ctx.moveTo(x1 - nx * offset, y1 - ny * offset);
    ctx.lineTo(x1, y1);
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + nx * offset, y2 + ny * offset)
    for (var i = 0; i <= 1 - step; i += step) {  // for each winding
        for (var j = 0.25; j <= 0.76; j += 0.05) {
            var xx = x1 + x * (i + j * step);
            var yy = y1 + y * (i + j * step);
            xx -= Math.sin(j * Math.PI * 2) * ny * width;
            yy += Math.sin(j * Math.PI * 2) * nx * width;
            if (j === 0.25) {
                ctx.moveTo(xx, yy);

            } else {
                ctx.lineTo(xx, yy);
            }
        }
    }
    ctx.stroke();
}
let coolBug = "0";
let Multiplier = Math.exp((Math.abs(3) - 100) / 20 * -1);
var gradient = ctx.createLinearGradient(0, 0, width * 0.9, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1 / 6, 'orange');
gradient.addColorStop(2 / 6, 'yellow');
gradient.addColorStop(3 / 6, 'green');
gradient.addColorStop(4 / 6, 'blue');
gradient.addColorStop(5 / 6, 'indigo');
gradient.addColorStop(1, 'violet');
const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for (let j = 0; j < i - 1; j++) {
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        let x = width / 1.1 - width / 25 / 2 - visData[0][1] * (i - j) * Multiplier;
        let y = -visData[1][j] * Multiplier + height / 2 - width / 25 / 2;
        ctx.moveTo(x, y);
        x = width / 1.1 - width / 25 / 2 - visData[0][1] * (i - j - 1 + eval(coolBug)) * Multiplier;
        y = -visData[1][j + 1] * Multiplier + height / 2 - width / 25 / 2;
        ctx.lineTo(x, y);
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    ctx.fillStyle = "rgb(245,0,0)";
    drawSpring(width / 1.1 - width / 25+width / 50, 0-10, width / 1.1 - width / 25+width / 50, -visData[1][i] * Multiplier + height / 2 - width / 25, 8, 100, 40, "grey", "lightgrey", 7);
    ctx.fillRect(width / 1.1 - width / 25, -visData[1][i] * Multiplier + height / 2 - width / 25, width / 25, width / 25);
    if (++i > visData[0].length) i = 0;
    window.requestAnimationFrame(draw);
}

const init = () => {
    window.requestAnimationFrame(draw)
}
init();