// Obtém todos os botões
const buttons = document.getElementsByClassName('button');

// Adiciona um ouvinte de eventos de clique a cada botão
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    this.classList.toggle('on'); // Alterna a classe "on"
    this.classList.toggle('off'); // Alterna a classe "off"
  });
}
