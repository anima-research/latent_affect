// Table of contents — highlights current section on scroll

(function () {
    const links = document.querySelectorAll('.toc-link');
    const sections = [];

    links.forEach(link => {
        const id = link.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) sections.push({ id, el, link });
    });

    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const match = sections.find(s => s.el === entry.target);
                if (match) match.link.classList.add('active');
            }
        });
    }, {
        // trigger when section crosses the top third of viewport
        rootMargin: '0px 0px -66% 0px',
        threshold: 0
    });

    sections.forEach(s => observer.observe(s.el));
})();
