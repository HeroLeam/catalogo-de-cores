window.addEventListener('DOMContentLoaded', function () {
  carregarCartelas();
});

function carregarCartelas() {
  var colorList = document.querySelector('.lista-cartela');

  fetch('src/assets/colorChart')
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
        fetch(window.location.origin + '/catalogo-de-cores/src/assets/colorChart/' + file)
        // fetch(window.location.origin + file)
          .then(response => response.text())
          .then(html => {
            var div = document.createElement('div');
            div.innerHTML = html;
            colorList.appendChild(div);
          });
      });
    });
}