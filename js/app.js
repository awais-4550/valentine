// Data for the journey
const valentineData = [
    {
        subtitle: "The Invitation",
        title: "A Chronicle of Affection",
        content: "My Dearest Mano,\n\nIn a world of constant motion, I pause to pen this letter to you. A week of courting, written in the language of the heart. Shall we walk this path together, from this day until the last?",
        quote: "You have bewitched me body and soul, and I love, I love, I love you.",
        author: "Mr. Darcy, Pride & Prejudice",
        actionBtn: "Open the First Letter"
    },
    {
        subtitle: "The Bloom",
        title: "Rose Day",
        content: "Like a rose in an English garden, my admiration for you grows wild and uncontainable. Let this bloom signify the unfolding of my heart's deepest secrets.",
        quote: "If I loved you less, I might be able to talk about it more.",
        author: "Emma",
        actionBtn: "Recieve This Bloom"
    },
    {
        subtitle: "The Declaration",
        title: "Propose Day",
        content: "In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.",
        quote: "There are as many forms of love as there are moments in time.",
        author: "Jane Austen",
        actionBtn: "Accept My Hand"
    },
    {
        subtitle: "Sweet Confections",
        title: "Chocolate Day",
        content: "Life is a mixture of bitterness and sweetness, but your presence brings only the most delightful confection to my soul. You are the sweetness in my every day.",
        quote: "My heart is, and always will be, yours.",
        author: "Sense & Sensibility",
        actionBtn: "Taste the Sweetness"
    },
    {
        subtitle: "A Token of Comfort",
        title: "Teddy Day",
        content: "Though I may not always be near, let this token serve as a reminder of the warmth and comfort I wish to bestow upon you. A guardian for your dreams.",
        quote: "Friendship is certainly the finest balm for the pangs of disappointed love.",
        author: "Northanger Abbey",
        actionBtn: "Hold It Close"
    },
    {
        subtitle: "Only A Promise",
        title: "Promise Day",
        content: "I offer you not just words, but a steadfast promise. To stand by you, to honor you, and to cherish you through all of life's seasons, come what may.",
        quote: "I wish, as well as everybody else, to be perfectly happy; but, like everybody else, it must be in my own way.",
        author: "Sense & Sensibility",
        actionBtn: "Seal This Promise"
    },
    {
        subtitle: "An Embrace",
        title: "Hug Day",
        content: "Words often fail where a simple embrace can speak volumes. Let me hold you, and let the silence speak of my devotion better than any sonnet could.",
        quote: "To love is to burn, to be on fire.",
        author: "Sense & Sensibility",
        actionBtn: "Draw Me Near"
    },
    {
        subtitle: "The Seal",
        title: "Kiss Day",
        content: "A moment suspended in time. A seal upon our vows. The culmination of all my hopes and dreams in a single, tender moment.",
        quote: "You pierce my soul. I am half agony, half hope.",
        author: "Persuasion",
        actionBtn: "Forever Yours"
    },
    {
        subtitle: "My Valentine",
        title: "Our Forever",
        content: "You are the poetry I never knew how to write. My heart is yours, today and for all the days to come. Happy Valentine's Day, my love.",
        quote: "I am yours, heart and soul.",
        author: "Your Devoted",
        actionBtn: "Read Once More"
    }
];

let currentStep = 0;
let audio = new Audio('assets/audio/music2.mp3');
audio.loop = true;
let isPlaying = false;

// Init
window.addEventListener('load', () => {
    // Remove loading screen
    const loader = document.getElementById('loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 1000);
    }

    // Render first step
    // Start with the Proposal instead of content 0
    renderProposal();

    // Start petals
    createPetals();

    // Music Button Listener
    const musicBtn = document.getElementById('music-control');
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
});

function toggleMusic() {
    const btn = document.getElementById('music-control');
    if (isPlaying) {
        audio.pause();
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="#800020"><path d="M8 5v14l11-7z"/></svg>`;
        btn.style.animation = 'none';
    } else {
        audio.play().then(() => {
            isPlaying = true;
            btn.innerHTML = `<svg viewBox="0 0 24 24" fill="#800020"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
            btn.style.animation = 'pulse 2s infinite';
        }).catch(e => {
            console.error("Audio play failed", e);
            alert('Please interact with the page first to play music!');
        });
    }
    isPlaying = !isPlaying;
}

function nextStep() {
    const contentDiv = document.getElementById('main-content');

    // Fade out
    contentDiv.style.opacity = '0';
    contentDiv.style.transform = 'translateY(10px)';
    contentDiv.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
        currentStep++;
        if (currentStep >= valentineData.length) currentStep = 0;

        renderContent(currentStep);

        // Fade in
        // Small delay to ensure DOM update
        requestAnimationFrame(() => {
            contentDiv.style.opacity = '1';
            contentDiv.style.transform = 'translateY(0)';
        });
    }, 500);
}

// Data for cheeky messages
const cheekyMessages = [
    "Surely you jest!",
    "My heart cannot bear a no!",
    "Have you no mercy?",
    "But we are perfect together!",
    "I insist!",
    "Miss Bennet would never refuse!",
    "A moment of madness, perhaps?",
    "Do not break my heart!",
    "Think of the scandal!",
    "Love commands you to say Yes!"
];

function moveNoButton() {
    const btn = document.getElementById('no-btn');

    if (!btn) return;

    // Move to body if not already there to avoid transform parent issues
    if (btn.parentElement !== document.body) {
        document.body.appendChild(btn);
    }

    // play music if not playing (cheeky interaction trigger)
    if (!isPlaying && audio) {
        audio.play().then(() => {
            isPlaying = true;
            const btn = document.getElementById('music-control');
            if (btn) {
                btn.innerHTML = `<svg viewBox="0 0 24 24" fill="#800020"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
                btn.style.animation = 'pulse 2s infinite';
            }
        }).catch(() => { });
    }

    // Set fixed position to allow movement across entire screen
    btn.style.position = 'fixed';
    btn.style.zIndex = '99999'; // Ensure it's on top of everything

    // Get button dimensions (fallback to reasonable defaults if 0)
    // We force a recalculation
    const btnWidth = btn.offsetWidth > 0 ? btn.offsetWidth : 120;
    const btnHeight = btn.offsetHeight > 0 ? btn.offsetHeight : 50;

    // Viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Safety margin strict (20px)
    const margin = 40;

    // Calculate maximum allowed top-left coordinates
    // The button must not go beyond (Viewport - Size - Margin)
    const maxLeft = vw - btnWidth - margin;
    const maxTop = vh - btnHeight - margin;

    // Ensure ranges are valid (at least equal to margin)
    // If viewport is smaller than button+margin, we clamp to margin (so it sits at top left)
    const safeMaxLeft = Math.max(margin, maxLeft);
    const safeMaxTop = Math.max(margin, maxTop);

    // Generate random position within safe bounds [margin, safeMax]
    const randomX = Math.floor(Math.random() * (safeMaxLeft - margin + 1)) + margin;
    const randomY = Math.floor(Math.random() * (safeMaxTop - margin + 1)) + margin;

    // Apply new position
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;

    // Clear any conflicting styles
    btn.style.right = 'auto';
    btn.style.bottom = 'auto';
    btn.style.transform = 'none';
    btn.style.margin = '0';

    // Show cheeky message
    showCheekyMessage();
}

function showCheekyMessage() {
    const msg = cheekyMessages[Math.floor(Math.random() * cheekyMessages.length)];

    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'cheeky-popup fade-in';
    popup.innerText = msg;

    // Position randomly on screen
    popup.style.left = `${Math.random() * 80 + 10}%`;
    popup.style.top = `${Math.random() * 80 + 10}%`;

    document.body.appendChild(popup);

    // Remove after a few seconds
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}

function acceptProposal() {
    // Start music if not playing
    if (!isPlaying) {
        toggleMusic();
    }

    const contentDiv = document.getElementById('main-content');

    // Remove detached No button if it exists
    const noBtn = document.getElementById('no-btn');
    if (noBtn) noBtn.remove();

    // Transition animation
    contentDiv.style.opacity = '0';
    contentDiv.style.transform = 'scale(0.95)';

    setTimeout(() => {
        // Render first day
        renderContent(0);

        contentDiv.style.transition = 'all 0.8s ease';
        contentDiv.style.opacity = '1';
        contentDiv.style.transform = 'scale(1)';
    }, 500);
}

function renderProposal() {
    const container = document.getElementById('main-content');

    container.innerHTML = `
        <div class="text-center fade-in relative h-full flex flex-col items-center justify-center min-h-[400px]">
            <p class="font-display text-gold text-xl tracking-[0.2em] uppercase mb-4 ornament"></p>
            <h1 class="font-script text-7xl md:text-8xl mb-8 text-burgundy leading-tight drop-shadow-sm">Will You Be My Valentine?</h1>
            
            <div class="divider-ornate text-3xl my-8">❦</div>
            
            <div class="font-body text-2xl text-secondary italic leading-relaxed mb-12 max-w-lg mx-auto">
                "In vain have I struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you."
            </div>
            
            <div class="flex gap-8 justify-center items-center w-full relative">
                <button onclick="acceptProposal()" class="btn-austin text-xl px-12 py-4 shadow-xl hover:shadow-gold/20 transform hover:-translate-y-1 transition-all duration-300 bg-burgundy text-cream border border-gold/30">
                    Yes, Most Ardently
                </button>
                
                <button id="no-btn" onmouseover="moveNoButton()" onclick="moveNoButton()" class="btn-austin text-xl px-12 py-4 shadow-xl hover:shadow-gold/20 transform hover:-translate-y-1 transition-all duration-300 bg-burgundy text-cream border border-gold/30 z-50">
                    No
                </button>
            </div>
        </div>
    `;
}

function renderContent(index) {
    // Safety: Ensure no-btn is gone forever once we leave the proposal
    const noBtn = document.getElementById('no-btn');
    if (noBtn) noBtn.remove();

    const data = valentineData[index];
    const container = document.getElementById('main-content');

    container.innerHTML = `
        <div class="text-center fade-in">
            <p class="font-display text-gold text-lg tracking-widest uppercase mb-2 ornament">✧ ${data.subtitle} ✧</p>
            <h1 class="font-script text-6xl md:text-7xl mb-6 text-burgundy leading-tight">${data.title}</h1>
            
            <div class="divider-ornate text-2xl my-6">❦</div>
            
            <div class="font-body text-xl md:text-2xl text-secondary italic leading-relaxed mb-8 px-4 md:px-12">
                "${data.content.replace(/\n/g, '<br>')}"
            </div>
            
            <div class="bg-stone-50/50 p-6 rounded border-t border-b border-gold/30 mb-10 max-w-lg mx-auto">
                <p class="font-display text-lg mb-2 text-primary">"${data.quote}"</p>
                <p class="text-xs uppercase tracking-widest text-gold mt-2">— ${data.author}</p>
            </div>
            
            <button onclick="nextStep()" class="btn-austin group">
                <span class="relative z-10 group-hover:tracking-widest transition-all duration-300">${data.actionBtn}</span>
            </button>
        </div>
    `;
}

function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 20;

    // Avoid duplicates if called multiple times
    container.innerHTML = '';

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.style.cssText = `
            position: absolute;
            width: ${Math.random() * 15 + 10}px;
            height: ${Math.random() * 15 + 10}px;
            background: #ffd7d7;
            border-radius: 50% 0 50% 50%;
            transform: rotate(45deg);
            top: -20px;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: fall ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: -${Math.random() * 20}s;
        `;
        container.appendChild(petal);
    }

    // Add styles if they don't exist
    if (!document.getElementById('petal-styles')) {
        const style = document.createElement('style');
        style.id = 'petal-styles';
        style.textContent = `
            @keyframes fall {
                0% { transform: translateY(-20px) rotate(0deg) translateX(0); }
                100% { transform: translateY(100vh) rotate(360deg) translateX(50px); }
            }
            @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
                70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
            }
        `;
        document.head.appendChild(style);
    }
}
