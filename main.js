'use strict';

/*
 * Decide which language to show; priorities: cookie -> browser info; Latvian -> Russian
 */

var change;

// get cookie named 'language' (if there are cookies and if it exists)
var start = document.cookie.length > 0 ? document.cookie.indexOf('language=') : -1;

if (start > -1) { // return language value from cookie
  var end;
  start = start + name.length;
  end = document.cookie.indexOf(';', start);
  end = end === -1 ? document.cookie.length : end;

  change = document.cookie.substring(start, end).split('=')[1] === 'lv'; // ture if latvian
} else { // if cookie named 'language' does not exist, get browser language information instead
  var browser = navigator.languages ? navigator.languages.join() : navigator.language ? navigator.language : 'ru';
  var lv = browser.match('lv') ? browser.match('lv').index : Infinity;
  var ru = browser.match('ru') ? browser.match('ru').index : Infinity;

  change = lv < ru; // ture if latvian
}

// if needed - redirect user to latvian page and save new language to cookie
if (change && !window.location.href.match('://leo-serviss.lv/lv')) {
  window.location.replace('https://leo-serviss.lv/lv/');
  document.cookie = 'language=lv; expires=Tue, 01 Jan 2030 01:00:00 GMT; path=/';
}

/*
 * Startup tasks
 */

function resize() { // resize map to 60% of window height
  document.getElementsByTagName('iframe')[0].style.height = window.innerHeight * 0.6 + 'px';
}

resize(); // set initial map height at startup
document.getElementById('year').innerHTML = new Date().getFullYear(); // change copyright year
window.onresize = resize; // resize map to a percent of the window height on window resize

document.getElementsByClassName('btn')[0].onclick = function () { // on language change
  // save new language value to cookie and make it "never" expire (year 2030)
  document.cookie = 'language=' + this.innerHTML.toLowerCase() + '; expires=Tue, 01 Jan 2030 01:00:00 GMT; path=/';
};
