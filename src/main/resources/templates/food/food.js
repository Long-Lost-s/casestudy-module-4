$(document).ready(function() {
    var cart = JSON.parse(localStorage.getItem('sffood-cart')) || [];

    $('#add-to-cart-button').on('click', function() {
        var foodId = new URLSearchParams(window.location.search).get('id');
        var foodName = $('#food-name').text();
        var foodPrice = $('#food-price').text();
        var foodImage = $('#food-image').attr('src');

        var quantity = 1;

        var existingItemIndex = cart.findIndex(item => item.id === foodId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: foodId,
                name: foodName,
                price: foodPrice,
                image: foodImage,
                quantity: quantity
            });
        }

        localStorage.setItem('sffood-cart', JSON.stringify(cart));

        console.log("Đã thêm '" + foodName + "' vào giỏ hàng. Giỏ hàng hiện tại:", cart);
        alert("Đã thêm '" + foodName + "' vào giỏ hàng!");
    });

    loadFoodDetails(new URLSearchParams(window.location.search).get('id'));
});

function loadFoodDetails(foodId) {
    $.ajax({
        url: `http://localhost:8080/api/foods/${foodId}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer VALID_JWT_TOKEN" // Replace with your actual valid JWT token
        },
        success: function(food) {
            $('#food-name').text(food.name);
            $('#food-image').attr('src', food.imageUrl).show();
            $('#food-description').text(food.description);
            $('#food-price').text(food.price);
            $('#food-address').text(food.address);
            $('#food-open-time').text(food.openTime);
            $('#food-close-time').text(food.closeTime);
            $('#food-notes').text(food.notes);
            $('#food-discount-price').text(food.discountPrice);
            $('#food-service-fee').text(food.serviceFee ? food.serviceFee.name : 'N/A');
            $('#food-service-fee-explanation').text(food.serviceFeeExplanation);
            $('#food-preparation-time').text(food.preparationTime);
            $('#food-discount-code').text(food.discountCode);
            $('#food-discount-usage-count').text(food.discountUsageCount);
            $('#food-views').text(food.views);
            $('#food-order-count').text(food.orderCount);
            $('#food-featured').text(food.featured ? 'Yes' : 'No');
            $('#food-special-offer').text(food.specialOffer ? 'Yes' : 'No');
            $('#food-created-at').text(food.createdAt);
            $('#food-updated-at').text(food.updatedAt);
            $('#food-restaurant-name').text(food.restaurantName);
            $('#food-category').text(food.category ? food.category.name : 'N/A');
        },
        error: function(xhr) {
            console.error("Error loading food details:", xhr);
            alert("Failed to load food details. Please try again later.");
        }
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
