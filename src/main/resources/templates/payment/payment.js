// ✅ File JavaScript tách rời cho trang thanh toán (payment.js)
$(document).ready(function() {
    // ✅ Lấy tham số totalPrice từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const totalPriceFromURL = urlParams.get('totalPrice');

    // ✅ Hiển thị tổng tiền LÊN NÚT "XÁC NHẬN ĐẶT HÀNG" (ĐÂY LÀ ĐIỂM CHÍNH XÁC)
    const paymentButton = $('#payment-button-confirm'); // ✅ Lấy đúng ID nút "Xác nhận đặt hàng"
    if (totalPriceFromURL) {
        paymentButton.text(`Xác nhận đặt hàng (${formatCurrency(totalPriceFromURL)})`); // ✅ Hiển thị trên nút này
    } else {
        paymentButton.text('Xác nhận đặt hàng'); // Fallback text nếu không có totalPrice
        console.warn('Không tìm thấy totalPrice trên URL.');
    }

    // ✅ Lấy giỏ hàng từ localStorage để hiển thị thông tin đơn hàng (KHÔNG ĐỔI - vẫn giữ nguyên)
    var cart = JSON.parse(localStorage.getItem('sffood-cart')) || [];
    const orderItemListDiv = $('.order-item-list');
    let totalPriceForSummary = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            const orderItemDiv = $('<div class="order-item-summary">');
            orderItemDiv.html(`
                <span class="order-item-name">${item.name} x ${item.quantity}</span>
                <span class="order-item-price">${formatCurrency(item.price * item.quantity)}</span>
            `);
            orderItemListDiv.append(orderItemDiv);
            totalPriceForSummary += item.price * item.quantity;
        });
        // ✅ Hiển thị tổng tiền trong phần tóm tắt đơn hàng (KHÔNG ĐỔI - vẫn giữ nguyên)
        $('#payment-total-price').text(formatCurrency(totalPriceForSummary));
    } else {
        orderItemListDiv.html('<p>Không có món hàng nào trong giỏ.</p>');
        $('#payment-total-price').text(formatCurrency(0));
        paymentButton.prop('disabled', true); // Vô hiệu hóa nút đặt hàng nếu giỏ hàng trống (tùy chọn)
    }


    // ✅ Xử lý submit form thanh toán (giữ nguyên validation - KHÔNG ĐỔI)
    document.querySelector('.payment-form').addEventListener('submit', function(event) {
        // ... (phần code validation form và xử lý đặt hàng hiện tại của bạn) ...
    });

    // ✅ Hàm format tiền tệ (giữ nguyên - KHÔNG ĐỔI)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
});