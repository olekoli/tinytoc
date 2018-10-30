# tinytoc
A very simple Table of Contents Generator written in TypeScript. tinytoc generates a table of contents based on h tags (h1, ... ,h6) on the website. Table of contents is ceated by appending a list of items to a specified div on the page. A list can be both ordered and unordered. tinytoc by default creats links to the headings as well. Table of contents is unstyled and its up to the user to make style decisions. 

## Instalation 

    npm install tinytoc

## Usage

First create import tinytoc into the project

```javascript
import TinyToc from 'tinytoc'
```
then create a new instance of TinyToc

```javascript
const contentSelector = "#content"
const targetSelector = "#toc"
const toc = TinyToc(contentSelector, targetSelector, {})
```

and finally call generate function which would append Table of Contents to specified div 

```javascript
toc.generate()
```

## Configuration and options
tinytoc requires only 2 things to be specified - tocSource (a string with a selector for element which holds content with headings) and tocTarget (a string with a selector for element which should contain the table of contents)
tinytoc also accepts a third argument - an optional object holding additional options.

### Arguments

Argument | Type | Required | Default Value | Postion | Explanation 
---------|------|----------|---------------|---------|------------
tocSource | string | true | null | 0 | A selector for element which contains headings. Can be any valid JavaScript querySelector. For example for `<div id="blog-post"></div>` proper selector would be "#blog-post" 
tocTarget | string | true | null | 1 | A selector for element should contain table of contents. Can be any valid JavaScript querySelector. For example for `<div id="blog-toc"></div>` proper selector would be "#blog-toc"
options | object | true | null | 2 | An object containing addition optionions specified in the table bellow.  None of the options are required, however passing an empty object is required. 

### Additional options

Argument | Type | Required | Default Value | Explanation
---------|------|----------|---------------|------------
tags | Array of strings | false | ['h2', 'h3', 'h4', 'h5', 'h6'] | An array of tag names which specifies which tags should be selected for table of contents. By default selects all headings except h1
listType | string | false | "ul" | Specifies which type of list to create, can be either "ul" or "ol"
linkItems | boolean | false | true | Specifies whether to create links to related headings in table of contents

### Example with additional settings
```javascript
import TinyToc from 'tinytoc'
const toc = TinyToc("#blog-post", "#blog-toc", {
    tags: ["h3", "h4"],
    linkType: "ol",
    linkItems: false
})
toc.generate()
```