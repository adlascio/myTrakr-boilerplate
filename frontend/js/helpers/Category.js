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

    //Creating new categories in list
    $(document).ready(() => {
        $.ajax({
            url: "http://localhost:3000/categories",
            type: "get",
            contentType: "application/json",
            dataType: "json",
        }).done((data) => {
            let categoryOption = $.map(data, (item) => {
            return `
                <option value=${item.name.category}>${item.name.category}</option>
                `;
            });
        categorySelect.prepend(categoryOption);
        });
    });
  
    // Event listener for category button
    $('#categoryBtn').click((e) => {
        e.preventDefault();
        const categoryInputValue = categoryInput.val();
        //Validation - empty input
        if ($("#categoryInput").val() === "") {
            alert("Please enter a category"); 
            return;
        }
        // Storing category in local storage
        $.ajax({
            url: "http://localhost:3000/categories",
            type: "post",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                newCategory: {
                category: categoryInputValue,
                },
            }),
        }).done((data) => {
            const newCategoryOption = new Option(categoryInputValue);
            $("#firstOption").remove();
            categorySelect.prepend(newCategoryOption);
            categoryInput.hide();
            categoryButton.hide();
            categoryInput.val("");
        });
    });
});
