function login(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy thông tin đăng nhập từ form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = {
        "username": username,
        "password": password,
    };

    // Gửi AJAX request đến backend
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/api/auth/signin", // Thay thế bằng đường dẫn API đăng nhập của bạn
        type: "POST",
        data: JSON.stringify(user),
        success: function (response) {
            // Xử lý kết quả trả về từ backend
            console.log('Đăng nhập thành công:', response);
            // Ví dụ: lưu token vào localStorage và chuyển hướng đến trang sản phẩm
            localStorage.setItem("token", response.accessToken);
            window.location.href = "../home-page/home-page.html"; // Thay thế bằng đường dẫn đến trang sản phẩm của bạn
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi
            console.error('Lỗi đăng nhập:', error);
            // Ví dụ: hiển thị thông báo lỗi cho người dùng
            alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
    });
}

document.getElementById('signin-form').addEventListener('submit', login);