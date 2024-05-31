window.addEventListener('DOMContentLoaded', function () {
  carregarCartelas();
});

function carregarCartelas() {
  var colorList = document.querySelector('.lista-cartela');
  const pasta = '/src/assets/colorChart';

  fetch(pasta)
    .then(response => response.text())
    .then(text => {
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(text, 'text/html');
      var files = Array.from(htmlDoc.querySelectorAll('a'))
        .map(a => a.getAttribute('href')) // Use getAttribute para pegar o href corretamente
        .filter(href => href && href.endsWith('.html') && href !== 'index.html') // Excluir index.html
        .sort((a, b) => {
          var matchA = a.match(/([A-Z]+)(\d+)/);
          var matchB = b.match(/([A-Z]+)(\d+)/);

          if (matchA && matchB) {
            var letterA = matchA[1];
            var numberA = parseInt(matchA[2]);
            var letterB = matchB[1];
            var numberB = parseInt(matchB[2]);

            if (letterA !== letterB) {
              return letterA.localeCompare(letterB);
            } else {
              return numberA - numberB;
            }
          } else {
            return a.localeCompare(b);
          }
        });

      files.forEach(file => {
        fetch(window.location.origin + pasta + '/' + file) // Adicione a '/' entre pasta e file
          .then(response => response.text())
          .then(html => {
            var div = document.createElement('div');
            div.innerHTML = html;
            colorList.appendChild(div);
          });
      });
    });
}