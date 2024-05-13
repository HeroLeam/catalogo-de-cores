window.addEventListener('DOMContentLoaded', function () {
  carregarCartelas();
});

function carregarCartelas() {
  var colorList = document.querySelector('.lista-cartela');
  const pasta = 'src/assets/colorChart';

  fetch(pasta)
    .then(response => response.text())
    .then(text => {
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(text, 'text/html');
      var files = Array.from(htmlDoc.querySelectorAll('a'))
        .map(a => a.pathname)
        .filter(href => href.endsWith('.html'))
        .sort((a, b) => {
          var matchA = a.match(/([A-Z]+)(\d+)/);
          var matchB = b.match(/([A-Z]+)(\d+)/);
          var letterA = matchA[1];
          var numberA = parseInt(matchA[2]);
          var letterB = matchB[1];
          var numberB = parseInt(matchB[2]);

          if (letterA !== letterB) {
            return letterA.localeCompare(letterB);
          } else {
            return numberA - numberB;
          }
        });

      files.forEach(file => {
        const url = window.location.origin + '/catalogo-de-cores/' + pasta + file;
        console.log('URL do arquivo:', url); // Adicionando o console.log() aqui
        // fetch(window.location.origin + file)

        fetch(url)
          .then(response => response.text())
          .then(html => {
            var div = document.createElement('div');
            div.innerHTML = html;
            colorList.appendChild(div);
          });
      });
    }