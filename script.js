const form = document.getElementById("expenseForm");

const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");

const transactionList = document.getElementById("transactionList");

const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const balanceDisplay = document.getElementById("balance");

const filterSelect = document.getElementById("filter");


let transactions = [];

let editId = null;


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const type = typeInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const description = descriptionInput.value;


    if (amount <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    const transaction = {

        id: Date.now(),

        type: type,

        amount: amount,

        category: category,

        date: date,

        description: description

    };


    transactions.push(transaction);


    displayTransactions();

    form.reset();

});


function displayTransactions() {

    transactionList.innerHTML = "";


    for (let i = 0; i < transactions.length; i++) {

        const transaction = transactions[i];


        const row = document.createElement("tr");


        const typeCell = document.createElement("td");

        typeCell.textContent = transaction.type;


        const amountCell = document.createElement("td");

        amountCell.textContent = "₹" + transaction.amount;


        const categoryCell = document.createElement("td");

        categoryCell.textContent = transaction.category;


        const dateCell = document.createElement("td");

        dateCell.textContent = transaction.date;


        const descriptionCell = document.createElement("td");

        descriptionCell.textContent = transaction.description;


        const actionCell = document.createElement("td");


        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-button";


        editButton.onclick = function() {

            editTransaction(transaction.id);

        };


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";


        deleteButton.onclick = function() {

            deleteTransaction(transaction.id);

        };


        actionCell.appendChild(editButton);

        actionCell.appendChild(deleteButton);


        row.appendChild(typeCell);

        row.appendChild(amountCell);

        row.appendChild(categoryCell);

        row.appendChild(dateCell);

        row.appendChild(descriptionCell);

        row.appendChild(actionCell);


        transactionList.appendChild(row);

    }


    updateTotals();

}


function updateTotals() {

    let totalIncome = 0;

    let totalExpense = 0;


    for (let i = 0; i < transactions.length; i++) {

        if (transactions[i].type === "income") {

            totalIncome =
                totalIncome + transactions[i].amount;

        } else {

            totalExpense =
                totalExpense + transactions[i].amount;

        }

    }


    const balance =
        totalIncome - totalExpense;


    incomeDisplay.textContent =
        "₹" + totalIncome.toFixed(2);

    expenseDisplay.textContent =
        "₹" + totalExpense.toFixed(2);

    balanceDisplay.textContent =
        "₹" + balance.toFixed(2);

}


function deleteTransaction(id) {

    transactions = transactions.filter(
        function(transaction) {

            return transaction.id !== id;

        }
    );


    displayTransactions();

}


function editTransaction(id) {

    for (let i = 0; i < transactions.length; i++) {

        if (transactions[i].id === id) {

            typeInput.value = transactions[i].type;

            amountInput.value = transactions[i].amount;

            categoryInput.value =
                transactions[i].category;

            dateInput.value =
                transactions[i].date;

            descriptionInput.value =
                transactions[i].description;

            editId = id;

            break;
        }

    }

}


filterSelect.addEventListener(
    "change",
    displayTransactions
);


displayTransactions();



