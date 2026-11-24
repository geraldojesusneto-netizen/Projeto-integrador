!function () {
  var markdown = [
    "# Aplicações da Óptica Geométrica",
    "",
    "## Escolar: Microscópio",
    "- <img src='img.png' width='120' alt='Microscópio Óptico' />",
    "- **Conceito Físico**",
    "  - Óptica geométrica, especialmente refração da luz, lentes convergentes e formação de imagens ampliadas.",
    "- **Princípio Óptico**",
    "  - Refração da luz por lentes convergentes, que permite a formação e ampliação da imagem da amostra.",
    "- **Utilização**",
    "  - Utilizado em escolas, laboratórios e centros de pesquisa para observar estruturas muito pequenas, invisíveis a olho nu.",
    "- **Importância**",
    "  - Permite o estudo de células, microrganismos e outros materiais, contribuindo para o ensino e para pesquisas científicas.",
    "- **Funcionamento**",
    "  - Uma fonte de luz ilumina a amostra. A objetiva forma uma imagem ampliada, que é ampliada novamente pela lente ocular.",
    "  - **Etapas Ópticas**",
    "    1. **Iluminação:** Fonte de luz ilumina a amostra.",
    "    2. **Lente Objetiva:** Forma uma imagem intermediária ampliada.",
    "    3. **Lente Ocular:** Amplia novamente para observação dos detalhes.",
    "",
    "## Industrial: Sistemas de Inspeção por Imagem",
    "- <img src='inspecao.png' width='130' alt='Sistema de Inspeção por Imagem' />",
    "- **Conceito Físico**",
    "  - Óptica geométrica, especialmente reflexão da luz, formação de imagens e funcionamento de lentes.",
    "- **Princípio Óptico**",
    "  - Formação de imagens pela reflexão da luz, captada por câmeras e sensores ópticos.",
    "- **Utilização**",
    "  - Utilizado em indústrias para inspeção e controle de qualidade de produtos e peças durante a fabricação.",
    "- **Importância**",
    "  - Permite verificar produtos de forma rápida e automática, ajudando a identificar defeitos e manter a qualidade da produção.",
    "- **Funcionamento**",
    "  - A iluminação incide sobre o produto e a luz refletida é captada por uma câmera. A imagem é processada por um sistema que identifica defeitos.",
    "  - **Fluxo Automatizado**",
    "    1. **Iluminação (LED):** Luz direcionada sobre o produto.",
    "    2. **Reflexão:** A luz reflete no objeto e retorna.",
    "    3. **Captura:** A câmera com lente forma a imagem.",
    "    4. **Processamento:** Sistema analisa características e defeitos.",
    "    5. **Resultado:** Aprovado (OK) ou rejeitado (Defeito).",
    "    6. **Produto Final:** Qualidade assegurada na produção."
  ].join("\n");

  function recolherNos(no, nivel) {
    if (!no.children || no.children.length === 0) return;
    // nivel >= 0 fecha tudo a partir da raiz (mostra só o título principal)
    no.payload = Object.assign({}, no.payload, { fold: nivel >= 0 ? 1 : 0 });
    for (var i = 0; i < no.children.length; i++) {
      recolherNos(no.children[i], nivel + 1);
    }
  }

  function montarMapa() {
    var svg = document.getElementById("markmap");
    if (!svg || !window.markmap) return;

    svg.innerHTML = "";

    var Transformer = window.markmap.Transformer;
    var Markmap = window.markmap.Markmap;
    var deriveOptions = window.markmap.deriveOptions;

    var transformer = new Transformer();
    var resultado = transformer.transform(markdown);
    var root = resultado.root;

    // Força todos os ramos a iniciarem fechados
    recolherNos(root, 0);

    var opcoes = deriveOptions({
      initialExpandLevel: 0,
      fitRatio: 0.9,
      paddingX: 24,
      duration: 400
    });

    var mm = Markmap.create(svg, opcoes, root);

    setTimeout(function () {
      mm.fit();
    }, 150);

    svg.onclick = function (e) {
      if (e.target.closest(".markmap-node")) {
        setTimeout(function () {
          mm.fit();
        }, 430);
      }
    };

    window.onresize = function () {
      mm.fit();
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montarMapa);
  } else {
    montarMapa();
  }
}();