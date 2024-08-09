export const headerNav = (headerNavButton, headerNavList) => {
  const navLinkList = document.querySelectorAll('.st-SiteNav_Anchor')

  headerNavButton.addEventListener('click', () => {
    navExpanded()
  })
  if (navLinkList.length > 0) {
    navLinkList.forEach((link) => {
      link.addEventListener('click', () => {
        const isExpanded = headerNavButton.getAttribute('aria-expanded') === 'true'
        if (isExpanded) {
          navExpanded()
        }
      })
    })
  }
  const navExpanded = () => {
    const isExpanded = headerNavButton.getAttribute('aria-expanded') === 'true'
    headerNavButton.setAttribute('aria-expanded', `${!isExpanded}`)
    headerNavList.setAttribute('aria-hidden', `${isExpanded}`)
  }
}
