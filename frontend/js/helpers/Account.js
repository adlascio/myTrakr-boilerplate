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
  // Creating new Accounts
  $('form#newAccount').submit((e)=>{
    e.preventDefault();
    if($('#inputnewAccount').val() !== ''){
      let newAccount = new Account($('#inputnewAccount').val());
      console.log(newAccount);
      // GET the New Accounts
      $.ajax({
        method: 'get',
        url: 'http://localhost:3000/accounts',
        success: function(newAccount){
          $.each(newAccount,function(newAccount){
            console.log('Account Added');
          });
        },
        error: function(){
          alert('error loading');
        }
      });
      // Post the New Accounts
      $.ajax({
        method: 'post',
        data: {
          username: 'username',
          transactions: 'transactions',
        },
        url: 'http://localhost:3000/accounts',
        dataType: 'text',
      }).done((data) => {
        $('ul#accountSummary').append('<li>'+'Account: '+newAccount.username+'Transactions: '+newAccount.transactions+'</li>');  
      });
    }else{
      alert('Please enter an Account');
    }
  });
 
});

