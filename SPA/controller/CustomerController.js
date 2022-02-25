function saveCustomer() {
    //gather customer information
    let customerID = $("#cus-id").val();
    let customerName = $("#cus-name").val();
    let customerAddress = $("#cus-address").val();
    let customerSalary = $("#cus-salary").val();

    //create object
    var customerObj = {
        id: customerID, name: customerName, address: customerAddress, salary: customerSalary
    };
    customerDB.push(customerObj);
    loadAllCutsomers();
}

function loadAllCutsomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;
        /*select the table body and append the row */
        $("#customerTable").append(row);
    }
}

$('#cus-id,#cus-name,#cus-address,#cus-salary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#cus-id,#cus-name,#cus-address,#cus-salary').on('blur', function () {
    cusformValid();
});

//focusing events
$("#cus-id").on('keyup', function (e) {
    cusbtnenabledisable();
    if (e.key === "Enter") {
        cuscheckvalid();
    }
});
$("#cus-name").on('keyup', function (e) {
    cusbtnenabledisable();
    if (e.key === "Enter") {
        cuscheckvalid();
    }
});
$("#cus-address").on('keyup', function (e) {
    cusbtnenabledisable();
    if (e.key === "Enter") {
        cuscheckvalid();
    }
});
$("#cus-salary").on('keyup', function (e) {
    cusbtnenabledisable();
    if (e.key === "Enter") {
        cuscheckvalid();
    }
});

// focusing events end

function cusformValid() {
    var cusID = $("#cus-id").val();
    $("#cus-id").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#cus-name").val();
        if (cusNameRegEx.test(cusName)) {
            $("#cus-name").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#cus-address").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#cus-salary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#cus-address").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#cus-salary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#cus-salary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#cus-address").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Address is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#cus-name").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#cus-id").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function cuscheckvalid() {
    var cusID = $("#cus-id").val();
    if (cusIDRegEx.test(cusID)) {
        $("#cus-name").focus();
        var cusName = $("#cus-name").val();
        if (cusNameRegEx.test(cusName)) {
            $("#cus-address").focus();
            var cusAddress = $("#cus-address").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#cus-salary").focus();
                var cusSalary = $("#cus-salary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#cus-salary").focus();
                }
            } else {
                $("#cus-address").focus();
            }
        } else {
            $("#cus-name").focus();
        }
    } else {
        $("#cus-id").focus();
    }
}

function cusbtnenabledisable() {
    let b = cusformValid();
    if (b) {
        $("#saveCustomer").attr('disabled', false);
    } else {
        $("#saveCustomer").attr('disabled', true);
    }
}

function clearAll() {
    $("#cus-id").val('');
    $("#cus-name").val('');
    $("#cus-address").val('');
    $("#cus-salary").val('');
    $("#cus-id").focus();
    $("#cus-id, #cus-name, #cus-address, #cus-salary").css('border','2px solid #ced4da')
    $("#saveCustomer").attr('disabled',true);
    loadAllCutsomers();
    $("#lblcusid, #lblcusname, #lblcusaddress, #lblcussalary").val("");

}