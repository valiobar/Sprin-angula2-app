import { SailingNg2Page } from './app.po';

describe('sailing-ng2 App', () => {
  let page: SailingNg2Page;

  beforeEach(() => {
    page = new SailingNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
