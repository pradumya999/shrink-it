const video = document.getElementById('rickroll');

video.muted = false;
video.play().catch(() => {
    video.muted = true;
    video.play();
});

setTimeout(() => {
    window.location.href = "./homepage.html";
}, 3000);