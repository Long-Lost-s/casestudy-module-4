$(document).ready(function() {
    var userName = localStorage.getItem('userName');
    if (userName) {

        $(".hero-greeting").text("Chào  " + userName);
    } else {

        $(".hero-greeting").text("Hôm nay ăn gì");
        console.warn("Không tìm thấy tên người dùng trong localStorage.");
    }

    $("#logout-button").click(function() {

        $.ajax({
            url: 'http://localhost:8080/api/auth/signout',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                console.log("Logout successful:", response);

                localStorage.removeItem('token');
                localStorage.removeItem('userName');

                window.location.href = "../home-page/home-page.html";
            },
            error: function(xhr, status, error) {
                console.error("Logout error:", error);
                alert("Logout failed. Please try again.");
            }
        });
    });
});
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}