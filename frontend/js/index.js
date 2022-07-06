$(() => {
    //Submiting form
    $("form").submit((event) => {
        event.preventDefault();
        });

    //Hidding and showing transaction options
    $('[name=transaction]').change((e) => {
    e.preventDefault();
    let selected = $('input[name="transaction"]:checked').val();
    transValue = selected;
    if (transValue === "withdraw" || transValue === "deposit" ) {
        $("#divAcc").show()
        $("#divFrom").hide()
        $("#divTo").hide()
    } else if (transValue === "transfer") {
        $("#divAcc").hide()
        $("#divFrom").show()
        $("#divTo").show()
    }})
    
    //Getting value from radio btn - transaction
    $(document).ready(function(){
        $("input[type='radio']").click(function(){
            let radioValue = $("input[name='transaction']:checked").val();
            if(radioValue === "deposit"){
                let deposit = radioValue;
                console.log(deposit);
            } else if (radioValue === "withdraw") {
                let withdraw = radioValue;
                console.log(withdraw);
            } else {
                let transfer = radioValue;
                console.log(transfer);
            };
        });
    });
    
    // // Adding transaction 
    // $('#addTransaction').on('click', (e) => {
    //     console.log("test");
    //     // let accountId = $('#accountId').val();
    //     let transactionType = $('input[name="transaction"]:checked').val();
    //     let description = $('#transactionDesription').val();
    //     let amount = $('#transactionAmount').val();

    //     transactionDataJSON = JSON.stringify({
    //         newTransaction: {
    //             accountId: '',
    //             transactionType: transactionType,
    //             accountIdFrom: '',
    //             accountIdTo: '',
    //             category: '',
    //             description: description,
    //             amount: amount,
    //         },
    //     });
    //     $.ajax({
    //         method: 'post',
    //         data: transactionDataJSON,
    //         url: 'http://localhost:3000/transaction',
    //         dataType: 'json',
    //         contentType: 'application/json',
    //     }).done((data) => {
    //         console.log(transactionDataJSON);
    //     });
    // });

    $("#transactionForm").submit((event) => {
        event.preventDefault();
        if($("#transactionDesription").val() === '' & $("#transactionAmount").val() === '') {
            alert("Please enter a description and amount!");
            return;
        } else if( $("#transactionDesription").val() === '') {
            alert("Please enter an description!");
            return;
        } else if($("#transactionAmount").val() === '') {
            alert("Please enter an amount!");
            return; }


        

        const transactionType = $("input[name='transaction']:checked").val();
        const transactionCategory = categorySelect.val();
        let transactionAmount;
        const transactionDescription = $("#description").val();
        let transactionUserName;
        let userAccountId;
        let userAccountIdFrom;
        let userAccountIdTo;
    
        if(transactionType === "Deposit" || transactionType === "Withdraw"){
          userAccountId = $("#accountSelect").val();
          transactionUserName = $("[name=accountSelect] option:selected").text();
    
          if(transactionType === "Deposit"){
            transactionAmount = Number($("#amount").val());
          }else{
            transactionAmount = -Number($("#amount").val());
          }
        }
        if(transactionType === "Transfer"){
          userAccountId = $("#fromSelect").val();
          transactionUserName = $("[name=fromSelect] option:selected").text();
          userAccountIdFrom = $("[name=fromSelect] option:selected").text();
          userAccountIdTo = $("[name=toSelect] option:selected").text();
    
          if(transactionUserName === userAccountIdFrom){
            transactionAmount = -Number($("#amount").val());
          }else{
            transactionAmount = Number($("#amount").val());
          }
        }else{
          userAccountIdFrom = null;
          userAccountIdTo = null;
        }
    
        const newTransaction = {
          accountId: `${userAccountId}`, // account ID for Deposits or Withdraws
          accountIdFrom: `${userAccountIdFrom}`, // sender ID if type = 'Transfer', otherwise null
          accountIdTo: `${userAccountIdTo}`, // receiver ID if type = 'Transfer', otherwise null
          // all info from form{{
          userName: `${transactionUserName}`,
          type: `${transactionType}`,
          category: `${transactionCategory}`,
          description: `${transactionDescription}`,
          transactionAmount: `${transactionAmount}`,
        };
        console.log(newTransaction);

        $.ajax({
          url: "http://localhost:3000/transaction",
          type: "post",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify({
            newTransaction
          }),
        })
          .done((data) => {
            console.log(data);
            $("#amount").val("");
            $("#description").val("");
            alert("New transaction added");
    
            const td = $.map(data, (item) => {
              return `
                <tr>
                  <td>${item.id}</td>
                  <td>${item.userName}</td>
                  <td>${item.type}</td>
                  <td>${item.category}</td>
                  <td>${item.description}</td>
                  <td>${item.transactionAmount}</td>
                  <td>${item.accountIdFrom}</td>
                  <td>${item.accountIdTo}</td>
                </tr>
                `;
            });
            // console.log(td);
            $("#transactionTable").append(td);
    
          })
          .fail((error) => {
            alert(error);
          });
    
      });




});


