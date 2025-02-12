// ✅ File JavaScript tách rời cho trang thanh toán (payment.js)
$(document).ready(function() {
    // ✅ Lấy tham số totalPrice từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const totalPriceFromURL = urlParams.get('totalPrice');

    // ✅ Hiển thị tổng tiền LÊN NÚT "XÁC NHẬN ĐẶT HÀNG"
    const paymentButton = $('#payment-button-confirm');
    if (totalPriceFromURL) {
        paymentButton.text(`Xác nhận đặt hàng (${formatCurrency(totalPriceFromURL)})`);
    } else {
        paymentButton.text('Xác nhận đặt hàng');
        console.warn('Không tìm thấy totalPrice trên URL.');
    }

    // ✅ Lấy giỏ hàng từ localStorage để hiển thị thông tin đơn hàng
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
        $('#payment-total-price').text(formatCurrency(totalPriceForSummary));
    } else {
        orderItemListDiv.html('<p>Không có món hàng nào trong giỏ.</p>');
        $('#payment-total-price').text(formatCurrency(0));
        paymentButton.prop('disabled', true);
    }

    // ✅ Xử lý submit form thanh toán
    document.querySelector('.payment-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn submit form mặc định

        let isValid = true;
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');

        // Validate Name
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            document.getElementById('name-error').textContent = 'Vui lòng nhập họ và tên.';
            isValid = false;
        }

        // Validate Phone Number
        const phoneInput = document.getElementById('phone');
        const phoneRegex = /^(0[3|5|7|8|9])([0-9]{8})$/;
        if (!phoneRegex.test(phoneInput.value)) {
            document.getElementById('phone-error').textContent = 'Số điện thoại không hợp lệ.';
            isValid = false;
        }

        // Validate Address
        const addressInput = document.getElementById('address');
        if (!addressInput.value.trim()) {
            document.getElementById('address-error').textContent = 'Vui lòng nhập địa chỉ giao hàng.';
            isValid = false;
        }

        if (!isValid) {
            return; // Dừng submit nếu form không hợp lệ
        }

        // ✅ Chuẩn bị dữ liệu đơn hàng để gửi lên backend API (POST /api/orders)
        const orderData = {
            customerName: nameInput.value.trim(),
            customerPhone: phoneInput.value.trim(),
            deliveryAddress: addressInput.value.trim(),
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            totalPrice: totalPriceForSummary, // Sử dụng totalPrice đã tính toán ở frontend
            orderItems: cart.map(item => ({ // Chuyển đổi giỏ hàng thành mảng OrderItem
                foodId: item.id, // Giả định item trong giỏ hàng có trường 'id' là foodId
                quantity: item.quantity,
                price: item.price // Giả định item trong giỏ hàng có trường 'price' (giá đơn vị)
                // ✅  Có thể cần điều chỉnh các trường này theo model OrderItem của backend
            }))
        };

        // ✅ Gọi API backend để tạo đơn hàng (POST /api/orders)
        $.ajax({
            url: 'http://localhost:8080/api/orders', // ➡️  URL API backend của bạn
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(orderData),
            dataType: 'json',
            // ✅  Thêm header Authorization nếu API backend yêu cầu xác thực (ví dụ JWT)
            // headers: {
            //     "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
            // },
            success: function(response) {
                // Xử lý khi tạo đơn hàng thành công
                alert('Đặt hàng thành công!');
                console.log('Đơn hàng đã tạo:', response);
                localStorage.removeItem('sffood-cart'); // Xóa giỏ hàng sau khi đặt hàng thành công
                // ✅  Có thể chuyển hướng người dùng đến trang "đặt hàng thành công" (ví dụ: order-success.html)
                // window.location.href = 'order-success.html';
            },
            error: function(xhr, status, error) {
                // Xử lý khi tạo đơn hàng thất bại
                console.error('Lỗi khi đặt hàng:', error);
                alert('Đặt hàng thất bại. Vui lòng thử lại sau.');
                // ✅  Hiển thị thông báo lỗi chi tiết hơn cho người dùng (ví dụ: dựa vào xhr.responseText)
            }
        });
    });

    // ✅ Hàm format tiền tệ (giữ nguyên)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
});