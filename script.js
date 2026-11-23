
// Lấy các phần tử HTML
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const arena = document.getElementById("arena");
const target = document.getElementById("target");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");
const result = document.getElementById("result");

const colorBtn = document.getElementById("colorBtn");
const playerBtn = document.getElementById("playerBtn");
const playerInfo = document.getElementById("playerInfo");
const timeInput = document.getElementById("timeInput");

// Khai báo biến
let score = 0;
let timeLeft = 30;
let gameRunning = false;
let countdown;

// Mã sinh viên
// Thay MSSV bằng mã sinh viên của bạn
const studentID = "MSSV: 231A010497";


// Hàm tạo mục tiêu ngẫu nhiên
function moveTarget() {

    const maxX = arena.clientWidth - target.offsetWidth;
    const maxY = arena.clientHeight - target.offsetHeight;

    const randomX = Math.floor(Math.random() * (maxX + 1));
    const randomY = Math.floor(Math.random() * (maxY + 1));

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}


// Hàm bắt đầu trò chơi
function startGame() {

    // Lấy thời gian người chơi chọn
    const selectedTime = Number(timeInput.value);

    // Kiểm tra thời gian hợp lệ
    if (
        !Number.isInteger(selectedTime) ||
        selectedTime < 1 ||
        selectedTime > 300
    ) {
        alert("Vui lòng nhập thời gian từ 1 đến 300 giây!");
        timeInput.focus();
        return;
    }

    // Reset điểm và thời gian
    score = 0;
    timeLeft = selectedTime;

    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    result.textContent = "";

    gameRunning = true;

    // Hiện mục tiêu
    target.style.display = "block";

    // Ẩn thông báo
    message.style.display = "none";

    // Di chuyển mục tiêu
    moveTarget();

    // Khóa các thao tác cài đặt khi đang chơi
    startBtn.disabled = true;
    colorBtn.disabled = true;
    timeInput.disabled = true;

    startBtn.textContent = "Đang chơi...";

    // Đếm ngược mỗi giây
    countdown = setInterval(function() {

        timeLeft--;

        timerElement.textContent = timeLeft;

        // Kiểm tra hết giờ
        if (timeLeft <= 0) {
            endGame();
        }

    }, 1000);
}


// Khi click trúng mục tiêu
target.addEventListener("click", function(event) {

    if (!gameRunning) {
        return;
    }

    // Ngăn sự kiện click lan ra khu vực chơi
    event.stopPropagation();

    // Tăng điểm
    score++;

    scoreElement.textContent = score;

    // Di chuyển mục tiêu
    moveTarget();

});


// Chức năng đổi màu nền ngẫu nhiên
colorBtn.addEventListener("click", function() {

    if (gameRunning) {
        return;
    }

    // Danh sách màu ngẫu nhiên
    const colors = [
        "#d4e7f9",
        "#ffcdd2",
        "#c8e6c9",
        "#fff9c4",
        "#e1bee7",
        "#b2dfdb",
        "#ffe0b2",
        "#bbdefb",
        "#f8bbd0"
    ];

    // Chọn màu ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Đổi màu nền khu vực chơi
    arena.style.backgroundColor = colors[randomIndex];

});


// Chức năng hiển thị mã sinh viên
playerBtn.addEventListener("click", function() {

    if (playerInfo.textContent === "") {

        playerInfo.textContent = studentID;

        playerBtn.textContent = "Ẩn thông tin";

    } else {

        playerInfo.textContent = "";

        playerBtn.textContent = "👤 Người chơi";

    }

});


// Hàm kết thúc trò chơi
function endGame() {

    gameRunning = false;

    // Dừng đồng hồ
    clearInterval(countdown);

    // Ẩn mục tiêu và khóa click
    target.style.display = "none";

    // Hiện thông báo
    message.textContent = "Đã hết thời gian!";
    message.style.display = "block";

    // Mở khóa nút chơi lại
    startBtn.disabled = false;
    startBtn.textContent = "Chơi lại";

    // Mở khóa cài đặt
    colorBtn.disabled = false;
    timeInput.disabled = false;

    // Hiển thị tổng điểm
    result.textContent =
        "🎉 Trò chơi kết thúc! Bạn đạt được " +
        score + " điểm.";

}


// Sự kiện nút bắt đầu
startBtn.addEventListener("click", function() {

    if (!gameRunning) {
        startGame();
    }

});
