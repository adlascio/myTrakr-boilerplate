$(() => {
    const categorySelect = $("#categorySelect");
    const categoryInput = $("#categoryInput");
    const categoryButton = $("#categoryBtn");
    categoryInput.hide();
    categoryButton.hide();

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
});
