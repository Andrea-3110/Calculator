const valueBtn =document.querySelectorAll('[data-value]')
const operatorBtn =document.querySelectorAll('[data-operator]')
const screen = document.getElementById('screen')
const operatos = ['+','-','*','/','%']

function evaluate(expression) {
   return new Function(`return ${expression}`)();
}

function add(num1,num2){
   return num1+num2;
}
function subtract(num1,num2){
   return num1-num2;
}
function multiply(num1,num2){
   return num1*num2;
}
function divide(num1,num2){
   return num1/num2;
}
function percentile(num1,num2){
   return num1%num2;
}

function operate(num1,op,num2){
   switch (op) {
      case '+':
         return add(num1,num2)
      case '-':
         return subtract(num1,num2)
      case '*':
         return multiply(num1,num2)
      case '/':
         return divide(num1,num2)
      case '%':
         return percentile(num1,num2)
      default:
         break;
   }
}


function validate(str) {

   console.log(str);
   try {
      str = str.split(" ")
   } catch (error) {
      return false
   }
   
   var size = Object.keys(str).length;
   for (let i = 0; i < size; i++) {
      if(i%2==0){
         if (str[i] != '' && !operatos.includes(str[i])) {
            continue;
         }
         else{
            return false
         }
      }
   }
   return true
}


function getPair(str) {
   console.log(str);

   var size;
   if(typeof str == 'object'){
      size = Object.keys(str).length;
   }
   if (size == 1) {return str}

   if(typeof str == 'string'){
      str = str.split(" ")
   }
   const keys = Reflect.ownKeys(str)


   let res = operate(parseInt(str[0]),str[1],parseInt(str[2]));
   
   for (let i = 0; i < 3; i++) {;
      delete str[keys[i]]
   }
   str[keys[0]] = res
   
   var newStr = {};
   var newIndex = 0

   for(var index in str){
      if(str.hasOwnProperty(index)){
         newStr[newIndex] = str[index];
         newIndex++
      }
   }

   return getPair(newStr)
   
}

let value = null;

valueBtn.forEach(e => {
   e.addEventListener('click',()=>{
      let nodeValue = e.attributes['data-value'].nodeValue
      if(value == null){
         value = nodeValue
      }else{
         value += nodeValue
      }
      
      screen.value = value
   })
   
});

operatorBtn.forEach(e => {
   e.addEventListener('click',()=>{
      let nodeValue = e.attributes['data-operator'].nodeValue
      if(value != null && nodeValue != '=' && nodeValue != 'clear'){
         value += nodeValue

      }
      else if(nodeValue == '='){
         if (validate(value)) {
            value = Math.round(getPair(value)[0] * 100) / 100
         }
         else{
            value = 'ERROR!'
         }
         
      }
      else if(nodeValue == 'clear'){
         value = ''
         console.log(value);
      }
      screen.value = value

   })
   
});




