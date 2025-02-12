// ✅ File JavaScript tách rời cho trang chủ người dùng đã đăng nhập (homepage-user.js)
$(document).ready(function() {
    // ✅ Lấy tên người dùng từ localStorage (hoặc nguồn lưu trữ tên người dùng của bạn)
    var userName = localStorage.getItem('userName'); // Giả sử bạn lưu tên vào 'userName' trong localStorage
    if (userName) {
        // ✅ Hiển thị lời chào có tên người dùng
        $(".hero-greeting").text("Chào  " + userName); // Ví dụ: "Chào buổi sáng, [Tên người dùng]"
    } else {
        // ✅ Nếu không tìm thấy tên người dùng, hiển thị lời chào mặc định
        $(".hero-greeting").text("Hôm nay ăn gì"); // Hoặc lời chào mặc định khác
        console.warn("Không tìm thấy tên người dùng trong localStorage."); // Log cảnh báo nếu không có tên
    }

    $("#logout-button").click(function() { // ✅ Xử lý sự kiện click cho nút Đăng xuất
        // Gọi API logout (hoặc thực hiện các hành động logout khác của bạn)
        // Sau khi logout thành công, có thể redirect về trang chủ hoặc trang đăng nhập
        $.ajax({
            url: 'http://localhost:8080/api/auth/signout', //  ➡️ ✅ URL API logout của bạn
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                console.log("Logout successful:", response);
                // Redirect về trang chủ hoặc trang đăng nhập sau khi logout
                window.location.href = "../home-page/home-page.html"; //  ➡️ ✅ Điều chỉnh URL trang chủ/đăng nhập nếu cần
            },
            error: function(xhr, status, error) {
                console.error("Logout error:", error);
                alert("Logout failed. Please try again."); // Hiển thị thông báo lỗi nếu logout thất bại
            }
        });
    });
});
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}