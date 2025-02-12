function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
        return;
    }

    const user = {
        username: username,
        password: password,
    };


    $.ajax({
        url: "http://localhost:8080/api/auth/signin",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Accept': 'application/json'
        },
        success: function (response) {

            console.log('Đăng nhập thành công:', response);

            localStorage.setItem("token", response.accessToken);
            localStorage.setItem('userName', response.username);

            window.location.href = "../home-page/home-page-user.html";

        },
        error: function (xhr, status, error) {

            console.error('Lỗi đăng nhập:', error);
            console.error('Chi tiết lỗi từ server:', xhr.responseJSON);

            alert("Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng kiểm tra lại.");
        }
    });
}

document.getElementById('signin-form').addEventListener('submit', login);