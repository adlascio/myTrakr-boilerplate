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
  $('input#newAccount').keyup(function(e){
    e.preventDefault();
    let newAccount = e.target.value;
    $('button#newAccountBtn').on('click', (e) => {
      e.preventDefault();
      $("#accountSummary").empty();
      $('#accountSummary').append('<li>'+newAccount+'</li>');
      console.log('New Account added');
    });
   })
});