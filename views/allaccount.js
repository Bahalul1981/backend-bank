
const accountList=document.getElementById("accountList")

const deleteAccount = async (account) => {
    console.log(account);

    
    const deletdata = await fetch(`/allaccount/${account._id}`, { method: 'DELETE' });
    const newdeletdata = await deletdata.json();
  
    getAllAccounts();
}

const editAccount = async (account, method) => {
    const addInput = document.getElementById(`add-${account._id}`).value;
    console.log(account);
    console.log(method);
    console.log(addInput);


 
    let newbalance = 0;
    if (method === 'add') {
        newbalance = parseInt(account.amount) + parseInt(addInput)
    } else {
        newbalance=parseInt(account.amount) - parseInt(addInput)
    }


  
    const res = await fetch(`/allaccount/${account._id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        amount: newbalance
    })
    })
    const data = res.json();    
 
    getAllAccounts();
}







const renderAllAccounts = (accounts) => {
    accountList.innerHTML = '';
    accounts.forEach(element => {
        accountList.innerHTML+=`Account number:${element._id}<br>
        Account Holder Name: ${element.name}<br>
        Amount of cash${element.amount} 
        <br>
        <input type="text" name="addmoney" id="add-${element._id}">
        <br>
        <button class="add" id="edit-${element._id}" data-accountid="${element._id}">Add extra cash</button> 
        <button class="remove" id="remove-${element._id}" data-accountid="${element._id}">Remove extra cash</button> 
        <br> <br>
        <button class="delete" id="delete-${element._id}" data-accountid="${element._id}">Delet account</button> <hr>`;
    });
    
    // Delet account
    document.querySelectorAll('button.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            deleteAccount(accounts.find((acc) => acc._id === e.target.dataset.accountid));
        })
    });

    // Edit account
    document.querySelectorAll('button.add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            editAccount(accounts.find((acc) => acc._id === e.target.dataset.accountid), 'add');
        })
    });
    document.querySelectorAll('button.remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            editAccount(accounts.find((acc) => acc._id === e.target.dataset.accountid), 'remove');
        })
    });
}




const getAllAccounts = async () => {

    // Fetcha alla accounts 
    const newres = await fetch('/allaccount')
    const data = await newres.json();

    // Använd datan för att rita ut/rendera HTML
    renderAllAccounts(data);
}
getAllAccounts();