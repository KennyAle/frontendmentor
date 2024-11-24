const bars = document.querySelector('.bars')
const getData = async () => {
    const res = await fetch('data.json')
    const data = await res.json()
    console.log(data)
    generateBar(data)
}

const today = new Date()
console.log(today.getDay())

function generateBar(data) {
    data.forEach((e, index) => {
        const barContainer = document.createElement('li')
        barContainer.innerHTML = `
            <span class="bar"></span>
            <h3>${e.day}</h3>
            <span class="stat">${e.amount}</span>
        `
        const bar = barContainer.querySelector('.bar')
        bar.style.height = `${e.amount * 2}px`

        if (index + 1 == today.getDay()) {
            bar.classList.add('today')
        } 
        
        bars.append(barContainer)
    })
}

getData()