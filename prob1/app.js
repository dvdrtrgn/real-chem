// https://www.mediawiki.org/wiki/API:Images

function getPrimaryPage(obj) {
  const pages = obj.query.pages;

  return pages[Object.keys(pages)[0]];
}

async function getPageProp(titles = 'Albert Einstein', prop = 'images') {
  let url = "https://en.wikipedia.org/w/api.php?";

  const params = {
    origin: '*',
    action: 'query',
    format: 'json',
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

getPageProp("File:03 ALBERT EINSTEIN.ogg", 'imageinfo').then(console.log);
