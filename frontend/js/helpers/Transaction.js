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

class Transfer extends Transaction{
  constructor(accountIdFrom,accountIdTo){
    super(Transaction);
    this.accountIdFrom = accountIdFrom;
    this.accountIdTo = accountIdTo;
  }
}

// Validation of Transaction fields & Transfer
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
      }else if($('#transactionAmount').val() > Account.balance){
        alert('Insuficient Balance to Complete this Transaction, Please make a Deposit First');
      }else if($('#fromSelect').val() === $('#toSelect').val()){
        alert('Accounts Must be Different in order to Proceed with this Transaction');
      }
    });
    
    // Adding new transaction 
    $('#addTransaction').click((e) => {
      e.preventDefault();
      let transactionType = $('input[name="transaction"]:checked').val();
      let description = $('#transactionDesription').val();
      let amount = $('#transactionAmount').val();
      let category = $('#transactionCategory').val();
      let account = $('#accountSelect').val();
      let fromAccount = $('#fromSelect').val();
      let toAccount = $('#toSelect').val();

      $.ajax({
          url: "http://localhost:3000/transaction", 
          type: "post",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify({
              newTransaction: {
                  transactionType: transactionType,
                  description: description,
                  amount: amount,
                  category: category,
                  accountId: account,
                  accountIdFrom: fromAccount,
                  accountIdTo: toAccount,
              },
          }),
      }).done((data) => {
          console.log(data);
          $("#transactionsTable").append(
              `<tr>
                  <td>${data[0].id}</td> 
                  <td>${data[0].accountId}</td> 
                  <td>${data[0].transactionType}</td> 
                  <td>${data[0].category}</td> 
                  <td>${data[0].description}</td>
                  <td>${data[0].amount}</td> 
                  <td>${data[0].accountIdFrom == 0 ? `-` : data[0].accountIdFrom}</td> 
                  <td>${data[0].accountIdTo == 0 ? `-` : data[0].accountIdTo}</td>'
             </tr>`
            );
      });

  });
});