# Standard Interface Build
> NOTE: This file structure can be pulled from the base theme directory for other projects, but the basic file structure should remain the same.

___

### Build

The standard build system for all projects is webpack for JavaScript and Gulp for everything else.

###### Watch
To run a **watch** task over the theme source files, instead run:

```sh
$ npm start
```
> NOTE: Remember to cancel your watch task when committing or pulling changes.

###### Build (development)
To **build** your development files, simply run this from the root theme directory:

```sh
$ npm run build
```

###### Build (production)
To **build** your production files, simply run this from the root theme directory:

```sh
$ npm run prod
```


### Modernizr
A default Modernizr config is `modernizr-config.json`. Add any additional tests to the *feature-detects* array in this file (or browse to the url in the `modernizr.js` file and add your tests from the Modernizr Download Builder). Then run the following command from the theme directory:

```sh
$ modernizr -c modernizr-config.json -d js/head/
```


### Dependancies

The `package.json` file holds all bottomline dependancies for the IF standard build. It is up to the Interface Developer initiating the project to update and manage the versions of these dependancies. The reason these have not been set to require the latest version of each one is that many have a 'PeerDependancy' relationship, and updating these independantly can create havoc in your build system. The best place to start is somewhere that works, and build from there, which also means that this needs to be revisited regularly.

___

### CSS

Both production and source files compile to the same folder within the themes directory, `/css/style.css`
What this means is that you don't need to define different paths in your template to delegate your source and production build to, because they both build to the same file.

> NOTE: While making global changes within core is recommended, each new `less` module requires its own file within `/css/less/modules/`

> WARNING: It is **essential** to run a build task *before* deploying to a live environment, as `live` and `dev` environments both read the same file.


### Javascript

___

### Icons

To build your icon font kit, simply run this from your root directory:
```sh
$ gulp iconfont
```

Icon fonts are automatically generated from any `*.svg` nested within `/fonts/icons/glyphs/` and build to `/fonts/icons/`. The `icons.less` file is automatically generated and **should not be edited** as it is cleaned and regenerated with each icon build. If you wish to make a change to the way that the icon font file is generated, there is a base template to edit: `/css/templates/icons.less`.

___

### Style Guide

To generate the style guide, `cd` to the root of the **project** and run:

```
hologram
```
