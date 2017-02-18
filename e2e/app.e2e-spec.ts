import { FuryPage } from './app.po';

describe('fury App', function() {
  let page: FuryPage;

  beforeEach(() => {
    page = new FuryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
