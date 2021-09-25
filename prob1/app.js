import { dumpToPage, getPageProp } from './helpers.js';

// https://www.mediawiki.org/wiki/API:Images

function pluck(arr = [''], prop) {
  return arr.map(e => e[prop] || `missing ${prop} info`);
}

async function process(page) {
  dumpToPage('clear', page);

  let images = await getPageProp(page, 'images');
  let list = pluck(images, 'title');

  for (let i = 0; i < list.length; i++) {
    dumpToPage(i, '')

    let image = list[i];
    let info = await getPageProp(image, 'imageinfo');
    let user = pluck(info, 'user')[0];

    list[i] = {
      image, user
    };
  }

  dumpToPage(list)
}

const form = document.querySelector('#search');
const title = document.querySelector('#title');

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  process(title.value);
});

process('New Jersey');
