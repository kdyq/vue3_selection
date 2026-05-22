<template>
    <div class="not-found">
        <!-- Animated background particles -->
        <div class="bg-particles">
            <span v-for="i in 15" :key="i" class="particle" :style="getParticleStyle(i)"></span>
        </div>

        <!-- Main content -->
        <div class="content">
            <!-- Glitch 404 number -->
            <div class="error-code" aria-hidden="true">
                <span class="digit" data-text="4">4</span>
                <span class="digit zero" data-text="0">
                    <div class="astronaut">
                        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Helmet -->
                            <ellipse cx="40" cy="32" rx="20" ry="22" fill="#e8f4f8" stroke="#b0cdd8" stroke-width="2" />
                            <!-- Visor -->
                            <ellipse cx="40" cy="30" rx="12" ry="13" fill="#4f98a3" opacity="0.7" />
                            <ellipse cx="36" cy="24" rx="4" ry="3" fill="white" opacity="0.5" />
                            <!-- Body suit -->
                            <rect x="24" y="50" width="32" height="24" rx="10" fill="#dce8ec" stroke="#b0cdd8"
                                stroke-width="1.5" />
                            <!-- Arms -->
                            <rect x="10" y="52" width="14" height="10" rx="5" fill="#dce8ec" stroke="#b0cdd8"
                                stroke-width="1.5" />
                            <rect x="56" y="52" width="14" height="10" rx="5" fill="#dce8ec" stroke="#b0cdd8"
                                stroke-width="1.5" />
                            <!-- Legs -->
                            <rect x="26" y="70" width="10" height="8" rx="4" fill="#c9d9de" stroke="#b0cdd8"
                                stroke-width="1.5" />
                            <rect x="44" y="70" width="10" height="8" rx="4" fill="#c9d9de" stroke="#b0cdd8"
                                stroke-width="1.5" />
                            <!-- Chest panel -->
                            <rect x="32" y="57" width="16" height="10" rx="3" fill="#4f98a3" opacity="0.5" />
                            <circle cx="36" cy="62" r="2" fill="#01696f" />
                            <circle cx="44" cy="62" r="2" fill="#e8f4f8" />
                        </svg>
                    </div>
                </span>
                <span class="digit" data-text="4">4</span>
            </div>

            <!-- Message -->
            <div class="message-block">
                <h1 class="title">迷失在宇宙中</h1>
                <p class="subtitle">你访问的页面已飘向了未知星系，或者从未存在过。</p>
            </div>

            <!-- Divider -->
            <div class="divider">
                <span></span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                </svg>
                <span></span>
            </div>

            <!-- CTA Button -->
            <button class="home-btn" @click="goHome" @mouseenter="hovered = true" @mouseleave="hovered = false">
                <svg class="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2.2">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                    <path d="M9 21V12h6v9" />
                </svg>
                <span>点击回到首页</span>
                <svg class="btn-arrow" :class="{ 'arrow-moved': hovered }" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </button>

            <!-- Error code footnote -->
            <p class="error-note">错误代码：404 Not Found</p>
        </div>

        <!-- Floating stars -->
        <div class="stars">
            <div v-for="i in 60" :key="`star-${i}`" class="star" :style="getStarStyle(i)"></div>
        </div>
    </div>
</template>

<script setup lang="ts" name="404">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hovered = ref(false)

function goHome() {
    router.push('/home')
}

function getParticleStyle(i: number) {
    const sizes = [6, 8, 10, 12, 14, 16]
    const size = sizes[i % sizes.length]
    const delay = (i * 0.4).toFixed(1)
    const duration = (8 + (i % 6)).toFixed(1)
    const left = ((i * 6.5) % 100).toFixed(1)
    return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: (0.04 + (i % 5) * 0.015).toFixed(2),
    }
}

function getStarStyle(i: number) {
    const size = i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1.5px'
    const top = ((i * 13.7) % 100).toFixed(1)
    const left = ((i * 7.3 + 11) % 100).toFixed(1)
    const delay = ((i * 0.3) % 3).toFixed(1)
    const duration = (2 + (i % 4)).toFixed(1)
    return {
        width: size,
        height: size,
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
    }
}
</script>

<style scoped>
/* ─── Design Tokens ────────────────────────────── */
.not-found {
    --color-bg: #0b0e1a;
    --color-surface: #111527;
    --color-primary: #4f98a3;
    --color-primary-glow: rgba(79, 152, 163, 0.35);
    --color-primary-hover: #227f8b;
    --color-text: #e0e8f0;
    --color-text-muted: #8a9ab8;
    --color-text-faint: #4a5572;
    --color-border: rgba(79, 152, 163, 0.18);
    --font-display: 'Sora', 'Inter', sans-serif;
    --font-body: 'Inter', system-ui, sans-serif;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;
    --transition: 200ms cubic-bezier(0.16, 1, 0.3, 1);

    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg);
    font-family: var(--font-body);
    color: var(--color-text);
    overflow: hidden;
    position: relative;
}

/* ─── Background Particles ─────────────────────── */
.bg-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
}

.particle {
    position: absolute;
    bottom: -20px;
    border-radius: 50%;
    background: var(--color-primary);
    animation: float-up linear infinite;
}

@keyframes float-up {
    0% {
        transform: translateY(0) scale(1);
        opacity: inherit;
    }

    80% {
        opacity: inherit;
    }

    100% {
        transform: translateY(-110vh) scale(0.3);
        opacity: 0;
    }
}

/* ─── Stars ────────────────────────────────────── */
.stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
}

.star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle ease-in-out infinite alternate;
}

@keyframes twinkle {
    from {
        opacity: 0.15;
        transform: scale(0.8);
    }

    to {
        opacity: 0.9;
        transform: scale(1.2);
    }
}

/* ─── Main content ─────────────────────────────── */
.content {
    position: relative;
    z-index: 10;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
    max-width: 560px;
    width: 100%;
}

/* ─── 404 Error Code ───────────────────────────── */
.error-code {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    line-height: 1;
    user-select: none;
}

.digit {
    font-family: var(--font-display);
    font-size: clamp(6rem, 18vw, 10rem);
    font-weight: 800;
    background: linear-gradient(135deg, #e0e8f0 0%, var(--color-primary) 50%, #a3d4db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    letter-spacing: -0.04em;
    filter: drop-shadow(0 0 32px rgba(79, 152, 163, 0.4));
}

/* Glitch effect on hover */
.digit::before,
.digit::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    background: inherit;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
}

.error-code:hover .digit::before {
    animation: glitch-1 0.3s linear infinite;
    opacity: 0.7;
    clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
    background: linear-gradient(135deg, #e05555 0%, #e07755 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.error-code:hover .digit::after {
    animation: glitch-2 0.3s linear infinite;
    opacity: 0.5;
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
    background: linear-gradient(135deg, #4f98a3 0%, #5561e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

@keyframes glitch-1 {
    0% {
        transform: translateX(-3px);
    }

    25% {
        transform: translateX(3px);
    }

    50% {
        transform: translateX(-2px);
    }

    75% {
        transform: translateX(2px);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes glitch-2 {
    0% {
        transform: translateX(2px);
    }

    25% {
        transform: translateX(-2px);
    }

    50% {
        transform: translateX(3px);
    }

    75% {
        transform: translateX(-3px);
    }

    100% {
        transform: translateX(0);
    }
}

/* Center zero with astronaut */
.digit.zero {
    position: relative;
    width: clamp(6rem, 18vw, 10rem);
    display: flex;
    align-items: center;
    justify-content: center;
}

.astronaut {
    position: absolute;
    width: clamp(4rem, 11vw, 6.5rem);
    height: clamp(4rem, 11vw, 6.5rem);
    animation: float-astronaut 4s ease-in-out infinite;
    filter: drop-shadow(0 0 12px rgba(79, 152, 163, 0.5));
}

@keyframes float-astronaut {

    0%,
    100% {
        transform: translateY(0) rotate(-3deg);
    }

    50% {
        transform: translateY(-12px) rotate(3deg);
    }
}

/* ─── Message ──────────────────────────────────── */
.message-block {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.title {
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 4vw, 2rem);
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.02em;
    text-wrap: balance;
}

.subtitle {
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    color: var(--color-text-muted);
    max-width: 42ch;
    line-height: 1.65;
    text-wrap: pretty;
}

/* ─── Divider ──────────────────────────────────── */
.divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--color-text-faint);
    width: 100%;
    max-width: 260px;
}

.divider span {
    flex: 1;
    height: 1px;
    background: var(--color-border);
}

/* ─── Home Button ──────────────────────────────── */
.home-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 2rem;
    background: linear-gradient(135deg, var(--color-primary) 0%, #01696f 100%);
    color: #e8f6f8;
    font-size: 0.9375rem;
    font-weight: 600;
    font-family: var(--font-body);
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow:
        0 0 0 1px rgba(79, 152, 163, 0.3),
        0 4px 20px rgba(79, 152, 163, 0.3),
        0 1px 3px rgba(0, 0, 0, 0.3);
    transition:
        transform var(--transition),
        box-shadow var(--transition),
        background var(--transition);
}

.home-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
    opacity: 0;
    transition: opacity var(--transition);
}

.home-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow:
        0 0 0 1px rgba(79, 152, 163, 0.5),
        0 8px 32px rgba(79, 152, 163, 0.45),
        0 2px 6px rgba(0, 0, 0, 0.4);
}

.home-btn:hover::before {
    opacity: 1;
}

.home-btn:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 0 0 1px rgba(79, 152, 163, 0.3), 0 2px 8px rgba(79, 152, 163, 0.2);
}

.btn-icon {
    flex-shrink: 0;
}

.btn-arrow {
    flex-shrink: 0;
    transition: transform var(--transition);
}

.btn-arrow.arrow-moved {
    transform: translateX(4px);
}

/* ─── Error note ───────────────────────────────── */
.error-note {
    font-size: 0.75rem;
    color: var(--color-text-faint);
    letter-spacing: 0.04em;
    font-family: 'Courier New', monospace;
}

/* ─── Responsive ───────────────────────────────── */
@media (max-width: 480px) {
    .content {
        gap: 1.25rem;
        padding: 1.5rem 1rem;
    }

    .home-btn {
        padding: 0.8rem 1.5rem;
        font-size: 0.875rem;
    }
}
</style>