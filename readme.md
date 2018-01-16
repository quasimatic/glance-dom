# Glance DOM

Glance is a simple way to reference elements in the DOM. It’s intention and hope is to keep you from needing to look at the DOM in order to gain a handle to an element. However, if you do inspect the DOM (for example to grab a class or an id off of an element) then referencing elements by classes and id’s are supported too. 

To best understand how it works, experimenting with it goes a long way. You can learn how to read Glance by playing a game… [Come Take A Glance](http://quasimatic.org/take-a-glance/). Learn even more at [Quasimatic.org](https://quasimatic.org/glance)

## Documentation

For details on all good things that are Glance, come [read the docs](http://quasimatic.org/glance-dom).


### Browser

If you want to use Glance DOM in your Browser simply include it in a ```<script>``` tag on your page as shown below and then use it as shown below in example-script.js

```javascript
<html>
  <body>
    <script src="http://quasimatic.org/glance-dom/dist/glance-dom.js" type="text/javascript"></script>
    <script src="example-script.js" type="text/javascript"></script>
  </body>
</html>
```

And then in your ```example-script.js``` file you can find the element that contains "click me" by executing the following:

```javascript
var element = glanceDOM("click me");
```

### Node

```shell
npm install glance-dom
```

#### Example
script.js
```javascript
var glanceDOM = require("glance-dom").default;
var element = glanceDOM("click me");
```
