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
    
    //   //Create category list
    //   $(document).ready(() => {
    //     $.ajax({
    //       url: "http://localhost:3000/categories",
    //       type: "get",
    //       contentType: "application/json",
    //       dataType: "json",
    //     }).done((data) => {
    //       let categoryOption = $.map(data, (item) => {
    //         return `
    //                <option value=${item.name.categoryName}>${item.name.categoryName}</option>
    //               `;
    //       });
    //       categorySelect.prepend(categoryOption);
    //       // $("#firstOption").remove();
    //     });
    //   });
    
    
    
    //   newCategoryButton.click((event) => {
    //     event.preventDefault();
    //     const categoryInputValue = categoryInput.val();
    //     //Form validation and adding new category
    //     categoryInputValue.length > 0 &&
    //       $.ajax({
    //         url: "http://localhost:3000/categories",
    //         type: "post",
    //         contentType: "application/json",
    //         dataType: "json",
    //         data: JSON.stringify({
    //           newCategory: {
    //             categoryName: categoryInputValue,
    //           },
    //         }),
    //       }).done((data) => {
    //         const newCategoryOption = new Option(categoryInputValue);
    //         $("#firstOption").remove();
    //         categorySelect.prepend(newCategoryOption);
    //         categoryInput.hide();
    //         newCategoryButton.hide();
    //         categoryInput.val("");
    //       });
    //   });
    
    //   $.ajax({
    //     url: "http://localhost:3000/accounts",
    //     type: "get",
    //     contentType: "application/json",
    //     dataType: "json",
    //   }).done((data) => {
    //     console.log(data);
    //     const allUser = data.map(item =>{
    //       const account = new Account(item.username, item.transactions);
    //       return account;
    //     })
    //     // console.log(allUser);
    //     // console.log(data.balance);
    //   });

});
