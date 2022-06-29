$(() => {
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

    $(document).ready(function(){
        $("input[type='radio']").click(function(){
            var radioValue = $("input[name='transaction']:checked").val();
            if(radioValue){
                console.log(radioValue);
            }
        });
    });



});