let hourHand=document.querySelector('[data-hour]')
let minHand=document.querySelector("[data-min]")
let secHand=document.querySelector("[data-sec]")



function displayTime(){
    let time=new Date();
    let sec=time.getSeconds();
    let min=time.getMinutes();
    let hr=time.getHours();
    
    let secRotation=6*sec;
    let minratio=(sec/60)
    let minRotation=6*(min+minratio);
    let hrRotation=30*hr+min/2;

    hourHand.style.transform=`rotate(${hrRotation}deg)`;
    minHand.style.transform=`rotate(${minRotation}deg)`;
    secHand.style.transform=`rotate(${secRotation}deg)`;
}
setInterval(displayTime,1000)
displayTime()
