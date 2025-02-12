$(document).ready(function() {
    // ✅ Lấy giỏ hàng từ localStorage
    var cart = JSON.parse(localStorage.getItem('sffood-cart')) || [];
    var totalPrice = 0;

    // Hàm format tiền tệ (giữ nguyên)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    // Hàm cập nhật hiển thị giỏ hàng và tổng tiền (giữ nguyên)
    function updateCartDisplay() {
        var cartItemsDiv = $('.cart-items');
        cartItemsDiv.empty();

        if (cart.length === 0) {
            cartItemsDiv.html('<p id="empty-cart-message">Giỏ hàng trống.</p>');
            $('#total-price').text(formatCurrency(0));
            $('#place-order-button').attr('disabled', true); // Sử dụng .attr('disabled', true) cho thẻ <a>
            return;
        }

        totalPrice = 0;
        cart.forEach(function(item, index) {
            var cartItemDiv = $('<div class="cart-item">');

            // ✅ Tạo phần tử điều chỉnh số lượng (giữ nguyên)
            var quantityControls = $('<div class="cart-item-quantity-controls">');
            var decreaseButton = $('<button class="quantity-button">-</button>').click(function() {
                updateQuantity(index, -1);
            });
            var quantityDisplay = $('<span class="cart-item-quantity-display">').text(item.quantity);
            var increaseButton = $('<button class="quantity-button">+</button>').click(function() {
                updateQuantity(index, 1);
            });
            quantityControls.append(decreaseButton, quantityDisplay, increaseButton);

            var itemNameSpan = $('<span class="cart-item-name">').text(item.name);
            var itemPriceSpan = $('<span class="cart-item-price">').text(formatCurrency(item.price * item.quantity));
            // ✅ Nút xóa sản phẩm (giữ nguyên)
            var removeItemButton = $('<button class="remove-item-button">').text("Xóa").click(function() {
                removeItem(index);
            });

            cartItemDiv.append(itemNameSpan, quantityControls, itemPriceSpan, removeItemButton);
            cartItemsDiv.append(cartItemDiv);
            totalPrice += item.price * item.quantity;
        });

        $('#total-price').text(formatCurrency(totalPrice));
        $('#place-order-button').removeAttr('disabled'); // Sử dụng .removeAttr('disabled') cho thẻ <a>
    }

    // ✅ Hàm cập nhật số lượng sản phẩm trong giỏ hàng (giữ nguyên)
    function updateQuantity(itemIndex, change) {
        var newQuantity = cart[itemIndex].quantity + change;
        if (newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
        } else {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('sffood-cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // ✅ Hàm xóa sản phẩm khỏi giỏ hàng (giữ nguyên)
    function removeItem(itemIndex) {
        cart.splice(itemIndex, 1);
        localStorage.setItem('sffood-cart', JSON.stringify(cart));
        updateCartDisplay();
    }


    // ❌❌❌ ĐÃ XÓA TOÀN BỘ CODE XỬ LÝ SỰ KIỆN CLICK NÚT "ĐẶT HÀNG" ❌❌❌
    // ❌❌❌ VÌ NÚT "ĐẶT HÀNG" Ở ORDER.HTML BÂY GIỜ CHỈ CHUYỂN HƯỚNG SANG PAYMENT.HTML ❌❌❌


    // Gọi updateCartDisplay ban đầu (giữ nguyên)
    updateCartDisplay();
});