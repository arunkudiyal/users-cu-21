// AJAX -> axios

document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault()

    const emailInput = document.querySelector('#form-email').value
    const passwordInput = document.querySelector('#form-password').value

    const user = {
        email: emailInput,
        password: passwordInput
    }

    const xhr = new XMLHttpRequest()
    const url = `http://localhost:5001/users/signup`

    xhr.open('POST', url)

    xhr.setRequestHeader('Content-Type', 'application/json')

    if(emailInput === '' || passwordInput === '') {
        alert('Invalid email & password')
    } else {
        console.log('Making AJAX Call...')
        // AJAX Call
        xhr.onreadystatechange = () => {
            if(xhr.status === 201 && xhr.readyState === 4) {
                let output = ''
                let response = JSON.parse(xhr.responseText)
                output += `<h3 class="bg-success" style="padding: 10px; margin: 10px;" >${ JSON.stringify(response.message) }</h3>`
                document.querySelector('#error-or-success').innerHTML = output
            }
            else if(xhr.status === 400 && xhr.readyState === 4) {
                let output = ''
                let response = JSON.parse(xhr.responseText)
                console.log( JSON.parse(xhr.responseText) )
                output += `<h3 class="bg-danger" style="padding: 10px; margin: 10px;" >${ JSON.stringify(response.message) }</h3>`
                document.querySelector('#error-or-success').innerHTML = output
            }
        }
    }

    xhr.send( JSON.stringify(user) )
})