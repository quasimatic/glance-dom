using System.Collections.ObjectModel;
using System.IO;
using System.Reflection;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace Glance.Dom
{
    public class GlanceDom
    {
        private IJavaScriptExecutor driver;
        
        public GlanceDom(IJavaScriptExecutor driver = null)
        {
            this.driver = driver;
        }
        
        private class GlanceLocator : By
        {
            private string reference;

            private static void loadGlance(IJavaScriptExecutor driver)
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

            private static bool IsLoaded(IJavaScriptExecutor driver)
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
                return GetElement(driver, reference);
            }

            public static IWebElement GetElement(IJavaScriptExecutor driver, string reference)
            {
                loadGlance(driver);
                string executeGlance = "return glanceDOM(arguments[0]);";
                var element = driver.ExecuteScript(executeGlance, reference);
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
            
            public static ReadOnlyCollection<IWebElement> GetElements(IJavaScriptExecutor driver, string reference)
            {
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

        public IWebElement GetElement(string reference)
        {
            return GlanceLocator.GetElement(driver, reference);
        }

        public ReadOnlyCollection<IWebElement> GetElements(string reference)
        {
            return GlanceLocator.GetElements(driver, reference);
        }
    }
}