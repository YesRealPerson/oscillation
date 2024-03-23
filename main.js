var plotElem = document.getElementById("plot")
var zero = 1
var one = 1
var two = 1
var a = 0
var b = 50
var y0 = 0;
var yp0 = 0;
var yHigh = 50;
var yLow = -50;
let showThing = false;
const parser = math.parser();
var forcing = "0";

var Oscillator = (t, y) => {
  try {
    let funny = [two * y[1] - parser.evaluate(`f(${t})`), -zero * y[0] - y[1] * one]
    document.getElementById("error").innerHTML = "";
    return funny
  } catch (err) {
    document.getElementById("error").innerHTML = err.toString();
  }
}

let opts = {
  width: 500,
  height: 500,
  title: "Oscillator",
  scales: {
    x: { time: false },
    y: { range: [-20, 20] }
  },
  series: [
    { label: "t" },
    {
      label: "y",
      stroke: "#12B02F",
    },
  ],
}

function calcOde(solver, resolution) {
  data = [[],[]];
  try {
    let funny = [];
    const eres = solver.rk4(~~resolution)
    for(let i = 0; i < eres.ts.length; i++){
      funny[i] = parser.evaluate(`g(${eres.ts[i]})`)
    }
  data = [
    eres.ts,
    solver.rk4(~~resolution).ys.map((t) => t[0]),
    funny
  ]
    visData = data;
    console.log(data);
    clear();
  } catch (err) {
    console.log(err);
  }
  return data
}

var u = new uPlot(opts, calcOde(new ODEsolver(Oscillator, [y0, yp0], a, b), 1000), plotElem)
u.setSize({ width: window.innerWidth / 1.1, height: window.innerHeight / 1.5 })
window.addEventListener("resize", e => {
  u.setSize({ width: window.innerWidth / 1.1, height: window.innerHeight / 1.5 })
})

var inputs = document.getElementsByTagName("input");

const updateFunc = (name, value, checked) => {
    try {
      switch (name) {
        case "forcing":
          forcing = value;
          document.getElementById("forcing").innerText = forcing;
          if (forcing == "") {
            forcing = "0";
          }
          parser.evaluate("f(t) = "+forcing);
          break;
        case "a":
          y0 = value;
          if (y0 == "") {
            y0 = "0";
          }
          y0 = math.evaluate(y0)
          break;
        case "b":
          yp0 = value;
          if (yp0 == "") {
            yp0 = "0";
          }
          yp0 = math.evaluate(yp0)
          break;
        case "zero":
          zero = value;
          if (zero == "") {
            zero = "0";
          }
          zero = math.evaluate(zero)
          if (zero > 0) {
            document.getElementById("zero").innerText = "+ " + zero + "y = ";
          }
          else if (zero == 0) {
            document.getElementById("zero").innerText = " = ";
          }
          else if (zero < 0) {
            document.getElementById("zero").innerText = "- " + Math.abs(zero) + "y = ";
          }
          break;
        case "one":
          one = value;
          if (one == "") {
            one = "0";
          }
          one = math.evaluate(one)
          if (one > 0) {
            document.getElementById("one").innerText = "+ " + one + "y' ";
          }
          else if (one == 0) {
            document.getElementById("one").innerText = "";
          }
          else if (one < 0) {
            document.getElementById("one").innerText = "- " + Math.abs(one) + "y' ";
          }
          break;
        case "two":
          two = value;
          if (two == "") {
            two = "0";
          }
          two = math.evaluate(two)
          if (two > 0) {
            document.getElementById("two").innerText = two + "y'' ";
          }
          else if (two == 0) {
            document.getElementById("two").innerText = "";
          }
          else if (two < 0) {
            document.getElementById("two").innerText = "-" + Math.abs(two) + "y' ";
          }
          break;
        case "ybot":
          a = value;
          if (a == "") {
            a = "0";
          }
          a = math.evaluate(a)
          break;
        case "ytop":
          b = value;
          if (b == "") {
            b = "50";
          }
          b = math.evaluate(b)
          break;
        case "lower":
          yLow = value;
          if (yLow == "") {
            yLow = "0";
          }
          yLow = math.evaluate(yLow)
          break;
        case "higher":
          yHigh = value;
          if (yHigh == "") {
            yHigh = "0";
          }
          yHigh = math.evaluate(yHigh)
          break;
        case "coolBug":
          if (checked) {
            coolBug = "0.25*j";
          } else {
            coolBug = "0";
          }
          break;
      }

      document.getElementById("error").innerHTML = "";
      Multiplier = Math.exp((Math.abs(yLow) - 100) / 20 * -1);
      if (Math.abs(yHigh) < Math.abs(yLow)) Multiplier = Math.exp((Math.abs(yHigh) - 100) / 20 * -1);;
      opts = {
        width: 500,
        height: 500,
        title: "Oscillator",
        scales: {
          x: { time: false },
          y: { range: [yLow, yHigh] }
        },
        series: [
          { label: "t" },
          {
            label: "y",
            stroke: "rgb(0,255,0)",
          },
        ],
      }
      if(showThing){
        opts.series.push(
          {
            label: "y2",
            stroke: "rgb(255,0,0)",
          });
      }
      plotElem.innerHTML = "";
      var u = new uPlot(opts, calcOde(new ODEsolver(Oscillator, [y0, yp0], a, b), 1000), plotElem)
      u.setSize({ width: window.innerWidth / 1.1, height: window.innerHeight / 1.5 })
      window.addEventListener("resize", e => {
        u.setSize({ width: window.innerWidth / 1.1, height: window.innerHeight / 1.5 })
      })
    } catch (err) {
      document.getElementById("error").innerHTML = err.toString();
      throw err;
    }
  }

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", () => {
    parser.evaluate("g(t)=0")
    showThing = false;
    updateFunc(inputs[i].name, inputs[i].value, inputs[i].checked);
  })
}

const defaults = () => {
  let temp = ["1", "0", "1", "0", "0", "(1/2)cos(.8t)", "65", "3", "-3"];
  parser.evaluate("g(t)=2.778sin(.1t)")
  showThing = true;
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = temp[i];
    updateFunc(inputs[i].name, inputs[i].value, inputs[i].checked);
  }
}

const resonance = () => {
  parser.evaluate("g(t)=0")
  showThing = false;
  let temp = ["1", "0", "121", "0", "0", "3cos(11t)", "5", "8", "-8"];
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = temp[i];
    updateFunc(inputs[i].name, inputs[i].value, inputs[i].checked);
  }
}