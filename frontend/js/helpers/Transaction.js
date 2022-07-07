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

class Transfer extends Transaction {
  constructor(accountIdFrom, accountIdTo) {
    super();
    this.accountIdForm = accountIdFrom;
    this.accountIdTo = accountIdTo
  }
}





// will be in event listener for trans button after nicolo finishes
$.ajax({
  method: 'get',
  url: 'http://localhost:3000/transactions',
  dataType: 'json',
}).done((data) => {
  console.log('data get transactions ajax', data);
  const fakeData = [{id: "123",
  accountIdFrom: "",
                     userName: "Umudoo" } ]
  $.each(data, (i, transaction) => {
    const trans = new Transaction(transaction.value);
    $("#transaction_list").append(`
    <tr>
      <td>${fakeData[0].id}</td>
      <td>${fakeData[0].userName}</td>
      <td>${fakeData.type}</td>
      <td>${fakeData.category}</td>
      <td>${fakeData.description}</td>
      <td>${fakeData.transactionAmount}</td>
      <td>${fakeData.accountIdFrom}</td>
      <td>${fakeData.accountIdTo}</td>
    </tr>
    `)
    console.log('testingtrns', trans)
  })
})