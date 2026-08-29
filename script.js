document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copyBtn');
  const phoneNumber = document.getElementById('phoneNumber');

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
