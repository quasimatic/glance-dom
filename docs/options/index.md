# Options

These options are added to end of a Glance label to allow us to change how the object is found or filtered


 * [#attribute-&lt;attribute name&gt;](attribute-attributename.md)
 * [#class](class.md)
 * [#closest](closest.md)
 * [#contains-text](contains-text.md)
 * [#css](css.md)
 * [#exact-text](exact-text.md)

<dl>
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