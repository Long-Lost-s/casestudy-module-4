$(document).ready(function() {
    function getGreetingAndQuestion() {
        const hours = new Date().getHours();
        let greeting = "";
        let question = "";

        if (hours >= 6 && hours < 9) {
            greeting = "☀️ Good morning!";
            question = "Did you have breakfast?";
        } else if (hours >= 9 && hours < 11) {
            greeting = "🌞 Hope you're having a great morning";
            question = "Need a coffee break?";
        } else if (hours >= 11 && hours < 14) {
            greeting = "🌤️ It's Lunch time!";
            question = "Have anything in mind?";
        } else if (hours >= 14 && hours < 17) {
            greeting = "🌅 Good afternoon!";
            question = "Boba milk tea time?";
        } else if (hours >= 17 && hours < 20) {
            greeting = "🌅 Good evening!";
            question = "Dinner time? What’s on your menu?";
        } else if (hours >= 20 && hours < 23) {
            greeting = "🌙 Hope you had a great day!";
            question = "Don't skip the meal, your belly need it 👀";
        } else {
            greeting = "🌃 Late night, huh?";
            question = "Don’t forget to rest!";
        }

        return { greeting, question };
    }

    var userName = localStorage.getItem('userName');
    const { greeting, question } = getGreetingAndQuestion();

    if (userName) {
        $(".hero-greeting").text(`${greeting} ${userName} ! ${question}`);
    } else {
        $(".hero-greeting").text(`${greeting} ${question}`);
        console.warn("Không tìm thấy tên người dùng trong localStorage.");
    }

    $("#logout-button").click(function() {
        $.ajax({
            url: 'http://localhost:8080/api/auth/signout',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                console.log("Logout successful:", response);
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                window.location.href = "./home-page.html";
            },
            error: function(xhr, status, error) {
                console.error("Logout error:", error);
                alert("Logout failed. Please try again.");
            }
        });
    });
});

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
