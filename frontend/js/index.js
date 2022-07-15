$(() => {

	$(document).ready(() => {
		//Accounts part
			//get accounts
				const accountSelect = $('#accountSelect');
				const fromSelect = $('#fromSelect');
				const toSelect = $('#toSelect');
				const filterSelect = $("#filterSelect");
				accountV = [];
				accountB = [];
				savedAccounts = [];
				savedTransactions = [];
		
				$.ajax({
					method:'get',
					url:'http://localhost:3000/accounts',
					contentType:'application/json'
				}).done((data) => {
					let accountOptions = $.map(data, (item) => {
						$('ul#accountSummary').append(`<li> Account: ${item.username} Balance: <span id="bal${item.id}">0</span></li>`);
						$('#accountSelect').append(`<option value=${item.id}>${item.username}</option>`);
						$('#fromSelect').append(`<option value=${item.id}>${item.username}</option>`);
						$('#toSelect').append(`<option value=${item.id}>${item.username}</option>`);
						$('#filterSelect').append(`<option value=${item.id}>${item.username}</option>`);
						accountV.push(new Account(item.username));
						savedAccounts.push(new Account(item.id));
					});
				});
			//get accounts

			//create account
				$('form#newAccount').submit((e)=>{
					e.preventDefault();
					//Validate the input isnt empty
					if($('#inputnewAccount').val() !== ''){
						let input = $('#inputnewAccount').val();
						let newAccount = new Account(input);
						let usrName = newAccount.username;
						//Post the Accounts to server
						$.ajax({
							method: 'post',
							data: JSON.stringify({
								newAccount:{
									username: `${usrName}`,
									transactions: [],
								},
							}),
							url: 'http://localhost:3000/accounts',
							contentType: 'application/json',
							dataType: 'json',
						}).done((data) => {
							$('ul#accountSummary').append(`<li> Account: ${data.username} Balance: <span id="bal${data.id}">0</span></li>`);
							accountSelect.append(`<option value=${data.id}>${data.username}</option>`);
							fromSelect.append(`<option value=${data.id}>${data.username}</option>`);
							toSelect.append(`<option value=${data.id}>${data.username}</option>`);
							filterSelect.append(`<option value=${data.id}>${data.username}</option>`);
							accountV.push(new Account(data.username));
							savedAccounts.push(new Account(data.id));
							$('#inputnewAccount').val('');
						});
					}
					else {
						alert('Please enter an Account');
					}
				});
			//create account
		//Accounts part

		//Transaction part
			//validation of Transaction fields
				$("#transactionForm").submit((e) => {
					e.preventDefault();
					if($("#transactionDesription").val() === '' & $("#transactionAmount").val() === '') {
						alert("Please enter a description and amount!");
						return;
					} else if( $("#transactionDesription").val() === '') {
						alert("Please enter an description!");
						return;
					} else if($("#transactionAmount").val() === '') {
						alert("Please enter an amount!");
						return; 
					}else if($("#transactionAmount").val() <= 0){
						alert('Please enter an Amount Grather than 0');
						return;
					}else if($('#transferInput').val()){
						
					}
				});
			//validation of Transaction fields

			//get transactions
				const transactionTable = $("#transactionsTable");
				$.ajax({
		  			method:'get',
		  			url:'http://localhost:3000/transactions',
		  			contentType:'application/json'
				}).done((data) => { 
		  			for ( const listTrans of data) {
						let transactions = listTrans.map( (item) => { 
							$("#transactionsTable").append(
								`<tr class="${item.accountId}">
									<td>${item.id}</td> 
									<td>${item.accountId + ' - ' + accountV[item.accountId-1].username}</td> 
									<td>${item.transactionType}</td> 
									<td>${item.category}</td> 
									<td>${item.description}</td>
									<td>${item.amount}</td> 
									<td>${item.accountIdFrom == 0 ? `-` : item.accountIdFrom}</td> 
									<td>${item.accountIdTo == 0 ? `-` : item.accountIdTo}</td>'
								</tr>`
							);
							if(item.transactionType == 'deposit') { let addTr = new Deposit(parseInt(item.amount), savedAccounts[item.accountId-1]).commit(); }
							if(item.transactionType == 'withdraw') { let addTr = new Withdrawal(parseInt(item.amount), savedAccounts[item.accountId-1]).commit(); }
							if(item.transactionType == 'transfer') { let addTr = new Transfer(parseInt(item.amount), savedAccounts[item.accountId-1],item.accountId, item.accountIdFrom, item.accountIdTo).commit(); }
							$('#bal' + item.accountId).html(savedAccounts[item.accountId-1].balance);
						});
					}
				});
			//get transactions

			//adding new transaction 
				$('#addTransaction').click((e) => {
					e.preventDefault();
					let transactionType = $('input[name="transaction"]:checked').val();
					let description = $('#transactionDesription').val();
					let amount = $('#transactionAmount').val();
					let category = $('#categorySelect').val() == 'addNewCategory' ? '' : $('#categorySelect').val();
					let account = $('#accountSelect').val();
					let fromAccount = $('input[name="transaction"]:checked').val() == 'transfer' ? $('#fromSelect').val() : 0;
					let toAccount = $('input[name="transaction"]:checked').val() == 'transfer' ? $('#toSelect').val() : 0;
		  
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
					}).done((dataA) => {
					
						//If accountId is different from filterSelect - not show this row in table
						let showingA = '';
						if(dataA[0].accountId == $('#filterSelect').val() || $('#filterSelect').val() == 0){
						}
						else
						{
							showingA = 'display: none';
						}
						$("#transactionsTable").append(
							`<tr class="${dataA[0].accountId}" style="${showingA}">
								<td>${dataA[0].id}</td> 
								<td>${dataA[0].accountId + ' - ' + accountV[dataA[0].accountId-1].username}</td> 
								<td>${dataA[0].transactionType}</td> 
								<td>${dataA[0].category}</td> 
								<td>${dataA[0].description}</td>
								<td>${dataA[0].amount}</td> 
								<td>${dataA[0].accountIdFrom == 0 ? `-` : dataA[0].accountIdFrom}</td> 
								<td>${dataA[0].accountIdTo == 0 ? `-` : dataA[0].accountIdTo}</td>'
							</tr>`
						);

						if(dataA[0].transactionType == 'deposit') { let addTr = new Deposit(parseInt(dataA[0].amount), savedAccounts[dataA[0].accountId-1]).commit(); }
						if(dataA[0].transactionType == 'withdraw') { let addTr = new Withdrawal(parseInt(dataA[0].amount), savedAccounts[dataA[0].accountId-1]).commit(); }
						if(dataA[0].transactionType == 'transfer') { let addTr = new Transfer(parseInt(dataA[0].amount), savedAccounts[dataA[0].accountId-1],dataA[0].accountId, dataA[0].accountIdFrom, dataA[0].accountIdTo).commit(); }
						$('#bal' + dataA[0].accountId).html(savedAccounts[dataA[0].accountId-1].balance);
					
						//Check if transaction is transfer - this transaction contain two transactions
						try{
							//If accountId is different from filterSelect - not show this row in table
							if(dataA[1].accountId == $('#filterSelect').val() || $('#filterSelect').val() == 0){
								showingA = '';
							}
							else
							{
								showingA = 'display: none';
							}
							$("#transactionsTable").append(
								`<tr class="${dataA[1].accountId}" style="${showingA}">
									<td>${dataA[1].id}</td> 
									<td>${dataA[1].accountId + ' - ' + accountV[dataA[1].accountId-1].username}</td> 
									<td>${dataA[1].transactionType}</td> 
									<td>${dataA[1].category}</td> 
									<td>${dataA[1].description}</td>
									<td>${dataA[1].amount}</td> 
									<td>${dataA[1].accountIdFrom == 0 ? `-` : dataA[1].accountIdFrom}</td> 
									<td>${dataA[1].accountIdTo == 0 ? `-` : dataA[1].accountIdTo}</td>'
								</tr>`
							); 
							if(dataA[1].transactionType == 'transfer') { let addTr = new Transfer(parseInt(dataA[1].amount), savedAccounts[dataA[1].accountId-1],dataA[1].accountId, dataA[1].accountIdFrom, dataA[1].accountIdTo).commit(); }
						$('#bal' + dataA[1].accountId).html(savedAccounts[dataA[1].accountId-1].balance);
						}
						catch (err) {
							
						}
						$('#transactionAmount').val('');
						$('#transactionDesription').val('');
						$('#categorySelect').val('addNewCategory');
						$('#accountSelect').val($("#accountSelect option:first").val());
						$('#fromSelect').val($("#fromSelect option:first").val());
						$('#toSelect').val($("#toSelect option:first").val());
					});
				});
			//adding new transaction 
		//Transaction part

		//category
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
			// Hidding and showing category input and btn

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
			//Creating new categories in list

			//Event listener for category button
				$('#categoryBtn').click((e) => {
					e.preventDefault();
					const categoryInputValue = categoryInput.val();
					//Validation - empty input
					if ($("#categoryInput").val() === "") {
						alert("Please enter a category"); 
						return;
					}
					// Storing category in server
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
						$("#optionOne").remove();
						categorySelect.prepend(newCategoryOption);
						categoryInput.hide();
						categoryButton.hide();
						categoryInput.val("");
					});
				});
			//Event listener for category button
		//category

		//Getting value from radio btn - transaction
			$("input[type='radio']").click(function(){
				let radioValue = $("input[name='transaction']:checked").val();
				if(radioValue === "deposit"){
					let deposit = radioValue;
				} else if (radioValue === "withdraw") {
					let withdraw = radioValue;  
				} else {
					let transfer = radioValue; 
				};
			});
		//Getting value from radio btn - transaction

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
				}
			})
		//Hidding and showing transaction options

		//Submiting form
			$("form").submit((e) => {
				e.preventDefault();
			});
		//Submiting form

		//Show or hidden rows in table of transaction depend on filterSelect
			$('#filterSelect').on('change', function() {
				if(this.value == 0){
					$('#transactionsTable tbody tr' + this.value).show();
				}
				else
				{
					$('#transactionsTable tr:not(:first-child)').hide();
					$('#transactionsTable tbody tr.' + this.value).show();
				}
			});
		//Show or hidden rows in table of transaction depend on filterSelect
	});  
});