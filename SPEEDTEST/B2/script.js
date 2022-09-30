const second = document.querySelector('.second')
const centisecond = document.querySelector('.centisecond')
const startBtn = document.querySelector('.start')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')

let interval = null
let timer = {
    second: 0,
    centisecond: 0
}

startBtn.addEventListener('click', () => { start() })
stopBtn.addEventListener('click', () => { stop() })
resetBtn.addEventListener('click', () => { reset() })
const start = () => {
    interval = setInterval(() => {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = false;
        if (timer.second == 999 && timer.centisecond == 59) {
            stop()
        }
        if (timer.centisecond == 60) {
            timer.centisecond = 0
            timer.second++
        }
        timer.centisecond++
        update()
    }, 10);
}
const stop = () => {
    clearInterval(interval)
    stopBtn.disabled = true
    if (timer.second === 999 && timer.centisecond == 59) {
        startBtn.disabled = true
    } else {
        startBtn.disabled = false
    }
    resetBtn.disabled = false
    update()
}

const reset = () => {
    resetBtn.disabled = true
    stopBtn.disabled = true
    startBtn.disabled = false

    timer = {
        second: 0,
        centisecond: 0
    }
    update()
}
const update = () => {
    second.innerHTML = timer.second.toString().padStart(3, 0)
    centisecond.innerHTML = timer.centisecond.toString().padStart(2, 0)
}
update()
