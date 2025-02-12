// ✅ Đoạn mã JavaScript tối ưu hóa cho chức năng đăng nhập (signin.js)
function login(event) {
    event.preventDefault(); // Ngăn chặn hành vi submit form mặc định của trình duyệt

    // Lấy thông tin đăng nhập từ form và loại bỏ khoảng trắng đầu cuối
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Kiểm tra xem username và password có rỗng không (validation cơ bản phía client)
    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
        return; // Dừng hàm nếu thông tin không hợp lệ
    }

    const user = {
        username: username,
        password: password,
    };

    // Gửi AJAX request đến backend sử dụng jQuery
    $.ajax({
        url: "http://localhost:8080/api/auth/signin", // ➡️ Thay bằng đường dẫn API đăng nhập của bạn
        type: "POST",
        contentType: "application/json", // Loại dữ liệu gửi đi là JSON
        data: JSON.stringify(user), // Chuyển đổi đối tượng user thành chuỗi JSON
        xhrFields: {
            withCredentials: true // ✅ Đảm bảo gửi cookies (quan trọng cho xác thực phiên)
        },
        headers: {
            'Accept': 'application/json' // Yêu cầu server trả về dữ liệu dạng JSON
        },
        success: function(response) {
            console.log("Đăng nhập thành công:", response);
            localStorage.setItem('token', response.accessToken); // Lưu token
            localStorage.setItem('userName', response.username);

            // ✅ Chuyển hướng đến trang redirect.html thay vì homepage-user.html
            window.location.href = "../redirect/redirect.html"; // ➡️ Chuyển hướng đến trang redirect

        },
        error: function (xhr, status, error) {
            // Xử lý khi đăng nhập thất bại
            console.error('Lỗi đăng nhập:', error);
            console.error('Chi tiết lỗi từ server:', xhr.responseJSON); // In thêm thông tin lỗi chi tiết từ server (nếu có)

            // Hiển thị thông báo lỗi cho người dùng (thay alert bằng cách hiển thị lỗi trực quan hơn trên trang web thì tốt hơn)
            alert("Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng kiểm tra lại.");
        }
    });
}

// Gắn trình xử lý sự kiện submit cho form đăng nhập (đảm bảo form có id="signin-form")
document.getElementById('signin-form').addEventListener('submit', login);