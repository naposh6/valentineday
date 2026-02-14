const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const startScreen = document.getElementById('start');
const celebrateScreen = document.getElementById('celebration');
const mainSite = document.getElementById('main');

const phrases = [
    "Ты уверена??? 😳",
    "пж 🥺",
    "Довела до слез 😭",
    "Я хуею, аставись 😤",
    "Ну я же тибя люблю ❤️",
    "А я говорил, шо ты меня не любишь",
    "🥺🥺🥺🥺🥺🥺🥺🥺🥺",
    "Я ТАК И ЗНАЛЛЛЛЛ"
];

let musicWasPlaying = false;
let noCount = 0;
let scale = 1;

noBtn.onclick = () => {
    noCount++;
    scale += 0.18;

    yesBtn.style.transform = `scale(${scale})`;
    question.innerText = phrases[noCount % phrases.length];

    noBtn.style.transform = `translateX(${noCount * 6}px)`;
};

yesBtn.addEventListener('click', () => {
    yesBtn.disabled = true;
    noBtn.disabled = true;

    startScreen.classList.add('hidden');

    celebrateScreen.classList.remove('hidden');

    music.play();
    musicBtn.classList.remove('hidden');

    setTimeout(() => {
        celebrateScreen.classList.add('hidden');
        mainSite.classList.remove('hidden');
    }, 2200);
});

/* Меню */
document.querySelectorAll('.menu button').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.add('active');

        const bg = document.getElementById('bgGallery');

        if (btn.dataset.tab === 'gallery') {
            bg.classList.add('bg-faded');
        } else {
            bg.classList.remove('bg-faded');
        }

        if (btn.dataset.tab === 'sounds') {
            if (!music.paused) {
                musicWasPlaying = true;
                music.pause();
            }
        } else {
            if (musicWasPlaying) {
                music.play();
                musicWasPlaying = false;
            }
        }
    };
});

/* Сердечки */
const hearts = document.getElementById('hearts-container');

setInterval(() => {
    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.position = 'fixed';
    heart.style.bottom = '0';
    heart.style.fontSize = '20px';
    heart.style.animation = 'fly 5s linear';

    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
}, 500);

const style = document.createElement('style');
style.innerHTML = `
@keyframes fly {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100vh); opacity: 0; }
}`;
document.head.appendChild(style);


function openMedia(el) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    content.innerHTML = '';

    if (el.tagName === 'VIDEO') {
        const v = document.createElement('video');
        v.src = el.src;
        v.controls = true;
        v.autoplay = true;
        content.appendChild(v);
    } else {
        const img = document.createElement('img');
        img.src = el.src;
        content.appendChild(img);
    }

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modalContent').innerHTML = '';
}

function sendMessage() {
    const text = document.getElementById('loveText').value;

    fetch(`https://api.telegram.org/bot8536730794:AAGYPYqdHB1U45RvjnjMM-1XZvmyqBIRJ3A/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            chat_id: 1384591958,
            text: `💖 Повідомлення від неї:\n\n${text}`
        })
    });

    alert('Відправлено ❤️');
    document.getElementById('loveText').value = '';
}

const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');


musicBtn.onclick = () => {
    if (music.paused) {
        music.play();
        musicBtn.textContent = '🎵';
    } else {
        music.pause();
        musicBtn.textContent = '🔇';
    }
};