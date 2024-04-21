const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const contentInput = document.querySelector('#content')
const form = document.querySelector('#form-contact')

const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createSummary = (summaryItems) => {

  const existingSummary = document.getElementById("error-summary")
  if (existingSummary !== null) {
    existingSummary.remove()
  }

  let containerNode = document.createElement('div')
  containerNode.classList.add(...['error-summary', 'prose', 'prose--reverse'])
  containerNode.setAttribute('id', 'error-summary')

  let titleNode = document.createElement('h2')
  titleNode.classList.add('h3')
  titleNode.textContent = 'There is a problem'

  let listNode = document.createElement('ul')
  for (let item of summaryItems) {
    let li = document.createElement('li')
    let a = document.createElement('a')
    a.setAttribute('href', item.href)
    a.textContent = item.text
    li.appendChild(a)
    listNode.appendChild(li)
  }

  containerNode.appendChild(titleNode)
  containerNode.appendChild(listNode)
  form.prepend(containerNode)
}

const hideError = (inputId) => {
  const input = document.getElementById(inputId)
  const formGroup = input.parentElement
  const existingErrorMessage = document.getElementById(`error-message-for-${inputId}`)
  if (existingErrorMessage !== null) {
    existingErrorMessage.remove()
    input.classList.remove('form-input--error')
    formGroup.classList.remove('form-group--error')
  }
}

const showError = (inputId, message) => {
  const input = document.getElementById(inputId)
  const formGroup = input.parentElement

  const errorMessage = document.createElement('p')
  errorMessage.setAttribute('id', `error-message-for-${inputId}`)
  errorMessage.classList.add('form-error-message')
  errorMessage.innerHTML = `<span class="visually-hidden">Error: </span> ${message}`
  
  input.classList.add('form-input--error')
  formGroup.classList.add('form-group--error')
  input.before(errorMessage)
}

form.addEventListener('submit', function (e) {
  e.preventDefault()

  //remove any existing errors
  hideError('name')
  hideError('email')
  hideError('content')

  let summary = []

  //validate name
  const name = nameInput.value.trim()
  if (name === '') {
    summary.push({
      href: '#name',
      text: 'You must enter your name'
    })
    showError('name','You must enter your name')
  }

  //validate email
  const email = emailInput.value.trim()
  if (!isEmailValid(email)) {
    summary.push({
      href: '#email',
      text: 'You must enter a valid email address'
    })
    showError('email','You must enter a valid email address')
  }

  //validate content
  const content = contentInput.value.trim()
  if (content === '') {
    summary.push({
      href: '#content',
      text: 'You must enter a message'
    })
    showError('content','You must enter a message')
  }

  if (summary.length > 0) {
    createSummary(summary)
  }
  else {
    form.submit()
  }
})