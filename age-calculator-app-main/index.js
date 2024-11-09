const d = new Date();
const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const days = document.getElementById('days')
const months = document.getElementById('months')
const years = document.getElementById('years')
const submitImg = document.getElementById('submitBtn')
const inputs = document.querySelectorAll('input')

function validateForm() {
    let day = document.getElementById('day').value
    let month = document.getElementById('month').value
    let year = document.getElementById('year').value

    let isDayValid = validateDay(day, month, year)
    let isMonthValid = validateMonth(month, year)
    let isYearValid = validateYear(year)

    if (isDayValid && isMonthValid && isYearValid) {
        let age = createDate(year, month, day)
        submitImg.style.setProperty('--offBlack', 'hsl(259, 100%, 65%)')

        let yearCounter = 0
        let monthsCounter = 0
        let daysCounter = 0

        const updateCounterYears = setInterval(() => {
            yearCounter++
            years.innerHTML = yearCounter
            if (yearCounter >= age.birthYear) {
                clearInterval(updateCounterYears)
            }
        }, 30)
        const updateCounterMonths = setInterval(() => {
            monthsCounter++
            months.innerHTML = monthsCounter
            if (monthsCounter >= age.birthMonth) {
                clearInterval(updateCounterMonths)
            }
        }, 30)
        const updateCounterDays = setInterval(() => {
            daysCounter++
            days.innerHTML = daysCounter
            if (daysCounter >= age.birthDay) {
                clearInterval(updateCounterDays)
            }
        }, 30)
    } else {
        console.log('invalid date')
    }
}

function validateDay(value, month, year) {
    if (value > monthLength[month - 1] || value <= 0) {
        console.log('not valid')
        return false
    } else if (year == d.getFullYear() && month == d.getMonth() + 1 && value > d.getDate()) {
        console.log('not valid')
        return false
    } else {
        return true
    }
}

function validateMonth(value, year) {
    if (value > 12 || value <= 0) {
        console.log('not valid')
        return false
    } else if (year == d.getFullYear() && value > d.getMonth() + 1) {
        console.log('not valid')
        return false
    } else {
        return true
    }
}

function validateYear(value) {
    return value > d.getFullYear() ? (console.log('not valid'), false) : true
}

function createDate(year, month, day) {
    let birthYear = d.getFullYear() - year
    let birthMonth = (d.getMonth() + 1) - month
    let birthDay = d.getDate() - day

    if (birthDay < 0) {
        birthMonth--
        birthDay += monthLength[(month - 2 + 12) % 12]
    }

    if (birthMonth < 0 || (birthMonth === 0 && birthDay < 0)) {
        birthYear--
        birthMonth += 12
    }

    return { birthYear, birthMonth, birthDay }
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