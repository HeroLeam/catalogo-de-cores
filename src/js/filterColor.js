function atualizarContador() {
  var contador = document.getElementById("contador");
  var cartelas = document.getElementsByClassName("cartela");
  contador.innerText = cartelas.length.toString();
}

function filtrar() {
  var filtroCor = document.getElementById("filterColors").value.toLowerCase();
  var cartelas = document.querySelectorAll('.lista-cartela > div');
  var contador = document.getElementById("contador");

  var count = 0;

  if (filtroCor === "nenhum") {
    cartelas.forEach(function(cartela) {
      cartela.style.display = "flex";
      count++;
    });
  } else {
    for (var i = 0; i < cartelas.length; i++) {
      var cartela = cartelas[i];
      var cor = cartela.getElementsByClassName("linha")[0];
      var codBase = cartela.getElementsByClassName("linha")[2];

      var correspondeFiltroCor = false;

      var corTexto = cor.innerText.toLowerCase();
      var codBaseTexto = codBase.innerText.toLowerCase();

      if (
        corTexto
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(filtroCor) ||
        codBaseTexto
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(filtroCor)
      ) {
        correspondeFiltroCor = true;
      }

      if (correspondeFiltroCor && filtroCor !== "") {
        cartela.style.display = "flex";
        count++;
      } else {
        cartela.style.display = "none";
      }
    }
  }

  contador.innerText = count.toString();
}

function limparFiltros() {
  document.getElementById("filterColors").value = "nenhum";
  document.getElementById("filterCollections").value = "nenhum";
  document.getElementById("searchInput").value = "";
  var cartelas = document.querySelectorAll('.lista-cartela > div');
  cartelas.forEach(cartela => {
    cartela.style.display = "flex";
  });
  atualizarContador();
}

function filtrarPorColecao() {
  var filtroColecao = document.getElementById("filterCollections").value.toLowerCase();
  var cartelas = document.querySelectorAll('.lista-cartela > div');
  var contador = document.getElementById("contador");

  var count = 0;

  if (filtroColecao === "nenhum") {
    cartelas.forEach(function(cartela) {
      cartela.style.display = "flex";
      count++;
    });
  } else {
    fetch(`src/assets/collections/${filtroColecao}.json`)
      .then(response => response.json())
      .then(json => {
        cartelas.forEach(function(cartela) {
          var codBase = cartela.getElementsByTagName("h2")[0];
          var codBaseTexto = codBase.innerText.toLowerCase();

          if (json.includes(codBaseTexto)) {
            cartela.style.display = "flex";
            count++;
          } else {
            cartela.style.display = "none";
          }
        });

        contador.innerText = count.toString();
      })
      .catch(error => console.error("Erro ao carregar arquivo JSON:", error));
  }

  contador.innerText = count.toString();
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarContador();
  setTimeout(() => {
    limparFiltros();
  }, 1500);

  document.getElementById("filterColors").addEventListener("change", filtrar);
  document.getElementById("filterCollections").addEventListener("change", filtrarPorColecao);
});
