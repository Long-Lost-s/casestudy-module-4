$(document).ready(function() {
    loadCategories();
});

function loadCategories() {
    const token = localStorage.getItem("authToken"); // Đồng nhất key token

    if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        window.location.href = "../sign-in/sign-in.html";
        return;
    }

    $.ajax({
        url: "http://localhost:8080/api/categories",
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // ✅ Sửa lỗi cú pháp
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
                    }, function() {
                        $(this).css("background-color", "transparent");
                    })
                    .click(() => loadFoods(category.id));

                categoriesList.append(li);
            });
        },
        error: function(xhr) {
            handleApiError(xhr);
        }
    });
}

function loadFoods(categoryId) {
    const token = localStorage.getItem("authToken"); // Dùng đúng key token

    if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        window.location.href = "../sign-in/sign-in.html";
        return;
    }

    $.ajax({
        url: `http://localhost:8080/api/categories/${categoryId}/foods`, // ✅ Sửa lỗi thiếu dấu backtick
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // ✅ Sửa lỗi cú pháp
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
                    .text(food.name)
                    .addClass("food-item")
                    .css({ "margin-left": "1rem", "font-weight": "bold", "color": "#555" });

                foodsList.append(li);
            });

            $("#foods-section").show();
        },
        error: function(xhr) {
            handleApiError(xhr);
        }
    });
}

/* ✅ Xử lý lỗi API */
function handleApiError(xhr) {
    if (xhr.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("authToken");
        window.location.href = "../sign-in/sign-in.html";
    } else if (xhr.status === 403) {
        alert("Bạn không có quyền truy cập vào tài nguyên này.");
    } else {
        console.error("Lỗi API:", xhr);
        alert("Đã xảy ra lỗi khi tải dữ liệu. Kiểm tra console để biết thêm chi tiết.");
    }
}
