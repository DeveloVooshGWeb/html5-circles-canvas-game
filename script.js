function canvasLocator() {
    this.element = document.querySelector("canvas");
    this.ctx = this.element.getContext("2d");
}

canvas = new canvasLocator();
canvas.element.width = window.innerWidth;
canvas.element.height = window.innerHeight;
mouse = {
    x: undefined,
    y: undefined,
}

window.addEventListener("mousemove", function(mousepos) {
    mouse.x = mousepos.x;
    mouse.y = mousepos.y;
})

function circleObject(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.create = function() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        canvas.ctx.strokeStyle = this.color;
        canvas.ctx.stroke();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fill();
    }

    this.animate = function() {
        if (this.x + this.radius > canvas.element.width && this.x - this.radius < canvas.element.width || this.x + this.radius > 0 && this.x - this.radius < 0) {
            this.dx = this.dx * -1;
        }
        if (this.y + this.radius > canvas.element.height && this.y - this.radius < canvas.element.height || this.y + this.radius > 0 && this.y - this.radius < 0) {
            this.dy = this.dy * -1
        }
        if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
            if (this.radius < 50 && this.radius > 0) {
                this.radius += 1;
            }
        } else if (this.radius > 20) {
            this.radius -= 1;
        }
        if (this.radius > 49) {
            this.radius = 0;
        }

        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        
        this.create();
    }
}

allCircles = [];
//createCircles();

function createCircles() {
    EVERYCIRC = 0;
    allCircles = [];
    colors = ["red", "green", "blue", "yellow"];
    for (i = 0; i < 800; i++) {
        x = Math.floor(Math.random() * canvas.element.width - 2);
        y = Math.floor(Math.random() * canvas.element.height - 2);
        dx = Math.floor(Math.random() - 0.5) * 2;
        dy = Math.floor(Math.random() - 0.5) * 2;
        while (dx == 0 || dy == 0) {
        dx = Math.floor(Math.random() - 0.5) * 2;
        dy = Math.floor(Math.random() - 0.5) * 2;
        }
        radius = Math.floor(Math.random() * 20);
        while (radius < 10) {
            radius = Math.floor(Math.random() * 20);
        }
        color = colors[Math.floor(Math.random() * colors.length)]
        allCircles.push(new circleObject(x, y, dx, dy, radius, color));
    }
}

window.addEventListener("resize", function() {
    canvas.element.width = window.innerWidth;
    canvas.element.height = window.innerHeight;
    createCircles();
    document.querySelector("section").innerHTML += "<h1 class='middle'>Score Reset</h1>";
        canvas.element.style.opacity = "0";
        canvas.element.style.transition = "1s";
        document.querySelector("section").style.opacity = "1";
        document.querySelector("section").style.transition = ".5s";
        this.setTimeout(() => {
        canvas.element.style.opacity = "1";
        canvas.element.style.transition = "1s";
        document.querySelector("section").style.opacity = "0";
        document.querySelector("section").style.transition = ".5s";
        this.setTimeout(() => {
        document.querySelector("section").innerHTML = "";
        }, 500)
        }, 1000)
})

//animate();

function animate() {
    requestAnimationFrame(animate);
    canvas.ctx.clearRect(0, 0, canvas.element.width, canvas.element.height);
    for (i = 0; i < allCircles.length; i++) {
        allCircles[i].animate();
    }
    EVERYCIRC = 0;
    for (i = 0; i < allCircles.length; i++) {
        if (allCircles[i].radius == 0) {
            EVERYCIRC++
        }
    }
    
    if (EVERYCIRC >= 800) {
        document.querySelector("div").innerHTML += "<h1 class='middle'>You Win</h1>";
        canvas.element.style.opacity = "0";
        canvas.element.style.transition = "1s";
        document.querySelector("div").style.opacity = "1";
        document.querySelector("div").style.transition = ".5s";
    }
}

setTimeout(showMessage, 3000);

function showMessage() {
    document.querySelector("div").innerHTML += "<h1 class='middle'>Created By Jomari Marteja<br>Hope You Will Enjoy It<br>Created December 20, 2019 At 9 AM</h1><button class='close'>Close</button>";
    document.querySelector(".close").addEventListener("click", function() {
        canvas.element.style.opacity = "1";
        canvas.element.style.transition = "1s";
        document.querySelector("div").style.opacity = "0";
        document.querySelector("div").style.transition = ".5s";
        setTimeout(() => {
            document.querySelector("div").innerHTML = "";
            createCircles();
            animate();
        }, 1000)
    })
}