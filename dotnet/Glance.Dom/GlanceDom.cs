using System.Collections.ObjectModel;
using System.IO;
using System.Reflection;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace Glance.Dom
{
    public class GlanceDom
    {
        private class GlanceLocator : By
        {
            private string reference;

            private void loadGlance(IJavaScriptExecutor driver)
            {
                if (!IsLoaded(driver))
                {
                    var assembly = Assembly.GetExecutingAssembly();
                    var stream = assembly.GetManifestResourceStream("Glance.Dom.glance-dom.js");
                    var glanceDOMScript = new StreamReader(stream).ReadToEnd();
                    var script = "window.localStorage.setItem('glanceDOM', arguments[0]); eval(arguments[0]);";
                    driver.ExecuteScript(script, glanceDOMScript);    
                }
            }

            private bool IsLoaded(IJavaScriptExecutor driver)
            {
                var script = "return typeof(glanceDOM) === 'function' || !!eval(window.localStorage.getItem('glanceDOM'));";
                return (bool) driver.ExecuteScript(script);
            }

            public GlanceLocator(string reference)
            {
                this.reference = reference;
            }

            public override IWebElement FindElement(ISearchContext context)
            {
                var driver = (RemoteWebDriver) context;
                loadGlance(driver);
                string executeGlance = "return glanceDOM(arguments[0]);";
                var element = driver.ExecuteScript(executeGlance, this.reference);
                return element as IWebElement;
            }

            public override ReadOnlyCollection<IWebElement> FindElements(ISearchContext context)
            {
                var driver = (RemoteWebDriver) context;
                loadGlance(driver);
                string executeGlance = "return glanceDOM(arguments[0]);";
                var elements = driver.ExecuteScript(executeGlance, reference) as ReadOnlyCollection<IWebElement>;
                return elements;
            }
        }

        public By Locate(string reference)
        {
            return new GlanceLocator(reference);
        }
    }
}