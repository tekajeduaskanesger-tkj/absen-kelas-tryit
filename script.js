// Form Submit Handler
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nama dari form untuk personalisasi (opsional)
    const name = document.getElementById('name').value;
    
    // Animasi transisi
    const page1 = document.getElementById('page1');
    page1.style.animation = 'fadeOut 0.5s ease-out';
    
    setTimeout(() => {
        page1.classList.remove('active');
        document.getElementById('page2').classList.add('active');
    }, 500);
});

// Fungsi untuk pindah ke halaman 3 (teka-teki)
function goToPage3() {
    const page2 = document.getElementById('page2');
    page2.style.animation = 'fadeOut 0.5s ease-out';
    
    setTimeout(() => {
        page2.classList.remove('active');
        document.getElementById('page3').classList.add('active');
    }, 500);
}

// Fungsi untuk mengecek jawaban teka-teki
function checkAnswer() {
    const answer = document.getElementById('answer').value.trim();
    const wrongMsg = document.getElementById('wrongAnswer');
    
    // GANTI JAWABAN INI SESUAI TANGGAL KALIAN BERTEMU!
    // Format: DD/MM/YYYY
    const correctAnswer = "01/04/2025"; // Ganti dengan tanggal kalian!
    
    if (answer === correctAnswer) {
        // Jawaban benar, buka halaman gallery
        const page3 = document.getElementById('page3');
        page3.style.animation = 'fadeOut 0.5s ease-out';
        
        setTimeout(() => {
            page3.classList.remove('active');
            document.getElementById('page4').classList.add('active');
            
            // Auto play musik (beberapa browser memerlukan interaksi user dulu)
            const music = document.getElementById('bgMusic');
            music.play().catch(e => {
                console.log('Autoplay diblokir, user harus play manual');
            });
        }, 500);
    } else {
        // Jawaban salah, tampilkan pesan error
        wrongMsg.style.display = 'block';
        wrongMsg.style.animation = 'shake 0.5s';
        
        // Hilangkan pesan error setelah 2 detik
        setTimeout(() => {
            wrongMsg.style.display = 'none';
        }, 2000);
    }
}

// Animasi fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Optional: Prevent accidental back navigation
window.addEventListener('beforeunload', function (e) {
    if (document.getElementById('page4').classList.contains('active')) {
        // Jangan tampilkan warning di halaman akhir
        return undefined;
    }
});

// Easter egg: Konfetti saat musik diplay
document.getElementById('bgMusic').addEventListener('play', function() {
    createConfetti();
});

function createConfetti() {
    const colors = ['#ff1744', '#667eea', '#764ba2', '#ffd700', '#ff69b4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        // Animasi jatuh
        const duration = Math.random() * 3 + 2;
        const rotation = Math.random() * 360;
        const drift = (Math.random() - 0.5) * 100;
        
        confetti.animate([
            { 
                transform: `translateY(0) translateX(0) rotate(0deg)`,
                opacity: 1 
            },
            { 
                transform: `translateY(100vh) translateX(${drift}px) rotate(${rotation}deg)`,
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Hapus element setelah animasi selesai
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Tambahan: Buat hearts yang muncul saat hover di gallery
document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            createHeart(e.pageX, e.pageY);
        });
    });
});

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Tambahkan animasi floatUp
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
        }
    }
`;
document.head.appendChild(floatStyle);
