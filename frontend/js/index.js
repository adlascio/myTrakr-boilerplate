$(() => {
  //Start coding here!
});

  //Add event listener (using jQuery) when the form is submitted.
  $("#formNewAccount").submit((e) => {
    e.preventDefault();
    console.log($('input').val());
  });

  $("#buttonNewAccount").click(function () {
    var inputAccount = $("#inputNewAccount").val();
    alert(inputAccount);

    const getAccount = new Promise ((resolve, reject) => {
      resolve('Success');
    });

    $.ajax({
      method:'get',
      url: 'http://localhost:3000/accounts',
      dataType: 'json',
    }).done((accountList) => {
      console.log('Get account value.', accountList);
      
      let validAccount = true;

      for (let i = 0; i < accountList.length; i++) {
        if (inputAccount == "") {
          alert("Account is empty.");
          validAccount = false;
          break;
        }
        if (inputAccount == accountList[i]) {
          alert("Account exists.");
          validAccount = false;
          break;
        }
      } 

      if (validAccount) {
        $.ajax({
          method: 'POST',
          data: {
            newAccount: inputAccount,
          },
          url: 'http://localhost:3000/accounts',
          dataType: 'text'
        }).done((data) => {
          console.log('New account posted.', data);
        });
      }
      
    });

  });