import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve,reject)=>{
  const shouldResolve = Math.random() > 0.3;
  setTimeout(()=>{
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`)
    }
  },delay)
})
}
const form=document.querySelector('.form')
form.addEventListener('submit',handlSubmit)
function handlSubmit(event){
  event.preventDefault()
  const {delay,step,amount}=event.currentTarget

  let delayPromise=Number(delay.value)
  for (let i = 1; i <= amount.value; i++) {
    createPromise(i,delayPromise).then(onFulfield).catch(onRejected)
    delayPromise+=Number(step.value)
  }
}
function onFulfield(result){
  Notify.success(result)
}
function onRejected(error){Notify.failure(error)}