$(document).ready(function() {
    loadCategories();
});

function loadCategories() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("No token found. Please log in again.");
        window.location.href = "/signin.html";
        return;
    }
    $.ajax({
        url: "http://localhost:8080/api/categories",
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        success: function(categories) {
            const categoriesList = $("#categories-list");
            categoriesList.empty();
            categories.forEach(category => {
                let li = $("<li>").text(category.name).click(() => loadFoods(category.id));
                categoriesList.append(li);
            });
        },
        error: function(xhr) {
            if (xhr.status === 401) {
                alert("Session expired. Please log in again.");
                window.location.href = "/signin.html";
            } else {
                console.error("Error fetching categories:", xhr);
                alert("An error occurred while loading categories. Check console for details.");
            }
        }
    });
}

function loadFoods(categoryId) {
    const token = localStorage.getItem('authToken');
    $.ajax({
        url: `http://localhost:8080/api/categories/${categoryId}/foods`,
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        success: function(foods) {
            const foodsList = $("#foods-list");
            foodsList.empty();
            foods.forEach(food => {
                let li = $("<li>").text(food.name).addClass("food-item");
                foodsList.append(li);
            });
            $("#foods-section").show();
        },
        error: function(xhr) {
            console.error("Error fetching foods:", xhr);
            alert("An error occurred while loading foods. Check console for details.");
        }
    });
}