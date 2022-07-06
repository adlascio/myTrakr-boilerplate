class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

// Validation input - used in index.js for now
// $(() => {
//   $("#transactionForm").submit((e) => {
//     e.preventDefault();
//     if($("#transactionDesription").val() === '' & $("#transactionAmount").val() === '') {
//         alert("Please enter a description and amount!");
//         return;
//     } else if( $("#transactionDesription").val() === '') {
//         alert("Please enter an description!");
//         return;
//     } else if($("#transactionAmount").val() === '') {
//         alert("Please enter an amount!");
//         return; }
//     });
// });