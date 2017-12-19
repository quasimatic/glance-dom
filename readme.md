# Glance DOM

Glance is a simple way to reference elements in the DOM. It’s intention and hope is to keep you from needing to look at the DOM in order to gain a handle to an element. However, if you do inspect the DOM (for example to grab a class or an id off of an element) then referencing elements by classes and id’s are supported too. 

To best understand how it works, experimenting with it goes a long way. You can learn how to read Glance by playing a game… [Come Take A Glance](http://quasimatic.org/take-a-glance/). Learn even more at [Quasimatic.org](https://quasimatic.org/glance)

## Documentation

For details on all good things that are Glance, come [read the docs](http://quasimatic.org/glance-dom).



## Installing

### Browser
```javascript
<script src="http://quasimatic.org/glance-dom/dist/glance-dom.js"></script>
```

#### Example
script.js
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


------------
### Options:
------------

These options are added to end of a Glance label to allow us to change how the object is found or filtered


<dl>
  <dt>#attribute-&lt;attribute name&gt;</dt>
  <dd>limit the search to the specified attribute name<br><br>
  Example Code: https://codepen.io/quasimatic/pen/zwQVEL
  </dd>
  <dt>#class</dt>
  <dd>limit the selector to class attribute<br><br>
  Example Code: https://codepen.io/quasimatic/pen/OmebeK
  </dd>
  <dt>#closest</dt>
  <dd>visibly closest element to the scope<br><br>
  Example Code: https://codepen.io/quasimatic/pen/YVoEYo
  </dd>
  <dt>#contains-text</dt>
  <dd>selector given can be part of a longer text string<br><br>
  Example Code: https://codepen.io/quasimatic/pen/bWPwjK
  </dd>
  <dt>#css</dt>
  <dd>applies selector as a css query<br><br>
  Example Code: http://codepen.io/quasimatic/pen/xdJKJP
  </dd>
  <dt>#exact-text</dt>
  <dd>find only elements that are an exact textual match<br><br>
  Example Code: https://codepen.io/quasimatic/pen/qmzVJv
  </dd>
  <dt>#hidden</dt>
  <dd>limit the search to hidden elements</dd>
  <dt>#id</dt>
  <dd>limit the search to the specified id (fastest way to search)</dd>
  <dt>#&lt;index&gt;</dt>
  <dd>return element number &lt;index&gt;<br><br>
  Example Code: https://codepen.io/quasimatic/pen/BROxEm
  </dd>
  <dt>#node-type</dt>
  <dd>look only for elements that match this node-type<br><br>
  Example Code: https://codepen.io/quasimatic/pen/rmEWQy
  </dd>
  <dt>#value</dt>
  <dd>look for the selector in the value attribute</dd>
  <dt>#visible</dt>
  <dd>default behavior - return only visible elements<br><br>
  Example Code: https://codepen.io/quasimatic/pen/MmqGGq
  </dd>
</dl>
