# swig-plugin

A [swig](http://node-swig.github.io/swig-templates/) plugin for [webpack](http://webpack.github.io/) to keep markup code DRY by rendering static html files from your swig sources.


## Installation

Install the plugin with npm or yarn:
```shell
$ yarn add swig-plugin --dev
```


## Basic Usage

The plugin will use your source templates to generate HTML files to your output path. Just add the plugin to your webpack config as follows:

```javascript
var SwigPlugin = require('swig-plugin')
var webpackConfig = {
  entry: 'src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: '[name].js'
  },
  plugins: [
    new SwigPlugin('src/views/*.html')
  ]
}
```

This will look in your `src/views` folder for any swig template files and render them to the output path.

## Configuration

- `outputPath`: a custom output folder relative to webpack's output path.
- `data`: Any data you want to pass to your swig templates. It will be available as {{foo}} in your templates.

Here's an example webpack config illustrating how to use these options:
```javascript
{
  ...

  plugins: [
    new SwigPlugin('src/*.html', {
      data: {
        foo: 'bar'
      },
      outputPath: '../'
    })
  ]
}
```

## Multiple Customised HTML Files

To pass unique data to each template, you can register more than one plugin:
```javascript
{
  ...
  plugins: [
    new SwigPlugin('test.html' { data:{ color: '#999', title: 'Test page' } }),
    new SwigPlugin('about.html' { data:{ color: '#CCC', title: 'About page' } }),
  ]
}
```

## Sample Folder Structure and Templates

```
project/
+-- src/
|   +-- views/
|       +-- help.html
|       +-- about.html 
|       +-- layouts/ 
|           +-- public.html 
|           +-- admin.html 
|       +-- snippets/ 
|           +-- nav.html 
|           +-- footer.html
+-- dist/
```


```html
<!-- src/views/layouts/public.html -->
<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}layout{% endblock %}</title>
</head>
<body>
{% block content %}{% endblock %}
</body>
</html>
```


```html
<!-- src/views/about.html -->
{% extends "layouts/public.html" %}

{% block title %}About us{% endblock %}

{% block content %}
<h2>About</h2>
<p>A variable that was passed in: {{ foo }}</p>
{% include "snippets/footer.html" %}
{% endblock %}
```
