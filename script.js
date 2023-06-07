// Array para armazenar as situações dos botões
let situacoes = [];

// Obtém todos os botões
const estadoButton = document.getElementsByClassName('button');
const buttons = [];

// Adiciona um ouvinte de eventos de clique a cada botão que não está bloqueado
for (let i = 0; i < estadoButton.length; i++) {
  if (!estadoButton[i].classList.contains('locked')) {
    estadoButton[i].addEventListener('click', function() {
      this.classList.toggle('on'); // Alterna a classe "on"
      this.classList.toggle('off'); // Alterna a classe "off"
      
      // Obtém o elemento pai dos botões
      const puzzle = this.parentElement;
      
      // Obtém todos os botões do mesmo puzzle
      buttons.length = 0; // Limpa o array de botões
      const puzzleButtons = puzzle.getElementsByClassName('button');
      for (let j = 0; j < puzzleButtons.length; j++) {
        buttons.push(puzzleButtons[j]);
      }
      
      // Limpa o array de situações
      situacoes.length = 0;
      
      // Obtém as situações de cada botão do mesmo puzzle e adiciona ao array
      for (let j = 0; j < buttons.length; j++) {
        const botao = buttons[j];
        const situacao = botao.classList.contains('on') ? 'on' : 'off';
        situacoes.push(situacao);
      }
      
      // Chama a função para verificar se a combinação está correta
      verificarCombinacao(situacoes);
    });
  }
}

// Função para verificar a combinação com um array gabarito
function verificarCombinacao(situacoes) {
  // Array gabarito com a combinação correta
  const gabarito = ['off', 'on', 'on', 'off']; // Exemplo, substitua com a combinação correta
  
  // Verifica se a combinação está correta
  if (situacoes.length === gabarito.length && situacoes.every((situacao, index) => situacao === gabarito[index])) {
    console.log('Combinação correta!');
    
    // Adiciona a classe "completed" aos botões verificados
    for (let k = 0; k < buttons.length; k++) {
      buttons[k].classList.add('completed');
    }

  } else {
    console.log('Combinação incorreta!');
  }
}
