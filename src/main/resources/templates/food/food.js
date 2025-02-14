$(document).ready(function() {
    const foodId = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token'); // Kiểm tra đăng nhập

    if (foodId) {
        loadFoodDetails(foodId);
        checkFavoriteStatus(foodId); // ✅ Kiểm tra trạng thái yêu thích
    } else {
        alert('Không có ID món ăn.');
    }

    // 🛠 Xử lý khi click vào nút "Yêu thích"
    $(document).on("click", "#favorite-button", function() {
        if (!token) {
            alert("Bạn cần đăng nhập để sử dụng tính năng này!");
            window.location.href = "../sign-in/sign-in.html"; // Chuyển hướng đến trang đăng nhập
            return;
        }
        toggleFavorite(foodId);
    });
});

// 🛠 Kiểm tra xem món đã được yêu thích chưa
function checkFavoriteStatus(foodId) {
    let favoriteFoods = JSON.parse(localStorage.getItem("favoriteFoods")) || [];

    console.log("🔍 Danh sách yêu thích:", favoriteFoods); // ✅ Kiểm tra danh sách lưu
    if (favoriteFoods.includes(foodId)) {
        $("#favorite-button").addClass("favorited").text("💖 Đã yêu thích");
    } else {
        $("#favorite-button").removeClass("favorited").text("💖 Yêu thích");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let favoriteFoods = JSON.parse(localStorage.getItem("favoriteFoods")) || [];
    let listContainer = document.getElementById("favorite-list");

    if (favoriteFoods.length === 0) {
        listContainer.innerHTML = "<li>Chưa có món yêu thích nào.</li>";
    } else {
        listContainer.innerHTML = "";
        favoriteFoods.forEach(foodId => {
            let listItem = document.createElement("li");
            listItem.textContent = `Món ăn ID: ${foodId}`;  // Cập nhật để hiển thị đúng tên món ăn
            listContainer.appendChild(listItem);
        });
    }
});


// 🔥 Thêm/xóa món ăn khỏi danh sách yêu thích
function toggleFavorite(foodId) {
    let favoriteFoods = JSON.parse(localStorage.getItem("favoriteFoods")) || [];
    let index = favoriteFoods.indexOf(foodId);

    if (index > -1) {
        favoriteFoods.splice(index, 1);
        $("#favorite-button").removeClass("favorited").text("💖 Yêu thích");
        console.log("❌ Đã xóa khỏi danh sách yêu thích:", foodId);
    } else {
        favoriteFoods.push(foodId);
        $("#favorite-button").addClass("favorited").text("💖 Đã yêu thích");
        console.log("✅ Đã thêm vào danh sách yêu thích:", foodId);
    }

    localStorage.setItem("favoriteFoods", JSON.stringify(favoriteFoods));
}
