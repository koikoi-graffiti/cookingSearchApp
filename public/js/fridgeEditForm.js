// item 削除クリックイベント
const deleteButtons = document.querySelectorAll('.deleteItem');
deleteButtons.forEach( (deleteButton) => {
    deleteButton.addEventListener('click', () => {
        deleteButton.parentNode.remove();
    });
});

//create new item イベント
const newItem = document.getElementById("inputNewItem");
newItem.addEventListener('change', (e) => {
    e.preventDefault();
    console.log(e.target.value)

    //create　tags for each
    const newItemDiv = document.createElement('DIV');
    newItemDiv.className = "tag mb-1 is-info is-medium";

    const showNewItem = document.createElement('P');
    showNewItem.innerHTML = e.target.value;

    const newItemInput = document.createElement('INPUT');
    newItemInput.value = e.target.value;
    newItemInput.type = 'hidden';
    newItemInput.name = 'fridgeItem';
    

    const deleteBtn = document.createElement('BUTTON');
    deleteBtn.className = "delete deleteItem is-small"

    //insert HTML tags
    const updateFridgeItemsForm = document.querySelector('#updateFridgeItems');
    newItemDiv.appendChild(showNewItem, newItemInput, deleteBtn);
    newItemDiv.appendChild(newItemInput);
    newItemDiv.appendChild(deleteBtn);
    updateFridgeItemsForm.appendChild(newItemDiv);

    //clear input value
    e.target.value = "";
})