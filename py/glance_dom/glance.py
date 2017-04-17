class GlanceDom(object):

    def __init__(self, driver):
        self._driver = driver

    def init_glance(self):
        if not self._is_init():
            self._driver.execute_script(get_glance_dom())

    def _is_init(self):
        script_alt = 'try {' \
                     'return $.isFunction(glanceDOM);' \
                     '} catch (e) {' \
                     'if (e instanceof ReferenceError)) {' \
                     'return false; }'

        script = 'if ($.isFunction(glanceDOM)) {' \
                 'return true;' \
                 '} else {' \
                 'return false; }'

        return self._driver.execute_script(script)

    def get_element(self, reference, options=None):
        self.init_glance()
        options = ' '.join(options) if options else ''
        argument = '{reference} {options}'.format(reference=reference, options=options)
        return self._driver.execute_script('return glanceDOM(arguments[0])', argument)


def get_glance_dom():
    with open('scr/glance-dom.js', 'r') as js_file:
        return js_file.read()
