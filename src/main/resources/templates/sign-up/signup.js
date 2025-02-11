// ✅ Đoạn mã JavaScript cho chức năng đăng ký (signup.js)
function register(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy thông tin đăng ký từ form và loại bỏ khoảng trắng đầu cuối
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm_password").value.trim();

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp nhau không
    if (password !== confirmPassword) {
        alert('Mật khẩu và xác nhận mật khẩu không khớp!');
        return; // Dừng hàm nếu mật khẩu không khớp
    }

    // Kiểm tra username, email, password có rỗng không (validation cơ bản phía client)
    if (!username || !email || !password) {
        alert("Vui lòng nhập đầy đủ thông tin đăng ký.");
        return; // Dừng hàm nếu thiếu thông tin
    }

    // Kiểm tra định dạng email đơn giản (regex cơ bản)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Địa chỉ email không hợp lệ.");
        return; // Dừng hàm nếu email không hợp lệ
    }

    // Lấy danh sách các vai trò được chọn
    const roles = []; // Khởi tạo mảng roles
    const roleUser = document.getElementById("roleUser");
    const roleSeller = document.getElementById("roleSeller");
    if (roleUser.checked) {
        roles.push(roleUser.value);
    }
    if (roleSeller.checked) {
        roles.push(roleSeller.value);
    }

    // Kiểm tra xem người dùng có chọn "người bán" mà không chọn "người dùng" hay không
    if (roles.includes("ROLE_SELLER") && !roles.includes("ROLE_USER")) {
        alert('Bạn phải chọn vai trò "Người dùng" nếu muốn chọn vai trò "Người bán".');
        return; // Dừng hàm nếu chọn Seller mà không chọn User
    }

    // Tạo object chứa dữ liệu đăng ký
    const data = {
        username: username,
        email: email,
        password: password,
        role: roles
    };

    // Gửi AJAX request đến backend sử dụng jQuery
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: "http://localhost:8080/api/auth/signup", // ➡️ Thay bằng đường dẫn API đăng ký của bạn
        type: "POST",
        data: JSON.stringify(data),
        success: function (response) {
            // Xử lý kết quả trả về từ backend khi đăng ký thành công
            console.log('Đăng ký thành công:', response);
            alert("Đăng ký thành công!");
            // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
            window.location.href = "../sign-in/sign-in.html"; // ➡️ Thay đổi đường dẫn đến trang đăng nhập của bạn
        },
        error: function (xhr, status, error) {
            // Xử lý lỗi khi đăng ký thất bại
            console.error('Lỗi đăng ký:', error);
            console.error('Chi tiết lỗi từ server:', xhr.responseJSON); // In thêm thông tin lỗi chi tiết từ server (nếu có)
            // Hiển thị thông báo lỗi cho người dùng (thay alert bằng cách hiển thị lỗi trực quan hơn trên trang web thì tốt hơn)
            alert("Lỗi đăng ký: " + (xhr.responseJSON?.message || error)); // Hiển thị message từ server nếu có, hoặc lỗi chung chung
        }
    });
}

// Gắn trình xử lý sự kiện submit cho form đăng ký (đảm bảo form có id="signup-form")
document.getElementById('signup-form').addEventListener('submit', register);