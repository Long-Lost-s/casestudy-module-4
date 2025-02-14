$(document).ready(function() {
    function getGreetingAndQuestion() {
        const hours = new Date().getHours();
        let greeting = "";
        let question = "";

        if (hours >= 6 && hours < 9) {
            greeting = "☀️ Good morning!";
            question = "Did you have breakfast? 🍳";
        } else if (hours >= 9 && hours < 11) {
            greeting = "🌞 Hope you're having a great morning 🌈";
            question = "Need a coffee break?☕";
        } else if (hours >= 11 && hours < 14) {
            greeting = "🌤️ It's Lunch time!🍽️";
            question = "Have anything in mind? 🍔";
        } else if (hours >= 14 && hours < 17) {
            greeting = "🌅 Good afternoon!";
            question = "Boba milk tea time? 🥤";
        } else if (hours >= 17 && hours < 20) {
            greeting = "🌅 Good evening!";
            question = "Dinner time? What’s on your menu? 🍕";
        } else if (hours >= 20 && hours < 23) {
            greeting = "🌙 Hope you had a great day!";
            question = "Don't skip the meal, your belly need it 👀";
        } else {
            greeting = "🌃 Late night, huh?";
            question = "Don’t forget to rest! 😴";
        }

        return { greeting, question };
    }

    var userName = localStorage.getItem('userName');
    const { greeting, question } = getGreetingAndQuestion();

    if (userName) {
        $(".hero-greeting").text(`${greeting} ${userName} ! ${question}`);
    } else {
        $(".hero-greeting").text(`${greeting} ${question}`);
        console.warn("Không tìm thấy tên người dùng trong localStorage.");
    }

    // 🚀 Gọi cả hai API và đảm bảo chúng chạy xong trước khi hiển thị
    Promise.all([loadFastDeliveryFoods(), loadMostViewedFoods()])
        .then(() => console.log("Tất cả dữ liệu đã tải xong"))
        .catch(error => console.error("Lỗi khi tải dữ liệu:", error));

    // 🛠️ Xử lý sự kiện đăng xuất
    $("#logout-button").click(function() {
        $.ajax({
            url: 'http://localhost:8080/api/auth/signout',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                console.log("Logout successful:", response);
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                window.location.href = "./home-page.html";
            },
            error: function(xhr, status, error) {
                console.error("Logout error:", error);
                alert("Logout failed. Please try again.");
            }
        });
    });
});

// 🛠️ Hàm tải danh sách món ăn giao nhanh
function loadFastDeliveryFoods() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:8080/api/foods/fast-delivery',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                var fastDeliveryList = $('.fast-delivery-list');
                fastDeliveryList.empty();

                console.log("Món ăn giao nhanh từ API:", response); // ✅ Debug API data

                if (response && response.length > 0) {
                    $.each(response.slice(0, 6), function(index, food) { // ✅ Chỉ hiển thị 6 món
                        var link = $('<a class="link-infor" href="food.html?id=' + food.id + '">');
                        var offerItem = $('<div class="offer-item fast-delivery-item">');
                        var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                        var content = $('<div class="offer-item-content">');
                        var promo = $('<div class="offer-item-promo">').text("Giao nhanh");
                        var name = $('<div class="offer-item-name">').text(food.name);

                        // 🕒 Hiển thị thời gian chuẩn bị món ăn (phút)
                        var preparationTime = $('<div class="offer-item-time">')
                            .text(`⏱ ${food.preparationTime} phút`);

                        var priceContainer = $('<div class="offer-item-price">');
                        var discountPrice = $('<span class="offer-item-discount-price">').text(formatCurrency(food.price));
                        var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");

                        addToCartButton.data('food-id', food.id);
                        addToCartButton.data('food-name', food.name);
                        addToCartButton.data('food-price', food.price);

                        priceContainer.append(discountPrice, addToCartButton);
                        content.append(promo, name, preparationTime, priceContainer);
                        offerItem.append(image, content);
                        link.append(offerItem);
                        fastDeliveryList.append(link);
                    });
                } else {
                    fastDeliveryList.html('<div class="offer-item">Không có món ăn giao nhanh nào.</div>');
                }
                resolve(); // ✅ API thành công
            },
            error: function(xhr, status, error) {
                $('.fast-delivery-list').html('<div class="offer-item">Lỗi tải món ăn giao nhanh. Vui lòng thử lại sau.</div>');
                console.error('Lỗi khi tải món ăn giao nhanh:', error);
                reject(error); // ❌ API lỗi
            }
        });
    });
}

// 🛠️ Hàm tải danh sách món ăn được quan tâm nhiều nhất
function loadMostViewedFoods() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:8080/api/foods/most-viewed',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                var mostViewedList = $('.most-viewed-list');
                mostViewedList.empty(); // Xóa dữ liệu cũ trước khi thêm mới

                console.log("Món ăn quan tâm nhất từ API:", response); // ✅ Debug API data

                if (response && response.length > 0) {
                    $.each(response.slice(0, 6), function(index, food) { // ✅ Giới hạn 6 món
                        var link = $('<a class="link-infor" href="food.html?id=' + food.id + '">');
                        var offerItem = $('<div class="offer-item most-viewed-item">');
                        var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                        var content = $('<div class="offer-item-content">');
                        var promo = $('<div class="offer-item-promo">').text("Quan tâm nhiều nhất");
                        var name = $('<div class="offer-item-name">').text(food.name);
                        var viewCount = $('<div class="offer-item-views">').text(`👁️ ${food.views} lượt xem`);

                        var priceContainer = $('<div class="offer-item-price">');
                        var discountPrice = $('<span class="offer-item-discount-price">').text(formatCurrency(food.price));
                        var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");

                        addToCartButton.data('food-id', food.id);
                        addToCartButton.data('food-name', food.name);
                        addToCartButton.data('food-price', food.price);

                        priceContainer.append(discountPrice, addToCartButton);
                        content.append(promo, name, viewCount, priceContainer);
                        offerItem.append(image, content);
                        link.append(offerItem);
                        mostViewedList.append(link);
                    });
                } else {
                    mostViewedList.html('<div class="offer-item">Không có món ăn được quan tâm nào.</div>');
                }
                resolve(); // ✅ API thành công
            },
            error: function(xhr, status, error) {
                $('.most-viewed-list').html('<div class="offer-item">Lỗi tải món ăn được quan tâm. Vui lòng thử lại sau.</div>');
                console.error('Lỗi khi tải món ăn được quan tâm:', error);
                reject(error); // ❌ API lỗi
            }
        });
    });
}

// ✅ Hàm định dạng tiền tệ, đã sửa lỗi cú pháp
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
