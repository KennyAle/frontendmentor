const getQuote = async () => {
    const res = await fetch('https://api.adviceslip.com/advice')
    const quote = await res.json()
    card(quote)
}

function card(quote) {
    const container = document.querySelector('.generator')
    container.innerHTML = `
        <h1>Advice #${quote.slip.id}</h1>
        <p class="advice">${quote.slip.advice}</p>
        <img class="separator" src="images/pattern-divider-desktop.svg" alt="">
        <div class="dice-container">
            <img class="dice" src="images/icon-dice.svg" alt="">
        </div>
        `
        const dice = document.querySelector('.dice-container')
        dice.addEventListener('click', () => {
            container.style.opacity = '0'
            setTimeout(() => {
                getQuote()
                setTimeout(() => {
                    container.style.opacity = '1'
                }, 200);
            }, 250);
        })
}

getQuote()

