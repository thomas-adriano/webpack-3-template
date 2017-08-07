# Getting started
To start using this template project, follow this instructions:
* Install [Yarn](https://yarnpkg.com/pt-BR/);
* Clone this template with ```git clone https://github.com/thomas-adriano/webpack-3-template```;
* Rename the repo's root folder and the package.json ```name``` property to your preference;
* Configure global project properties, like ```app title``` and ```build path```, throught the ```project.configs.js``` file.

# Features
## Cache ready
* All assets used (like images, js and css files) are minified, compressed and have the name changed to its content hash;
* Thirdparty code (provenient from sources other than this project) separated from application code in final build files;
* Offline working with Service Workers.

## Separated build profiles
* Development profile with fast build time and hot reloading;
* Production profile fully optimized to caching and offline work;

## Unit tests
* Tests with [Karma](https://karma-runner.github.io/1.0/index.html) and [Jasmine](https://jasmine.github.io/)

## Developer friendly environment
* Full ES6 + async/await support throught [Babel](https://babeljs.io/);
* Supports [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), [SASS](http://sass-lang.com/) and [LESS](http://lesscss.org/);
* Supports the latest CSS features throught [CSSNext](http://cssnext.io/) and [Postcss](http://postcss.org/);
* JS linting throught [JSHint](http://jshint.com/);
