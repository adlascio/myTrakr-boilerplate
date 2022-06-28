//common functions that can be used in different cases

$(document).ready(() => {
    // Creating new Accounts
    $('button#newAccountBtn').on('click', () => {
        console.log('New Account added');
        const accountSummary = document.getElementById('accountSummary');
        const newAccount = document.createElement('li');
        newAccount.className = 'account';
        newAccount.id = "account";
        accountSummary.appendChild(newAccount);
      });
});