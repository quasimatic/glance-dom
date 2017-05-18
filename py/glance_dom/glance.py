from .exceptions import NoReferenceError, TooBroadReferenceError


class GlanceDom(object):
    """
    Reference DOM elements using a more human readable format.

    See <link to wiki/docs> to learn more.
    """

    def __init__(self, driver):
        """
        Initializes GlanceDOM with a driver instance.

        :param driver: driver instance
        """
        self._driver = driver

    def load_glance(self):
        """
        Loads GlanceDOM into browser local storage for easy access during
        page-changes.

        :return: None
        """
        if not self._is_loaded():
            script = 'window.localStorage.setItem("glanceDOM",' \
                     'arguments[0]);' \
                     'eval(arguments[0]);'
            self._driver.execute_script(script, read_glance_dom())

    def get_element(self, reference):
        """
        Get element based on ``reference`.

        :param reference: string to match element
        :raises NoReferenceError: if reference did not match an element
        :raises TooBroadReferenceError: if reference matched more than one
        element
        :return: element
        """
        self.load_glance()
        element = self._get(reference)
        if not element:  # element was empty list
            raise NoReferenceError(reference)
        if isinstance(element, list):  # element was a list of elements
            raise TooBroadReferenceError(reference)
        return element

    def get_elements(self, reference):
        """
        Get a list of elements matching ``reference`` or empty list if no
        matches were found.

        :param reference: string to match elements
        :return: list of elements or empty list
        """
        self.load_glance()
        elements = self._get(reference)

        # Single element should also be returned as list
        return elements if isinstance(elements, list) else [elements]

    def _get(self, reference):
        return self._driver.execute_script('return glanceDOM(arguments[0])',
                                           reference)

    def _is_loaded(self):
        script = 'return typeof(glanceDOM) === "function" || ' \
                 '!!eval(window.localStorage.getItem("glanceDOM"));'
        return self._driver.execute_script(script)


def read_glance_dom():
    """
    Reads in the GlanceDOM javascript.

    :return: string representation of GlanceDOM javascript
    """
    import os
    import pkgutil

    resource = os.path.join('scr', 'glance-dom.js')
    return pkgutil.get_data(__package__, resource).decode('utf8')
