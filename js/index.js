window.onload = function(){
    insertNewRecord();
}

var dataArray = JSON.parse(localStorage.getItem("formData")) || [];

var selection = null;
let currentEditIndex = -1;

function onFormSubmit(event){
    event.preventDefault();
    if(validate()){
        var formData = readFormData();
        if(selection === null) {
            dataArray.push(formData);
            localStorage.setItem('formData', JSON.stringify(dataArray));
            insertNewRecord(formData);
        }
        else {
            // console.log('inside else');
            dataArray[currentEditIndex] = formData;
            localStorage.setItem('formData', JSON.stringify(dataArray));
            insertNewRecord(formData);
            // updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData(){
    var formData = {};

    formData["name"] = document.getElementById("name").value;
    formData["quantity"] = document.getElementById("quantity").value;
    formData["price"] = document.getElementById("price").value;

    // radiobtn add into table
    var gender = document.getElementsByName("gender");
    for(var value of gender){
        if(value.checked){
            formData["gender"] = value.value; 
        }
    }

    // checkBox add into table
    var checkBoxValueList = [];
    let checkBox = document.querySelectorAll('input[name="add"]:checked');
    checkBox.forEach((checkbox) =>{
        if(!checkBoxValueList.includes(checkbox.value)){
            checkBoxValueList.push(checkbox.value);
        }
    })
    formData["checkboxValue"] = checkBoxValueList;

    // size add into table
    formData["size"] = document.getElementById("size").value;
    formData["address"] = document.getElementById("address").value;
    return formData;
}

function insertNewRecord(data){
    let newData = JSON.parse(localStorage.getItem("formData"));
    
    var table = document.getElementById("cartList").getElementsByTagName('tbody')[0];
    for(let i = table.rows.length ; i > 0 ; i--) {
        table.deleteRow(i-1);
    }
    
    newData.forEach((index) => {
        var newRow = table.insertRow(-1);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = index.name;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = index.quantity;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = index.price;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = index.gender;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = index.size;
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = index.checkboxValue;
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = index.address;
        cell8 = newRow.insertCell(7);
        cell8.innerHTML = `<a href="#" onClick = onEdit(this)>Edit</a>
                       <a href="#" onClick = onDelete(this)>Delete</a>`;
    })
}

function onEdit(td){
    selection = true;
    resetForm();
    selectedRow  = td.parentElement.parentElement.rowIndex;
    currentEditIndex = selectedRow - 1;
    const data =JSON.parse(localStorage.getItem('formData'))[selectedRow-1];
    document.getElementById("name").value = data.name;
    document.getElementById("quantity").value = data.quantity;
    document.getElementById("price").value = data.price;

    if(data.gender == "Man"){
        document.getElementById("men").checked = true;
    }else{
        document.getElementById("female").checked = true;
    }

    // if(!(data.checkboxValue === null)){
        let checkBox = document.querySelectorAll('input[name="add"]');
        checkBox.forEach((checkbox) =>{
            if(data.checkboxValue.includes(checkbox.value)){
                checkbox.checked = true;
            }
        })
    // }

    document.getElementById("size").value = data.size;
    document.getElementById("address").value = data.address;
}

function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";

    var radioBtn = document.getElementsByName('gender');
    for (var uncheckRadio of radioBtn) {
        uncheckRadio.checked = false;
    }

    var checkBoxes = document.getElementsByName('add');
    for (var checkedBox of checkBoxes) {
        checkedBox.checked = false;
    }
    document.getElementById("size").value = "extrasmall";
    document.getElementById("address").value = "";
}

function onDelete(td){
    row = td.parentElement.parentElement.rowIndex;
    document.getElementById("cartList").deleteRow(row);
    dataArray.splice(row - 1, 1);
    localStorage.setItem('formData', JSON.stringify(dataArray));
}

function validate(){
    isValid = true;
    if(document.getElementById("name").value == ""){
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById("nameValidationError").classList.contains("hide")){
            document.getElementById("nameValidationError").classList.add("hide")
        }
    }

    if(document.getElementById("quantity").value == ""){
        isValid = false;
        document.getElementById("quantityValidationError").classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById("quantityValidationError").classList.contains("hide")){
            document.getElementById("quantityValidationError").classList.add("hide")
        }
    }

    if(document.getElementById("price").value == ""){
        isValid = false;
        document.getElementById("priceValidationError").classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById("priceValidationError").classList.contains("hide")){
            document.getElementById("priceValidationError").classList.add("hide")
        }
    }

    if((document.getElementById("men").checked) || (document.getElementById("female").checked)){
        isValid = true;
        if(!document.getElementById("genderValidationError").classList.contains("hide")){
            document.getElementById("genderValidationError").classList.add("hide")
        }
    }else {
        isValid = false;
        document.getElementById("genderValidationError").classList.remove("hide");
    }

    if((document.getElementById("gift").checked) || (document.getElementById("nobill").checked) || (document.getElementById("noCOD").checked)){
        isValid = true;
        if(!document.getElementById("checkBoxValidationError").classList.contains("hide")){
            document.getElementById("checkBoxValidationError").classList.add("hide")
        }
    }else {
        isValid = false;
        document.getElementById("checkBoxValidationError").classList.remove("hide");
    }

    if(document.getElementById("address").value == ""){
        isValid = false;
        document.getElementById("addressValidationError").classList.remove("hide");
    }else{
        isValid = true;
        if(!document.getElementById("addressValidationError").classList.contains("hide")){
            document.getElementById("addressValidationError").classList.add("hide")
        }
    }

    if(document.getElementById("name").value == "" || 
        document.getElementById("quantity").value == "" ||
        document.getElementById("price").value == "" || 
        document.getElementById("address").value == ""){
            isValid = false;
        }else{
            isValid = true;
        }

    return isValid;
}

function nameChange(event){
    document.getElementById("nameValidationError").classList.add("hide");
}

function quantityChange(event){
    document.getElementById("quantityValidationError").classList.add("hide");
}

function priceChange(event){
    document.getElementById("priceValidationError").classList.add("hide");
}

function genderChange(event){
    document.getElementById("genderValidationError").classList.add("hide");
}

function addChange(event){
    document.getElementById("checkBoxValidationError").classList.add("hide");
}

function addressChange(event){
    document.getElementById("addressValidationError").classList.add("hide");
}

