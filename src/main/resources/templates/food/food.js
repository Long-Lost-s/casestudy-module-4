$(document).ready(function() {
    loadFoods();
});

// function getToken() {
//     let token = localStorage.getItem("jwtToken");
//
//     if (!token) {
//         const cookies = document.cookie.split("; ");
//         for (let cookie of cookies) {
//             const [name, value] = cookie.split("=");
//             if (name === "jwtToken") {
//                 token = value;
//                 break;
//             }
//         }
//     }
//
//     return token;
// }

function loadFoods() {
    // const token = getToken();
    //
    // if (!token) {
    //     alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
    //     window.location.href = "../sign-in/sign-in.html";
    //     return;
    // }

    $.ajax({
        url: "http://localhost:8080/api/foods",
        method: "GET",
        headers: {
            "Authorization": `Bearer `,
            "Content-Type": "application/json"
        },
        success: function(foods) {
            const foodList = $("#food-list");
            foodList.empty();

            if (foods.length === 0) {
                foodList.append("<li>Không có món ăn nào.</li>");
                return;
            }

            foods.forEach(food => {
                let li = $("<li>")
                    .text(food.name)
                    .addClass("food-item")
                    .data("id", food.id)
                    .click(function() {
                        loadFoodDetails(food.id);
                    });

                foodList.append(li);
            });
        },
        error: function(xhr) {
            handleApiError(xhr);
        }
    });
}

function loadFoodDetails(foodId) {
    // const token = getToken();
    //
    // if (!token) {
    //     alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
    //     window.location.href = "../sign-in/sign-in.html";
    //     return;
    // }

    $.ajax({
        url: `http://localhost:8080/api/foods/${foodId}`,
        method: "GET",
        headers: {
            "Authorization": `Bearer `,
            "Content-Type": "application/json"
        },
        success: function(food) {
            const foodDetails = $("#food-details");
            foodDetails.empty();

            const detailsHtml = `
                <h2>${food.name}</h2>
                <p>${food.description}</p>
                <p>Price: ${food.price}</p>
            `;
            foodDetails.append(detailsHtml);
        },
        error: function(xhr) {
            handleApiError(xhr);
        }
    });
}

// function handleApiError(xhr) {
//     if (xhr.status === 401) {
//         alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
//         localStorage.removeItem("jwtToken");
//         document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//         window.location.href = "../sign-in/sign-in.html";
//     } else if (xhr.status === 403) {
//         alert("Bạn không có quyền truy cập vào tài nguyên này.");
//     } else {
//         console.error("Lỗi API:", xhr);
//         alert("Đã xảy ra lỗi khi tải dữ liệu. Kiểm tra console để biết thêm chi tiết.");
//     }
// }