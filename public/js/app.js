console.log('app.js is running fine')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    if (location===undefined){
        messageTwo.textContent=''
        return messageOne.textContent='Please enter a location'
    }
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }
        else       {messageOne.textContent=data.location
        messageTwo.textContent=data.forecast}
    }).catch((error=>{console.log(error)}))
}).catch((error)=>{console.log(error)})
})