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
    this.accountIdFrom = accountIdFrom;
    this.accountIdTo = accountIdTo;
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
    
    // Adding new transaction 
    $('#addTransaction').click((e) => {
      e.preventDefault();
      let transactionType = $('input[name="transaction"]:checked').val();
      let description = $('#transactionDesription').val();
      let amount = $('#transactionAmount').val();
      let category = $('#categorySelect').val();
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
          console.log("Transaction posted", data);
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

  $(document).ready(() => {
      $.ajax({
          url: "http://localhost:3000/transactions  ",
          type: "get",
          contentType: "application/json",
          dataType: "json",
      }).done((data) => {

        // data.forEach(account => {
        //     console.log("Get transactions.", data);
        //     let transactions = account.transactions;
        //     for (let i = 0; i < transactions.length; i++) {
        //       $("#transactionsTable").append(
        //         `<tr>
        //             <td>${transactions[i].accountId}</td> 
        //             <td>${account.username}</td> 
        //             <td>${transactions[i].id}</td> 
        //             <td>${transactions[i].transaction}</td> 
        //             <td>${transactions[i].category}</td> 
        //             <td>${transactions[i].amount}</td> 
        //             <td>${transactions[i].accountIdFrom == 0 ? `-` : transactions[i].accountIdFrom}</td> 
        //             <td>${transactions[i].accountIdTo == 0 ? `-` : transactions[i].accountIdTo}</td>
        //         <tr/>`
        //       );
        //     }
        //   });


      });
  });

});