import { dumpToPage, getPageProp } from './helpers.js';

// https://www.mediawiki.org/wiki/API:Images

getPageProp().then(dumpToPage);
getPageProp("File:03 ALBERT EINSTEIN.ogg", 'imageinfo').then(dumpToPage);
