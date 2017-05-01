from distutils.core import setup

setup(
    name='glance_dom',
    packages=['glance_dom'],
    package_data={
        'glance_dom': ['scr/glance-dom.js'],
    },
    version='0.11.0',
    description='A selenium automation tool that utilizes contextual labels to automate faster and loosen the ties to '
                'the DOM.',
    author='Dan Gilkerson',
    author_email='info@quasimatic.org',
    url='https://github.com/quasimatic/glance_dom',
    download_url='https://github.com/quasimatic/glance_dom/tarball/0.11.0',
    keywords=['testing', 'webdriver', 'selenium'],
    classifiers=[],
)
