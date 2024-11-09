const d = new Date();
const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dayLabel = document.getElementById('labelDay')
const monthLabel = document.getElementById('labelMonth')
const yearLabel = document.getElementById('labelYear')
const dayInput = document.getElementById('dayInput')
const monthInput = document.getElementById('monthInput')
const yearInput = document.getElementById('yearInput')
const days = document.getElementById('days')
const months = document.getElementById('months')
const years = document.getElementById('years')
const submitImg = document.getElementById('submitBtn')
const inputs = document.querySelectorAll('input')
const errorDay = document.getElementById('errorDay')
const errorMonth = document.getElementById('errorMonth')
const errorYear = document.getElementById('errorYear')

function showError(fieldError, label, input, message) {
    fieldError.textContent = message
    fieldError.style.display = 'block'
    label.style.color = 'red'
    input.style.outline = '1px solid red'
}

function hideError(fieldError, label, input) {
    fieldError.style.display = 'none'
    label.style.color = 'hsl(0, 1%, 44%)'
    input.style.outline = 'none'
}

function validateForm() {
    const day = dayInput.value
    const month = monthInput.value
    const year = yearInput.value

    let isDayValid = validateDay(day, month, year)
    let isMonthValid = validateMonth(month, year)
    let isYearValid = validateYear(year)

    if (isDayValid && isMonthValid && isYearValid) {
        let age = createDate(year, month, day)
        submitImg.style.setProperty('--offBlack', 'hsl(259, 100%, 65%)')
        animateCounter(age)
    }
}

function validateDay(value, month, year) {
    if (!value) {
        showError(errorDay, dayLabel, dayInput, 'This field is required')
        return false
    }
    if (value > 31 || value <= 0 || (year == d.getFullYear() && month == d.getMonth() + 1 && value > d.getDate())) {
        showError(errorDay, dayLabel, dayInput, 'Must be a valid day')
        return false
    }
    if (value > monthLength[month - 1]) {
        showError(errorDay, dayLabel, dayInput, 'Must be a valid date')
        return false
    }
    hideError(errorDay, dayLabel, dayInput)
    return true
}

function validateMonth(value, year) {
    if (!value) {
        showError(errorMonth, monthLabel, monthInput, 'This field is required')
        return false
    }
    if (value > 12 || value <= 0 || (year == d.getFullYear() && value > d.getMonth() + 1)) {
        showError(errorMonth, monthLabel, monthInput, 'Must be a valid month')
        return false
    }
    hideError(errorMonth, monthLabel, monthInput)
    return true
}

function validateYear(value) {
    if (!value) {
        showError(errorYear, yearLabel, yearInput, 'This field is required')
        return false
    }
    if (value > d.getFullYear()) {
        showError(errorYear, yearLabel, yearInput, 'Must be in the past')
        return false
    }
    if (value < 1924) {
        showError(errorYear, yearLabel, yearInput, "It's too old!")
        return false
    }
    hideError(errorYear, yearLabel, yearInput)
    return true
}

function createDate(year, month, day) {
    let birthYear = d.getFullYear() - year
    let birthMonth = (d.getMonth() + 1) - month
    let birthDay = d.getDate() - day

    if (birthDay < 0) {
        birthMonth--
        birthDay += monthLength[(month - 2 + 12) % 12]
    }

    if (birthMonth < 0) {
        birthYear--
        birthMonth += 12
    }

    return { birthYear, birthMonth, birthDay }
}

function animateCounter(age) {
    let yearCounter = 0, monthCounter = 0, dayCounter = 0

    const interval = setInterval(() => {
        if (yearCounter < age.birthYear) {
            years.innerHTML = ++yearCounter
        } else if (monthCounter < age.birthMonth) {
            months.innerHTML = ++monthCounter
        } else if (dayCounter < age.birthDay) {
            days.innerHTML = ++dayCounter
        } else {
            clearInterval(interval)
        }
    }, 30)
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        submitImg.style.setProperty('--offBlack', 'hsl(0, 0%, 8%)')
    })
})

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault()
    validateForm()
})