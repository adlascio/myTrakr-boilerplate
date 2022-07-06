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

// $(document).ready(() => {
//   // Creating new Accounts
//   $('form#newAccount').submit((e)=>{
//     e.preventDefault();
//     let newAccount = new Account($('input#newAccount').val());
//     console.log(newAccount);
//     $('ul#accountSummary').append('<li>'+'Account: '+newAccount.username+'Transactions: '+newAccount.transactions+'</li>');
//   });

// });
//_----------------------------------
// $(document).ready(() => {
//   // Creating new Accounts
//   $('form#newAccount').submit((e)=>{
//     e.preventDefault();
//     let newAccount = new Account($('input#newAccount').val());
//     console.log(newAccount);
//     $.post('_new_Accounts.txt',{
//       new_Account: newAccount
//     },function(data,status){
//       $('input#newAccount').html(data);
//     });
//     //$('ul#accountSummary').append('<li>'+'Account: '+newAccount.username+'Transactions: '+newAccount.transactions+'</li>');

//   });
 
// });
 //-------------------------------------
 $(document).ready(() => {
  // Creating new Accounts
  $('form#newAccount').submit((e)=>{
    e.preventDefault();
    if($('#inputnewAccount').val() !== ''){
      let newAccount = new Account($('#inputnewAccount').val());
      console.log(newAccount);
      // $('#inputnewAccount').load('/accounts', (response, status, xhr) => {
      //   console.log('res', response);
      //   console.log('status', status);
      //   console.log('xhr', xhr);
      // });
      //------------------------
      // $.ajax({
      //   method: 'get',
      //   url: 'http://localhost:3000/acounts',
      //   success: function(newAccount){
      //     $.each(newAccount,function(newAccount){
      //       $('ul#accountSummary').append('<li>'+'Account: '+newAccount.username+'Transactions: '+newAccount.transactions+'</li>');
      //     });
      //   },
      //   error: function(){
      //     alert('error loading');
      //   }
      // });
      $('ul#accountSummary').append('<li>'+'Account: '+newAccount.username+'Transactions: '+newAccount.transactions+'</li>');  
    }else{
      alert('Please enter an Account');
    }
  });
 
});

