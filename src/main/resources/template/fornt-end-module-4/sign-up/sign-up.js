function register(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy thông tin đăng ký từ form
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm_password").value;

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp nhau không
    if (password!== confirmPassword) {
        alert('Mật khẩu và xác nhận mật khẩu không khớp!');
        return;
    }

    // Lấy danh sách các vai trò được chọn
    var roles =[]; // Khởi tạo mảng roles
    var roleUser = document.getElementById("roleUser");
    var roleSeller = document.getElementById("roleSeller");
    if (roleUser.checked) {
        roles.push(roleUser.value);
    }
    if (roleSeller.checked) {
        roles.push(roleSeller.value);
    }

    // Kiểm tra xem người dùng có chọn "người bán" mà không chọn "người dùng" hay không
    if (roles.includes("ROLE_SELLER") &&!roles.includes("ROLE_USER")) {
        alert('Bạn phải chọn vai trò "Người dùng" nếu muốn chọn vai trò "Người bán".');
        return;
    }

    // Tạo object chứa dữ liệu đăng ký
    var data = {
        username: username,
        email: email,
        password: password,
        role: roles
    };

    // Gửi AJAX request đến backend
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/api/auth/signup", // Thay thế bằng đường dẫn API đăng ký của bạn
        type: "POST",
        data: JSON.stringify(data),
        success: function (response) {
            // Xử lý kết quả trả về từ backend
            console.log('Đăng ký thành công:', response);
            // Ví dụ: hiển thị thông báo thành công và chuyển hướng đến trang đăng nhập
            alert("Đăng ký thành công!");
            window.location.href = "../sign-in/sign-in.html"; // Thay thế bằng đường dẫn đến trang đăng nhập của bạn
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi
            console.error('Lỗi đăng ký:', error);
            // Ví dụ: hiển thị thông báo lỗi cho người dùng
            alert("Lỗi đăng ký: " + error);
        }
    });
}

document.getElementById('signup-form').addEventListener('submit', register);