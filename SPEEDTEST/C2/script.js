const field = document.querySelector('.grid')
const x = document.querySelector('#x');
const y = document.querySelector('#y');
const aImage = document.querySelector('#img')

const splitBtn = document.querySelector('.split-btn')
splitBtn.addEventListener('click', (e) => {
    toggleActive(aImage)
    toggleActive(field)

    let newX = x.value,
        newY = y.value;
    let crop = {
        w: aImage.width / newX,
        h: aImage.height / newY
    }

    let imageW = 500 / newX
    let imageH = 300 / newY

    for (let row = 0; row < newY; row++) {
        for (let col = 0; col < newX; col++) {
            const image = new Image()
            const canvas = document.createElement('canvas')
            const c = canvas.getContext('2d')
            canvas.width = imageW
            canvas.height = imageH
            c.drawImage(aImage,
                col * crop.w,
                row * crop.h,
                crop.w,
                crop.h,
                0,
                0,
                imageW,
                imageH)

            image.addEventListener('load', (e) => {
                image.style.border = '1px solid yellow'
                image.addEventListener('click', (e) => {
                    image.style.opacity = '0'
                })
                field.appendChild(image)
            })
            image.src = canvas.toDataURL()
        }
    }

    field.style.gridTemplateColumns = `repeat(${newX}, auto)`
    field.style.gridTemplateRows = `repeat(${newY}, auto)`
});

const toggleActive = (dom) => {
    dom.classList.toggle('active')
}