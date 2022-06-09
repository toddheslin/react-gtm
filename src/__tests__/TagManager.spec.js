/**
 * @jest-environment jsdom
 */

import TagManager from '../TagManager'

describe('TagManager', () => {
  afterEach(() => {
    window.dataLayer = []
    window.document.querySelector('script').remove()
  });

  it('should render tagmanager', () => {
    TagManager.initialize({gtmId: 'GTM-000000'})
    expect(window.dataLayer).toHaveLength(1)
  })

  it('should render datalayer', () => {
    const gtmArgs = {
      gtmId: 'GTM-000000',
      dataLayer: {
        userInfo: 'userInfo'
      }
    }
    TagManager.initialize(gtmArgs)
    expect(window.dataLayer).toHaveLength(2)
  })

  it('should render tagmanager with nonce', () => {
    TagManager.initialize({gtmId: 'GTM-000000', nonce: 'foo'})
    const script = window.document.querySelector('script');
    expect(script.nonce).toBe('foo');
  })

  it('should render tagmanager without nonce', () => {
    TagManager.initialize({gtmId: 'GTM-000000'})
    const script = window.document.querySelector('script');
    expect(script.nonce).toBe('');
 })
})