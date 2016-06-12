# St. Joseph's Cowper Website Redesign.

This project was set up using [Yeoman](http://yeoman.io/) (a web frontend project generator) and their [webapp starter package](https://github.com/yeoman/generator-webapp#readme). It uses npm and bower for package management and gulp to streamline processes.

## Getting started

This assumes a working knowledge of git, node, npm, and gulp.

1. `git clone https://github.com/AKNiS/stjosephs.git`
2. `cd stjosephs`
3. `npm install`
4. `bower install`
5. `gulp serve`
6. The browser should open the website!

## Gulp tasks

Gulp is quite the workhorse in this build. In addition to compiling SASS and minifying Javascript, it also pulls in vendor/package files from bower/npm and either serves them directly during development or combines and minifies them for production.

Example:
```
<!-- build:css styles/vendor.css -->
<!-- bower:css -->
<link rel="stylesheet" href="/bower_components/normalize-css/normalize.css">
<link rel="stylesheet" href="styles/skeleton.css">
<!-- endbower -->
<!-- endbuild -->

<!-- build:css styles/main.css -->
<link rel="stylesheet" href="styles/main.css">
<!-- endbuild -->

<!-- build:js scripts/vendor/modernizr.js -->
<script src="/bower_components/modernizr/modernizr.js"></script>
<!-- endbuild -->
```

### `gulp` or `gulp build`

Compile and minify the project for publishing/distribution. Results can be found in the `dist` folder.

### `gulp serve`

Compile the project and set up a local webserver with browsersync to view the project. While active, this task watches for file changes and will re-compile the project and reload the web browser to make development fast and easy.

### `gulp test`

May not be very relevant for this project. Runs Javascript unit and end-to-end tests defined in the `test` folder.

## Bower

Bower is used to manage front end packages. Packages in use (found in `bower.json`):

```
"modernizr": "~2.8.1",
"normalize-css": "normalize.css#^4.1.1",
"Skeleton-Sass": "skeleton-scss#*"
```

- **[Modernizr](https://modernizr.com)** is a css & js library which enables detailed web browser feature detection. Instead of writing CSS/JS hacks to make certain browsers function in a certain way, apply styles/functions on a feature-by-feature basis
- **[Normalize.css](https://necolas.github.io/normalize.css/)** is the modern CSS reset - render elements consistently in all browsers
- **[Skeleton](http://getskeleton.com/)** is an ultra-lightweight UI framework - most notably structural elements like grids & media queries in under 400 lines of unminified CSS

