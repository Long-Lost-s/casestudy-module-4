$(document).ready(function() {
    // Hàm để lấy dữ liệu đơn hàng từ API backend
    function getOrderHistory() {
        $.ajax({
            url: 'http://localhost:8080/api/orders', // ➡️  URL API backend của bạn
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response && response.length > 0) {
                    displayOrderHistory(response);
                } else {
                    $('#order-history-list').html('<p>Không có đơn hàng nào trong lịch sử.</p>');
                }
            },
            error: function(xhr, status, error) {
                console.error('Lỗi khi tải lịch sử đơn hàng:', error);
                $('#order-history-list').html('<p>Lỗi khi tải lịch sử đơn hàng. Vui lòng thử lại sau.</p>');
            }
        });
    }

    // Hàm hiển thị lịch sử đơn hàng lên trang
    function displayOrderHistory(orders) {
        const orderList = $('#order-history-list');
        orderList.empty();

        if (orders.length === 0) {
            orderList.html('<p>Không có đơn hàng nào trong lịch sử.</p>');
            return;
        }

        orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let totalRevenue = 0; // Khởi tạo biến tính tổng doanh thu

        orders.forEach(order => {
            totalRevenue += order.totalPrice; // Cộng dồn vào tổng doanh thu

            let orderDetailsHTML = '';
            const foodNames = order.foodNames ? order.foodNames.split(',') : [];
            const foodQuantities = order.foodQuantities ? order.foodQuantities.split(',') : [];

            if (foodNames.length > 0 && foodQuantities.length === foodNames.length) {
                orderDetailsHTML = foodNames.map((foodName, index) => `
                    <li class="order-detail-item">
                        <span class="item-name">${foodName.trim()}</span> <span class="item-quantity">x ${foodQuantities[index].trim()}</span>
                        <span class="item-price"> </span>
                    </li>
                `).join('');
            } else {
                orderDetailsHTML = '<li class="order-detail-item">Không có thông tin món hàng.</li>';
                console.warn('Đơn hàng ID #' + order.id + ' không có thông tin món hàng chi tiết.');
            }

            // ✅ Thêm nút "Hủy đơn hàng" và phần thông tin chi tiết đơn hàng vào HTML của mỗi order item
            const orderItemHTML = `
                <div class="order-item">
                    <div class="order-header">
                        <h3 class="order-number">Đơn hàng #${order.id}</h3>
                        <span class="order-date">Ngày đặt: ${formatDate(order.createdAt)}</span>
                    </div>
                    <div class="order-details-expanded" style="display: none;">
                        <ul class="order-details-list">
                            ${orderDetailsHTML}
                        </ul>
                        <p><strong>Tên khách hàng:</strong> ${order.customerName || 'N/A'}</p>
                        <p><strong>Số điện thoại:</strong> ${order.customerPhone || 'N/A'}</p>
                        <p><strong>Địa chỉ giao hàng:</strong> ${order.deliveryAddress || 'N/A'}</p>
                        <p><strong>Hình thức thanh toán:</strong> ${order.paymentMethod || 'N/A'}</p>
                    </div>
                    <div class="order-total-price">
                        Tổng cộng: ${formatCurrency(order.totalPrice)}
                        <button class="cancel-order-button" data-order-id="${order.id}">Hủy đơn hàng</button>
                    </div>
                </div>
            `;
            orderList.append(orderItemHTML);
        });

        // Hiển thị tổng doanh thu
        $('#total-revenue-value').text(formatCurrency(totalRevenue));

        // ✅ Thêm event listener cho header của mỗi đơn hàng để toggle hiển thị chi tiết
        $('.order-header').on('click', function() {
            $(this).next('.order-details-expanded').slideToggle(); // slideToggle để tạo hiệu ứngượt mà
        });

        // ✅ Thêm event listener cho nút "Hủy đơn hàng" sau khi đã render danh sách đơn hàng
        $('.cancel-order-button').on('click', function(event) {
            event.stopPropagation(); // Ngăn chặn sự kiện click lan rộng lên header khi click nút hủy
            const orderId = $(this).data('order-id');
            deleteOrder(orderId); // Gọi hàm xóa đơn hàng khi nút được click
        });
    }

    // Hàm format tiền tệ - GIỮ NGUYÊN
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    // Hàm format ngày tháng - GIỮ NGUYÊN
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // ✅ Hàm XÓA đơn hàng bằng API backend
    function deleteOrder(orderId) {
        if (confirm('Bạn có chắc chắn muốn hủy đơn hàng #' + orderId + '?')) { // ✅ Hiển thị hộp thoại xác nhận
            $.ajax({
                url: 'http://localhost:8080/api/orders/' + orderId, // ➡️  API endpoint xóa đơn hàng (DELETE)
                type: 'DELETE',
                success: function(response) {
                    alert('Đơn hàng #' + orderId + ' đã được hủy thành công.'); // ✅ Thông báo thành công
                    getOrderHistory(); // ✅ Tải lại lịch sử đơn hàng sau khi xóa
                },
                error: function(xhr, status, error) {
                    console.error('Lỗi khi hủy đơn hàng #' + orderId + ':', error);
                    alert('Lỗi khi hủy đơn hàng. Vui lòng thử lại sau.'); // ✅ Thông báo lỗi
                }
            });
        }
    }

    // Gọi hàm lấy và hiển thị lịch sử đơn hàng khi trang load - GIỮ NGUYÊN
    getOrderHistory();
});