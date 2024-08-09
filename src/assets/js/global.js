import { toTop } from './modules/pagetop'
const pageTopButton = document.querySelector('.st-Totop')
if (pageTopButton) {
  toTop(pageTopButton)
}

import { headerNav } from './modules/headerNav'
const headerNavButton = document.querySelector('.st-Header_SiteNavButton')
const headerNavList = document.querySelector('.st-Header_SiteNavList')
if (headerNavButton && headerNavList) {
  headerNav(headerNavButton, headerNavList)
}
