var newRecord = [];
let netSalary;

function showModal() {
    $("#createUserModal").modal("show");
}

//LOAD THE DATA FOR TABLE ONE
function displayRecord() {
    var dataRetrieved = '';
    newRecord.map(item => (
        dataRetrieved += `
                    <tr>
                        <td>${item.Id}</td>
                        <td>${item.FirstName}</td>
                        <td>${item.LastName}</td>
                        <td>${item.Age}</td>
                        <td>${item.Salary}</td>
                        <td>
                            <button class="btn btn-primary" onclick="updateUserTableOne(${item.Id})">Edit</button>
                            <button class="btn btn-danger" onclick="deleteUserRecordTableOne(${item.Id})">Delete</button>
                        </td>
                    </tr>
        `
    ));

    //PURPOSE IS TO ADD THE ROWS IN TABLE 1
    document.getElementById("record-table").innerHTML = dataRetrieved;
    document.getElementById("total-user__acumulated").innerHTML = totalUser(newRecord);
    document.getElementById("total-salary__acumulated").innerHTML = calcTotalSalary(newRecord);

}

//CREATE RECORD ON TABLE ONE
function createRecord() {
    var Id = 0;
    if (newRecord.length == 0) {
        Id = 1
    }
    else {
        Id = (newRecord[newRecord.length - 1].Id) + 1;
    }
    var FirstName = document.getElementById("recipient-firstName").value;
    var LastName = document.getElementById("recipient-lastName").value;
    var Age = document.getElementById("recipient-age").value;
    var Salary = parseInt(document.getElementById("recipient-salary").value);

    var newTableRecord = { Id, FirstName, LastName, Age, Salary }
    newRecord.push(newTableRecord);
    calcTotalSalary(newRecord);


    displayRecord();
    document.getElementById("recordTableOne").reset();
   

    $('#createUserModal').modal('hide');

}

//TRANSFER RECORD
function transferUserRecord() {
    if (newRecord.length == 0) {
        alert("No record found...");
    } else {
        for (var i = 0; i < newRecord.length; i++) {

            var formData = {
                FirstName: newRecord[i].FirstName,
                LastName: newRecord[i].LastName,
                Age: newRecord[i].Age,
                Salary: newRecord[i].Salary
            }

            $.ajax({
                type: "POST",
                url: '/Home/TransferRecord',
                data: formData,
                dataType: 'json',
                success: function (data) {
                    displayUser();


                }
            });
        }
        newRecord = [];
        displayRecord();
        
    }

}

//DISPLAY RECORD ON TABLE TWO
function displayUser() {
    $.ajax({
        type: "GET",
        url: "Home/Record",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var rows = "";
            $.each(data, function (index, item) {
                rows += "<tr>"
                    + "<td>" + item.Id + "</td>"
                    + "<td>" + item.FirstName + "</td>"
                    + "<td>" + item.LastName + "</td>"
                    + "<td>" + item.Age + "</td>"
                    + "<td>" + item.Salary + "</td>"
                    + "<td>" + '<button class="btn btn-primary" onclick="updateUser(' + item.Id + ')">Edit</button> <button class="btn btn-danger"  onclick="deleteUserRecord(' + item.Id + ')">Delete</button >' + "</td>"
                    + "</tr>";
            });
            //ADD THE ROWS TO THE TABLE BODY
            $("#recordTwo-table").html(rows);
            document.getElementById("recordTwo-user__acumulated").innerHTML = totalUser(data);
            document.getElementById("recordTwo-salary__acumulated").innerHTML = calcTotalSalary(data);
        }
    })
}

//FOR GETTING THE ID TO UPDATE USER TABLE TWO
function updateUser(id) {
    $.ajax({
        type: "GET",
        url: "Home/EditUser?id=" + id,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#editUserModal").modal("show");
            $("#edit-recipient-id").val(data.Id),
                $("#edit-recipient-firstName").val(data.FirstName);
            $("#edit-recipient-lastName").val(data.LastName);
            $("#edit-recipient-age").val(data.Age);
            $("#edit-recipient-salary").val(data.Salary);
        }
    })
}

//GET THE ID TO EDIT THE RECORD IN TABLE ONE
function updateUserTableOne(Id) {
    var valueRecord = newRecord.find(x => x.Id == Id);
    document.getElementById("editTab1-recipient-id").value = valueRecord.Id;
    document.getElementById("editTab1-recipient-firstName").value = valueRecord.FirstName;
    document.getElementById("editTab1-recipient-lastName").value = valueRecord.LastName;
    document.getElementById("editTab1-recipient-age").value = valueRecord.Age;
    document.getElementById("editTab1-recipient-salary").value = valueRecord.Salary;
    $('#editUserModalTab1').modal('show');
}

//UPDATE THE RECORD IN TABLE ONE
function updateUserRecordTableOne() {
    var Id = document.getElementById("editTab1-recipient-id").value;
    var FirstName = document.getElementById("editTab1-recipient-firstName").value;
    var LastName = document.getElementById("editTab1-recipient-lastName").value;
    var Age = document.getElementById("editTab1-recipient-age").value;
    var Salary = document.getElementById("editTab1-recipient-salary").value;
    var editedRecord = { Id, FirstName, LastName, Age, Salary }

    var getId = newRecord.findIndex(x => x.Id == Id);
    newRecord[getId] = editedRecord;
    displayRecord();

    $('#editUserModalTab1').modal('hide');
    //}
}

//FOR UPDATE USER RECORD TABLE TWO
function updateUserRecord() {
    const formData = {
        id: $("#edit-recipient-id").val(),
        firstName: $("#edit-recipient-firstName").val(),
        lastName: $("#edit-recipient-lastName").val(),
        age: $("#edit-recipient-age").val(),
        salary: $("#edit-recipient-salary").val(),
    }

    $.ajax({
        type: "POST",
        url: "Home/EditUserRecord",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function onSuccess(data) {
            displayUser();
            $("#editUserModal").modal("hide");
        },
    })
}

//FOR TABLE ONE
function deleteUserRecordTableOne(id) {
    var record = newRecord.filter(x => x.Id != id);
    newRecord = record;
    displayRecord();
}

//FOR TABLE TWO
function deleteUserRecord(id) {

    $.ajax({
        type: "POST",
        url: "Home/DeleteUser?id=" + id,
        success: function onSuccess(data) {
            displayUser();
        },
    })
}

////METHOD FOR TOTAL SALARY
function calcTotalSalary(data) {
    let salaryArray = [];
    let salary = 0;

    //MAP THE ARRAY AND GET THE INDEXES
    for (var i = 0; i < data.length; i++) {
        salaryArray.push(data[i].Salary);
    };
    salary = salaryArray.reduce((total, num) => total + num, salary);

    return salary;
}

function totalUser(data) {
    let userLength = data.length;
    return userLength;
}





