// Tiny ambient sprites — lazy swarm drifting around the hero logo.
// Tweakables at the top.

(function () {
    const COUNT = 50;
    const SPAWN_RADIUS = 400;       // where new sprites appear (around center)
    const PULL_STRENGTH = -0.0002;  // attraction to center (higher = tighter swarm)
    const WANDER = 0.05;           // random per-frame nudge
    const DAMPING = 0.70;          // velocity friction (lower = quicker stop)
    const SIZE_MIN = 0.6;
    const SIZE_MAX = 2.0;
    const LIFE_SPEED = [0.0006, 0.0018];
    const MAX_ALPHA = 0.55;

    // Swarm center: X = center of content column, Y = fixed page coordinate
    const CENTER_Y = 650;

    const COLORS = [
        'rgba(140, 210, 150,',
        'rgba(170, 220, 175,',
        'rgba(110, 180, 130,',
        'rgba(180, 185, 180,',
        'rgba(155, 195, 160,',
    ];

    const canvas = document.createElement('canvas');
    canvas.id = 'sprites';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h, dpr;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const rand = (a, b) => a + Math.random() * (b - a);

    let centerX = w / 2;
    let centerY = CENTER_Y;

    function updateCenterX() {
        const content = document.querySelector('.content');
        if (content) {
            const r = content.getBoundingClientRect();
            centerX = r.left + window.scrollX + r.width / 2;
        } else {
            centerX = w / 2;
        }
    }
    updateCenterX();
    window.addEventListener('resize', updateCenterX);

    function spawn(p) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * SPAWN_RADIUS;
        p.x = centerX + Math.cos(angle) * radius;
        p.y = centerY + Math.sin(angle) * radius;
        p.vx = rand(-0.3, 0.3);
        p.vy = rand(-0.3, 0.3);
        p.size = rand(SIZE_MIN, SIZE_MAX);
        p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        p.life = Math.random();
        p.lifeSpeed = rand(LIFE_SPEED[0], LIFE_SPEED[1]);
        return p;
    }

    updateCenterX();
    const sprites = [];
    for (let i = 0; i < COUNT; i++) sprites.push(spawn({}));

    function tick() {
        ctx.clearRect(0, 0, w, h);

        // shift the entire drawing by current scroll, so sprites stay anchored
        // to the page rather than the viewport
        ctx.save();
        ctx.translate(-window.scrollX, -window.scrollY);

        for (const p of sprites) {
            const dx = centerX - p.x;
            const dy = centerY - p.y;
            const dist = Math.hypot(dx, dy) + 0.01;

            // attraction grows with distance — keeps swarm bounded
            const pull = PULL_STRENGTH * dist;
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;

            // random wander
            p.vx += (Math.random() - 0.5) * WANDER;
            p.vy += (Math.random() - 0.5) * WANDER;

            // damping
            p.vx *= DAMPING;
            p.vy *= DAMPING;

            p.x += p.vx;
            p.y += p.vy;

            p.life += p.lifeSpeed;
            if (p.life > 1) {
                spawn(p);
                continue;
            }

            const alpha = Math.sin(p.life * Math.PI) * MAX_ALPHA;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + alpha + ')';
            ctx.fill();
        }

        ctx.restore();
        requestAnimationFrame(tick);
    }

    tick();
})();
