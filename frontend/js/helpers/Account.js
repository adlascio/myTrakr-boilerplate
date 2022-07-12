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
  $('form#newAccount').submit((e)=>{
    e.preventDefault();
    //Validate the input isnt empty
    if($('#inputnewAccount').val() !== ''){
      let input = $('#inputnewAccount').val();
      let id = 'username';
      localStorage.setItem(input,id);
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
        $('ul#accountSummary').append('<li>'+'Account: '+usrName+'Ttransacions: '+tranS+'</li>');
        console.log('Accounts Posted');
      });
    }else{
      alert('Please enter an Account');
    }
  });
  //Post the Accounts in the Transaction fields
  for(let i = 0; i < localStorage.length; i++){
    key = localStorage.key(i);
    $('#accountSelect').append('<option value=>'+key+'</option>');
    $('#fromSelect').append('<option value=>'+key+'</option>');
    $('#toSelect').append('<option value=>'+key+'</option>');
    console.log('Accounts Posted');
  }

});