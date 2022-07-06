$(() => {
    const categorySelect = $("#categorySelect");
    const categoryInput = $("#categoryInput");
    const categoryButton = $("#categoryBtn");
    categoryInput.hide();
    categoryButton.hide();

    // Hidding and showing category input and btn
    categorySelect.change((e) => {
        e.preventDefault();
        if ($("#categorySelect").val() === "addNewCategory") {
            categoryInput.show();
            categoryButton.show();
        } else {
            categoryInput.hide();
            categoryButton.hide();
        }
    });

      
    
    $('#categoryBtn').click((e) => {
        e.preventDefault();
        const categoryInputValue = categoryInput.val();
        //Validation - empty input
        if ($("#categoryInput").val() === "") {
            alert("Please enter a category"); 
            return;
        }

      });
    
});
