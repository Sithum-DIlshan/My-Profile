const itemIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{5,20}$/;
const itemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;

function loadAllItems() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td></tr>`;
        $("#itemTable").append(row);
    }
}

function saveitem(item) {
    //gather item information
    /*let itemID = $("#Item-id").val();
    let itemName = $("#item-name").val();
    let itemPrice = $("#item-price").val();
    let itemQty = $("#item-qty").val();

    var itemObj = {
        id: itemID,
        name: itemName,
        price: itemPrice,
        qty: itemQty,
    };*/

    itemDB.push(item);
    loadAllItems();
    loadAllItemIds();
    clearAllFields();
    /*create a html row*/
    /* let row = `<tr><td>${itemID}</td><td>${itemName}</td><td>${itemPrice}</td><td>${itemQty}</td></tr>`;

     /!*select the table body and append the row *!/
     $("#itemTable").append(row);
*/

    //bind the event after the row was added
    /* $("#itemTable>tr").click(function(){
         console.log(this);
     });*/

    $("#itemTable>tr").dblclick(function () {
        $(this).remove();
    })

}

function clearAllFields() {
    $('#Item-id,#item-name,#item-price,#item-qty').val("");
    $('#Item-id,#item-name,#item-price,#item-qty').css('border', '2px solid #ced4da');
    $("#save-item").attr('disabled', true);
    $("#lblitemid, #lblitemname, #lblitemprice, #lblitemqty").val("");
}

$('#Item-id,#item-name,#item-price,#item-qty').on('blur', function () {
    itemformValid();
});

$("#Item-id").on('keyup', function (f) {
    itembtnenabledisable();
    if (f.key == "Enter") {
        itemcheckvalid();
    }
});
$("#item-name").on('keyup', function (e) {
    itembtnenabledisable();
    if (e.key == "Enter") {
        itemcheckvalid();
    }
});
$("#item-price").on('keyup', function (e) {
    itembtnenabledisable();
    if (e.key == "Enter") {
        itemcheckvalid();
    }
});
$("#item-qty").on('keyup', function (e) {
    itembtnenabledisable();
    if (e.key == "Enter") {
        itemcheckvalid();
    }
});

function itemformValid() {
    var cusID = $("#Item-id").val();
    $("#Item-id").css('border', '2px solid green');
    $("#lblitemid").text("");
    if (itemIDRegEx.test(cusID)) {
        var cusName = $("#item-name").val();
        if (itemNameRegEx.test(cusName)) {
            $("#item-name").css('border', '2px solid green');
            $("#lblitemname").text("");
            var cusAddress = $("#item-price").val();
            if (itemPriceRegEx.test(cusAddress)) {
                var cusSalary = $("#item-qty").val();
                var resp = itemQtyRegEx.test(cusSalary);
                $("#item-price").css('border', '2px solid green');
                $("#lblitemprice").text("");
                if (resp) {
                    $("#item-qty").css('border', '2px solid green');
                    $("#lblitemqty").text("");
                    return true;
                } else {
                    $("#item-qty").css('border', '2px solid red');
                    $("#lblitemqty").text("Item qty is a required field : Pattern 100");
                    return false;
                }
            } else {
                $("#item-price").css('border', '2px solid red');
                $("#lblitemprice").text("Item price is a required field : Patter 100 or 100.00");
                return false;
            }
        } else {
            $("#item-name").css('border', '2px solid red');
            $("#lblitemname").text("Item Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#Item-id").css('border', '2px solid red');
        $("#lblitemid").text("Item ID is a required field : Pattern I00-000");
        return false;
    }
}

function itemcheckvalid() {
    var itemID = $("#Item-id").val();
    if (itemIDRegEx.test(itemID)) {
        $("#item-name").focus();
        var itemName = $("#item-name").val();
        if (itemNameRegEx.test(itemName)) {
            $("#item-price").focus();
            var itemPrice = $("#item-price").val();
            if (itemPriceRegEx.test(itemPrice)) {
                $("#item-qty").focus();
                var itemQty = $("#item-qty").val();
                var resp = itemQtyRegEx.test(itemQty);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveitem();
                        clearAll();
                    }
                } else {
                    $("#item-qty").focus();
                }
            } else {
                $("#item-price").focus();
            }
        } else {
            $("#item-name").focus();
        }
    } else {
        $("#Item-id").focus();
    }
}

function itembtnenabledisable() {
    let b = itemformValid();
    if (b) {
        $("#save-item").attr('disabled', false);
    } else {
        $("#save-item").attr('disabled', true);
    }
}

//searching
$("#itemSearchField").on('keyup', function (e) {
    itemSearch($('#itemSearchField').val());
});

function itemSearch(search) {
    var item = itemDB.find(item => item.id === search);
}

function checkItemExists(id) {
    /* if (customerDB.includes(id)) {
         $("#cus-id").css('border', '2px solid red');
         $("#lblcusid").text("Cus ID Already Exists Try Another One");
         let res = confirm("Try Again");
         if (res){
             $("#cus-id").val('');
         }
     }*/
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            /*$("#cus-id").css('border', '2px solid red');
            $("#lblcusid").text("Cus ID Already Exists Try Another One");
            let res = confirm("Try Again");
            if (res){
                $("#cus-id").val('');
            }*/
            $("#save-item").attr('disabled', true);
            return true;
        }
    }
    return false;
}

function loadItemIDs() {
    for (let i = 0; i < itemDB.length; i++) {
        id = itemDB[i].id;
        $("#selectItemID").append($('<option></option>').attr('value', "key").text(id));
    }
}

function loadAllItemIds() {
    if ($("#selectItemID").has('option').length == 0) {
        loadItemIDs();
    } else {
        $("#selectItemID").empty();
        /*<option disabled hidden selected*/
        $("#selectItemID").append($('<option disabled hidden selected></option>').attr('value', "item").text("Select-Item"));
        loadItemIDs();
    }

}

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            /*$("#cus-id").css('border', '2px solid red');
            $("#lblcusid").text("Cus ID Already Exists Try Another One");
            let res = confirm("Try Again");
            if (res){
                $("#cus-id").val('');
            }*/
            return new Item(itemDB[i].id, itemDB[i].name, itemDB[i].price, itemDB[i].qty);
        }
    }
    return null;
}