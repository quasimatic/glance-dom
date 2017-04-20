from distutils.core import setup

setup(
    name='glance-dom',
    packages=['glance-dom'],
    package_data={
        'glance-dom': ['scr/glance-dom.js'],
    },
    version='0.1',
    description='A selenium automation tool that utilizes contextual labels to automate faster and loosen the ties to '
                'the DOM.',
    author='Dan Gilkerson',
    author_email='info@quasimatic.org',
    url='https://github.com/quasimatic/glance-dom',
    download_url='https://github.com/quasimatic/glance-dom/tarball/0.1',
    keywords=['testing', 'webdriver', 'selenium'],
    classifiers=[],
)
