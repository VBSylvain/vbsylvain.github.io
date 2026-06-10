/* =============================================================
   NARUTO THEME — Animations, Sigils, Easter Eggs
   Sister-file to css/naruto.css. Activates only when
   body.classList.contains('theme-naruto'). Hooks into the
   'portfolio:rendered' event app.js dispatches.
   ============================================================= */

(function () {
    'use strict';

    /* ---------- CONFIG ---------- */
    const KANJI_BG = ['影', '闇', '紅', '月', '忍', '輪', '写', '白', '雷', '焔', '禍', '修', '魂', '空', '夢'];
    const KANJI_STORM_COUNT = 16;

    // Section identity (id → kanji, romaji, FR/EN reskin label)
    const SECTION_MAP = {
        hero:    { kanji: '流浪', romaji: 'RUROU', en: 'Wandering', fr: 'Errance' },
        results: { kanji: '任務', romaji: 'NINMU', en: 'Mission Reports', fr: 'Rapports de Mission' },
        skills:  { kanji: '術',   romaji: 'JUTSU', en: 'Jutsus',          fr: 'Jutsus' },
        timeline:{ kanji: '道',   romaji: 'MICHI', en: 'Mission Log',     fr: 'Journal des Missions' },
        certifications: { kanji: '額', romaji: 'HITAI-ATE', en: 'Scratched Headbands', fr: 'Bandeaux Rayés' },
        contact: { kanji: '召喚', romaji: 'SHŌKAN', en: 'Send a Summoning', fr: 'Invocation' },
    };

    // Jutsu category by skill_en (or skill_fr fallback)
    const JUTSU_CATEGORIES = [
        {
            key: 'ninjutsu',
            kanji: '忍術',
            label_en: 'Ninjutsu · Process & Delivery',
            label_fr: 'Ninjutsu · Process & Delivery',
            skills: [
                'Scrum Master & Agile Facilitation',
                'Product Management & Roadmapping',
                'Delivery Management & Transformation',
                'Classical Project Management',
                'SAFe / Scaled Agile',
                'Scrum Master & Facilitation Agile',
                'Product Management & Roadmapping',
                'Delivery Management & Transformation',
                'Gestion de projet classique',
                "SAFe / Agilité à l'échelle",
            ],
        },
        {
            key: 'genjutsu',
            kanji: '幻術',
            label_en: 'Genjutsu · People & Influence',
            label_fr: 'Genjutsu · Humain & Influence',
            skills: [
                'Stakeholder Management',
                'Team Coaching & Leadership',
                'Change Management',
                'Gestion de parties prenantes',
                "Coaching & Leadership d'équipe",
                'Conduite du changement',
            ],
        },
        {
            key: 'doujutsu',
            kanji: '瞳術',
            label_en: 'Dōjutsu · Rare Bloodline (AI & No-Code)',
            label_fr: 'Dōjutsu · Lignée rare (IA & No-Code)',
            skills: [
                'Generative AI & AI Practice',
                'No-code & Workflow Automation',
                'IA Générative & Pratique AI',
                'No-code & Automatisation',
            ],
        },
    ];

    // Mission rank by experience id (S/A/B/C/X=kinjutsu)
    const MISSION_RANKS = {
        'schneider-electric-2025': 'S',
        'bps-2023':                'S',
        'akkodis-genai-2023':      'A',
        'akkodis-dm-2020':         'S',
        'modis-pm-2020':           'A',
        'ffd-2019':                'B',
        'captivea-2017':           'A',
        'adn-2015':                'B',
        'ciat-2012':               'A',
        'caterpillar-2011':        'A',
        'ai-practice-personal':    'X',
        'dance-instructor':        'X',
        'theater-artist':          'X',
        'poker-player':            'X',
    };

    // Result rank by metric value (matched against the .result-value text)
    const RESULT_RANK_BY_VALUE = {
        '0→30%':   'S',
        '+40%':    'S',
        '−50%':    'A',
        '-50%':    'A',
        '85%':     'S',
        '+12%':    'A',
        '80-95%':  'S',
    };

    /* ---------- UTILS ---------- */
    function isNaruto() {
        return document.body.classList.contains('theme-naruto');
    }
    function once(el, evt) {
        return new Promise(res => el.addEventListener(evt, res, { once: true }));
    }
    function el(tag, props = {}, html = '') {
        const e = document.createElement(tag);
        Object.assign(e, props);
        if (html) e.innerHTML = html;
        return e;
    }

    /* =========================================================
       1. WORLD: kanji storm
       ========================================================= */
    function mountKanjiStorm() {
        if (document.querySelector('.naruto-kanji-storm')) return;
        const storm = el('div', { className: 'naruto-kanji-storm' });
        for (let i = 0; i < KANJI_STORM_COUNT; i++) {
            const n = el('span', { className: 'nk' });
            n.textContent = KANJI_BG[Math.floor(Math.random() * KANJI_BG.length)];
            const size = 4 + Math.random() * 22;
            n.style.fontSize = `${size}rem`;
            n.style.left = `${Math.random() * 95}%`;
            n.style.top = `${Math.random() * 100}%`;
            n.style.setProperty('--nk-dur', `${40 + Math.random() * 60}s`);
            n.style.setProperty('--nk-dx', `${(Math.random() - 0.5) * 80}px`);
            n.style.setProperty('--nk-dy', `${(Math.random() - 0.5) * 100}px`);
            n.style.setProperty('--nk-r', `${(Math.random() - 0.5) * 8}deg`);
            n.style.opacity = (0.025 + Math.random() * 0.035).toFixed(3);
            storm.appendChild(n);
        }
        document.body.prepend(storm);
    }
    function unmountKanjiStorm() {
        document.querySelector('.naruto-kanji-storm')?.remove();
    }

    /* ---------- Chakra mist (persistent bottom-edge glow) ---------- */
    function mountChakraMist() {
        if (document.querySelector('.naruto-chakra-mist')) return;
        document.body.appendChild(el('div', { className: 'naruto-chakra-mist' }));
    }
    function unmountChakraMist() {
        document.querySelector('.naruto-chakra-mist')?.remove();
    }

    /* ---------- Gudōdama (Truth-Seeking Orbs) ---------- */
    function mountGudodamaCluster() {
        if (document.querySelector('.naruto-gudodama-cluster')) return;
        const hero = document.getElementById('hero');
        if (!hero) return;
        const cluster = el('div', { className: 'naruto-gudodama-cluster' });
        // Six orbs in a loose ring + center
        const positions = [
            { x: '50%', y: '50%' },
            { x: '10%', y: '20%' },
            { x: '80%', y: '8%'  },
            { x: '92%', y: '60%' },
            { x: '60%', y: '88%' },
            { x: '8%',  y: '78%' },
        ];
        positions.forEach((p, i) => {
            const o = el('div', { className: 'go' });
            o.style.left = p.x;
            o.style.top = p.y;
            o.style.setProperty('--go-dur', `${5 + i * 1.4}s`);
            o.style.setProperty('--go-pulse', `${2.8 + (i % 3) * 0.6}s`);
            o.style.setProperty('--go-dx', `${(Math.random() - 0.5) * 30}px`);
            o.style.setProperty('--go-dy', `${(Math.random() - 0.5) * 30}px`);
            o.style.animationDelay = `${-i * 0.7}s`;
            cluster.appendChild(o);
        });
        hero.style.position = hero.style.position || 'relative';
        hero.appendChild(cluster);
    }
    function unmountGudodamaCluster() {
        document.querySelector('.naruto-gudodama-cluster')?.remove();
    }

    /* ---------- Ambient chakra motes (always on while Naruto active) ---------- */
    let ambientMoteInterval = null;
    function spawnAmbientMote() {
        if (!isNaruto()) return;
        const m = el('div', { className: 'naruto-mote ambient' });
        m.style.left = `${5 + Math.random() * 90}vw`;
        m.style.top  = `${85 + Math.random() * 15}vh`;
        m.style.setProperty('--mote-dur', `${11 + Math.random() * 8}s`);
        m.style.setProperty('--mote-dx', `${(Math.random() - 0.5) * 200}px`);
        document.body.appendChild(m);
        setTimeout(() => m.remove(), 20000);
    }
    function startAmbientMotes() {
        stopAmbientMotes();
        // Seed a few immediately, then a steady drip
        for (let i = 0; i < 4; i++) setTimeout(spawnAmbientMote, i * 250);
        ambientMoteInterval = setInterval(spawnAmbientMote, 1100);
    }
    function stopAmbientMotes() {
        if (ambientMoteInterval) clearInterval(ambientMoteInterval);
        ambientMoteInterval = null;
    }

    /* =========================================================
       2. HAND-SIGN SEQUENCE intro
       ========================================================= */
    const HANDSIGNS = [
        { glyph: '寅', name: 'Tora · Tiger' },
        { glyph: '辰', name: 'Tatsu · Dragon' },
        { glyph: '巳', name: 'Mi · Snake' },
    ];
    function playHandsigns() {
        if (document.querySelector('.naruto-handsigns')) return;
        const overlay = el('div', { className: 'naruto-handsigns' });
        const glyph = el('div', { className: 'nhs-glyph' });
        const name  = el('div', { className: 'nhs-name' });
        overlay.appendChild(glyph);
        overlay.appendChild(name);
        document.body.appendChild(overlay);

        let i = 0;
        const tick = () => {
            if (i >= HANDSIGNS.length) {
                setTimeout(() => overlay.remove(), 600);
                return;
            }
            glyph.style.animation = 'none';
            name.style.animation = 'none';
            // force reflow
            void glyph.offsetWidth;
            glyph.textContent = HANDSIGNS[i].glyph;
            name.textContent  = HANDSIGNS[i].name;
            glyph.style.animation = 'nhsGlyph 0.35s ease forwards';
            name.style.animation  = 'nhsName 0.35s ease forwards';
            i += 1;
            setTimeout(tick, 380);
        };
        tick();
    }

    /* =========================================================
       3. DOM AUGMENTATION (after each app.js render())
       ========================================================= */

    function getLang() {
        return document.documentElement.lang === 'en' ? 'en' : 'fr';
    }

    function decorateSectionTitles() {
        const lang = getLang();
        document.querySelectorAll('main section').forEach(section => {
            const id = section.id;
            const map = SECTION_MAP[id];
            if (!map) return;
            // Prefer .section-title; fall back to first h2 inside the section
            // (Contact's h2 is rendered inside #contact-content without that class)
            const titleEl = section.querySelector('.section-title') || section.querySelector('h2');
            if (titleEl) {
                titleEl.setAttribute('data-naruto-kanji', map.kanji);
                titleEl.classList.add('section-title');
                titleEl.textContent = lang === 'en' ? map.en : map.fr;
            }
        });
    }

    function stripTagPrefixes() {
        // app.js renders tags as `# Scrum` — strip the literal '# ' since
        // the Naruto theme already adds a tomoe bullet via ::before.
        document.querySelectorAll('.tag').forEach(t => {
            if (t.dataset.narutoStripped) return;
            if (t.textContent.startsWith('# ')) {
                t.textContent = t.textContent.slice(2);
                t.dataset.narutoStripped = '1';
            }
        });
    }

    function addRankToResults() {
        document.querySelectorAll('.result-card').forEach(card => {
            if (card.querySelector('.naruto-rank')) return;
            const v = card.querySelector('.result-value')?.textContent?.trim();
            const rank = RESULT_RANK_BY_VALUE[v] || 'A';
            const stamp = el('div', { className: 'naruto-rank' });
            stamp.setAttribute('data-rank', rank);
            stamp.textContent = rank;
            card.appendChild(stamp);
        });
    }

    function addRankToTimeline() {
        // app.js doesn't put the experience id on the DOM — fall back to
        // matching by company text. Simpler: monkey-patch app.js to attach id.
        // We attach via re-reading from window.__careerData if present.
        const items = document.querySelectorAll('.timeline-item');
        const data  = window.__careerData;
        items.forEach((item, idx) => {
            if (item.querySelector('.naruto-rank')) return;
            // The renderTimeline sorts by start_date DESC. Mirror that here.
            let id = null;
            if (data?.experiences) {
                const sorted = [...data.experiences].sort(
                    (a, b) => new Date(b.start_date || '1900') - new Date(a.start_date || '1900')
                );
                id = sorted[idx]?.id;
            }
            const rank = (id && MISSION_RANKS[id]) || 'B';
            const stamp = el('div', { className: 'naruto-rank' });
            stamp.setAttribute('data-rank', rank);
            stamp.textContent = rank === 'X' ? '禁' : rank;
            stamp.title = rank === 'X' ? 'Kinjutsu — forbidden personal art' : `${rank}-rank mission`;
            item.querySelector('.timeline-content').appendChild(stamp);
        });
    }

    function restructureSkills() {
        const list = document.getElementById('skills-list');
        if (!list) return;
        const lang = getLang();
        const items = Array.from(list.querySelectorAll('.skill-item'));
        if (!items.length) return;

        // Build a map of skill text → element
        const skillMap = new Map();
        items.forEach(it => {
            const text = it.querySelector('.skill-info span')?.textContent?.trim();
            if (text) skillMap.set(text, it);
        });

        // Clear and re-build with categories
        list.innerHTML = '';
        list.classList.add('naruto-skills-list');
        const used = new Set();
        JUTSU_CATEGORIES.forEach(cat => {
            const catItems = [];
            cat.skills.forEach(s => {
                if (skillMap.has(s) && !used.has(s)) {
                    catItems.push(skillMap.get(s));
                    used.add(s);
                }
            });
            if (!catItems.length) return;
            const wrapper = el('div', { className: 'naruto-jutsu-category' });
            const h3 = el('h3');
            h3.setAttribute('data-kanji', cat.kanji);
            h3.innerHTML = `<span class="cat-label">${cat[`label_${lang}`]}</span><span class="cat-en">${catItems.length} jutsu</span>`;
            const grid = el('div', { className: 'naruto-jutsu-category-skills' });
            catItems.forEach(it => grid.appendChild(it));
            wrapper.appendChild(h3);
            wrapper.appendChild(grid);
            list.appendChild(wrapper);
        });

        // Any unmatched skills fall back to a "Misc" Ninjutsu bucket
        const leftover = items.filter(it => {
            const text = it.querySelector('.skill-info span')?.textContent?.trim();
            return text && !used.has(text);
        });
        if (leftover.length) {
            const wrapper = el('div', { className: 'naruto-jutsu-category' });
            const h3 = el('h3');
            h3.setAttribute('data-kanji', '雑');
            h3.innerHTML = `<span class="cat-label">${lang === 'en' ? 'Misc · Other' : 'Divers · Autres'}</span><span class="cat-en">${leftover.length}</span>`;
            const grid = el('div', { className: 'naruto-jutsu-category-skills' });
            leftover.forEach(it => grid.appendChild(it));
            wrapper.appendChild(h3);
            wrapper.appendChild(grid);
            list.appendChild(wrapper);
        }
    }

    function attachChidoriToButtons() {
        document.querySelectorAll('.btn, .header-btn').forEach(btn => {
            if (btn.querySelector('.chidori-host')) return;
            const host = el('div', { className: 'chidori-host' });
            host.innerHTML = '<div class="chidori-strip"></div><div class="chidori-strip" style="transform:rotate(180deg)"></div>';
            btn.appendChild(host);
        });
    }

    function makeMoonClickable() {
        // The moon is a ::after pseudo on body — can't click it directly.
        // Inject a tiny clickable hot-zone in the same position.
        // Single click → Tsukuyomi.  Triple click (within 600ms) → Susanoo.
        if (document.querySelector('.naruto-moon-hotzone')) return;
        const zone = el('button', { className: 'naruto-moon-hotzone', type: 'button', title: 'Tsukuyomi · triple-click for Susanoo' });
        Object.assign(zone.style, {
            position: 'fixed', top: '4vh', right: '5vw',
            width: '11vw', height: '11vw',
            maxWidth: '170px', maxHeight: '170px',
            minWidth: '90px', minHeight: '90px',
            background: 'transparent', border: 'none',
            cursor: 'pointer', zIndex: '5',
            borderRadius: '50%',
        });

        let clickCount = 0;
        let clickTimer = null;
        zone.addEventListener('click', () => {
            clickCount += 1;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                if (clickCount >= 3) {
                    summonSusanoo();
                } else {
                    triggerTsukuyomi();
                }
                clickCount = 0;
            }, 320);
        });
        document.body.appendChild(zone);
    }

    function applyAugmentations() {
        if (!isNaruto()) return;
        decorateSectionTitles();
        addRankToResults();
        addRankToTimeline();
        restructureSkills();
        attachChidoriToButtons();
        stripTagPrefixes();
        // small post-augmentation re-fill of skill bars (we moved them so width may need a nudge)
        document.querySelectorAll('.skill-bar-fill').forEach(b => {
            if (b.dataset.score) b.style.width = `${b.dataset.score}%`;
        });
    }

    /* =========================================================
       4. SCROLL-TRIGGERED JUTSU CALL
       ========================================================= */
    let jutsuCallEl = null;
    let jutsuCallTimer = null;
    function ensureJutsuCallEl() {
        if (jutsuCallEl) return jutsuCallEl;
        jutsuCallEl = el('div', { className: 'naruto-jutsu-call' });
        jutsuCallEl.innerHTML = `
            <div class="jc-kanji"></div>
            <div class="jc-name"></div>
            <div class="jc-eng"></div>
        `;
        document.body.appendChild(jutsuCallEl);
        return jutsuCallEl;
    }
    function showJutsuCall(sectionId) {
        if (!isNaruto()) return;
        const map = SECTION_MAP[sectionId];
        if (!map) return;
        const lang = getLang();
        const e = ensureJutsuCallEl();
        e.querySelector('.jc-kanji').textContent = map.kanji;
        e.querySelector('.jc-name').textContent = map.romaji;
        e.querySelector('.jc-eng').textContent = lang === 'en' ? map.en : map.fr;
        e.classList.add('show');
        clearTimeout(jutsuCallTimer);
        jutsuCallTimer = setTimeout(() => e.classList.remove('show'), 1800);
    }
    function setupScrollObserver() {
        const io = new IntersectionObserver(entries => {
            if (!isNaruto()) return;
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
                    showJutsuCall(entry.target.id);
                }
            });
        }, { threshold: [0.35, 0.6] });
        document.querySelectorAll('main section').forEach(s => io.observe(s));
    }

    /* =========================================================
       5. RINNEGAN CLICK RIPPLE
       ========================================================= */
    function rippleAt(x, y) {
        const r = el('div', { className: 'naruto-ripple' });
        r.style.left = `${x}px`;
        r.style.top  = `${y}px`;
        r.appendChild(el('div', { className: 'nr-ring' }));
        document.body.appendChild(r);
        setTimeout(() => r.remove(), 1100);
    }
    function setupRipple() {
        document.addEventListener('click', e => {
            if (!isNaruto()) return;
            // Don't ripple from buttons in the landing screen
            if (e.target.closest('.theme-btn')) return;
            rippleAt(e.clientX, e.clientY);
        });
    }

    /* =========================================================
       6. IDLE CHAKRA MOTES (>30s no activity)
       ========================================================= */
    let idleTimer = null;
    let moteInterval = null;
    function spawnMote() {
        if (!isNaruto()) return;
        const m = el('div', { className: 'naruto-mote' });
        m.style.left = `${5 + Math.random() * 90}vw`;
        m.style.top  = `${85 + Math.random() * 15}vh`;
        m.style.setProperty('--mote-dur', `${7 + Math.random() * 8}s`);
        m.style.setProperty('--mote-dx', `${(Math.random() - 0.5) * 240}px`);
        document.body.appendChild(m);
        setTimeout(() => m.remove(), 16000);
    }
    function startIdleMotes() {
        stopIdleMotes();
        moteInterval = setInterval(spawnMote, 700);
    }
    function stopIdleMotes() {
        if (moteInterval) clearInterval(moteInterval);
        moteInterval = null;
    }
    function resetIdle() {
        stopIdleMotes();
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => isNaruto() && startIdleMotes(), 30000);
    }
    function setupIdle() {
        ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt =>
            window.addEventListener(evt, resetIdle, { passive: true })
        );
        resetIdle();
    }

    /* =========================================================
       7. KONAMI → SUSANOO
       ========================================================= */
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let kSeq = [];
    function setupKonami() {
        window.addEventListener('keydown', e => {
            if (!isNaruto()) return;
            kSeq.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
            if (kSeq.length > KONAMI.length) kSeq = kSeq.slice(-KONAMI.length);
            if (kSeq.length === KONAMI.length && kSeq.every((k, i) => k === KONAMI[i])) {
                summonSusanoo();
                kSeq = [];
            }
        });
    }
    function summonSusanoo() {
        if (document.querySelector('.naruto-susanoo')) return;
        const wrap = el('div', { className: 'naruto-susanoo' });
        wrap.innerHTML = `
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="susChakra" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stop-color="#d8b4ff"/>
              <stop offset="40%" stop-color="#9450e0"/>
              <stop offset="100%" stop-color="#4a1a8a"/>
            </linearGradient>
            <radialGradient id="susBlood" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stop-color="#ff5a5a"/>
              <stop offset="50%" stop-color="#c01c1c"/>
              <stop offset="100%" stop-color="#5a0a0a"/>
            </radialGradient>
            <radialGradient id="susFar" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stop-color="rgba(180, 120, 240, 0.5)"/>
              <stop offset="55%" stop-color="rgba(138, 61, 214, 0.18)"/>
              <stop offset="100%" stop-color="rgba(15,8,28,0)"/>
            </radialGradient>
          </defs>

          <!-- Big chakra halo glow -->
          <circle cx="400" cy="400" r="400" fill="url(#susFar)"/>

          <!-- ===== Susanoo silhouette: stylized samurai standing, with crossed katanas ===== -->
          <!-- Outer chakra flame body (single bold silhouette) -->
          <g fill="rgba(74, 26, 138, 0.42)" stroke="url(#susChakra)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
            <!-- Full body silhouette as one bold shape: tengu samurai with wide pauldrons -->
            <path d="
              M 400 80
              L 320 130 L 280 150
              L 230 220 L 215 290
              L 175 320 L 155 380 L 195 420 L 240 410
              L 240 480 L 215 590 L 205 720
              L 280 730 L 320 690 L 340 600 L 350 530
              L 400 530
              L 450 530 L 460 600 L 480 690 L 520 730 L 595 720
              L 585 590 L 560 480 L 560 410
              L 605 420 L 645 380 L 625 320 L 585 290
              L 570 220 L 520 150 L 480 130 Z
            "/>
            <!-- Inner chakra veins (subtle definition) -->
            <path d="M 400 200 L 400 530" stroke-width="1.5" fill="none" opacity="0.4"/>
            <path d="M 280 380 L 520 380" stroke-width="1.5" fill="none" opacity="0.4"/>
          </g>

          <!-- ===== HEAD: Madara Mangekyō Sharingan as the eye/face ===== -->
          <!-- Skull/face circle (the "head" is dominated by his eye) -->
          <circle cx="400" cy="270" r="105" fill="rgba(20, 8, 38, 0.95)" stroke="url(#susChakra)" stroke-width="3.5"/>

          <!-- THE MANGEKYŌ SHARINGAN — Madara's specific pattern: three converging diamond/comma shapes -->
          <circle cx="400" cy="270" r="90" fill="url(#susBlood)"/>
          <!-- Outer blood iris ring -->
          <circle cx="400" cy="270" r="86" fill="none" stroke="#3a0606" stroke-width="3"/>

          <!-- Madara's Mangekyō pattern: 3-bladed pinwheel of curved diamond shapes converging at center -->
          <g fill="#0a0204" stroke="#0a0204" stroke-width="2" stroke-linejoin="round">
            <g transform="translate(400 270)">
              <g transform="rotate(0)">
                <path d="M 0 -10 L 22 -60 L 60 -50 L 18 -8 Z"/>
              </g>
              <g transform="rotate(120)">
                <path d="M 0 -10 L 22 -60 L 60 -50 L 18 -8 Z"/>
              </g>
              <g transform="rotate(240)">
                <path d="M 0 -10 L 22 -60 L 60 -50 L 18 -8 Z"/>
              </g>
            </g>
            <!-- Central pupil -->
            <circle cx="400" cy="270" r="9" fill="#0a0204"/>
          </g>

          <!-- Outer ring decorations around the eye (clan-disc feel) -->
          <circle cx="400" cy="270" r="108" fill="none" stroke="url(#susChakra)" stroke-width="1.5" opacity="0.7"/>

          <!-- ===== CROSSED KATANAS (Madara's signature dual swords) ===== -->
          <g stroke-linecap="round" stroke-linejoin="round">
            <!-- LEFT katana - blade up-right, hilt lower-left -->
            <!-- Blade -->
            <path d="M 240 720 L 580 320" stroke="url(#susChakra)" stroke-width="9" fill="none"/>
            <!-- Blade edge highlight -->
            <path d="M 242 718 L 582 318" stroke="rgba(255,255,255,0.7)" stroke-width="2" fill="none"/>
            <!-- Tsuba (cross guard) -->
            <path d="M 220 740 L 270 700" stroke="url(#susChakra)" stroke-width="6" fill="none"/>
            <!-- Tsuka (wrapped hilt) -->
            <path d="M 195 765 L 240 720" stroke="rgba(15, 5, 25, 0.95)" stroke-width="14" fill="none"/>
            <!-- Pommel -->
            <circle cx="192" cy="768" r="10" fill="url(#susChakra)" stroke="#0a0204" stroke-width="2"/>

            <!-- RIGHT katana - blade up-left, hilt lower-right -->
            <path d="M 560 720 L 220 320" stroke="url(#susChakra)" stroke-width="9" fill="none"/>
            <path d="M 558 718 L 218 318" stroke="rgba(255,255,255,0.7)" stroke-width="2" fill="none"/>
            <path d="M 580 740 L 530 700" stroke="url(#susChakra)" stroke-width="6" fill="none"/>
            <path d="M 605 765 L 560 720" stroke="rgba(15, 5, 25, 0.95)" stroke-width="14" fill="none"/>
            <circle cx="608" cy="768" r="10" fill="url(#susChakra)" stroke="#0a0204" stroke-width="2"/>
          </g>

          <!-- ===== GUDŌDAMA orbs (Six Paths black spheres) — floating, Madara's Sage of Six Paths form ===== -->
          <g>
            <circle cx="90"  cy="200" r="11" fill="#000" stroke="url(#susChakra)" stroke-width="2.5"/>
            <circle cx="710" cy="200" r="11" fill="#000" stroke="url(#susChakra)" stroke-width="2.5"/>
            <circle cx="55"  cy="450" r="8" fill="#000" stroke="url(#susChakra)" stroke-width="2"/>
            <circle cx="745" cy="450" r="8" fill="#000" stroke="url(#susChakra)" stroke-width="2"/>
            <circle cx="120" cy="640" r="9" fill="#000" stroke="url(#susChakra)" stroke-width="2"/>
            <circle cx="680" cy="640" r="9" fill="#000" stroke="url(#susChakra)" stroke-width="2"/>
            <circle cx="400" cy="760" r="13" fill="#000" stroke="url(#susChakra)" stroke-width="2.5"/>
          </g>

          <!-- ===== KANJI 須佐能乎 ("Susanoo") at top, dramatic ===== -->
          <g>
            <text x="400" y="55" text-anchor="middle"
                  font-family="Shippori Mincho, serif" font-size="44" font-weight="700"
                  fill="url(#susChakra)" letter-spacing="6">須佐能乎</text>
          </g>
        </svg>
        `;
        document.body.appendChild(wrap);
        setTimeout(() => wrap.remove(), 9000);
    }

    /* =========================================================
       8. TSUKUYOMI MODE (5s invert)
       ========================================================= */
    let tsuTimer = null;
    function triggerTsukuyomi() {
        if (!isNaruto()) return;
        document.body.classList.add('naruto-tsukuyomi');
        clearTimeout(tsuTimer);
        tsuTimer = setTimeout(() => document.body.classList.remove('naruto-tsukuyomi'), 5000);
    }

    /* =========================================================
       9. BYAKUGAN MODE (hold B)
       ========================================================= */
    function setupByakugan() {
        window.addEventListener('keydown', e => {
            if (!isNaruto()) return;
            if (e.key === 'b' && !e.target.closest('input, textarea')) {
                document.body.classList.toggle('naruto-byakugan');
            }
        });
    }

    /* =========================================================
       10. GENJUTSU FOCUS — toggle on after first hover
       ========================================================= */
    function setupGenjutsu() {
        let armed = false;
        document.addEventListener('mouseover', e => {
            if (!isNaruto()) return;
            if (armed) return;
            if (e.target.closest('.stat-item, .result-card, .timeline-content, .cert-card')) {
                document.body.classList.add('naruto-genjutsu-on');
                armed = true;
            }
        });
    }

    /* =========================================================
       11. LIFECYCLE
       ========================================================= */
    function activate() {
        mountKanjiStorm();
        mountChakraMist();
        mountGudodamaCluster();
        startAmbientMotes();
        makeMoonClickable();
        applyAugmentations();
        // Hand-signs play on EVERY load when entering Naruto theme
        playHandsigns();
    }
    function deactivate() {
        unmountKanjiStorm();
        unmountChakraMist();
        unmountGudodamaCluster();
        stopAmbientMotes();
        document.querySelector('.naruto-moon-hotzone')?.remove();
        document.querySelector('.naruto-handsigns')?.remove();
        document.body.classList.remove('naruto-genjutsu-on', 'naruto-tsukuyomi', 'naruto-byakugan');
        stopIdleMotes();
    }

    // Observe body class to detect theme switches
    const themeObserver = new MutationObserver(() => {
        if (isNaruto()) {
            activate();
        } else {
            deactivate();
        }
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Listen for the render event app.js dispatches
    window.addEventListener('portfolio:rendered', () => {
        if (isNaruto()) applyAugmentations();
    });

    // One-shot setups (no theme-dependence; they self-check inside)
    setupScrollObserver();
    setupRipple();
    setupIdle();
    setupKonami();
    setupByakugan();
    setupGenjutsu();

    // First-load activation
    if (isNaruto()) activate();

    // Expose for debugging / manual triggers
    window.NarutoTheme = {
        playHandsigns,
        triggerTsukuyomi,
        summonSusanoo,
        applyAugmentations,
    };
})();
