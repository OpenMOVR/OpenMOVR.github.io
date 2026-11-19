// MOVR 2.0 front door: "What's in MOVR today" progress panel.
// Renders entirely from one JSON config (data-config on #front-door), so the
// public page can be updated by swapping the file. Counts under
// suppress_below are never shown.

(function() {
    'use strict';

    const root = document.getElementById('front-door');
    if (!root) return;

    const STATUS = {
        live: { label: 'At launch', cls: 'fd-live' },
        planned: { label: 'Planned', cls: 'fd-planned' },
        future: { label: 'Future', cls: 'fd-future' }
    };

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const fmt = n => n.toLocaleString('en-US');

    fetch(root.dataset.config)
        .then(r => {
            if (!r.ok) throw new Error(`config ${r.status}`);
            return r.json();
        })
        .then(render)
        .catch(err => {
            console.error(err);
            root.innerHTML = '<p class="fd-error">The preview could not load its data.</p>';
        });

    function render(cfg) {
        const min = cfg.suppress_below;
        const hidden = d => d.participants < min;
        const live = cfg.modalities.filter(m => m.status === 'live');
        const shown = cfg.diseases.filter(d => !hidden(d));
        const total = cfg.diseases.reduce((a, d) => a + d.participants, 0);
        const max = Math.max(...shown.map(d => d.participants));
        const asOf = new Date(cfg.as_of + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        const spectrum = cfg.modalities.map(m => `
            <li class="${STATUS[m.status].cls}">
                <span class="fd-seg" aria-hidden="true"></span>
                <strong>${esc(m.name)}</strong>
                <small>${STATUS[m.status].label}</small>
            </li>`).join('');

        const bars = cfg.diseases.map(d => {
            const value = hidden(d) ? `Fewer than ${min}` : fmt(d.participants);
            const width = hidden(d) ? 2 : Math.max(3, 100 * d.participants / max);
            return `
                <div class="fd-bar-row">
                    <span class="fd-bar-name">${esc(d.name)}</span>
                    <span class="fd-bar-track"><span class="fd-bar${hidden(d) ? ' is-hidden' : ''}" style="width:${width}%"></span></span>
                    <span class="fd-bar-value">${value}</span>
                </div>`;
        }).join('');

        const head = live.map(m => `<th scope="col">${esc(m.name)}</th>`).join('');
        const rows = cfg.diseases.map(d => `
            <tr>
                <th scope="row">${esc(d.name)}</th>
                ${live.map(m => hidden(d)
                    ? `<td class="fd-cell is-hidden">n&lt;${min}</td>`
                    : `<td class="fd-cell" style="--a:${(0.12 + 0.7 * d.coverage[m.id] / 100).toFixed(2)}">${d.coverage[m.id]}%</td>`).join('')}
            </tr>`).join('');

        root.innerHTML = `
            ${cfg.sample ? '<div class="fd-sample" role="note"><strong>Sample data.</strong> These are not real MOVR numbers. They show how the page will look about six months after launch.</div>' : ''}
            <div class="fd-hero">
                <div>
                    <h3>What's in MOVR today</h3>
                    <p>Updated ${asOf}. Counts only. Groups smaller than ${min} are hidden so no one can be identified.</p>
                </div>
                <ol class="fd-spectrum">${spectrum}</ol>
            </div>
            <div class="fd-kpis">
                <div><span class="fd-kpi">${fmt(total)}</span><span class="fd-kpi-label">participants</span></div>
                <div><span class="fd-kpi">${cfg.diseases.length}</span><span class="fd-kpi-label">diseases open</span></div>
                <div><span class="fd-kpi">${live.length} of ${cfg.modalities.length}</span><span class="fd-kpi-label">types of data live</span></div>
            </div>
            <div class="fd-grid">
                <div class="fd-panel">
                    <h4>Participants by disease</h4>
                    <div class="fd-bars">${bars}</div>
                </div>
                <div class="fd-panel">
                    <h4>What data they have</h4>
                    <p class="fd-cap">Share of each disease group with each type of data</p>
                    <div class="fd-table-wrap">
                        <table class="fd-table">
                            <thead><tr><th scope="col">Disease</th>${head}</tr></thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            <details class="fd-config">
                <summary>See the config file behind this page</summary>
                <pre><code>${esc(JSON.stringify(cfg, null, 2))}</code></pre>
            </details>`;
    }
})();
