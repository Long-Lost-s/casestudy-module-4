$(document).ready(function() {
    // Hàm để lấy dữ liệu đơn hàng từ API backend
    function getOrderHistory() {
        $.ajax({
            url: 'http://localhost:8080/api/orders', // ➡️  URL API backend của bạn
            type: 'GET',
            dataType: 'json',
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

        // ✅ Sắp xếp đơn hàng theo thời gian tạo (mới nhất lên đầu) - giữ nguyên

        orders.forEach(order => {
            let orderDetailsHTML = ''; // Khởi tạo chuỗi HTML cho order details

            // ✅ Đọc thông tin món ăn trực tiếp từ order.foodNames và order.foodQuantities
            const foodNames = order.foodNames ? order.foodNames.split(',') : []; // Tách chuỗi tên món ăn thành mảng
            const foodQuantities = order.foodQuantities ? order.foodQuantities.split(',') : []; // Tách chuỗi số lượng thành mảng

            if (foodNames.length > 0 && foodQuantities.length === foodNames.length) { // Đảm bảo số lượng tên và số lượng khớp nhau
                orderDetailsHTML = foodNames.map((foodName, index) => `
                    <li class="order-detail-item">
                        <span class="item-name">${foodName.trim()}</span> <span class="item-quantity">x ${foodQuantities[index].trim()}</span>
                        <span class="item-price"> </span>
                    </li>
                `).join('');
            } else {
                orderDetailsHTML = '<li class="order-detail-item">Không có thông tin món hàng.</li>'; // Hiển thị thông báo nếu không có thông tin món ăn
                console.warn('Đơn hàng ID #' + order.id + ' không có thông tin món hàng chi tiết.'); // Log cảnh báo để debug
            }


            const orderItemHTML = `
                        <div class="order-item">
                            <div class="order-header">
                                <h3 class="order-number">Đơn hàng #${order.id}</h3>
                                <span class="order-date">Ngày đặt: ${formatDate(order.createdAt)}</span>
                            </div>
                            <ul class="order-details-list">
                                ${orderDetailsHTML}
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