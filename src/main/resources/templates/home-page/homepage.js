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

                $.each(response, function(index, food) {
                    if (index < 9) {
                        var offerItem = $('<div class="offer-item">');
                        var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                        var content = $('<div class="offer-item-content">');
                        var promoText = food.specialOffer ? "Special Offer" : (food.featured ? "Featured" : "Ưu đãi");
                        var promo = $('<div class="offer-item-promo">').text(promoText);
                        var name = $('<div class="offer-item-name">').text(food.name);

                        // ✅ Thêm phần hiển thị giá
                        var priceContainer = $('<div class="offer-item-price">');
                        var originalPrice = $('<span class="offer-item-original-price">');
                        var discountPrice = $('<span class="offer-item-discount-price">');
                        // ✅ Thêm nút "Thêm vào giỏ hàng"
                        var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");
                        // ✅ Thêm data attributes để lưu thông tin món ăn
                        addToCartButton.data('food-id', food.id);
                        addToCartButton.data('food-name', food.name);
                        addToCartButton.data('food-price', food.price);


                        // Kiểm tra xem có giá khuyến mãi hay không
                        if (food.discountPrice && food.discountPrice < food.price) {
                            originalPrice.text(formatCurrency(food.price)); // Hiển thị giá gốc và gạch ngang
                            originalPrice.css('text-decoration', 'line-through'); // Gạch ngang giá gốc
                            discountPrice.text(formatCurrency(food.discountPrice)); // Hiển thị giá khuyến mãi
                            priceContainer.append(discountPrice, originalPrice, addToCartButton); // ✅ Thêm nút vào priceContainer
                        } else {
                            discountPrice.text(formatCurrency(food.price)); // Chỉ hiển thị giá gốc nếu không có khuyến mãi
                            priceContainer.append(discountPrice, addToCartButton); // ✅ Thêm nút vào priceContainer
                        }

                        content.append(promo, name, priceContainer); // Thêm priceContainer vào content
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

    // --- PHẦN 2: HIỂN THỊ "MÓN ĂN ƯU ĐÃI (GIẢM GIÁ)" - SỬ DỤNG API "/api/foods" ---
    $.ajax({
        url: 'http://localhost:8080/api/foods', // ➡️ URL API "/api/foods" - **SỬ DỤNG LẠI API GỐC**
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response && response.length > 0) {
                var offersCategoriesList = $('.offers-categories-list');
                offersCategoriesList.empty();

                // ✅ Lọc trực tiếp món ăn giảm giá từ response của API "/api/foods"
                var discountedFoods = response.filter(function(food) {
                    return food.discountPrice < food.price; // ✅ Điều kiện lọc: discountPrice < price
                });

                if (discountedFoods.length > 0) { // ✅ Chỉ hiển thị nếu có món ăn giảm giá
                    $.each(discountedFoods, function(index, food) { // ✅ Duyệt qua danh sách món ăn giảm giá
                        if (index < 7) { // Giới hạn số lượng món ăn hiển thị, ví dụ: 5
                            var offerItem = $('<div class="offer-item offer-category-item">'); // Class cho item ưu đãi
                            var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                            var content = $('<div class="offer-item-content">');
                            var promoText = "Ưu đãi"; // Text promo cho mục này
                            var promo = $('<div class="offer-item-promo">').text(promoText);
                            var name = $('<div class="offer-item-name offer-category-name">').text(food.name); // Class cho tên món ưu đãi

                            // ✅ Thêm phần hiển thị giá VÀ nút "Thêm vào giỏ hàng" (tái sử dụng code)
                            var priceContainer = $('<div class="offer-item-price">');
                            var originalPrice = $('<span class="offer-item-original-price">');
                            var discountPrice = $('<span class="offer-item-discount-price">');
                            var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");
                            addToCartButton.data('food-id', food.id); // Lưu data-food-id
                            addToCartButton.data('food-name', food.name); // Lưu data-food-name
                            addToCartButton.data('food-price', food.price); // Lưu data-food-price

                            if (food.discountPrice && food.discountPrice < food.price) {
                                originalPrice.text(formatCurrency(food.price));
                                originalPrice.css('text-decoration', 'line-through');
                                discountPrice.text(formatCurrency(food.discountPrice));
                                priceContainer.append(discountPrice, originalPrice, addToCartButton);
                            } else {
                                discountPrice.text(formatCurrency(food.price));
                                priceContainer.append(discountPrice, addToCartButton);
                            }

                            content.append(promo, name, priceContainer);
                            offerItem.append(image, content);
                            offersCategoriesList.append(offerItem);
                        }
                    });
                } else {
                    offersCategoriesList.html('<div class="offer-item">Không có món ăn ưu đãi nào.</div>');
                    console.log('Không có món ăn ưu đãi nào.');
                }

            } else {
                $('.offers-categories-list').html('<div class="offer-item">Không có món ăn ưu đãi nào.</div>');
                console.log('Không có món ăn ưu đãi nào.');
            }
        },
        error: function(xhr, status, error) {
            $('.offers-categories-list').html('<div class="offer-item">Lỗi tải món ăn ưu đãi. Vui lòng thử lại sau.</div>');
            console.error('Lỗi khi tải món ăn ưu đãi:', error);
        }
    });

    // ✅ Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng nếu chưa có
    var cart = JSON.parse(localStorage.getItem('sffood-cart')) || [];

    // ✅ Event listener cho nút "Thêm vào giỏ hàng" (delegate event)
    $(document).on('click', '.offer-item-add-cart-button', function(event) {
        // ✅ Kiểm tra xem có nút logout-button (chỉ có ở homepage-user.html) hay không
        if ($('#logout-button').length) {
            // ✅ Nếu có logout-button (trang homepage-user.html), thực hiện chức năng thêm vào giỏ hàng bình thường
            var foodId = $(this).data('food-id');
            var foodName = $(this).data('food-name');
            var foodPrice = $(this).data('food-price');

            var quantity = 1; // Mặc định số lượng là 1 khi thêm từ trang chủ

            // ✅ Kiểm tra món ăn đã có trong giỏ hàng chưa
            var existingItemIndex = cart.findIndex(item => item.id === foodId);

            if (existingItemIndex > -1) {
                // ✅ Nếu đã có, tăng số lượng
                cart[existingItemIndex].quantity += quantity;
            } else {
                // ✅ Nếu chưa có, thêm mới vào giỏ hàng
                cart.push({
                    id: foodId,
                    name: foodName,
                    price: foodPrice,
                    quantity: quantity
                });
            }

            // ✅ Lưu giỏ hàng cập nhật vào localStorage
            localStorage.setItem('sffood-cart', JSON.stringify(cart));

            console.log("Đã thêm '" + foodName + "' vào giỏ hàng. Giỏ hàng hiện tại:", cart);
            alert("Đã thêm '" + foodName + "' vào giỏ hàng!"); // Thông báo cho người dùng
        } else {
            // ✅ Nếu không có logout-button (trang homepage.html), chuyển hướng đến trang sign-in.html
            event.preventDefault(); // Ngăn chặn hành vi mặc định của nút (nếu có)
            window.location.href = "../sign-in/sign-in.html"; // ➡️ Đường dẫn đến trang đăng nhập
        }
    });

    // ✅ Hàm format tiền tệ (ví dụ: Việt Nam Đồng - VND)
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
});