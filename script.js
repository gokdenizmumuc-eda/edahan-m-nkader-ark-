const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const centerArm = document.getElementById('center-arm');

const images = [
    'assets/kol aşağıya.png',
    'assets/kol sol.png',
    'assets/kol yukarı.png',
    'assets/kol sağ.png'
];

let currentImageIndex = 0;
let armInterval = null;
let isAnimating = false;

function startAnimation() {
    isAnimating = true;
    armInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        centerArm.src = images[currentImageIndex];
    }, 100);
}

startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    introScreen.classList.remove('active');
    gameScreen.classList.add('active');
    startAnimation();
});

function handleTap(e) {
    if (e && e.cancelable) e.preventDefault();
    
    // Spawn floating heart
    let x = 0; let y = 0;
    if (e && e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else if (e) {
        x = e.clientX;
        y = e.clientY;
    }
    
    if (x || y) {
        const heart = document.createElement('img');
        heart.src = 'assets/kalp.png';
        heart.classList.add('floating-heart');
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    }

    if (!isAnimating) return;
    
    // Stop the arm animation
    clearInterval(armInterval);
    isAnimating = false;
    
    // Find matching EVET based on the current arm image
    let targetId = '';
    if (currentImageIndex === 0) targetId = 'evet-asagi';
    else if (currentImageIndex === 1) targetId = 'evet-sol';
    else if (currentImageIndex === 2) targetId = 'evet-yukari';
    else if (currentImageIndex === 3) targetId = 'evet-sag';
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.add('highlight');
    }
    
    // Wait 1 second, then remove glow and resume
    setTimeout(() => {
        if (targetElement) {
            targetElement.classList.remove('highlight');
        }
        startAnimation();
    }, 1000);
}

gameScreen.addEventListener('click', handleTap);
gameScreen.addEventListener('touchstart', handleTap, {passive: false});
