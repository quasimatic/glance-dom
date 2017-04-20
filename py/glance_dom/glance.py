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
            self._driver.execute_script(get_glance_dom())

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
        return self._get(reference)

    def _get(self, reference):
        return self._driver.execute_script('return glanceDOM(arguments[0])', reference)

    def _is_init(self):
        return self._driver.execute_script('return typeof(glanceDOM) === "function"')


def get_glance_dom():
    """

    :return:
    """
    with open('scr/glance-dom.js', 'r') as js_file:
        return js_file.read()
