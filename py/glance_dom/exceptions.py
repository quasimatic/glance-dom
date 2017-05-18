class NoReferenceError(Exception):
    """
    Raised if the ``reference`` did not match any elements.
    """
    def __init__(self, reference):
        self.reference = reference

    def __str__(self):
        return 'Glance found no element with reference: {}'.format(
            self.reference)


class TooBroadReferenceError(Exception):
    """
    Raised if ``reference`` matches more than one element.
    """
    def __init__(self, reference):
        self.reference = reference

    def __str__(self):
        return 'Glance found more than one element with reference: {}'.format(
            self.reference)
