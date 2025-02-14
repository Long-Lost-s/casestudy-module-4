$(document).ready(function() {
    loadCategories();
});

function loadCategories() {
    $.ajax({
        url: "http://localhost:8080/api/categories",
        method: "GET",
        headers: {
            "Authorization": `Bearer`,
            "Content-Type": "application/json"
        },
        success: function(categories) {
            const categoriesList = $("#categories-list");
            categoriesList.empty();

            if (categories.length === 0) {
                categoriesList.append("<li>Không có danh mục nào.</li>");
                return;
            }

            categories.forEach(category => {
                let li = $("<li>")
                    .text(category.name)
                    .css({ "cursor": "pointer", "padding": "10px", "border-radius": "5px" })
                    .hover(function() {
                        $(this).css("background-color", "#e0e0e0");
                        loadFoods(category.id);
                        $("#foods-section").show();
                    }, function() {
                        $(this).css("background-color", "transparent");
                        $("#foods-section").hide();
                    });

                categoriesList.append(li);
            });
        },
        error: function(xhr) {
            handleApiError(xhr);
        }
    });
}

function loadFoods(categoryId) {
    $.ajax({
        url: `http://localhost:8080/api/categories/${categoryId}/foods`,
        method: "GET",
        headers: {
            "Authorization": `Bearer`,
            "Content-Type": "application/json"
        },
        success: function(foods) {
            const foodsList = $("#foods-list");
            foodsList.empty();

            if (foods.length === 0) {
                foodsList.append("<li>Không có món ăn nào trong danh mục này.</li>");
                return;
            }

            foods.forEach(food => {
                let li = $("<li>")
                    .addClass("food-item")
                    .css({ "display": "flex", "flex-direction": "column", "align-items": "center", "margin-bottom": "10px" });

                let img = $("<img>")
                    .attr("src", food.imageUrl)
                    .css({ "width": "100px", "height": "100px", "margin-bottom": "10px", "border-radius": "5px" });

                let span = $("<span>").text(food.name).css({ "font-weight": "bold", "color": "#555" });

                li.append(img).append(span);
                foodsList.append(li);
            });

            $("#foods-section").show();
        },
        error: function(xhr) {
            handleApiError(xhr);
        }
    });
}