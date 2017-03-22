using System.Collections.ObjectModel;
using System.IO;
using System.Reflection;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;

namespace Glance.DomSelector
{
    public class GlanceSelector
    {
        private class GlanceLocator : By
        {
            private string reference;

            private void loadGlance(IJavaScriptExecutor driver)
            {
                var assembly = Assembly.GetExecutingAssembly();
                var stream = assembly.GetManifestResourceStream("Glance.DomSelector.glance-selector.js");
                var glanceSelectorScript = new StreamReader(stream).ReadToEnd();
                driver.ExecuteScript(glanceSelectorScript);
            }

            public GlanceLocator(string reference)
            {
                this.reference = reference;
            }

            public override IWebElement FindElement(ISearchContext context)
            {
                var driver = (RemoteWebDriver) context;
                loadGlance(driver);
                string executeGlance = "return glanceSelector(arguments[0]);";
                var element = driver.ExecuteScript(executeGlance, this.reference);
                return element as IWebElement;
            }

            public override ReadOnlyCollection<IWebElement> FindElements(ISearchContext context)
            {
                var driver = (RemoteWebDriver) context;
                loadGlance(driver);
                string executeGlance = "return glanceSelector(arguments[0]);";
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