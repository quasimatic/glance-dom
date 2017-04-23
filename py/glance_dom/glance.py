from exceptions import NoReferenceError, TooBroadReferenceError


class GlanceDom(object):
    """

    """

    def __init__(self, driver):
        """

        :param driver:
        """
        self._driver = driver

    def load_glance(self):
        """

        :return:
        """
        if not self._is_loaded():
            glance_dom = read_glance_dom()
            script = "window.localStorage.setItem('glanceDOM', {});".format(glance_dom)
            self._driver.execute_script(script)

        if not self._is_running():
            self._driver.execute_script("eval(window.localStorage.getItem('glanceDOM');")

    def get_element(self, reference):
        """

        :param reference:
        :return:
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

        :param reference:
        :return: list of elements or empty list
        """
        self.load_glance()
        elements = self._get(reference)

        # Single element should also be returned as list
        return elements if isinstance(elements, list) else [elements]

    def _get(self, reference):
        return self._driver.execute_script('return glanceDOM(arguments[0])', reference)

    def _is_loaded(self):
        return not self._driver.execute_script("return window.localStorage.getItem('glanceDOM') === null;")

    def _is_running(self):
        return self._driver.execute_script('return typeof(glanceDOM) === "function"')


def read_glance_dom():
    """

    :return:
    """
    import os
    import pkgutil

    return pkgutil.get_data(__package__, os.path.join('scr', 'glance-dom.js')).decode('utf8')
