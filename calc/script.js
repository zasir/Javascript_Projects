class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()

    }

    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined
 
    }

    delete(){ 
        this.currentOperand=this.currentOperand.substring(0,(this.currentOperand.length-1))
    }

    appendNumber(number){
        if(number=='.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString() + number.toString()
        

    }
    
    chooseOperation(operation){
        
        if(this.currentOperand === '') return
        

        if(this.previousOperand !== ''){
            this.compute()
           
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
        

    }
    
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)//converting string to no.
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current) ) return
        switch(this.operation){
            case '+':
                computation=prev+current
                break
            case '-':
            
            computation=prev-current
                break
            case '*':
                computation=prev*current
                break
            case '÷':
                computation=prev/current
                break
            case '%':
                computation=(prev/100)*current
                break
            default:
                return            
        }

        this.currentOperand=computation
        this.previousOperand=''
        this.operation=undefined

    }

    getDisplayNumber(number){
        

        const stringNumber=number.toString()
        const integerDigits=parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }else{
            integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits!=null){
            return  `${integerDisplay}.${decimalDigits}`

        }else{
            return integerDisplay
        }
        
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null){
            this.previousOperandTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText=this.previousOperand
        }
        
    }

}









const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalButton=document.querySelector('[data-equals]')
const deleteButton=document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-all-clear]')
const previousOperandTextElement=document.querySelector('[data-previous-operand]')
const currentOperandTextElement=document.querySelector('[data-current-operand]')



const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{

        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        
    }) 
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        
    }) 
})

equalButton.addEventListener('click',e=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',e=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',e=>{
    calculator.delete()
    calculator.updateDisplay()
})



function myFunction(){
    let element = document.body.classList;
    element.toggle("darkmode")
    let introdk=document.querySelector('.intro').classList;
    introdk.toggle("introdkmode")
    let darkmodebtndk=document.querySelector('.darkmodebtn').classList;
    darkmodebtndk.toggle("darkmodebtndk");
    let buttons=document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.toggle("buttondk");
      });
    document.querySelector('.calc_border').classList.toggle("calc_outputdk");
    let out=document.querySelector('.output').classList;
    out.toggle("outputdk")
    
   

   
}