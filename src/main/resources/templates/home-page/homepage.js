// ✅ File JavaScript tách rời cho trang chủ (homepage.js)
$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/foods', // ➡️ ✅ ĐÃ SỬA URL API BACKEND ĐỂ GỌI ENDPOINT MỚI "/api/foods/homepage-offers"
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response && response.length > 0) {
                var offersList = $('.offers-list');
                offersList.empty(); // Xóa "Loading offers..." mặc định

                $.each(response, function(index, food) { // ✅ Lặp qua dữ liệu món ăn (Food)
                    if (index < 9) {
                        var offerItem = $('<div class="offer-item">');
                        var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name); // ✅ Sử dụng food.imageUrl và food.name từ API response (theo model Food)
                        var content = $('<div class="offer-item-content">');
                        var promoText = food.specialOffer ? "Special Offer" : (food.featured ? "Featured" : "Ưu đãi"); // ✅ Xác định text promo dựa trên food.specialOffer hoặc food.featured
                        var promo = $('<div class="offer-item-promo">').text(promoText);
                        var name = $('<div class="offer-item-name">').text(food.name); // ✅ Sử dụng food.name

                        // ✅ Thêm phần hiển thị giá
                        var priceContainer = $('<div class="offer-item-price">');
                        var originalPrice = $('<span class="offer-item-original-price">');
                        var discountPrice = $('<span class="offer-item-discount-price">');

                        // Kiểm tra xem có giá khuyến mãi hay không
                        if (food.discountPrice && food.discountPrice < food.price) {
                            originalPrice.text(formatCurrency(food.price)); // Hiển thị giá gốc và gạch ngang
                            originalPrice.css('text-decoration', 'line-through'); // Gạch ngang giá gốc
                            discountPrice.text(formatCurrency(food.discountPrice)); // Hiển thị giá khuyến mãi
                            priceContainer.append(discountPrice, originalPrice); // Giá khuyến mãi trước, giá gốc sau
                        } else {
                            discountPrice.text(formatCurrency(food.price)); // Chỉ hiển thị giá gốc nếu không có khuyến mãi
                            priceContainer.append(discountPrice);
                        }

                        content.append(promo, name);
                        offerItem.append(image, content);
                        offersList.append(offerItem);
                    }
                });
            } else {
                $('.offers-list').html('<div class="offer-item">Không có ưu đãi nào.</div>'); // Hiển thị khi không có ưu đãi
                console.log('Không có ưu đãi nào được tìm thấy.');
            }
        },
        error: function(xhr, status, error) {
            $('.offers-list').html('<div class="offer-item">Lỗi tải ưu đãi. Vui lòng thử lại sau.</div>'); // Hiển thị lỗi nếu request thất bại
            console.error('Lỗi khi tải ưu đãi:', error);
        }

    });
    // ✅ Hàm format tiền tệ (ví dụ: Việt Nam Đồng - VND)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
});