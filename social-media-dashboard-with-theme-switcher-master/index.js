const toggle = document.querySelector('#dark-mode-toggle')
toggle.addEventListener('click', () => {
    console.log(toggle.checked)
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
})

window.addEventListener('DOMContentLoaded', () => {
    const getTheme = localStorage.getItem('theme')
    if (getTheme) {
        document.body.classList.add(getTheme + '-theme')
        if(getTheme == 'dark') {
            toggle.checked = true
        }
    } 
})