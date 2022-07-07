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
  // Event Listener for when we submit the New Account Form
  $('form#newAccount').submit((e)=>{
    e.preventDefault();
    // Validate that input isnt empty
    if($('#inputnewAccount').val() !== ''){
      // GET the New Accounts
      $.ajax({
        method: 'get',
        url: 'http://localhost:3000/accounts',
        contentType: 'application/json',
        dataType:'json',
      }).done(()=>{
        console.log('Data Obtained');
      });
      // Create the New Account
      let newAccount = new Account($('#inputnewAccount').val());
      console.log(newAccount);
      console.log('Account Added');
      // Ad New Account to Summary
      $('ul#accountSummary').append('<li>'+'Account: '+newAccount.username+'Transactions: '+newAccount.transactions+'</li>');
      // Post the New Accounts
      let usrname = newAccount.username;
      let trans = newAccount.transactions;
      $.ajax({
        method: 'post',
        data: JSON.stringify({
          newAccount:{
            username: `${usrname}`,
            transactions: `${trans}`,
          },
        }),
        url: 'http://localhost:3000/accounts',
        contentType: 'application/json',
        dataType: 'json',
      }).done(() => {
      });
    }else{
      alert('Please enter an Account');
    }
  });
 
});