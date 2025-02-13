$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/foods',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response && response.length > 0) {
                var offersList = $('.offers-list');
                offersList.empty();

                $.each(response, function(index, food) {
                    if (index < 9) {
                        var link = $('<a class="link-infor" href="../food/food.html?id=' + food.id + '">');
                        var offerItem = $('<div class="offer-item">');
                        var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                        var content = $('<div class="offer-item-content">');
                        var promoText = food.specialOffer ? "Special Offer" : (food.featured ? "Featured" : "Ưu đãi");
                        var promo = $('<div class="offer-item-promo">').text(promoText);
                        var name = $('<div class="offer-item-name">').text(food.name);

                        var priceContainer = $('<div class="offer-item-price">');
                        var originalPrice = $('<span class="offer-item-original-price">');
                        var discountPrice = $('<span class="offer-item-discount-price">');
                        var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");
                        addToCartButton.data('food-id', food.id);
                        addToCartButton.data('food-name', food.name);
                        addToCartButton.data('food-price', food.price);

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
                        link.append(offerItem);
                        offersList.append(link);
                    }
                });
            } else {
                $('.offers-list').html('<div class="offer-item">Không có ưu đãi nào.</div>');
                console.log('Không có ưu đãi nào được tìm thấy.');
            }
        },
        error: function(xhr, status, error) {
            $('.offers-list').html('<div class="offer-item">Lỗi tải ưu đãi. Vui lòng thử lại sau.</div>');
            console.error('Lỗi khi tải ưu đãi:', error);
        }
    });

    $.ajax({
        url: 'http://localhost:8080/api/foods',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response && response.length > 0) {
                var offersCategoriesList = $('.offers-categories-list');
                offersCategoriesList.empty();

                var discountedFoods = response.filter(function(food) {
                    return food.discountPrice < food.price;
                });

                if (discountedFoods.length > 0) {
                    $.each(discountedFoods, function(index, food) {
                        if (index < 7) {
                            var link = $('<a class="link-infor" href="../food/food.html?id=' + food.id + '">');
                            var offerItem = $('<div class="offer-item offer-category-item">');
                            var image = $('<img>').attr('src', food.imageUrl).attr('alt', food.name);
                            var content = $('<div class="offer-item-content">');
                            var promoText = "Ưu đãi";
                            var promo = $('<div class="offer-item-promo">').text(promoText);
                            var name = $('<div class="offer-item-name offer-category-name">').text(food.name);

                            var priceContainer = $('<div class="offer-item-price">');
                            var originalPrice = $('<span class="offer-item-original-price">');
                            var discountPrice = $('<span class="offer-item-discount-price">');
                            var addToCartButton = $('<button class="offer-item-add-cart-button">').text("Thêm vào giỏ");
                            addToCartButton.data('food-id', food.id);
                            addToCartButton.data('food-name', food.name);
                            addToCartButton.data('food-price', food.price);

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
                            link.append(offerItem);
                            offersCategoriesList.append(link);
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

    var cart = JSON.parse(localStorage.getItem('sffood-cart')) || [];

    $(document).on('click', '.offer-item-add-cart-button', function(event) {
        if ($('#logout-button').length) {
            var foodId = $(this).data('food-id');
            var foodName = $(this).data('food-name');
            var foodPrice = $(this).data('food-price');

            var quantity = 1;

            var existingItemIndex = cart.findIndex(item => item.id === foodId);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({
                    id: foodId,
                    name: foodName,
                    price: foodPrice,
                    quantity: quantity
                });
            }

            localStorage.setItem('sffood-cart', JSON.stringify(cart));

            console.log("Đã thêm '" + foodName + "' vào giỏ hàng. Giỏ hàng hiện tại:", cart);
            alert("Đã thêm '" + foodName + "' vào giỏ hàng!");
        } else {
            event.preventDefault();
            window.location.href = "../sign-in/sign-in.html";
        }
    });

    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
});