using NUnit.Framework;
using OpenQA.Selenium.Remote;

namespace Glance.Dom.Specs
{
    [TestFixture]
    public class GlanceDomSpecs
    {
        [Test]
        public void ShouldFindOneElement()
        {
            using (var driver = new RemoteWebDriver(DesiredCapabilities.Chrome()))
            {
                driver.Navigate().GoToUrl("http://quasimatic.org/take-a-glance/?level=2");

                var glance = new GlanceDom();

                var element = driver.FindElement(glance.Locate("square"));

                Assert.NotNull(element);
            }
        }

        [Test]
        public void ShouldFindMultipleElements()
        {
            using (var driver = new RemoteWebDriver(DesiredCapabilities.Chrome()))
            {
                driver.Navigate().GoToUrl("http://quasimatic.org/take-a-glance/?level=7");

                var glance = new GlanceDom();

                var elements = driver.FindElements(glance.Locate("circle"));

                Assert.AreEqual(2, elements.Count);
            }
        }
    }
}