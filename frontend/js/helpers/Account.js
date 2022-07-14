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

 //-------------------------------------
$(document).ready(() => {
  //get accounts
  const accountSelect = $('#accountSelect');
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
    });
  });
  
  $('form#newAccount').submit((e)=>{
    e.preventDefault();
    //Validate the input isnt empty
    if($('#inputnewAccount').val() !== ''){
      let input = $('#inputnewAccount').val();
      let id = 'username';
      // localStorage.setItem(input,id);
      let newAccount = new Account(input);
      let usrName = newAccount.username;
      let tranS = newAccount.transactions;
      console.log(newAccount);
      console.log('Account Created');

      //Post the Accounts on localhost
      $.ajax({
      method: 'post',
      data: JSON.stringify({
        newAccount:{
        username: `${usrName}`,
        transactions: [],
        },
      }),
      url: 'http://localhost:3000/accounts',
      contentType: 'application/json',
      dataType: 'json',
      }).done((data) => {
        console.log('Accounts Posted');
        accountSelect.append(`<option value=${data.id}>${data.username}</option>`);
      });
    }else{
      alert('Please enter an Account');
    }
  });

});