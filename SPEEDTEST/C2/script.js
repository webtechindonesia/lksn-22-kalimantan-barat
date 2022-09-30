const field = document.querySelector('.grid')
const x = document.querySelector('#x');
const y = document.querySelector('#y');
const image = document.querySelector('#img')

const splitBtn = document.querySelector('.split-btn')
splitBtn.addEventListener('click', (e) => {
    toggleActive(image)
    toggleActive(field)

    let width = 500;
    let height = 300
    let newX = x.value,
        newY = y.value
    let crop = {
        w: image.width / newX,
        h: image.height / newY
    }

    let imageW = 500 / newX
    let imageH = 300 / newY
    for (let row = 0; row < newY; row++) {
        for (let col = 0; col < newX; col++) {
            const image = new Image()
            const canvas = document.createElement('canvas')
            const c = canvas.getContext('2d')
            c.drawImage(image,
                col * crop.w,
                row * crop.h,
                crop.w,
                crop.h,
                0,
                0,
                imageW,
                imageH)
            image.addEventListener('load', (e)=>{
                image.style.border = "1px solid yellow"
                image.addEventListener('click',(e)=>{
                    e.currentTarget.opacity = '0'
                })
                field.appendChild(image)
            })
            image.src = canvas.toDataURL()
        }
    }
});

const toggleActive = (dom) => {
    dom.classList.toggle('active')
}