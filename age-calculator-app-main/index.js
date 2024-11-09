const d = new Date();
const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

function validateForm() {
    let day = document.getElementById('day').value
    let month = document.getElementById('month').value
    let year = document.getElementById('year').value
    validateDay(day)
    validateMonth(month)
    validateYear(year)
}

function validateDay(value) {
    return (value > 31 || value <= 0) ? console.log('not valid') : console.log(value) 
}

function validateMonth(value) {
    return (value > 12 || value <= 0) ? console.log('not valid') : console.log(value) 
}

function validateYear(value) {
    return value > d.getFullYear() ? console.log('not valid') : console.log(value) 
}

function checkRequired(value) {
    if (value.trim === '') {
        return false
    }
    return true
}

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    validateForm()
})