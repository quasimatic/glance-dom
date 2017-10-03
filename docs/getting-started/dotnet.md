
```
 using OpenQA.Selenium.Remote;
 
 using (var driver = new RemoteWebDriver(DesiredCapabilities.Chrome()))
{
    driver.Navigate().GoToUrl("http://quasimatic.org/take-a-glance/?level=2");

    var glance = new GlanceDom(driver);

    var element = glance.GetElement("square");

    Assert.NotNull(element);
}
```