// --- Bắt đầu nhận dạng giọng nói ---
const voiceButton = document.getElementById("voiceButton");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

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
    const transcript = event.results[0][0].transcript.toLowerCase();
    searchInput.value = transcript;
    result.textContent = `🔎 Bạn nói: "${transcript}"`;

    // --- Điều hướng sang trang con ---
    if (transcript.includes("hôn nhân")) {
      window.location.href = "hon-nhan.html";
    } else if (transcript.includes("hình sự")) {
      window.location.href = "hinh-su.html";
    } else if (transcript.includes("dân sự")) {
      window.location.href = "dan-su.html";
    } else {
      result.textContent += " — Không tìm thấy trang phù hợp!";
    }
  };

  recognition.onerror = function() {
    result.textContent = "⚠️ Có lỗi xảy ra, vui lòng thử lại!";
  };
});
