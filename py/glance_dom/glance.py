class GlanceDom(object):

    def __init__(self, driver):
        self._driver = driver

    @property
    def driver(self):
        return self._driver

    def init_glance(self):
        if not self.is_init():
            self.driver.execute_script(get_glance_dom())

    def is_init(self):
        return self.driver.execute_script('return something')

    def get_element(self, reference, options=None):
        options = ' '.join(options) if options else ''
        argument = '{reference} {options}'.format(reference=reference, options=options)
        return self.driver.execute_script('return glanceDOM(arguments[0])', argument)


def get_glance_dom():
    with open('scr/glance-dom.js', 'r') as js_file:
        return js_file.read()
