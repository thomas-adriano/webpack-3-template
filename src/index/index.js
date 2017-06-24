import 'core/style-imports';
// import './index.css';

import img from 'images/landing.jpg';
// import page1 from 'test-pages/page-1.html';

const imgEl = $('#landing-img');
const btnContent1 = $('#btn-content1');
const btnContent2 = $('#btn-content2');
const btnContent3 = $('#btn-content3');

imgEl.attr('src', img);

btnContent1.click(() => {
    //this import could be a normal js file import, loading a full graph o dependencies
    import ('../../assets/images/page-1.jpg').then(content1Img => {
        let content1 = $('#content1');
        content1.css({ 'display': 'block' });
        content1.attr('src', content1Img);
    });
});

btnContent2.click(() => {
    //this import could be a normal js file import, loading a full graph o dependencies
    import ('../../assets/images/page-2.jpg').then(content2Img => {
        let content2 = $('#content2');
        content2.css({ 'display': 'block' });
        content2.attr('src', content2Img);
    });
});

btnContent3.click(() => {
    //this import could be a normal js file import, loading a full graph o dependencies
    import ('../../assets/images/page-3.png').then(content3Img => {
        let content3 = $('#content3');
        content3.css({ 'display': 'block' });
        content3.attr('src', content3Img);
    });
});

console.log('HELLOOO');