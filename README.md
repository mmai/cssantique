# CSSAntique

A javascript library to emulate old browsers CSS support

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Work in progress

## Installation

```sh
npm install cssantique
```

## In browser usage 

```html
    <script src="cssantique-browser.js"></script>
    <script>
      var params = {
        browser: {name: 'Firefox', version: '3'}
      }
      CSSAntique.filterStyles(params, function(res){
        console.log(res.discarded)
      }) 
    </script>
```

## Developping in node.js with Webpack

```javascript
import { filterStyles } from 'cssantique'

filterStyles({ browser: {name: 'Firefox', version: '3'} }, function(res){
...
})
```

You need to configure json loader in webpack to load the database

```
module: {
  loaders: [
    { test: /\.json/, loader: 'json-loader' },
  ]
}
```
