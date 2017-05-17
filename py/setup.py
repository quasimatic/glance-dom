from distutils.core import setup

setup(
    name='glance_dom',
    packages=['glance_dom'],
    package_data={
        'glance_dom': ['scr/glance-dom.js'],
    },
    version='0.11.4',
    description='Quickly reference DOM elements with minimal inspection.',
    long_description=open('README.rst').read(),
    author='Dan Gilkerson',
    author_email='dangilkerson@quasimatic.com',
    url='https://github.com/quasimatic/glance-dom',
    download_url='https://github.com/quasimatic/glance-dom/tarball/0.11.2',
    keywords=['testing', 'webdriver', 'selenium'],
    classifiers=[],
)
