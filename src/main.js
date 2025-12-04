const ctaWhatsapp = document.querySelectorAll('.cta_whatsapp');
const ctaInstagram = document.querySelectorAll('.cta_instagram');
const targetUrlWhatsapp = 'https://wa.me/5511989117356';
const targetUrlInstagram = 'https://www.instagram.com/perfil_laser/';

ctaInstagram.forEach(button => {
  button.addEventListener('click', () => {
    window.open(targetUrlInstagram, '_blank');
  });
});

ctaWhatsapp.forEach(button => {
  button.addEventListener('click', () => {
    window.open(targetUrlWhatsapp, '_blank');
  });
});

function mostrarToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  // esconde depois de 4s
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  const inputTelefone = document.getElementById("telefone");

  inputTelefone.addEventListener("input", () => {
    let valor = inputTelefone.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Aplica máscara
    if (valor.length > 10) {
      // Celular (11 dígitos): (99) 99999-9999
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (valor.length > 6) {
      // Fixo (8 ou 9 dígitos): (99) 9999-9999
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    } else {
      valor = valor.replace(/^(\d{0,2}).*/, "($1");
    }

    inputTelefone.value = valor;
  });

  // Validação simples (mínimo 10 e máximo 15 caracteres)
  inputTelefone.addEventListener("blur", () => {
    const numeroLimpo = inputTelefone.value.replace(/\D/g, "");
    if (numeroLimpo.length < 10 || numeroLimpo.length > 11) {
      inputTelefone.setCustomValidity("Digite um telefone válido.");
    } else {
      inputTelefone.setCustomValidity("");
    }
  });

  const form = document.getElementById("form_contato");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const honeypot = document.getElementById("website").value; // deve ficar vazio

    // 🛡️ Anti-bot simples
    if (honeypot) {
      alert("Erro: comportamento suspeito detectado.");
      return;
    }

    // 🧹 Validações mínimas
    if (!nome || !email || !telefone || !mensagem) {
      return;
    }

    const payload = { nome, email, telefone, mensagem };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxjuNE4_VE4c7DKJv8vNcWT8yHm2YgprCDzKmzJPeb_WhU19KPq93z6BEwLBsk4J3NM/exec", {
        method: "POST",
        mode: 'no-cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      form.reset();
      mostrarToast();

    } catch (error) {
      alert("Erro ao enviar formulário");
      console.error("Erro ao enviar formulário:", error);
    }
  });
  const btn = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeBtn');
  const linksOverlay = [... document.querySelector('#menuOverlay').children]


  btn.addEventListener('click', () => {
    overlay.classList.add('open');
  });


  linksOverlay.forEach(element => {
    element.addEventListener('click', () => {
      overlay.classList.remove('open');
    });
  });
});