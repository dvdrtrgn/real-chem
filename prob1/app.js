import { dumpToPage, getPageProp } from './helpers.js';

// https://www.mediawiki.org/wiki/API:Images

// getPageProp().then(dumpToPage);
// getPageProp("File:03 ALBERT EINSTEIN.ogg", 'imageinfo').then(dumpToPage);

function pluck(arr = [''], prop) {
  return arr.map(e => e[prop] || `missing ${prop} info`);
}

async function process() {
  let images = await getPageProp('New Jersey');
  let list = pluck(images, 'title');
  dumpToPage(list)

  for (let i = 0; i < list.length; i++) {
    let page = list[i];
    let info = await getPageProp(page, 'imageinfo');

    let user = pluck(info, 'user')[0];
    dumpToPage(user)
  }
}

process();
