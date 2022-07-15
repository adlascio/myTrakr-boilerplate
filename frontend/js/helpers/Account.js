class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }
}
<<<<<<< HEAD

 //-------------------------------------
$(document).ready(() => {
  //get accounts
  const accountSelect = $('#accountSelect');
  const fromSelect = $('#fromSelect');
  const toSelect = $('#toSelect');
  const filterSelect = $("#filterSelect");

  $.ajax({
    method:'get',
    url:'http://localhost:3000/accounts',
    contentType:'application/json'
  }).done((data) => {
    console.log('data get accounts',data)
    let accountOptions = $.map(data, (item) => {
      $('ul#accountSummary').append(`<li> Account: ${item.username} Balance: ${item.balance} </li>`);
      $('#accountSelect').append(`<option value=${item.id}>${item.username}</option>`);
      $('#fromSelect').append(`<option value=${item.id}>${item.username}</option>`);
      $('#toSelect').append(`<option value=${item.id}>${item.username}</option>`);
      $('#filterSelect').append(`<option value=${item.id}>${item.username}</option>`);
    });
  });
  
  $('form#newAccount').submit((e)=>{
    e.preventDefault();
    //Validate the input isnt empty
    if($('#inputnewAccount').val() !== ''){
      let input = $('#inputnewAccount').val();
      let newAccount = new Account(input);
      let usrName = newAccount.username;
      let balance = newAccount.balance;
      console.log(newAccount);
      console.log('Account Created');

      //Post the Accounts to server
      $.ajax({
      method: 'post',
      data: JSON.stringify({
        newAccount:{
        username: `${usrName}`,
        balance: `${balance}`,
        },
      }),
      url: 'http://localhost:3000/accounts',
      contentType: 'application/json',
      dataType: 'json',
      }).done((data) => {
        console.log('Accounts Posted');
        accountSelect.append(`<option value=${data.id}>${data.username}</option>`);
        fromSelect.append(`<option value=${data.id}>${data.username}</option>`);
        toSelect.append(`<option value=${data.id}>${data.username}</option>`);
        filterSelect.append(`<option value=${data.id}>${data.username}</option>`);

        $('#inputnewAccount').val('');
      });
    }else{
      alert('Please enter an Account');
    }
  });

  $.ajax({
    method: "get",
    url: "http://localhost:3000/accounts",
    dataType: "json",
  }).done((accountList) => {
    console.log("Get transactions.", accountList);
 
    accountList.forEach(account => {
      let transactions = account.transactions;
      for (let i = 0; i < transactions.length; i++) {
        $("#transactionsTable").append(
          `<tr>
              <td>${transactions[i].id}</td> 
              <td>${account.username}</td> 
              <td>${transactions[i].transactionType}</td> 
              <td>${transactions[i].category}</td> 
              <td>${transactions[i].description}</td>
              <td>${transactions[i].amount}</td> 
              <td>${transactions[i].accountIdFrom == 0 ? `-` : transactions[i].accountIdFrom}</td> 
              <td>${transactions[i].accountIdTo == 0 ? `-` : transactions[i].accountIdTo}</td>
          <tr/>`
        );
      }
    });
  });
});
=======
>>>>>>> 3c1ef1047b50cc4f1db42263d0a23b0843a7030d
