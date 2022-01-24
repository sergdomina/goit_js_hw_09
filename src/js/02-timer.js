import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css'
let userDate=null;
const refs={
    input:document.querySelector('#datetime-picker'),
    startBtn:document.querySelector('[data-start]'),
    days:document.querySelector('[data-days]'),
    hours:document.querySelector('[data-hours]'),
    minutes:document.querySelector('[data-minutes]'),
    seconds:document.querySelector('[data-seconds]')
}
refs.startBtn.setAttribute('disabled',true)
refs.startBtn.addEventListener('click',onStartClick)
const options={
    enableTime:true,
    time_24hr:true,
    defaultDate:new Date(),
    onClose(selectedDates){
        userDate=selectedDates[0]
        if(userDate<Date.now()){
            Notify.failure("Please choose a date in the future");
            refs.startBtn.setAttribute('disabled',true)
            return
        }
        refs.startBtn.removeAttribute('disabled')
    }
}
flatpickr('input#datetime-picker',options)
function onStartClick(){
    refs.startBtn.setAttribute('disabled',true)
    refs.input.setAttribute('disabled',true)

    setInterval(()=>{
        if(userDate<=Date.now())return

        const currentTime=convertMs(userDate-Date.now())
        
        refs.days.textContent=addLeadingZero(currentTime.days)
        refs.hours.textContent=addLeadingZero(currentTime.hours)
        refs.minutes.textContent=addLeadingZero(currentTime.minutes)
        refs.seconds.textContent=addLeadingZero(currentTime.seconds)
    },1000)
}
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value){
      return value.toString().padStart(2,'0')
    }