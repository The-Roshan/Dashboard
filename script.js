// 1. Gradient Background using Canvas API
const bgCanvas = document.getElementById('background-canvas');
const bgCtx = bgCanvas.getContext('2d');

function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}

resizeBgCanvas();
window.addEventListener('resize', resizeBgCanvas);

function drawGradient() {
    const gradient = bgCtx.createLinearGradient(0, 0, bgCanvas.width, bgCanvas.height);
    gradient.addColorStop(0, 'rgba(255, 0, 150, 1)');
    gradient.addColorStop(0.5, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 255, 1)');
    bgCtx.fillStyle = gradient;
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    requestAnimationFrame(drawGradient);
}

drawGradient();

// 2. Animated Bubbles using Canvas API
const bubblesCanvas = document.getElementById('bubbles-canvas');
const bubblesCtx = bubblesCanvas.getContext('2d');

function resizeBubblesCanvas() {
    bubblesCanvas.width = window.innerWidth;
    bubblesCanvas.height = window.innerHeight;
}

resizeBubblesCanvas();
window.addEventListener('resize', resizeBubblesCanvas);

let bubblesArray = [];

class Bubble {
    constructor() {
        this.x = Math.random() * bubblesCanvas.width;
        this.y = Math.random() * bubblesCanvas.height;
        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'rgba(255, 255, 255, 0.8)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.size > 0.2) this.size -= 0.1;
        if (this.x + this.size > bubblesCanvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > bubblesCanvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        bubblesCtx.fillStyle = this.color;
        bubblesCtx.beginPath();
        bubblesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bubblesCtx.closePath();
        bubblesCtx.fill();
    }
}

function handleBubbles() {
    bubblesCtx.clearRect(0, 0, bubblesCanvas.width, bubblesCanvas.height);

    if (bubblesArray.length < 100) {
        bubblesArray.push(new Bubble());
    }

    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
        if (bubblesArray[i].size <= 0.3) {
            bubblesArray.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(handleBubbles);
}

handleBubbles();
