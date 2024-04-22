const transformsList = require('../transforms');
const path = require('path')

module.exports = (md, options) => {
  const figureRegex = /{% figure \{([\s\S]*?)\} %}/g;

  const transforms = (url, transform) => {
    return url + (transformsList[transform] || transformsList.default)
  }

  const attrs = (obj) => {
    let str = ''
    for (const key in obj) {
      //add to the returned string, as long as a value is passed in the object:
      if (obj[key] != undefined) {str += ` ${key}="${obj[key]}"`}
    }
    return str
  }

  const img = (params) => {
    //set defaults
    if (!params.transform) {
      params.transform = 'default'
    }
    if (!params.isLocal) {
      params.isLocal = false
    }

    let src = transforms(params.url, params.transform)
    if (params.isLocal) {
      src = params.url
    }

    return `<img src="${src}" ${attrs(params.attrs)} loading="lazy" decoding="async">`
  }

  const figure = (params) => {
    return `
    <figure ${attrs({'class':params.classes})}>
      ${params.link ? '<a href="' + params.link + '">' : ''}
      ${img({
        url: params.url,
        attrs: {
          id: path.basename(params.url, path.extname(params.url)) 
        },
        transform: params.transform || 'default',
        isLocal: params.isLocal,
      })}
      ${params.link ? '</a>' : ''}
      ${figcaption(params.caption)}
    </figure>
    `
  }

  const figcaption = (caption) => {
    return caption ? `<figcaption>${caption}</figcaption>` : ''
  }

  function renderFigure(paramsStr) {
      const params = parseFigureParams(paramsStr);
      if (!params) return '';

      return figure(params);
  }

  function parseFigureParams(paramsStr) {
    const params = {};
    paramsStr.trim().split(/\r?\n/).forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Remove trailing commas
        if (value.endsWith(',')) {
          value = value.substring(0, value.length - 1).trim();
      }

        // Check for both single and double quotes at the start and end of the value string
        if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
            value = value.substring(1, value.length - 1).trim(); // Remove quotes and trim again
        }
        params[key] = value;
    });
    return params;
}


  md.core.ruler.push('custom_figures', state => {
      for (let i = 0; i < state.tokens.length; i++) {
          const token = state.tokens[i];
          if (token.type === 'inline') {
              let text = token.content;
              let newText = text.replace(figureRegex, (match, paramsStr) => {
                  return renderFigure(paramsStr);
              });
              if (newText !== text) {
                  token.content = newText;
                  // Since the content has changed, we need to re-tokenize it
                  state.md.inline.parse(newText, state.md, state.env, token.children = []);
              }
          }
      }
  });
}