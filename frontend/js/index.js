$(() => {
    //Submiting form
    $("form").submit((e) => {
        e.preventDefault();
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

    // Adding transaction 
    $('#addTransaction').click((e) => {
        e.preventDefault();
        let transactionType = $('input[name="transaction"]:checked').val();
        let description = $('#transactionDesription').val();
        let amount = $('#transactionAmount').val();
        let category = $('#transactionCategory').val();
        let account = $('#accountSelect').val();
        let fromAccount = $('#fromSelect').val();
        let toAccount = $('#toSelect').val();

        console.log(account);

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
            // $("#transactionsTable").append(
            //     `<tr>
            //         <td>${data[0].id}</td> 
            //         <td>${data[0].accountID}</td> 
            //         <td>${data[0].transactionType}</td> 
            //         <td>${data[0].category}</td> 
            //         <td>${data[0].description}</td>
            //         <td>${data[0].amount}</td> 
            //         <td>${data[0].accountIdFrom == 0 ? `-` : data[0].accountIdFrom}</td> 
            //         <td>${data[0].accountIdTo == 0 ? `-` : data[0].accountIdTo}</td>'
            // //     </tr>`
            //   );
        });

    });

});