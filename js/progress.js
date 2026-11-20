// MOVR progress page. Renders progress.html from data/progress.json so the
// page is updated by editing one file. Percentages are computed here from
// the counts, never typed in, so they always match.

(function() {
    'use strict';

    const root = document.getElementById('progress');
    if (!root) return;

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const fmt = n => n.toLocaleString('en-US');
    const date = d => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const STATUS = { done: ['Done', 'pill-live'], now: ['In progress', 'pill-soon'], next: ['Next', 'pill-closed'] };

    fetch(root.dataset.config)
        .then(r => {
            if (!r.ok) throw new Error(`config ${r.status}`);
            return r.json();
        })
        .then(render)
        .catch(err => {
            console.error(err);
            root.innerHTML = '<p class="fd-error">Progress figures could not load. Email mdamovr@mdausa.org for the latest.</p>';
        });

    const stats = list => `<div class="stat-strip">${list.map(s => `
        <div>
            <div class="value">${typeof s.value === 'number' ? fmt(s.value) : esc(s.value)}</div>
            <div class="label">${esc(s.label)}</div>
            ${s.detail ? `<div class="base">${esc(s.detail)}</div>` : ''}
        </div>`).join('')}</div>`;

    const cards = (list, cls) => `<div class="${cls}">${list.map(c => `
        <div class="card">
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.text)}</p>
        </div>`).join('')}</div>`;

    function render(cfg) {
        document.querySelectorAll('[data-updated]').forEach(el => { el.textContent = date(cfg.updated); });

        const m1 = cfg.movr1;
        const total = m1.by_disease.reduce((a, d) => a + d.count, 0);
        const max = Math.max(...m1.by_disease.map(d => d.count));
        const bars = m1.by_disease.map(d => `
            <div class="fd-bar-row">
                <span class="fd-bar-name">${esc(d.name)}</span>
                <span class="fd-bar-track"><span class="fd-bar" style="width:${Math.max(1.5, 100 * d.count / max)}%"></span></span>
                <span class="fd-bar-value">${fmt(d.count)} <span class="muted">· ${(100 * d.count / total).toFixed(1)}%</span></span>
            </div>`).join('');

        const milestones = cfg.milestones.map(m => `
            <li class="progress-step is-${m.status}">
                <div class="progress-when">${esc(m.when)}</div>
                <div>
                    <h3>${esc(m.title)} <span class="pill ${STATUS[m.status][1]}">${STATUS[m.status][0]}</span></h3>
                    <p>${esc(m.text)}</p>
                </div>
            </li>`).join('');

        root.innerHTML = `
            <section class="progress-block" aria-labelledby="pg-status">
                <h2 id="pg-status">Milestones</h2>
                <ol class="progress-steps">${milestones}</ol>
            </section>

            <section class="progress-block" aria-labelledby="pg-pilot">
                <h2 id="pg-pilot">${esc(cfg.pilot.title)}</h2>
                <p class="progress-intro">${esc(cfg.pilot.intro)}</p>
                ${stats(cfg.pilot.stats)}
                <h3 class="progress-sub">${esc(cfg.pilot.steps_title)}</h3>
                ${cards(cfg.pilot.steps, 'grid-4 howto journey')}
                <h3 class="progress-sub">${esc(cfg.pilot.groups_title)}</h3>
                <p class="progress-intro">${esc(cfg.pilot.groups_intro)}</p>
                ${cards(cfg.pilot.groups, 'grid-3')}
                <p class="progress-source" style="margin-top: var(--space-4);">What the pilot taught us is on the <a href="movr2.html#pilot">MOVR 2.0 page</a>.</p>
                <p class="progress-source"><strong>Population:</strong> ${esc(cfg.pilot.population)}. <strong>Source:</strong> ${esc(cfg.pilot.source)}.</p>
            </section>

            <section class="progress-block" aria-labelledby="pg-movr1">
                <h2 id="pg-movr1">${esc(m1.title)}</h2>
                ${stats(m1.stats)}
                <h3 class="progress-sub">Participants by disease</h3>
                <div class="fd-bars progress-bars">${bars}</div>
                <p class="progress-source">
                    <strong>Population:</strong> ${esc(m1.population)}. Percentages are of ${fmt(total)} participants.
                    <strong>Data through:</strong> ${date(m1.data_through)} (enrollment).
                    <strong>Computed:</strong> ${date(m1.computed)}.
                    <strong>Source:</strong> <a href="${esc(m1.source_url)}" target="_blank" rel="noopener">${esc(m1.source)}</a>.
                </p>
            </section>`;
    }
})();
