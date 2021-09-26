import { dumpToPage, getPageProp } from './helpers.js';

// https://www.mediawiki.org/wiki/API:Images

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

async function process(pageName) {
  dumpToPage('clear', pageName);

  const page = await getPageProp(pageName, 'images');
  const images = getPrimaryPage(page)['images'];
  const titleList = pluck(images, 'title');
  const titlesWad = encodeURIComponent(titleList.join('|'));
  const imageinfo = await getPageProp(titlesWad, 'imageinfo');
  const users = pluckUsers(imageinfo)

  dumpToPage(titleList.map((image, i) => {
    const user = users[i];
    return {
      image: `<a href=https://en.wikipedia.org/wiki/${encodeURI(image)}>${image}</a>`,
      user: `<a href=https://en.wikipedia.org/wiki/User:${encodeURI(user)}>${user}</a>`,
    };
  }))
}

const form = document.querySelector('#search');
const title = document.querySelector('#title');

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  process(title.value);
});

process('New Jersey');
