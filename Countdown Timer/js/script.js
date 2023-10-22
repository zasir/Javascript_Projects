
const inputs=document.querySelectorAll(".date-time")
let inputDateTime=document.querySelector("#date-time")
let endDate;
inputs.forEach(element => {
                
                element.value="-"
            });




let counter=()=>{
    endDate=inputDateTime.value
    let currentDate=new Date();
    let end=new Date(endDate)
    
    let diff=(end-currentDate)/1000 
    if(diff<0){
        inputs.forEach(element => {
                
            element.value="-"
        });
        return
    } 
    let gettingDays=Math.floor(diff/3600/24)
    inputs[0].value=gettingDays
   

    let gettingHrs=Math.floor(diff/3600)-(gettingDays*24)
    inputs[1].value=gettingHrs

    let gettingMin=Math.floor(diff/60)%60
    inputs[2].value=gettingMin

    let gettingSec=Math.floor(diff%60)
    inputs[3].value=gettingSec



}
let interval
let btn=document.querySelectorAll("button")
        btn[0].addEventListener('click',(e)=>{
            
            interval=setInterval(counter,1000)
                counter()
        document.querySelector("h1").innerText="We Are Coming Soon"  
        
            document.getElementById("endDate").innerText=new Date(endDate)
               
        })

        btn[1].addEventListener('click',()=>{
            document.querySelector("h1").innerText="Please Set the counter" 
            document.querySelector("#date-time").value=""
            document.getElementById("endDate").innerText=""
            
            diff=-1;
            clearInterval(interval)
            inputs.forEach(element => {
                
                element.value="-"
            });
        })

