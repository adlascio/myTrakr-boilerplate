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

document.getElementById('form1').addEventListener('text', function(evt){
  evt.preventDefault();
  document.getElementById('donate').style.display = 'none';
  document.getElementById('topMessage').style.display = 'none';
})