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
    
    // Getting value from radio btn - transaction
    // $(document).ready(function(){
    //     $("input[type='radio']").click(function(){
    //         let radioValue = $("input[name='transaction']:checked").val();
    //         if(radioValue === "deposit"){
    //             let deposit = radioValue;
    //             console.log(deposit);
    //         } else if (radioValue === "withdraw") {
    //             let withdraw = radioValue;
    //             console.log(withdraw);
    //         } else {
    //             let transfer = radioValue;
    //             console.log(transfer);
    //         };
    //     });
    // });
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
    
      });




});


