console.log('client side js is loaded')



const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageTwo.textContent = "Fetching weather"
    messageOne.textContent = ""

    const location = searchValue.value

    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
    
})