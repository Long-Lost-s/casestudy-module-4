$(document).ready(function() {
    // Hàm để lấy dữ liệu đơn hàng từ API backend
    function getOrderHistory() {
        $.ajax({
            url: 'http://localhost:8080/api/orders', // ➡️  URL API backend của bạn
            type: 'GET',
            dataType: 'json',
            // ✅  Thêm header Authorization nếu API backend yêu cầu xác thực (ví dụ JWT)
            // headers: {
            //     "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
            // },
            success: function(response) {
                if (response && response.length > 0) {
                    displayOrderHistory(response); // Gọi hàm hiển thị đơn hàng
                } else {
                    $('#order-history-list').html('<p>Không có đơn hàng nào trong lịch sử.</p>'); // Hiển thị nếu không có đơn hàng
                }
            },
            error: function(xhr, status, error) {
                console.error('Lỗi khi tải lịch sử đơn hàng:', error);
                $('#order-history-list').html('<p>Lỗi khi tải lịch sử đơn hàng. Vui lòng thử lại sau.</p>'); // Hiển thị thông báo lỗi
            }
        });
    }

    // Hàm hiển thị lịch sử đơn hàng lên trang
    function displayOrderHistory(orders) {
        const orderList = $('#order-history-list');
        orderList.empty(); // Xóa nội dung "loading..."

        if (orders.length === 0) {
            orderList.html('<p>Không có đơn hàng nào trong lịch sử.</p>');
            return;
        }

        orders.forEach(order => {
            // ✅  Giả định model Order trả về từ backend có các trường sau:
            // orderId, orderDate, totalPrice, orderItems (mảng OrderItem)
            const orderItemHTML = `
                        <div class="order-item">
                            <div class="order-header">
                                <h3 class="order-number">Đơn hàng #${order.orderId}</h3>
                                <span class="order-date">Ngày đặt: ${formatDate(order.orderDate)}</span>
                            </div>
                            <ul class="order-details-list">
                                ${order.orderItems.map(orderItem => `
                                    <li class="order-detail-item">
                                        <span class="item-name">${orderItem.food.name}</span> <span class="item-quantity">x ${orderItem.quantity}</span>
                                        <span class="item-price">${formatCurrency(orderItem.price)}</span> </li>
                                `).join('')}
                            </ul>
                            <div class="order-total-price">
                                Tổng cộng: ${formatCurrency(order.totalPrice)}
                            </div>
                        </div>
                    `;
            orderList.append(orderItemHTML);
        });
    }

    // Hàm format tiền tệ (giữ nguyên)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    // Hàm format ngày tháng (ví dụ: từ ISO string sang DD/MM/YYYY)
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Gọi hàm lấy và hiển thị lịch sử đơn hàng khi trang load
    getOrderHistory();
});