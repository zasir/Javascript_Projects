const form = document.querySelector('#calc');
form.addEventListener('click', (e) => {
   e.preventDefault()
  

  const height = parseInt(document.querySelector('#height').value);
  
  const weight = parseInt(document.querySelector('#weight').value);
  const result = document.querySelector('#results');
  if (height === '' || isNaN(height) || height < 0) {
    result.innerHTML = 'Please provide valid height';
  } else if (weight === '' || isNaN(weight) || weight < 0) {
    result.innerHTML = 'Please provide valid weight';
  } else {
    result.innerHTML = (weight / ((height * height) / 10000)).toFixed(2);
    const span= document.querySelectorAll("span")
    if(result.innerHTML<18.6){
        span[0].style.backgroundColor="green"

    }else if(result.innerHTML>=18.6 && result.innerHTML<=24.9){
        span[1].style.backgroundColor="green"

    }else{
        span[2].style.backgroundColor="red"

    }

  }


})

