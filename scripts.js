
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the elements
    const todoValue = document.getElementById("todoText"),
        listItems = document.getElementById("list-items"),
        addUpdateClick = document.getElementById("AddupdateClick");

    // Check if all elements are found
    if (!todoValue || !listItems || !addUpdateClick) {
        console.error("One or more elements not found.");
        return;
    }

    // Add event listener for the add/update button
    addUpdateClick.addEventListener("click", createTodoData);

    // Listen for the Enter key to add/update a todo
    document.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addUpdateClick.click();
        }
    });

    // Function to create a new todo item
    function createTodoData() {
        if (todoValue.value === "") {
            alert("Please enter your todo text");
            todoValue.focus();
            return;
        }

        // Create a new todo item
        const todoItem = document.createElement("li");
        todoItem.innerHTML = `
            <div>${todoValue.value}</div>
            <div>
                <button class="edit todo-controls">Edit</button>
                <button class="delete todo-controls">Delete</button>
            </div>
        `;
        listItems.appendChild(todoItem);
        todoValue.value = "";
    }

    // Function to update a todo item
    function updateTodoitems(item) {
        const newValue = prompt("Enter new value:", item.querySelector("div").textContent);
        if (newValue !== null) {
            item.querySelector("div").textContent = newValue;
        }
    }

    // Function to delete a todo item
    function deleteTodoItems(item) {
        if (confirm("Are you sure you want to delete this item?")) {
            item.remove();
        }
    }

    // Function to mark a todo item as completed
    function completeTodoItem(e) {
        if (e.style.textDecoration === "") {
            e.style.textDecoration = "line-through";
        } else {
            e.style.textDecoration = "";
        }
    }

    // Add event listener to the list items to handle edit, delete, and complete actions
    listItems.addEventListener("click", function(e) {
        if (e.target.classList.contains("edit")) {
            updateTodoitems(e.target.parentElement.parentElement);
        } else if (e.target.classList.contains("delete")) {
            deleteTodoItems(e.target.parentElement.parentElement);
        } else if (e.target.tagName === "DIV") {
            completeTodoItem(e.target);
        }
    });
});
