$(document).ready(function() {
    const foodId = new URLSearchParams(window.location.search).get('id');
    if (foodId) {
        loadFoodDetails(foodId);
    } else {
        alert('No food ID provided.');
    }
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
            $('#food-price').text(`Price: ${formatCurrency(food.price)}`);
            $('#food-address').text(food.address);
            $('#food-open-time').text(food.openTime);
            $('#food-close-time').text(food.closeTime);
            $('#food-notes').text(food.notes);
            $('#food-discount-price').text(`Discount Price: ${formatCurrency(food.discountPrice)}`);
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

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}