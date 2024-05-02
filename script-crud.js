const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");

const tarefas = []

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle("hidden");
})

formAdicionarTarefa.addEventListener('submit', (event) => {
    event.preventDefault();
    const descricaoTarefa = textArea.value;

    const tarefa = {
        descricao: descricaoTarefa
    }

    tarefas.push(tarefa);
    localStorage.setItem('tarefas', tarefas)

})