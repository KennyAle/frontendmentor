const getItems = async () => {
    const res = await fetch('data.json')
    const data = await res.json()
    item(data)
}
getItems()

const dialog = document.querySelector('dialog')
const modalBtn = document.querySelector('#confirm')
const closeBtn = document.querySelector('#close')
const modalOrderList = document.querySelector('.modal-order-list')
modalBtn.addEventListener('click', () => {
    modalOrderList.innerHTML = ``

    const orderList = document.querySelector('.order-list')
    const cartItems = orderList.querySelectorAll('.cart-item')
    const cartOrderTotal = document.createElement('p')
    cartOrderTotal.innerHTML = `${orderList.querySelector('.order-total').innerHTML}`

    cartItems.forEach(cartItem => {
        const itemName = cartItem.querySelector('.info p').textContent
        const itemPrice = cartItem.querySelector('.info div span:last-child').textContent
        const itemImage = cartItem.querySelector('#cart-img').src

        const modalItem = document.createElement('div')
        modalItem.classList.add('modal-item')
        modalItem.innerHTML = `
            <img src="${itemImage}" alt="${itemName}">
            <p>${itemName}</p>
            <p>${itemPrice}</p>
        `
        modalOrderList.append(modalItem)
        modalOrderList.append(cartOrderTotal)
    })
    dialog.showModal()
})

closeBtn.addEventListener('click', () => {
    dialog.close()
})

function item(data) {
    const menu = document.querySelector('.menu')
    data.forEach((item) => {
        const items = document.createElement('div')
        items.classList.add('items')
        items.innerHTML = `
            <img id='item-img' src=${item.image.desktop} alt=${item.name}>
          <div class="cart-container">
            <div class="add-to-cart">
                <img class="cart-img" src="./assets/images/icon-add-to-cart.svg" alt="cart">
                <span>Add to Cart</span>
            </div>
          </div>
          <div class="item-name">
            <p class="type">${item.category}</p>
            <p class="dessert-name">${item.name}</p>
            <p class="price">$ ${item.price.toFixed(2)}</p>
          </div>
          `

        const cartContainer = items.querySelector('.cart-container')
        const addToCartDiv = items.querySelector('.add-to-cart')
        addToCartDiv.addEventListener('click', () => {
            addToCart(item)
            let counter = 1
            cartContainer.style.backgroundColor = 'red'
            cartContainer.innerHTML = `
            <img class="cart-img" src="./assets/images/icon-decrement-quantity.svg" alt="dec" id="dec">
            <span>${counter}</span>
            <img class="cart-img" src="./assets/images/icon-increment-quantity.svg" alt="inc" id="inc">
            `
            const decBtn = cartContainer.querySelector('#dec')
            const incBtn = cartContainer.querySelector('#inc')
            const total = cartContainer.querySelector('span')

            decBtn.addEventListener('click', () => {
                removeFromCart(item)
                counter--
                total.innerHTML = counter

                if (counter === 0) {
                    cartContainer.style.backgroundColor = ''
                    cartContainer.innerHTML = `
                        <div class="add-to-cart">
                            <img class="cart-img" src="./assets/images/icon-add-to-cart.svg" alt="cart">
                            <span>Add to Cart</span>
                        </div>
                    `
                    const restoredAddToCart = cartContainer.querySelector('.add-to-cart')
                    restoredAddToCart.addEventListener('click', () => addToCart(item))
                }
            })
            incBtn.addEventListener('click', () => {
                addToCart(item)
                counter++
                total.innerHTML = counter
            })
        })

        menu.append(items)


    })
}

function removeFromCart(item) {
    const orderList = document.querySelector('.order-list')

    const existItem = [...orderList.querySelectorAll('.cart-item')].find(
        (cartItem) => cartItem.querySelector('.info p').textContent === item.name
    )

    if (existItem) {
        const quantity = existItem.querySelector('.info div span:first-child')
        const price = existItem.querySelector('.info div span:last-child')

        const currentQuantity = parseInt(quantity.textContent.replace('x', ''))
        const newQuantity = currentQuantity - 1
        quantity.textContent = `${newQuantity}x`

        const totalPrice = (item.price * newQuantity).toFixed(2)
        price.textContent = `$ ${totalPrice}`

        if (newQuantity == 0) {
            existItem.remove()
        }

        updateOrderTotal()
    }
}

function addToCart(item) {
    const cartItem = document.createElement('div')
    const orderList = document.querySelector('.order-list')

    const existItem = [...orderList.querySelectorAll('.cart-item')].find(
        (cartItem) => cartItem.querySelector('.info p').textContent === item.name
    )

    if (existItem) {
        const quantity = existItem.querySelector('.info div span:first-child')
        const price = existItem.querySelector('.info div span:last-child')

        const currentQuantity = parseInt(quantity.textContent.replace('x', ''))
        const newQuantity = currentQuantity + 1
        quantity.textContent = `${newQuantity}x`

        const totalPrice = (item.price * newQuantity).toFixed(2)
        price.textContent = `$ ${totalPrice}`
    } else {
        cartItem.classList.add('cart-item')
        cartItem.innerHTML = `
        <div class="info">
            <p>${item.name}</p>
            <img id='cart-img' src=${item.image.desktop} alt=${item.name}>
            <div>
                <span>1x</span><span>$ ${item.price.toFixed(2)}</span><span>$ ${item.price.toFixed(2)}</span>
                </div>
            </div>
            <img class='remove' src="./assets/images/icon-remove-item.svg" alt="">
        </div>
        `

        const removeBtn = cartItem.querySelector('.remove')
        removeBtn.addEventListener('click', () => {
            cartItem.remove()
            updateOrderTotal()
        })

        orderList.insertBefore(cartItem, orderList.querySelector('.order-total'))
    }

    updateOrderTotal()
}

function updateOrderTotal() {
    const orderList = document.querySelector('.order-list')
    const cartItems = orderList.querySelectorAll('.cart-item')

    let total = 0

    cartItems.forEach(cartItem => {
        const price = cartItem.querySelector('.info div span:last-child').textContent
        const itemTotal = parseFloat(price.replace('$ ', ''))
        total += itemTotal
    })

    const orderTotalElement = orderList.querySelector('.order-total span')
    orderTotalElement.textContent = `$ ${total.toFixed(2)}`
}