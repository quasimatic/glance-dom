class NoReferenceError(Exception):
    """

    """
    def __init__(self, reference):
        self.reference = reference

    def __str__(self):
        return 'Glance found no element with reference: {}'.format(self.reference)


class TooBroadReferenceError(Exception):
    """

    """
    def __init__(self, reference):
        self.reference = reference

    def __str__(self):
        return 'Glance found more than one element with reference: {}'.format(self.reference)
