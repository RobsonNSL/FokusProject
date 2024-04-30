const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const allBtn = document.querySelectorAll(".app__card-button");



focoBtn.addEventListener('click', () => {
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
});

longoBtn.addEventListener('click', () => {
    alterarContexto("descanso-longo");
    longoBtn.classList.add('active');
});

function alterarContexto(event) {
    allBtn.forEach(function (event) {
        event.classList.remove('active');
    })

    html.setAttribute('data-contexto', event)
    banner.setAttribute('src', `/imagens/${event}.png`)
    switch (event) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta!</strong> `
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong> `
        default:
            break;
    }
}


