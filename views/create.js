
const displayall=document.getElementById("displayall")

document.getElementById("createform").addEventListener("submit", async (evt)=>{
    evt.preventDefault();
    
    const nameValue=document.getElementById("name").value;
    const amountValue=document.getElementById("amount").value;
   console.log(nameValue,amountValue)
    
   const res = await fetch('/creataccount', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           name: nameValue,
           amount: amountValue
       })
   })
   const data = await res.json();

   location.href = '/allaccounts.html';

})