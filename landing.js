// Create particle effect
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(217, 11, 11, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Add click event to enter button
document.querySelector('.enter-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});