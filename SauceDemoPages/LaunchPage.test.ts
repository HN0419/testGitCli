import { test, expect, Page, PageScreenshotOptions, ReporterDescription, BrowserContext } from '@playwright/test';

export class LaunchPage_test{
  public page : Page;
  public context : BrowserContext;
  constructor(pageObject: Page, browserObject:BrowserContext)  {
    this.page = pageObject;
    this.context = browserObject;

  }

  //Global Variables
   actualURL: string ='https://www.saucedemo.com/'
   itemName:string ='test'

  // Web Objects of loginPage
   winp_userName = 'input#user-name';
   winp_passWord = 'input#password';
   wbtn_login = 'input#login-button';
   wlnk_socials='ul.social>li>a';
   // Web Objects of inventorypage
   wele_productsTitle = 'span.title';
   wele_productName='div.inventory_item_name';
   wele_productDesc='div.inventory_item_desc';
   wele_productPrice='div.inventory_item_price';
   wbtn_addToCart ='//button[contains(text(),/"Add to cart/")]';

   //WebObjects of productspage
   wbtn_backToProducts='button#back-to-products';



  // common functions or methods for the application
  async inputField(selector: string, value: string){
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, value);
  }

  async clickButton(selector:string){
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  async verifyNavigation_URL(url: string, page:Page){
    await page.waitForLoadState();
    let expectedURL=page.url();
    await expect(expectedURL).toContain(url);
  }

  async verifyNavigation_Title(title: string, page:Page){
    await page.waitForLoadState();
    await expect(page).toHaveTitle(title);
  }

  async verifyNavigation_WObj(WObj:string ){
    await this.page.waitForSelector(WObj);
    await this.page.isVisible(WObj);
  }

  async getText_WObj(WObj:string){
    await this.page.waitForSelector(WObj);
    let text = this.page.textContent(WObj);
    return text;
  }

  async SwitchPage(): Promise<Page> {
    const [newWindow] = await Promise.all([
      await this.context.waitForEvent('page')
    ]);
      await newWindow.waitForLoadState();
      console.log('Switched to new window' +(await newWindow.title()));
      return newWindow;
  }

  async screenshotTest(testName:string){
    await this.page.screenshot({ path: './screenshots/'+testName+'screenshot.png', fullPage: true });
    console.log("Screenname ::" +testName+'screenshot.png');
  }

  // common function for the login page
async loginApplication() {
  await this.inputField(this.winp_userName,'standard_user');
  await this.inputField(this.winp_passWord,'secret_sauce');
  await this. clickButton(this.wbtn_login);
  await this.verifyNavigation_URL('inventory', this.page);
  // await this.verifyNavigation_URL('/.*inventory/');
  await this.verifyNavigation_WObj(this.wele_productsTitle.toString());
}

 // common function for the inventory page
async getItemName(productName:string,testName:string) {
  var itemList = this.page.locator(this.wele_productName);
  var itemName; 
  // console.log('items count: ', await itemList.count());
  if(await itemList.count() ==6){
    for(var i =0; i< 6; i++){
      // console.log('Wele Object: ', this.wele_productName.toString().concat('>>nth=', (i.toString())));
      itemName = await this.page.locator(this.wele_productName.toString().concat('>>nth=', (i.toString()))).textContent();
        if ((itemName === productName)){
          // console.log((i+1) +'Product name :' ,itemName);
          console.log((i+1) +' Product name :' +(itemName)+ ' matched with expected, so clicking on the product.');
          await this.page.locator(this.wele_productName.toString().concat('>>nth=', (i.toString()))).click();
          // await this.screenshotTest(testName);
          await this.page.locator(this.wbtn_backToProducts).screenshot();
          await this.page.locator(this.wbtn_backToProducts).click();
        } else if ((itemName?.charAt(0))  && (itemName.match('Sauce Labs')) ){
          console.log((i+1) +' Product name :' +(itemName)+ ' does not match with expected, so not clicking on the product.');
          // await this.page.locator(this.wele_productName.toString().concat('>>nth=', (i.toString()))).click();
          // await this.screenshotTest(testName);
          // await this.page.locator(this.wbtn_backToProducts).click();
        } else{
          test.info().annotations.push(({
            type: 'Error',
            description: 'This test is failing because the product name is mismatched from expected ::' +itemName
          })) 
          // test.fail();
        }     
     }
    }
  // let pdtDesc = this.getText_WObj(this.wele_productDesc);
  // let pdtprice = this.getText_WObj(this.wele_productPrice);
}

//validation of social links

async validateSocialLinks() {
  var itemList = this.page.locator(this.wlnk_socials);
  var itemName; 
  // console.log('items count: ', await itemList.count());
  if(await itemList.count() ==3){
    for(var i =0; i< 3; i++){
      // console.log('Wele Object: ', this.wlnk_socials.toString().concat('>>nth=', (i.toString())));
      await this.page.locator(this.wlnk_socials.toString().concat('>>nth=', (i.toString()))).click();
      const pagePromise = this.context.waitForEvent("page");  
      var page1 = await pagePromise;
      // page1.goForward();
      await page1.waitForTimeout(3000);
      switch(i){
        case 0:{
          //change the stmt "await page1.title()" and "await page1.url()" 
          //to expected hardcoded title or url, respectively.
          await this.verifyNavigation_Title(await page1.title(), page1);
          await this.verifyNavigation_URL(await page1.url(), page1);
          console.log(i +' Title :' ,await page1.title());
          console.log(i +' URL :' ,await page1.url());
          await page1.close();
          break;
        }
        case 1:{
          await this.verifyNavigation_Title(await page1.title(), page1);
          await this.verifyNavigation_URL(await page1.url(), page1);
          console.log(i +'Title :' ,await page1.title());
          console.log(i +'URL :' ,await page1.url());
          await page1.close();
          break;
        }
        case 2:{
          await this.verifyNavigation_Title(await page1.title(), page1);
          await this.verifyNavigation_URL(await page1.url(), page1);
          console.log(i +'Title :' ,await page1.title());
          console.log(i +'URL :' ,await page1.url());
          await page1.close();
          break;
        }
        default:{
          test.info().annotations.push(({
            type: 'Error',
            description: 'This test is failing because the product name is mismatched from expected ::' +itemName
          }))
          test.fail();
        }

      }
    }
  }
  // let pdtDesc = this.getText_WObj(this.wele_productDesc);
  // let pdtprice = this.getText_WObj(this.wele_productPrice);
}

}
