************
Installation
************

Installation requires ``pip``:

    pip install glance-dom

************
Usage
************

Instantiate Glance DOM using a browser driver (for example,
[WebDriver](http://www.seleniumhq.org/projects/webdriver/)).

```python

    from selenium import webdriver
    from glance_dom import GlanceDom

    def test_glance():
        driver = webdriver.Firefox()
        driver.get('http://quasimatic.org/glance')

        # Using the old way
        languages = driver.find_element_by_css_selector('h2#other-languages + ul > li')

        # Using Glance
        glance = GlanceDom(driver)
        languages = glance.get_element('Other Languages > li')

        print(languages.text)
```

You can also get a list of matching elements using ``get_elements``

************
Exceptions
************

``get_element`` will raise ``NoReferenceError`` if the ``reference`` did not match any elements.
Similarly it will raise ``TooBroadReferenceError`` it there are more than one match.
