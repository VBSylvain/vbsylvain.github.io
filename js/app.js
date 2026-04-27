/**
 * Portfolio App - Sylvain VIZZINI
 */

const state = {
    data: null,
    currentLang: localStorage.getItem('portfolio-lang') || 'fr',
    currentTheme: localStorage.getItem('portfolio-theme') || 'standard',
};

const translations = {
    fr: {
        results_title: "🚀 Résultats & Impact",
        skills_title: "🛠️ Compétences",
        timeline_title: "💼 Parcours",
        certs_title: "🏆 Certifications",
        filter_all: "Tout",
        footer_rights: "Tous droits réservés.",
        contact_title: "✉️ Contact",
        btn_themes: "Thèmes",
        footer_ai: "✨ Co-créé avec l'IA (Gemini & Claude)",
    },
    en: {
        results_title: "🚀 Results & Impact",
        skills_title: "🛠️ Skills",
        timeline_title: "💼 Experience",
        certs_title: "🏆 Certifications",
        filter_all: "All",
        footer_rights: "All rights reserved.",
        contact_title: "✉️ Contact",
        btn_themes: "Themes",
        footer_ai: "✨ Co-created with AI (Gemini & Claude)",
    }
};

/**
 * Initialize the application
 */
async function init() {
    setupEventListeners();
    setupGodTierEffects();
    applyState();

    if (localStorage.getItem('portfolio-theme')) {
        showPortfolio();
    }

    try {
        const response = await fetch('career.json');
        if (!response.ok) throw new Error("Fetch failed");
        state.data = await response.json();
        render();
    } catch (error) {
        console.error("Data error:", error);
    }
}

/**
 * Helper to wrap emojis in metallic spans
 */
function silver(emoji) {
    return `<span class="metallic-icon">${emoji}</span>`;
}

/**
 * Setup God-Tier Visual Effects
 */
function setupGodTierEffects() {
    const cursor = document.getElementById('custom-cursor');
    const dot = document.getElementById('cursor-dot');
    
    if (!cursor || !dot) return;

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        
        cursor.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 400, fill: "forwards" });

        const isPortfolioVisible = !document.getElementById('portfolio-container').classList.contains('hidden');
        if (isPortfolioVisible) {
            document.querySelectorAll('.tilt-card').forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;
                const angleX = (y - cardY) / (window.innerHeight / 2) * 10;
                const angleY = (x - cardX) / (window.innerWidth / 2) * -10; 
                card.style.setProperty('--rx', `${angleX}deg`);
                card.style.setProperty('--ry', `${angleY}deg`);
            });
        }
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('button, a, .theme-btn, .result-card, .timeline-content, .cert-card, .stat-item')) {
            cursor.classList.add('hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('button, a, .theme-btn, .result-card, .timeline-content, .cert-card, .stat-item')) {
            cursor.classList.remove('hover');
        }
    });
}

function showPortfolio() {
    document.getElementById('landing-screen').classList.add('hidden');
    document.getElementById('portfolio-container').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function showLanding() {
    document.getElementById('landing-screen').classList.remove('hidden');
}

function setupEventListeners() {
    document.getElementById('theme-switch-btn').addEventListener('click', showLanding);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('disabled')) return;
            state.currentTheme = btn.dataset.theme;
            localStorage.setItem('portfolio-theme', state.currentTheme);
            showPortfolio();
            applyState();
            render();
        });
    });
    document.getElementById('lang-toggle').addEventListener('click', () => {
        state.currentLang = state.currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('portfolio-lang', state.currentLang);
        applyState();
        render();
    });
}

function applyState() {
    document.documentElement.lang = state.currentLang;
    document.body.className = `theme-${state.currentTheme}`;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[state.currentLang][key]) {
            let text = translations[state.currentLang][key];
            // Auto-wrap emojis in titles
            text = text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF])/g, silver('$1'));
            el.innerHTML = text;
        }
    });
}

function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('section, .result-card, .timeline-item, .stat-item, .cert-card').forEach(el => observer.observe(el));
}

function render() {
    if (!state.data) return;
    renderHero();
    renderResults();
    renderSkills();
    renderTimeline();
    renderCertifications();
    renderContact();
    setupScrollReveal();
}

function renderHero() {
    const { identity, hero_stats } = state.data;
    const lang = state.currentLang;
    document.getElementById('hero-content').innerHTML = `
        <h1 class="hero-name">${identity.first_name} ${identity.last_name}</h1>
        <p class="hero-role">${identity[`role_${lang}`]}</p>
        <p class="hero-tagline">${identity[`tagline_${lang}`]}</p>
        <div class="hero-stats">
            ${hero_stats.map(stat => `
                <div class="stat-item tilt-card">
                    <span class="stat-value">${stat.value}</span>
                    <span class="stat-label">${stat[`label_${lang}`]}</span>
                </div>
            `).join('')}
        </div>
        <div class="hero-actions">
            <a href="${identity.contact.linkedin_url || '#'}" class="btn btn-primary" target="_blank">LinkedIn</a>
            <a href="${identity.contact.malt_url || '#'}" class="btn btn-primary" target="_blank">Malt</a>
        </div>
    `;
}

function renderResults() {
    const lang = state.currentLang;
    document.getElementById('results-grid').innerHTML = state.data.metrics.map(metric => `
        <div class="result-card tilt-card living-border">
            <div class="result-value">${metric.value}</div>
            <div class="result-label">${metric[`label_${lang}`]}</div>
            <p class="result-description">${metric[`description_${lang}`]}</p>
            <div class="result-source">${silver('🔍')} ${metric[`source_${lang}`]}</div>
        </div>
    `).join('');
}

function renderSkills() {
    const lang = state.currentLang;
    const container = document.getElementById('skills-list');
    container.innerHTML = state.data.skills.map(skill => `
        <div class="skill-item">
            <div class="skill-info"><span>${skill[`skill_${lang}`]}</span><span>${skill.score}%</span></div>
            <div class="skill-bar-bg"><div class="skill-bar-fill" data-score="${skill.score}" style="width: 0%"></div></div>
        </div>
    `).join('');
    setTimeout(() => {
        container.querySelectorAll('.skill-bar-fill').forEach(bar => bar.style.width = `${bar.dataset.score}%`);
    }, 100);
}

function renderTimeline() {
    const lang = state.currentLang;
    const sorted = [...state.data.experiences].sort((a, b) => new Date(b.start_date || '1900') - new Date(a.start_date || '1900'));
    document.getElementById('timeline-container').innerHTML = sorted.map(exp => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content tilt-card">
                <span class="experience-company">${silver('🏢')} ${exp.company || ''}</span>
                <h3 class="experience-role">${exp[`role_${lang}`]}</h3>
                <div class="experience-meta">${silver('📅')} ${formatDate(exp.start_date, lang)} — ${exp.current ? (lang === 'fr' ? 'Présent' : 'Present') : formatDate(exp.end_date, lang)}</div>
                <p class="experience-desc">${exp[`description_${lang}`]}</p>
                <div class="tag-list">${exp.tags.map(tag => `<span class="tag"># ${tag}</span>`).join('')}</div>
            </div>
        </div>
    `).join('');
}

function renderCertifications() {
    const lang = state.currentLang;
    document.getElementById('certs-grid').innerHTML = state.data.certifications.map(cert => `
        <div class="cert-card tilt-card">
            <span class="cert-year">${silver('🗓️')} ${cert.year}</span>
            <h3 class="cert-name">${silver('📜')} ${cert[`name_${lang}`]}</h3>
            <span class="cert-org">${silver('🏛️')} ${cert.organization}</span>
        </div>
    `).join('');
}

function renderContact() {
    const { contact } = state.data;
    const lang = state.currentLang;
    document.getElementById('contact-content').innerHTML = `
        <h2 data-i18n="contact_title">${translations[lang].contact_title}</h2>
        <p class="contact-msg">${contact[`message_${lang}`]}</p>
        <div class="hero-actions">
            <a href="${contact.linkedin_url || '#'}" class="btn btn-primary" target="_blank">LinkedIn</a>
            <a href="${contact.malt_url || '#'}" class="btn btn-primary" target="_blank">Malt</a>
        </div>
    `;
}

function formatDate(dateStr, lang) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', year: 'numeric' });
}

init();
