from exceptions import NoReferenceError, TooBroadReferenceError


class GlanceDom(object):
    """

    """

    def __init__(self, driver):
        """

        :param driver:
        """
        self._driver = driver

    def init_glance(self):
        """

        :return:
        """
        if not self._is_init():
            self._driver.execute_script(read_glance_dom())

    def get_element(self, reference):
        """

        :param reference:
        :return:
        """
        self.init_glance()
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
        self.init_glance()
        elements = self._get(reference)

        # Single element should also be returned as list
        return elements if isinstance(elements, list) else [elements]

    def _get(self, reference):
        return self._driver.execute_script('return glanceDOM(arguments[0])', reference)

    def _is_init(self):
        return self._driver.execute_script('return typeof(glanceDOM) === "function"')


def read_glance_dom():
    """

    :return:
    """
    import os
    import pkgutil

    return pkgutil.get_data(__package__, os.path.join('scr', 'glance-dom.js')).decode('utf8')
