export function renderEffectControls(effect) {
        const container = document.getElementById('afx-effect-controls-container');
        if (!container) return;

        // Clear existing controls
        container.innerHTML = '';

        if (!effect || !effect.controls || effect.controls.length === 0) return;

        effect.controls.forEach(control => {
            const row = document.createElement('div');
            row.className = 'afx-control-row';
            row.id = `afx-control-container-${control.id}`;

            if (control.type === 'toggle') {
                row.innerHTML = `
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${control.id}" ${control.value ? 'checked' : ''}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${control.id}">${control.label}</span>
                `;
                const input = row.querySelector('input');
                input.addEventListener('change', (e) => {
                    if (control.onChange) control.onChange(e.target.checked);
                });
            } 
            else if (control.type === 'slider') {
                row.classList.add('afx-slider-row');
                const step = control.step || 1;
                const precision = step.toString().includes('.') ? step.toString().split('.')[1].length : 0;
                row.innerHTML = `
                    <span class="afx-slider-label">${control.label}:</span>
                    <input type="range" id="afx-control-${control.id}" class="afx-range-slider" min="${control.min}" max="${control.max}" step="${step}" value="${control.value}">
                    <span id="afx-control-val-${control.id}" class="afx-slider-val-text">${control.value.toFixed(precision)}</span>
                `;
                const input = row.querySelector('input');
                const valText = row.querySelector('.afx-slider-val-text');
                input.addEventListener('input', (e) => {
                    const val = parseFloat(e.target.value);
                    valText.innerText = val.toFixed(precision);
                    if (control.onChange) control.onChange(val);
                });
            }
            else if (control.type === 'button') {
                row.style.padding = '0';
                row.innerHTML = `
                    <button id="afx-control-${control.id}" class="afx-action-btn">
                        ${control.label}
                    </button>
                `;
                const btn = row.querySelector('button');
                btn.addEventListener('click', (e) => {
                    if (control.onClick) control.onClick();
                });
            }
            else if (control.type === 'select') {
                row.style.padding = '0';
                const optionsHtml = (control.options || []).map(opt => {
                    const val = typeof opt === 'object' ? opt.value : opt;
                    const text = typeof opt === 'object' ? opt.text : opt;
                    const sel = val == control.value ? 'selected' : '';
                    return `<option value="${val}" ${sel}>${text}</option>`;
                }).join('');

                row.innerHTML = `
                    <select id="afx-control-${control.id}" class="afx-select">
                        ${optionsHtml}
                    </select>
                `;
                const select = row.querySelector('select');
                select.addEventListener('change', (e) => {
                    if (control.onChange) control.onChange(e.target.value);
                });
            }

            container.appendChild(row);
        });
}

export function setControlValue(id, value) {
        const input = document.getElementById(`afx-control-${id}`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = !!value;
            } else {
                input.value = value;
            }
        }
        const valText = document.getElementById(`afx-control-val-${id}`);
        if (valText) {
            const stepStr = input ? input.step : '';
            const precision = (stepStr && stepStr.includes('.')) ? stepStr.split('.')[1].length : 0;
            valText.innerText = typeof value === 'number' ? value.toFixed(precision || (value % 1 === 0 ? 0 : 4)) : value;
        }
}
