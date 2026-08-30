document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copyBtn');
  const phoneNumber = document.getElementById('phoneNumber');
  const returnScrollKey = 'kompoff-return-scroll';

  const saveCatalogScroll = () => {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'index.html' && currentPage !== '') {
      return;
    }

    sessionStorage.setItem(returnScrollKey, String(window.scrollY));
  };

  const restoreCatalogScroll = () => {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'index.html' && currentPage !== '') {
      return;
    }

    const savedScroll = Number(sessionStorage.getItem(returnScrollKey));
    if (Number.isFinite(savedScroll)) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScroll, behavior: 'auto' });
      });
      sessionStorage.removeItem(returnScrollKey);
    }
  };

  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    const target = link.getAttribute('href') || '';
    if (target === 'index.html' || target.endsWith('/index.html')) {
      return;
    }

    link.addEventListener('click', saveCatalogScroll);
  });

  restoreCatalogScroll();

  if (copyBtn && phoneNumber) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(phoneNumber.textContent.trim());
        copyBtn.textContent = 'Скопировано';
        setTimeout(() => {
          copyBtn.textContent = 'Копировать';
        }, 1500);
      } catch (error) {
        copyBtn.textContent = 'Ошибка';
        setTimeout(() => {
          copyBtn.textContent = 'Копировать';
        }, 1500);
      }
    });
  }

  const topbar = document.querySelector('.topbar');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuPanel = document.getElementById('mobileMenu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

  if (mobileMenuToggle && mobileMenuPanel && mobileMenuBackdrop) {
    const setMenuState = (isOpen) => {
      mobileMenuPanel.classList.toggle('is-open', isOpen);
      mobileMenuBackdrop.classList.toggle('is-visible', isOpen);
      mobileMenuToggle.classList.toggle('is-open', isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
      if (mobileMenuClose) {
        mobileMenuClose.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
      }
    };

    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenuPanel.classList.contains('is-open');
      setMenuState(isOpen);
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => setMenuState(false));
    }

    mobileMenuBackdrop.addEventListener('click', () => setMenuState(false));

    mobileMenuPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });
  }

  if (!topbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const isPhone = viewportWidth <= 560;

    if (!isPhone) {
      topbar.classList.remove('is-hidden');
      topbar.classList.add('is-visible');
      ticking = false;
      return;
    }

    if (currentScrollY > lastScrollY && currentScrollY > 40) {
      topbar.classList.add('is-hidden');
      topbar.classList.remove('is-visible');
    } else {
      topbar.classList.remove('is-hidden');
      topbar.classList.add('is-visible');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    if (viewportWidth > 560) {
      topbar.classList.remove('is-hidden');
      topbar.classList.add('is-visible');
    }
  });
});
