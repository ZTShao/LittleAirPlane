let arrowDirection = 0
let globalX = 0
let globalY = 0
let xDirection = 0.707
let yDirection = -0.707
let timer = null
const TIME_INTERVAL = 10
const ARC_INCRE = 0.5
const ARC_OFFSET = -0.785
const BORDER = 200

const forwardBtn = document.getElementById("forward")
const backwardBtn = document.getElementById("backward")
const clockwiseBtn = document.getElementById("clockwise")
const conterclockwiseBtn = document.getElementById("conterclockwise")
const arrow = document.getElementById("arrow")
const note = document.getElementById("note")

function clockwise() {
    arrowDirection += ARC_INCRE
    arrow.style.transform = `translate(${globalX}px,${globalY}px) rotate(${arrowDirection}rad)`
    calculateXandY()
}

function conterclockwise() {
    arrowDirection -= ARC_INCRE
    arrow.style.transform = `translate(${globalX}px,${globalY}px) rotate(${arrowDirection}rad)`
    calculateXandY()
}

function calculateXandY() {
    xDirection = Math.cos(arrowDirection + ARC_OFFSET)
    yDirection = Math.sin(arrowDirection + ARC_OFFSET)
}

function forward() {
    timer = setInterval(() => {
        globalX += xDirection
        globalY += yDirection
        arrow.style.transform = `translate(${globalX}px,${globalY}px) rotate(${arrowDirection}rad)`
        if (globalX > BORDER || globalX < -BORDER || globalY > BORDER || globalY < -BORDER) {
            note.setAttribute("style", "display:block")
        } else {
            note.setAttribute("style", "display:none")
        }
    }, TIME_INTERVAL)
}

function backward() {
    timer = setInterval(() => {
        globalX -= xDirection
        globalY -= yDirection
        arrow.style.transform = `translate(${globalX}px,${globalY}px) rotate(${arrowDirection}rad)`
        if (globalX > BORDER || globalX < -BORDER || globalY > BORDER || globalY < -BORDER) {
            note.setAttribute("style", "display:block")
        } else {
            note.setAttribute("style", "display:none")
        }
    }, TIME_INTERVAL)
}

let stop = () => clearInterval(timer)

clockwiseBtn.addEventListener('click', clockwise)
conterclockwiseBtn.addEventListener('click', conterclockwise)

forwardBtn.addEventListener('mousedown', forward)
forwardBtn.addEventListener('mouseup', stop)

backwardBtn.addEventListener('mousedown', backward)
backwardBtn.addEventListener('mouseup', stop)

let isMoving = false

document.onkeydown = function (e) {
    let event = e || window.event
    switch (event.key) {
        case "ArrowUp":
            if (!isMoving) {
                forward()
                isMoving = true
            }
            break
        case "ArrowDown":
            if (!isMoving) {
                backward()
                isMoving = true
            }
            break
        case "ArrowLeft":
            break
        case "ArrowRight":
            break
    }
}

document.onkeyup = function (e) {
    let event = e || window.event
    switch (event.key) {
        case "ArrowUp":
            stop()
            isMoving = false
            break
        case "ArrowDown":
            stop()
            isMoving = false
            break
        case "ArrowLeft":
            conterclockwise()
            break
        case "ArrowRight":
            clockwise()
            break
    }
}





