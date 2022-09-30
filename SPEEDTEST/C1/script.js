const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = canvas
let ball = {
    rad: 5,
    p: {
        x: -20,
        y: CANVAS_HEIGHT / 2
    }
}
let road = {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT / 2
}

const draw = () => {
    c.fillStyle = "green"
    c.fillRect(0, CANVAS_HEIGHT / 2 - road.height / 2, road.width, road.height)

    c.fillStyle = 'white'
    c.beginPath()
    c.arc(ball.p.x, ball.p.y, ball.rad, 0, Math.PI * 2);
    c.fill()
}
const update = () =>{
    if(ball.p.x == CANVAS_WIDTH) ball.p.x = 0
    ball.p.x += 5
    draw()
    requestAnimationFrame(update)
}
update();