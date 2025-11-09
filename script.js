// --- Bắt đầu nhận dạng giọng nói ---
const voiceButton = document.getElementById("voiceButton");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton"); // nút tìm kiếm bằng chữ
const result = document.getElementById("result");

// --- Hàm điều hướng sang trang ---
function navigateToPage(keyword) {
  keyword = keyword.toLowerCase();
  if (keyword.includes("thuế doanh nghiệp")) {
    window.location.href = "thuedoanhnghiep.html";
  } else if (keyword.includes("hình sự")) {
    window.location.href = "hinh-su.html";
  } else if (keyword.includes("dân sự")) {
    window.location.href = "dan-su.html";
  } else {
    result.textContent = "— Không tìm thấy trang phù hợp!";
  }
}

// --- Nhận dạng giọng nói ---
voiceButton.addEventListener("click", () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói!");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "vi-VN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();
  result.textContent = "🎙️ Đang nghe...";

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    result.textContent = `🔎 Bạn nói: "${transcript}"`;
    navigateToPage(transcript); // sử dụng hàm chung
  };

  recognition.onerror = function() {
    result.textContent = "⚠️ Có lỗi xảy ra, vui lòng thử lại!";
  };
});

// --- Tìm kiếm bằng chữ ---
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) {
    result.textContent = "⚠️ Vui lòng nhập từ khóa!";
    return;
  }
  navigateToPage(query);
});
