$(document).ready(function() {
    loadCategories();
});

function loadCategories() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        window.location.href = "/case-study-module-4/case-study-module-4.main/templates/sign-in/sign-in.html";
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
                window.location.href = "/case-study-module-4/case-study-module-4.main/templates/sign-in/sign-in.html";
            } else {
                console.error("Error fetching categories:", xhr);
                alert("An error occurred while loading categories. Check console for details.");
            }
        }
    });
}

function loadFoods(categoryId) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        window.location.href = "/case-study-module-4/case-study-module-4.main/templates/sign-in/sign-in.html";
        return;
    }
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

function addCategory() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        window.location.href = "/case-study-module-4/case-study-module-4.main/templates/sign-in/sign-in.html";
        return;
    }
    const categoryName = $("#category-name").val();
    if (!categoryName) {
        alert("Please enter a category name.");
        return;
    }
    $.ajax({
        url: "http://localhost:8080/api/categories",
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ name: categoryName }),
        success: function() {
            alert("Category added successfully.");
            loadCategories();
        },
        error: function(xhr) {
            console.error("Error adding category:", xhr);
            alert("An error occurred while adding the category. Check console for details.");
        }
    });
}

function editCategory() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        window.location.href = "/case-study-module-4/case-study-module-4.main/templates/sign-in/sign-in.html";
        return;
    }
    const categoryName = $("#category-name").val();
    const selectedCategory = $("#categories-list li.selected");
    if (!selectedCategory.length) {
        alert("Please select a category to edit.");
        return;
    }
    const categoryId = selectedCategory.data("id");
    if (!categoryName) {
        alert("Please enter a category name.");
        return;
    }
    $.ajax({
        url: `http://localhost:8080/api/categories/${categoryId}`,
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ name: categoryName }),
        success: function() {
            alert("Category updated successfully.");
            loadCategories();
        },
        error: function(xhr) {
            console.error("Error updating category:", xhr);
            alert("An error occurred while updating the category. Check console for details.");
        }
    });
}

function deleteCategory() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        window.location.href = "/case-study-module-4/case-study-module-4.main/templates/sign-in/sign-in.html";
        return;
    }
    const selectedCategory = $("#categories-list li.selected");
    if (!selectedCategory.length) {
        alert("Please select a category to delete.");
        return;
    }
    const categoryId = selectedCategory.data("id");
    $.ajax({
        url: `http://localhost:8080/api/categories/${categoryId}`,
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        success: function() {
            alert("Category deleted successfully.");
            loadCategories();
        },
        error: function(xhr) {
            console.error("Error deleting category:", xhr);
            alert("An error occurred while deleting the category. Check console for details.");
        }
    });
}