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

// Validation of Transaction fields
$(() => {
  $("#transactionForm").submit((e) => {
    e.preventDefault();
    if($("#transactionDesription").val() === '' & $("#transactionAmount").val() === '') {
        alert("Please enter a description and amount!");
        return;
    } else if( $("#transactionDesription").val() === '') {
        alert("Please enter an description!");
        return;
    } else if($("#transactionAmount").val() === '') {
        alert("Please enter an amount!");
        return; 
      }else if($("#transactionAmount").val() <= 0){
        alert('Please enter an Amount Grather than 0');
        return;
      }else if($('#transferInput').val()){
        //Pending to add code here ... I run out of time, I'll add it tonight
        // Just in case you pull the code before I get home :)
      }
    });
});

class Transfer extends Transaction{
  constructor(accountIdFrom,accountIdTo){
    this.accountIdFrom = accountIdFrom;
    this.accountIdTo = accountIdTo;
  }
}