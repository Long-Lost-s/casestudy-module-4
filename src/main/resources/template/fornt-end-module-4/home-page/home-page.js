$(document).ready(function() {
    // Lấy danh sách danh mục
    $.ajax({
        url: "http://localhost:8080/api/category", // Thay thế bằng đường dẫn API của bạn
        type: "GET",
        success: function(categories) {
            var categoryList = $("#category-list");
            categories.forEach(function(category) {
                var categoryItem = `
            <div class="col-md-4 mb-4">
              <div class="card">
                <img src="${category.imageUrl}" class="card-img-top category-img" alt="${category.name}">
                <div class="card-body">
                  <h5 class="card-title">${category.name}</h5>
                  <p class="card-text">Số lượng món ăn: ${category.locationCount}</p>
                  <a href="#" class="btn btn-primary">Xem thêm</a>
                </div>
              </div>
            </div>
          `;
                categoryList.append(categoryItem);
            });
        },
        error: function(xhr, status, error) {
            console.error("Lỗi khi lấy danh sách danh mục:", error);
        }
    });

    // Lấy danh sách món ăn nổi bật
    $.ajax({
        url: "http://localhost:8080/api/food", // Thay thế bằng đường dẫn API của bạn
        type: "GET",
        success: function(foods) {
            var foodList = $("#food-list");
            foods.forEach(function(food) {
                var foodItem = `
            <div class="col-md-4 mb-4">
              <div class="card">
                <img src="${food.imageUrl}" class="card-img-top food-img" alt="${food.name}">
                <div class="card-body">
                  <h5 class="card-title">${food.name}</h5>
                  <p class="card-text">${food.address}</p>
                  <p class="card-text text-danger">${food.price} VND</p>
                  <a href="#" class="btn btn-primary">Thêm vào giỏ hàng</a>
                </div>
              </div>
            </div>
          `;
                foodList.append(foodItem);
            });
        },
        error: function(xhr, status, error) {
            console.error("Lỗi khi lấy danh sách món ăn nổi bật:", error);
        }
    });
});