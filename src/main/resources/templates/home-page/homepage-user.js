$(document).ready(function() {
    function getGreetingAndQuestion() {
        const hours = new Date().getHours();
        let greeting = "";
        let question = "";

        if (hours >= 6 && hours < 9) {
            greeting = "☀️ Chào buổi sáng";
            question = "Bạn đã ăn sáng chưa?";
        } else if (hours >= 9 && hours < 12) {
            greeting = "🌞 Chúc bạn một buổi sáng vui vẻ";
            question = "Bạn có muốn uống một ly cà phê không?";
        } else if (hours >= 12 && hours < 15) {
            greeting = "🌤️ Chào buổi trưa";
            question = "Đã đến giờ ăn trưa rồi!";
        } else if (hours >= 15 && hours < 18) {
            greeting = "🌅 Chào buổi chiều";
            question = "Buổi chiều của bạn thế nào rồi?";
        } else if (hours >= 18 && hours < 22) {
            greeting = "🌙 Chúc bạn một buổi tối tốt lành";
            question = "Đến giờ ăn tối rồi, bạn muốn ăn gì?";
        } else {
            greeting = "🌃 Khuya rồi đó!";
            question = "Đừng quên nghỉ ngơi nhé!";
        }

        return { greeting, question };
    }

    function getWeather() {
        const apiKey = "4aec20675fad4205a4833449251402";
        let city = "Hanoi";

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeather(lat, lon, apiKey);
                },
                function() {
                    fetchWeatherByCity(city, apiKey);
                }
            );
        } else {
            fetchWeatherByCity(city, apiKey);
        }
    }

    function fetchWeather(lat, lon, apiKey) {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

        $.getJSON(apiUrl)
            .done(function(data) {
                displayWeather(data);
            })
            .fail(function() {
                fetchWeatherByCity("Hanoi", apiKey);
            });
    }

    function fetchWeatherByCity(city, apiKey) {
        const defaultApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        $.getJSON(defaultApiUrl)
            .done(function(data) {
                displayWeather(data);
            })
            .fail(function() {
                $(".weather-info").text("Không thể lấy thông tin thời tiết.");
            });
    }

    function displayWeather(data) {
        const temperature = data.current.temp_c;
        const weather = data.current.condition.text;
        const city = data.location.name;
        const mealSuggestion = suggestMeal(temperature, weather);

        $(".weather-info").html(`🌡️ ${temperature}°C, ${weather} tại ${city} <br> 🍽️ <strong>Gợi ý cho bạn mến: ${mealSuggestion}</strong>`);
    }

    function suggestMeal(temp, weather) {
        let meals = [];

        if (temp > 30) {
            meals = [
                "🥤 Trà đào", "🍦 Kem dừa", "🥗 Gỏi cuốn", "🍹 Nước mía", "🍉 Dưa hấu", "🥑 Sinh tố bơ",
                "🍜 Bibimbap (Cơm trộn Hàn Quốc)", "🥗 Salad Hy Lạp", "🍦 Gelato Ý", "🍉 Trái cây lạnh"
            ];
        } else if (weather.includes("Rain") || weather.includes("Drizzle")) {
            meals = [
                "🍜 Phở bò", "☕ Cà phê sữa", "🥖 Bánh mì thịt nướng", "🍲 Bún bò Huế", "🍢 Chả cá Lã Vọng",
                "🍲 Kimchi Jjigae ", "🥘 Pasta Carbonara", "🥣 Súp hành kiểu Pháp"
            ];
        } else if (temp < 20) {
            meals = [
                "🍲 Lẩu bò", "🍜 Bún riêu", "🌶️ Ốc xào cay", "🍚 Cơm gà Hải Nam", "🥘 Canh chua cá lóc",
                "🍢 Hotteok", "🥩 Bít tết", "🍜 Ramen"
            ];
        } else if (weather.includes("Cloudy") || weather.includes("Mist")) {
            meals = [
                "🍲 Cháo gà", "🥟 Bánh bột lọc", "🍘 Bánh cuốn nóng", "🍜 Bún mọc", "🍢 Nem lụi",
                "🥖 Bánh croissant", "🍜 Mì Udon", "🍛 Curry Nhật Bản"
            ];
        } else if (weather.includes("Storm") || weather.includes("Wind")) {
            meals = [
                "🍛 Cơm tấm", "🍚 Cơm chiên dương châu", "🍜 Mì Quảng", "🥘 Bánh xèo", "🍖 Bò lá lốt",
                "🍕 Pizza Margherita", "🍲 Goulash", "🥩 BBQ Hàn Quốc"
            ];
        } else {
            meals = [
                "🍛 Hủ tiếu Nam Vang", "🥢 Bún thịt nướng", "🍲 Bò kho", "🍜 Cao lầu", "🍢 Gà nướng mật ong",
                "🍝 Spaghetti Bolognese", "🥪 Bánh sandwich kiểu Ý", "🍲 Súp gà kiểu Mỹ"
            ];
        }

        return getRandomMeals(meals, 3);
    }

    function getRandomMeals(mealList, count) {
        let shuffled = mealList.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count).join(", ");
    }

    var userName = localStorage.getItem('userName');
    const { greeting, question } = getGreetingAndQuestion();

    if (userName) {
        $(".hero-greeting").text(`${greeting} ${userName} ! ${question}`);
    } else {
        $(".hero-greeting").text(`${greeting} ${question}`);
    }

    getWeather();

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
            success: function() {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                window.location.href = "./home-page.html";
            },
            error: function() {
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
                    $.each(response.slice(0, 9), function(index, food) { // ✅ Chỉ hiển thị 6 món
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
                    $.each(response.slice(0, 9), function(index, food) { // ✅ Giới hạn 6 món
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
