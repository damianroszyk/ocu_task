import { OculyzePage } from './app.po';

describe('oculyze App', function() {
  let page: OculyzePage;

  beforeEach(() => {
    page = new OculyzePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
