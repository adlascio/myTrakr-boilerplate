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

$(document).ready(() => {
  // Creating new Accounts
  $('form#newAccount').submit((e)=>{
    e.preventDefault();
    let newAccount = new Account($('input#newAccount').val());
    console.log(newAccount);
    $('ul#accountSummary').append('<li>'+'Account: '+newAccount.username+'Transactions: '+newAccount.transactions+'</li>');
  });

});