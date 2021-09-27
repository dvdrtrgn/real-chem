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


function pluck(arr = [''], prop) {
  return arr.map(e => e[prop] || `missing ${prop} info`);
}

function pluckUsers(pages) {
  const list = Object.values(pages);
  let users = pluck(list, 'imageinfo');

  users = pluck(users, '0');
  users = pluck(users, 'user');

  return users;
}

function getPrimaryPage(pages) {
  return Object.values(pages)[0];
}

export async function process(pageName) {
  const page = await getPageProp(pageName, 'images');
  const images = getPrimaryPage(page)['images'];
  const titleList = pluck(images, 'title');
  const titlesWad = encodeURIComponent(titleList.join('|'));

  const imageinfo = await getPageProp(titlesWad, 'imageinfo');
  const users = pluckUsers(imageinfo)

  return titleList.map((image, i) => {
    const user = users[i];
    return { image, user };
  });
}
