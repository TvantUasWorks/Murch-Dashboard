/* TVANT CLIENT PORTAL — IV measurement progress
   Completes display logic without changing original electrical results or other dashboard scripts.
   'measured' is inspection coverage; 'complete' is accepted documentary closure. */
(function () {
  'use strict';
  const label = 'IV Curves';
  const e = id => document.getElementById(id);
  const number = n => Number.isInteger(n) && n >= 0;
  let latest = null;

  function ivForSelection(data, kind, selected) {
    if (!data || !Array.isArray(data.activities)) return null;
    if (kind === 'project') return data.activities.find(a => a.id === 'iv') || null;
    if (!selected) return null;
    const key = ({circuit:'circuit', inverter:'inv', zone:'zone'})[kind];
    return (data.activity_breakdown?.[key] || []).find(g => g.name === selected)?.activities?.iv || null;
  }

  function summary(iv) {
    if (!iv || !number(iv.scope) || iv.scope === 0 || !number(iv.measured) || iv.measured > iv.scope) return null;
    const complete = number(iv.complete) ? iv.complete : null;
    return { measured: iv.measured, scope: iv.scope, complete,
      measurements: number(iv.measurements) ? iv.measurements : null,
      percent: 100 * iv.measured / iv.scope };
  }

  function updateText(element, text) {
    if (element && element.textContent !== text) element.textContent = text;
  }

  function apply() {
    const scope = e('scope')?.value || 'project';
    const selected = e('selection')?.value || '';
    const iv = summary(ivForSelection(latest, scope, selected));
    const card = Array.from(document.querySelectorAll('#cards .card')).find(c => c.querySelector('.name')?.textContent.trim() === label);
    if (!card || !iv) return;
    const {measured,complete,scope:total,percent,measurements} = iv;
    const value = `${percent.toFixed(2)}%`;
    updateText(card.querySelector('.num'), value);
    const fill = card.querySelector('.track .fill');
    if (fill && fill.style.width !== `${percent}%`) {
      fill.style.width = `${percent}%`;
      fill.style.background = percent < 25 ? '#dc3545' : percent < 50 ? '#e3a23b' : percent < 75 ? '#4b98cf' : '#36ad81';
    }
    updateText(card.querySelector('.details'), 'Measurement coverage — documentary completion shown separately');
    const note = card.querySelector('.iv-note') || document.createElement('div');
    note.className = 'iv-note';
    const traces = measurements !== null ? ` · ${measurements} IV measurements` : '';
    updateText(note, `Measured: ${measured}/${total} LBD (${value})${traces} · Completed: ${complete === null ? 'Not reported' : complete + '/' + total}`);
    if (!note.parentElement) card.appendChild(note);

    for (const row of document.querySelectorAll('#pending tr')) {
      if (row.cells?.[0]?.textContent.trim() !== label || !row.cells[1]) continue;
      const pending = complete === null ? 'Not reported' : String(total-complete);
      updateText(row.cells[1], `${pending} pending completion · ${measured} LBD measured`);
    }
    const notice = e('ivCurveNotice');
    if (notice) {
      updateText(notice.querySelector('strong'), measured > 0 ? 'IV CURVES — MEASUREMENTS RECORDED' : 'IV CURVES — NOT STARTED');
      const message = measured > 0
        ? `${measured} of ${total} LBD measured${measurements !== null ? ` (${measurements} IV measurements)` : ''}; ${complete ?? 0} completed. Minimum project irradiance and technical review requirements still apply.`
        : 'IV testing has not started because the minimum project-required irradiance has not been met.';
      updateText(e('ivCurveNote'), message);
    }
  }

  // Load the same publication as the main dashboard; never change the JSON.
  document.addEventListener('DOMContentLoaded', async () => {
    const cards = e('cards');
    if (!cards) return;
    const observer = new MutationObserver(() => apply());
    observer.observe(cards, {childList:true});
    try {
      const response = await fetch('data/latest.json', {cache:'no-store'});
      if (!response.ok) return;
      latest = await response.json();
      apply();
    } catch (error) {
      console.warn('TUW IV progress data unavailable', error);
    }
  });
})();
