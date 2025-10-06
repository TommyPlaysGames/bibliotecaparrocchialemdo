async function copyEmail() {
  const email = 'bibliotecaparrocchialemdo@gmail.com';
  const copyBtn = document.getElementById('copyBtn');
  const feedback = document.getElementById('copyFeedback');

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    copyBtn.textContent = 'Copiato!';
    copyBtn.style.backgroundColor = '#4caf50';
    copyBtn.classList.add('pulse');
    feedback.classList.add('show');

    setTimeout(() => {
      copyBtn.textContent = '📋 Copia indirizzo email';
      copyBtn.style.backgroundColor = '#4caf50';
      copyBtn.classList.remove('pulse');
      feedback.classList.remove('show');
    }, 2000);

  } catch (err) {
    console.error('Errore nella copia:', err);
    copyBtn.textContent = '❌ Errore nella copia';
    copyBtn.style.backgroundColor = '#f44336';

    setTimeout(() => {
      copyBtn.textContent = '📋 Copia indirizzo email';
      copyBtn.style.backgroundColor = '#4caf50';
    }, 2000);
  }
}

document.getElementById('emailLink').addEventListener('click', function (e) {
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    setTimeout(() => {
      const suggestion = document.createElement('div');
      suggestion.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      `;
      suggestion.textContent = 'Se l\'email non si apre, usa il pulsante "Copia" qui sotto';
      document.body.appendChild(suggestion);

      setTimeout(() => {
        document.body.removeChild(suggestion);
      }, 3000);
    }, 1000);
  }
});