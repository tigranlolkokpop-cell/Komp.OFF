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
});
