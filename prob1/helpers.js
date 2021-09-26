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

export function getPages(obj) {
  return obj.query.pages;
}

export async function getPageProp(titles, prop) {
  let url = 'https://en.wikipedia.org/w/api.php?origin=*';
  const params = {
    action: 'query',
    format: 'json',
    imlimit: 50,
    prop,
    titles,
  };

  Object.keys(params).forEach(key => url += `&${key}=${params[key]}`);

  return await fetch(url)
    .then(response => response.json())
    .then(function (response) {
      return getPages(response);
    })
    .catch(console.error);
}
