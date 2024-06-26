const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const allBtn = document.querySelectorAll(".app__card-button");
const startPauseBtn = document.querySelector("#start-pause")
const iniciarOuPausarBtn = document.querySelector("#start-pause span");
const iniciarOuPausarImg = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");

const musicaIniciar = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaAlerta = new Audio('/sons/beep.mp3');

const musicaFocoInput = document.querySelector("#alternar-musica");

const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1;
let intervalorId = null;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1;
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1;
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
});

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1;
    alterarContexto("descanso-longo");
    longoBtn.classList.add('active');
});

function alterarContexto(event) {
    mostrarTempo();
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

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaAlerta.play();
        alert("Tempo terminado!");
        const focoAtivo = html.getAttribute('data-contexto') == 'foco' || 'descanso-curto' || 'descanso-longo';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {

    if (intervalorId) {
        musicaPause.play()
        zerar();
        return;
    }

    //  musicaIniciar.play()
    intervalorId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar"
    iniciarOuPausarImg.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervalorId);
    iniciarOuPausarBtn.textContent = "Começar"
    iniciarOuPausarImg.setAttribute('src', `/imagens/play_arrow.png`)
    intervalorId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();