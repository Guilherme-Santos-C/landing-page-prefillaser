const buttons = document.querySelectorAll('#button_cta');
const targetUrl = 'https://meulink.com/orcamento';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = targetUrl;
  });
});