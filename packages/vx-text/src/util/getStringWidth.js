import memoize from 'lodash/memoize';

const MEASUREMENT_ELEMENT_ID = '__react_svg_text_measurement_id';

function getStringWidth(str, style) {
  try {
    // Calculate length of each word to be used to determine number of words per line
    let textEl = document.getElementById(MEASUREMENT_ELEMENT_ID);
    if (!textEl) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.width = 0;
      svg.style.height = 0;
      textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textEl.setAttribute('id', MEASUREMENT_ELEMENT_ID);
      svg.appendChild(textEl);
      document.body.appendChild(svg);
    }

    Object.assign(textEl.style, style);
    textEl.textContent = str;
    return textEl.getComputedTextLength();
  } catch (e) {
    return null;
  }
}

export default memoize(getStringWidth, (str, style) => `${str}_${JSON.stringify(style)}`);
