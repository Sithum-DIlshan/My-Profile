const oIDRegEx = /^(O-)[0-9]{1,3}$/;


function addItemToCart(cart) {
    let i = isItemExists(cart);
    if (i > -1) {
        let pTotal = parseFloat(cartDB[i].cart_qtyOrder);
        let nTotal = parseFloat(cart.cart_qtyOrder);
        cartDB[i].cart_qtyOrder = pTotal + nTotal;
        loadAllToCart();
        updateItemQty(cart);
    } else {
        updateItemQty(cart);
        cartDB.push(cart);
        loadAllToCart();
    }
}

function updateItemQty(cart) {
    for (let i = 0; i < itemDB.length; i++) {
        if (cart.cart_code == itemDB[i].id) {
            let pQty = parseFloat(itemDB[i].qty);
            let oQty = parseFloat(cart.cart_qtyOrder);
            itemDB[i].qty = pQty - oQty;
            $("#invoiceItemQtyOnHand").val(itemDB[i].qty);
        }
    }
}

function isItemExists(cart) {
    for (let i = 0; i < cartDB.length; i++) {
        if (cartDB[i].cart_code == cart.cart_code) {
            /*cartDB[i].cart_qtyOrder = cartDB[i].cart_qtyOrder+cart.cart_qtyOrder;
            loadAllToCart();*/
            return i;
        }
    }
    return -1;
}

function loadAllToCart() {
    $("#tableCart").empty();
    for (var i of cartDB) {
        /*create a html row*/
        let row = `<tr><td>${i.cart_code}</td><td>${i.cart_name}</td><td>${i.cart_price}</td><td>${i.cart_qtyOrder}</td></tr>`;
        /*select the table body and append the row */
        $("#tableCart").append(row);
    }
}

function placeOrder(order) {
    for (let i = 0; i < cartDB.length; i++) {
        let orderDetails = new OrderDetails(order.oId, cartDB[i].cart_code, cartDB[i].cart_name, cartDB[i].cart_qtyOrder, cartDB[i].cart_price);
        orderDetailsDB.push(orderDetails);
    }
    ordersDB.push(order);
}

function incrementOrderId(oId) {
    let count = oId.substr(2);
    var oid;
    if (count < 10) {
        oid = "O-00" + (++count);
        return oid;
    } else if (count < 100) {
        oid = "O-0" + (++count);
        return oid;
    } else {
        oid = "O-" + (++count);
        return oid;
    }
}

function clearInputsAndTotals() {
    $("#txtDate, #invoiceCusId, #invoiceCusName, #invoiceCusAddress, #invoiceCusSalary, #invoiceItemCode, #invoiceItemName, #invoiceItemPrice, #invoiceItemQtyOnHand, #invoiceItemOrderQty, #invoiceCash, #invoiceDiscount, #invoiceBalance").val("");
    $("#selectItemID, #selectCusID").val([]);
    $("#total").text('Total Rs: 0');
    $("#subTotal").text('SubTotal Rs: 0');
    cartDB = [];
    loadAllToCart();
}

function searchOrder(oId) {
    for (let i = 0; i < ordersDB.length; i++) {
        if(oId == ordersDB[i].oId){
            return ordersDB[i];
        }
    }
    return null;
}

function oIdValid() {
    var oId = $("#orderId").val();
    $("#orderId").css('border', '2px solid green');
    if (oIDRegEx.test(oId)) {
        $("#purchase").attr('disabled', false);

    }else {
        $("#orderId").css('border', '2px solid red');
        $("#purchase").attr('disabled', true);
        return false;
    }
}