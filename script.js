const canvas = document.querySelector("#arena-bg");
const ctx = canvas.getContext("2d");
const gameButtons = document.querySelectorAll(".game-pill");
const form = document.querySelector(".access-form");
const commandButton = document.querySelector(".icon-button");

let width = 0;
let height = 0;
let particles = [];

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: Math.min(86, Math.floor(width / 16)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    speed: 0.22 + Math.random() * 0.56,
    size: 1 + Math.random() * 2.4,
    hue: Math.random() > 0.55 ? "182, 255, 50" : Math.random() > 0.35 ? "41, 229, 255" : "255, 61, 242",
  }));
}

function drawArena() {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;

  for (let x = -60; x < width + 80; x += 54) {
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 160, height);
    ctx.stroke();
  }

  particles.forEach((particle) => {
    particle.y += particle.speed;
    particle.x += Math.sin(particle.y * 0.01) * 0.12;

    if (particle.y > height + 12) {
      particle.y = -12;
      particle.x = Math.random() * width;
    }

    ctx.fillStyle = `rgba(${particle.hue}, 0.52)`;
    ctx.shadowColor = `rgba(${particle.hue}, 0.8)`;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(drawArena);
}

gameButtons.forEach((button) => {
  button.addEventListener("click", () => {
    gameButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Request Sent";
  submitButton.disabled = true;

  window.setTimeout(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    form.reset();
  }, 1800);
});

commandButton.addEventListener("click", () => {
  document.querySelector("#tools").scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawArena();
