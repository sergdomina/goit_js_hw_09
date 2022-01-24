const startBtn=document.querySelector('[data-start]')
const stopBtn=document.querySelector('[data-stop]')
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

let intervalId=null
stopBtn.setAttribute('disabled',true)
startBtn.addEventListener('click',()=>{
    document.body.style.background= getRandomHexColor()
    startBtn.setAttribute('disabled',true)
    stopBtn.removeAttribute('disabled')
    intervalId=setInterval(()=>{
        document.body.style.background= getRandomHexColor()
    },1000)
})
stopBtn.addEventListener('click',()=>{
    clearInterval(intervalId)
    startBtn.removeAttribute('disabled')
    stopBtn.setAttribute('disabled',true)
})
