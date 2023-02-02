const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 350;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 600;

const numberOfCarSelect = document.getElementById("numberOfCar");
const mutationRatioSelect = document.getElementById("mutationRatio");

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
let N = 100;
let mutationRatio = 0.1;
mutationRatioSelect.value = mutationRatio;
numberOfCarSelect.value = N;

if (localStorage.getItem("numberOfCar")) {
  N = Number(localStorage.getItem("numberOfCar"));
  numberOfCarSelect.value = N;
}
if (localStorage.getItem("mutationRatio")) {
  mutationRatio = Number(localStorage.getItem("mutationRatio"));
  mutationRatioSelect.value = mutationRatio;
}

const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    }
  }
}

const traffic = [
  new Car(road.getLaneCenter(1), -100, 50, 70, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -300, 50, 70, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -300, 50, 70, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -500, 50, 70, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -500, 50, 70, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(1), -700, 50, 70, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(3), -700, 50, 70, "DUMMY", 2, getRandomColor()),
];

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 50, 70, "AI"));
  }
  return cars;
}

animate();

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestBrain");
}
function setNumberOfCar(e) {
  localStorage.setItem("numberOfCar", e.target.value);
}
function setMutationRatio(e) {
  localStorage.setItem("mutationRatio", e.target.value);
}
function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }
  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  carCanvas.height = window.innerHeight;
  networkCanvas.height = 600;

  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}
