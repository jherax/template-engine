const CACHE = {};
const SPACES = /[\s\t\r\n]+/g;
const CLOSING = /((^|%>)[^\t]*)"/g;
const EQUALS = /\t=(.*?)%>/g;

const funcBody = template => [
  'function writeHtml() { p.push.apply(p, arguments) }',
  'var p = [];',
  // introduce the data as local-variable
  'with(data) {',
  'p.push("', template, '");',
  '}',
  'return p.join("");',
].join('');

/**
 * Gets a template from a HTML-string or form a URL.
 *
 * @param {String} sourceTemplate: is the template source. It could be a HTML-string or an URL
 * @returns {Function} the function will receive the data as argument in order to fill the template
 */
export default function getTemplate(sourceTemplate) {
  /* eslint newline-per-chained-call: 0 */
  const key = sourceTemplate.replace(SPACES, ' ').trim();
  if (key in CACHE) return CACHE[key];

  // Convert the template into pure JavaScript-string
  sourceTemplate = key
    .split('<%').join('\t')
    .replace(CLOSING, '$1\r')
    .replace(EQUALS, '", $1, "')
    .split('\t').join('");')
    .split('%>').join('p.push("')
    .split('\r').join('\\"');

  // Generate a reusable function that will compile the data with the template
  CACHE[key] = new Function('data', funcBody(sourceTemplate));
  return CACHE[key];
}
