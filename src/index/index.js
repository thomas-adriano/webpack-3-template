'use-strict';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';

import 'index/index.css';
import core from 'core/core.js';
const Globalize = require('globalize');
core.initializeWebApp();

import img from 'images/landing.jpg';
// import page1 from 'test-pages/page-1.html';

const imgEl = $('#landing-img');
const i18nMsgEl = $('#i18n-msg');
const btnContent1 = $('#btn-content1');
const btnContent2 = $('#btn-content2');
const btnContent3 = $('#btn-content3');
const btnContent4 = $('#btn-content4');

imgEl.attr('src', img);

i18nMsgEl.text(Globalize.messageFormatter('msg-1'));

btnContent1.click(() => {
    //this import could be a normal js file import, loading a full graph o dependencies
    /* jshint ignore:start */
    import ('../../assets/images/page-1.jpg').then(content1Img => {
        let content1 = $('#content1');
        content1.css({ 'display': 'block' });
        content1.attr('src', content1Img);
    });
    /* jshint ignore:end */
});

btnContent2.click(() => {
    //this import could be a normal js file import, loading a full graph o dependencies
    /* jshint ignore:start */
    import ('../../assets/images/page-2.jpg').then(content2Img => {
        let content2 = $('#content2');
        content2.css({ 'display': 'block' });
        content2.attr('src', content2Img);
    });
    /* jshint ignore:end */
});

btnContent3.click(() => {
    //this import could be a normal js file import, loading a full graph o dependencies
    /* jshint ignore:start */
    import ('../../assets/images/page-3.png').then(content3Img => {
        let content3 = $('#content3');
        content3.css({ 'display': 'block' });
        content3.attr('src', content3Img);
    });
    /* jshint ignore:end */
});

btnContent4.click(() => {
    /* jshint ignore:start */
    import ('core/404.html').then(_404 => {
        console.log(_404);
        document.body.innerHTML = _404;
    });
    /* jshint ignore:end */
});

console.log('index.js loaded.');