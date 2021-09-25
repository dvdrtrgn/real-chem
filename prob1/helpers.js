const DUMP = document.querySelector('#dump');

export function dumpToPage(obj, div = '<br>') {
  if (obj === 'clear') {
    DUMP.innerHTML = '';
    obj = '... searching ...';
  }

  const str = JSON.stringify(obj, null, 2);
  const out = typeof obj === 'string' ? obj : str;
  DUMP.innerHTML += div + out;
}

export function getPrimaryPage(obj) {
  const pages = obj.query.pages;
  return pages[Object.keys(pages)[0]];
}

export async function getPageProp(titles, prop) {
  let url = "https://en.wikipedia.org/w/api.php?";
  const params = {
    origin: '*',
    action: 'query',
    format: 'json',
    imlimit: 99,
    prop,
    titles,
  };

  Object.keys(params).forEach(key => url += `&${key}=${params[key]}`);

  return await fetch(url)
    .then(response => response.json())
    .then(function (response) {
      return getPrimaryPage(response)[prop];
    })
    .catch(console.error);
}
