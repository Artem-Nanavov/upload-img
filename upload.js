import createElem from './utils/createElem';
import formatBytes from './utils/formatBytes';
import sliceStr from './utils/sliceStr';

export const upload = (selector, options = {}) => {
  let files = [];
  const input = document.querySelector(selector);

  const preview = createElem('div', ['preview']);
  const open = createElem('button', ['btn'], 'Открыть');

  input.insertAdjacentElement('afterend', preview);
  input.insertAdjacentElement('afterend', open);

  if (options.multi) {
    input.setAttribute('multiple', true);
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','));
  }

  const triggerInput = () => input.click();

  const changeHandler = e => {
    if (e.target.files.length === 0) return;

    files = Array.from(e.target.files);

    preview.innerHTML = '';

    files.forEach(file => {
      if (!file.type.match('image')) return;

      const reader = new FileReader();

      reader.onload = e => {
        const src = e.target.result;
        const fileName = sliceStr(file.name, 15);
        const fileSize = formatBytes(file.size);

        preview.insertAdjacentHTML('afterbegin', `
          <div class="preview-image">
            <div class="preview-remove" data-name="${ file.name }">&times;</div>

            <img src="${src}" alt="${file.name}"/>

            <div class="preview-info">
              <span>${fileName}</span>

              ${fileSize}
            </div>
          </div>
        `)
      };

      reader.readAsDataURL(file);
    });
  }

  const removeHandler = e => {
    if (!e.target.dataset.name) return;

    const {name} = e.target.dataset;
    files = files.filter(file => file.name !== name);

    const block = preview
      .querySelector(`[data-name="${name}"]`)
      .closest('.preview-image');

    block.classList.add('removing');
    setTimeout(() => block.remove(), 200);
  };

  open.addEventListener('click', triggerInput);
  input.addEventListener('change', changeHandler);
  preview.addEventListener('click', removeHandler);
};
