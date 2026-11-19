// MOVR front door: "What's in MOVR today" progress panel.
// Renders entirely from one JSON config, so the public page is updated by
// swapping the file. Counts under suppress_below are never shown.
// Buttons with [data-front-door-config] switch which config is shown.

(function() {
    'use strict';

    const root = document.getElementById('front-door');
    if (!root) return;

    const STATUS = {
        live: { label: 'Live', cls: 'fd-live' },
        launch: { label: 'At launch', cls: 'fd-live' },
        planned: { label: 'Planned', cls: 'fd-planned' },
        future: { label: 'Future', cls: 'fd-future' }
    };

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const fmt = n => n.toLocaleString('en-US');

    function load(url) {
        fetch(url)
            .then(r => {
                if (!r.ok) throw new Error(`config ${r.status}`);
                return r.json();
            })
            .then(render)
            .catch(err => {
                console.error(err);
                root.innerHTML = '<p class="fd-error">The front door could not load its data.</p>';
            });
    }

    function render(cfg) {
        const min = cfg.suppress_below;
        const hidden = d => d.participants < min;
        const live = cfg.modalities.filter(m => m.status === 'live');
        const shown = cfg.diseases.filter(d => !hidden(d));
        const max = Math.max(...shown.map(d => d.participants));
        const hasCoverage = cfg.diseases.some(d => d.coverage);
        const asOf = new Date(cfg.as_of + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        const kpis = cfg.kpis || [
            { value: fmt(cfg.diseases.reduce((a, d) => a + d.participants, 0)), label: 'participants' },
            { value: String(cfg.diseases.length), label: 'diseases open' },
            { value: `${live.length} of ${cfg.modalities.length}`, label: 'types of data live' }
        ];

        const spectrum = cfg.modalities.map(m => `
            <li class="${STATUS[m.status].cls}">
                <span class="fd-seg" aria-hidden="true"></span>
                <strong>${esc(m.name)}</strong>
                <small>${STATUS[m.status].label}</small>
            </li>`).join('');

        const bars = cfg.diseases.map(d => {
            const value = hidden(d) ? `Fewer than ${min}` : fmt(d.participants);
            const width = hidden(d) ? 2 : Math.max(2, 100 * d.participants / max);
            return `
                <div class="fd-bar-row">
                    <span class="fd-bar-name">${esc(d.name)}</span>
                    <span class="fd-bar-track"><span class="fd-bar${hidden(d) ? ' is-hidden' : ''}" style="width:${width}%"></span></span>
                    <span class="fd-bar-value">${value}</span>
                </div>`;
        }).join('');

        let coverage = '';
        if (hasCoverage) {
            const head = live.map(m => `<th scope="col">${esc(m.name)}</th>`).join('');
            const rows = cfg.diseases.map(d => `
                <tr>
                    <th scope="row">${esc(d.name)}</th>
                    ${live.map(m => hidden(d)
                        ? `<td class="fd-cell is-hidden">n&lt;${min}</td>`
                        : `<td class="fd-cell" style="--a:${(0.12 + 0.7 * d.coverage[m.id] / 100).toFixed(2)}">${d.coverage[m.id]}%</td>`).join('')}
                </tr>`).join('');
            coverage = `
                <div class="fd-panel">
                    <h4>What data they have</h4>
                    <p class="fd-cap">Share of each disease group with each type of data</p>
                    <div class="fd-table-wrap">
                        <table class="fd-table">
                            <thead><tr><th scope="col">Disease</th>${head}</tr></thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                </div>`;
        }

        root.innerHTML = `
            ${cfg.sample ? '<div class="fd-sample" role="note"><strong>Sample data.</strong> These are not real MOVR numbers. They show how the page will look about six months after launch.</div>' : ''}
            <div class="fd-hero">
                <div>
                    <h3>${esc(cfg.title)}</h3>
                    <p>Updated ${asOf}. ${cfg.intro ? esc(cfg.intro) + ' ' : ''}Counts only. Groups smaller than ${min} are hidden so no one can be identified.</p>
                </div>
                <ol class="fd-spectrum">${spectrum}</ol>
            </div>
            <div class="fd-kpis">${kpis.map(k => `<div><span class="fd-kpi">${esc(k.value)}</span><span class="fd-kpi-label">${esc(k.label)}</span></div>`).join('')}</div>
            <div class="fd-grid${hasCoverage ? '' : ' is-single'}">
                <div class="fd-panel">
                    <h4>${esc(cfg.bars_title || 'Participants by disease')}</h4>
                    <div class="fd-bars">${bars}</div>
                </div>${coverage}
            </div>
            ${cfg.footnote ? `<p class="fd-footnote">${esc(cfg.footnote)}</p>` : ''}
            <details class="fd-config">
                <summary>See the config file behind this view</summary>
                <pre><code>${esc(JSON.stringify(cfg, null, 2))}</code></pre>
            </details>`;
    }

    document.querySelectorAll('[data-front-door-config]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-front-door-config]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
            load(btn.dataset.frontDoorConfig);
        });
    });

    load(root.dataset.config);
})();
