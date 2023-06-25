$(document).ready(function () {
    let productItem = [
        {
            id: 1,
            productName: "EcoFlow RIVER Portable Power Station",
            price: "42000.00",
            photo: "https://www.startech.com.bd/image/cache/catalog/portable-power-station/ecoflow/river/river-01-500x500.webp"
        },
        {
            id: 2,
            productName: "AMD Ryzen Threadripper PRO 5995WX Processor",
            price: "685000.00",
            photo: "https://www.startech.com.bd/image/cache/catalog/processor/amd/ryzen-threadripper-pro-5995wx/ryzen-threadripper-pro-5995wx-500x500.webp"
        },
        {
            id: 3,
            productName: "Xiaomi Mi 43-Inch 4K",
            price: "38800.00",
            photo: "https://www.startech.com.bd/image/cache/catalog/television/xiaomi/mi-a2-l43m7-eaukr/mi-a2-l43m7-eaukr-01-500x500.webp"
        },
        {
            id: 4,
            productName: "Sony PlayStation 5",
            price: "67000.00",
            photo: "https://www.startech.com.bd/image/cache/catalog/gaming-console/playstation/playstation-5-digital-edition/sony-playstation-5-digital-edition-01-500x500.jpg"
        }];
    showProductGallery(productItem);
    showCartTable();
});

function addToCart(element) {
    let productParent = $(element).closest('div.product-item');

    let price = $(productParent).find('.price span').text();
    let productName = $(productParent).find('.productname').text();
    let quantity = $(productParent).find('.product-quantity').val();

    let cartItem = {
        productName: productName,
        price: price,
        quantity: quantity
    };
    let cartItemJSON = JSON.stringify(cartItem);

    let cartArray = [];
    // If javascript shopping cart session is not empty
    if (sessionStorage.getItem('shopping-cart')) {
        cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
    }
    cartArray.push(cartItemJSON);

    let cartJSON = JSON.stringify(cartArray);
    sessionStorage.setItem('shopping-cart', cartJSON);
    showCartTable();
}

function emptyCart() {
    if (sessionStorage.getItem('shopping-cart')) {
        // Clear JavaScript sessionStorage by index
        sessionStorage.removeItem('shopping-cart');
        showCartTable();
    }
}

function removeCartItem(index) {
    if (sessionStorage.getItem('shopping-cart')) {
        let shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
        sessionStorage.removeItem(shoppingCart[index]);
        showCartTable();
    }
}

function showCartTable() {
    let cartRowHTML = "";
    let itemCount = 0;
    let grandTotal = 0;

    let price = 0;
    let quantity = 0;
    let subTotal = 0;

    if (sessionStorage.getItem('shopping-cart')) {
        let shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
        itemCount = shoppingCart.length;

        shoppingCart.forEach(function (item) {
            let cartItem = JSON.parse(item);
            price = parseFloat(cartItem.price);
            quantity = parseInt(cartItem.quantity);
            subTotal = price * quantity

            cartRowHTML += "<tr>" +
                "<td>" + cartItem.productName + "</td>" +
                "<td class='text-right'>&#2547; " + price.toFixed(2) + "</td>" +
                "<td class='text-right'>" + quantity + "</td>" +
                "<td class='text-right'>&#2547; " + subTotal.toFixed(2) + "</td>" +
                "</tr>";

            grandTotal += subTotal;
        });
    }

    $('#cartTableBody').html(cartRowHTML);
    $('#itemCount').text(itemCount);
    $('#totalAmount').text("Tk. " + grandTotal.toFixed(2));
}

function showProductGallery(product) {
    let productHTML = "";
    product.forEach(function (item) {
        productHTML += '<div class="product-item">' +
            '<img src="' + item.photo + '" width="250" height="250">' +
            '<div class="productname">' + item.productName + '</div>' +
            '<div class="price">&#2547; <span>' + item.price + '</span></div>' +
            '<div class="cart-action">' +
            '<input type="text" class="product-quantity" name="quantity" value="1" size="2" />' +
            '<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />' +
            '</div>' +
            '</div>';
    });
    $('#product-item-container').html(productHTML);
}
