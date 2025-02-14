$(document).ready(function() {
    function getGreetingAndQuestion() {
        const hours = new Date().getHours();
        let greeting = "";
        let question = "";

        if (hours >= 6 && hours < 9) {
            greeting = "☀️ Good morning";
            question = "Did you have breakfast?";
        } else if (hours >= 9 && hours < 12) {
            greeting = "🌞 Hope you're having a great morning";
            question = "Need a coffee break?";
        } else if (hours >= 12 && hours < 15) {
            greeting = "🌤️ Good afternoon";
            question = "Ready for lunch?";
        } else if (hours >= 15 && hours < 18) {
            greeting = "🌅 Good evening";
            question = "How’s your afternoon going?";
        } else if (hours >= 18 && hours < 22) {
            greeting = "🌙 Hope you had a great day";
            question = "Dinner time? What’s on your menu?";
        } else {
            greeting = "🌃 Late night, huh?";
            question = "Don’t forget to rest!";
        }

        return { greeting, question };
    }

    function getWeather() {
        const apiKey = "YOUR_WEATHERAPI_KEY"; // 🔥 Thay bằng API Key mới của bạn
        let city = "Hanoi"; // Mặc định Hà Nội nếu không lấy được vị trí

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

                    $.getJSON(apiUrl)
                        .done(function(data) {
                            displayWeather(data);
                        })
                        .fail(function() {
                            console.error("Lỗi lấy dữ liệu từ API, sử dụng vị trí mặc định.");
                            fetchDefaultWeather(city);
                        });
                },
                function() {
                    console.warn("Không thể lấy vị trí, sử dụng Hà Nội mặc định.");
                    fetchDefaultWeather(city);
                }
            );
        } else {
            console.warn("Trình duyệt không hỗ trợ geolocation, sử dụng vị trí mặc định.");
            fetchDefaultWeather(city);
        }
    }

    function fetchDefaultWeather(city) {
        const apiKey = "4aec20675fad4205a4833449251402";
        const defaultApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        $.getJSON(defaultApiUrl)
            .done(function(data) {
                displayWeather(data);
            })
            .fail(function() {
                console.error("Lỗi lấy dữ liệu thời tiết mặc định.");
                $(".weather-info").text("Không thể lấy thông tin thời tiết.");
            });
    }

    function displayWeather(data) {
        const temperature = data.current.temp_c;
        const weather = data.current.condition.text;
        const city = data.location.name;
        const mealSuggestion = suggestMeal(temperature, weather);

        $(".weather-info").html(`🌡️ ${temperature}°C, ${weather} in ${city} <br> 🍽️ <strong>${mealSuggestion}</strong>`);
    }

    function suggestMeal(temp, weather) {
        if (temp > 30) return "🥤 Trà đào, 🍦 Kem dừa, 🥗 Gỏi cuốn, 🍹 Nước mía";
        if (weather.includes("Rain") || weather.includes("Drizzle")) return "🍜 Phở bò, ☕ Cà phê sữa, 🥖 Bánh mì thịt nướng";
        if (temp < 20) return "🍲 Lẩu bò, 🍜 Bún riêu, 🌶️ gì đó cay cay";
        if (weather.includes("Cloudy") || weather.includes("Mist")) return "🍲 Cháo gà, 🥟 Bánh bột lọc, 🍘 Bánh cuốn nóng";
        if (weather.includes("Storm") || weather.includes("Wind")) return "🍛 Cơm tấm, 🍚 Cơm chiên dương châu, 🍜 Mì Quảng";
        return "🍛 Hủ tiếu Nam Vang, 🥢 Bún thịt nướng, 🍲 Bò kho";
    }

    var userName = localStorage.getItem('userName');
    const { greeting, question } = getGreetingAndQuestion();

    if (userName) {
        $(".hero-greeting").text(`${greeting} ${userName} ! ${question}`);
    } else {
        $(".hero-greeting").text(`${greeting} ${question}`);
        console.warn("Không tìm thấy tên người dùng trong localStorage.");
    }

    getWeather(); // Gọi hàm lấy thời tiết

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

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
