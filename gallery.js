const galleries = {
  tudien: {
    title: "Giải Ba thi lắp ráp tủ điện",
    desc: "Lắp ráp, lập trình PLC và đấu dây tủ điện điều khiển.",
    media: [
      { type: "image", src: "assets/assets/td5.jpg" },
      { type: "image", src: "assets/assets/td1.jpg" },
      { type: "image", src: "assets/assets/td2.jpg" },
      { type: "image", src: "assets/assets/td3.jpg" },
      { type: "image", src: "assets/assets/td4.jpg" },
    ],
  },
  "may-lap-rap": {
    title: "Máy lắp ráp",
    desc: "Thiết kế và lập trình điều khiển máy lắp ráp tự động.",
    media: [
      { type: "image", src: "assets/assets/lr5.png" },
      { type: "image", src: "assets/assets/lr1.jpg" },
      { type: "image", src: "assets/assets/lr2.jpeg" },
      { type: "image", src: "assets/assets/lr3.jpeg" },
      { type: "image", src: "assets/assets/lr4.jpeg" },
      { type: "image", src: "assets/assets/lr6.jpg" },
    ],
  },
  "may-van-chuyen": {
    title: "Máy vận chuyển",
    desc: "Hệ thống vận chuyển phôi tự động trong dây chuyền sản xuất.",
    media: [
      { type: "image", src: "assets/assets/vc1.jpg" },
      { type: "image", src: "assets/assets/vc3.jpg" },
      { type: "image", src: "assets/assets/vc4.jpg" },
      { type: "video", src: "assets/assets/vc2.mp4" },
    ],
  },
  "may-dan-tem": {
    title: "Máy dán tem",
    desc: "Hệ thống tự động nhận diện và dán tem nhãn lên sản phẩm.",
    media: [
      { type: "image", src: "assets/assets/dt1.jpg" },
      { type: "video", src: "assets/assets/dt3.mp4" },
      { type: "video", src: "assets/assets/dt2.mp4" },
    ],
  },
  robocon: {
    title: "Robocon vòng trường",
    desc: "Thiết kế và thi công Robot tham gia cuộc thi Robocon cấp trường.",
    media: [
      { type: "image", src: "assets/assets/robocon.jpg" },
      { type: "image", src: "assets/assets/robo1.jpg" },
      { type: "image", src: "assets/assets/robo3.jpg" },
      { type: "video", src: "assets/assets/robo2.mp4" },
    ],
  },
};

const lightbox = document.getElementById("lightbox");
const grid = document.getElementById("lightboxGrid");
const title = document.getElementById("lightboxTitle");
const desc = document.getElementById("lightboxDesc");
const viewer = document.getElementById("viewer");

document.querySelectorAll("[data-gallery]").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const g = galleries[card.dataset.gallery];
    if (!g) return;

    title.textContent = g.title;
    desc.textContent = g.desc;
    desc.hidden = !g.desc;

    let items = g.media || [];

    // Tạo thẻ thumbnail có nút Play vừa vặn với kích thước ô ảnh
    grid.innerHTML = items
      .map((item) => {
        if (item.type === "video") {
          return `
            <div class="video-thumb-card" data-video-src="${item.src}">
              <video src="${item.src}#t=0.5" preload="metadata" class="lightbox-video-thumb"></video>
              <div class="play-btn-overlay">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Xem Video</span>
              </div>
            </div>`;
        }
        return `
          <div class="media-item">
            <img src="${item.src}" alt="${g.title}" loading="lazy" class="lightbox-img" />
          </div>`;
      })
      .join("");

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

// Sự kiện nhấp vào ô danh sách
grid.addEventListener("click", (e) => {
  // Nhấp vào Video Card -> Phóng to Video phát mượt mà
  const videoCard = e.target.closest(".video-thumb-card");
  if (videoCard) {
    const videoSrc = videoCard.dataset.videoSrc;
    viewer.innerHTML = `
      <div class="viewer-video-wrapper">
        <video src="${videoSrc}" controls autoplay class="viewer-video"></video>
      </div>`;
    viewer.hidden = false;
    return;
  }

  // Nhấp vào Ảnh -> Phóng to Ảnh
  if (e.target.tagName === "IMG") {
    viewer.innerHTML = `<img id="viewerImg" src="${e.target.src}" alt="Full view" class="viewer-img" />`;
    viewer.hidden = false;
  }
});

// Đóng Popup
function closeAll() {
  viewer.hidden = true;
  lightbox.hidden = true;
  document.body.style.overflow = "";
  viewer.innerHTML = "";
}

document.getElementById("lightboxClose").addEventListener("click", closeAll);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeAll();
});
viewer.addEventListener("click", (e) => {
  if (e.target === viewer) closeAll();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAll();
});
