const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-alternar-tema");

let tarefas = [];

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === "") {
        alert("Escreve uma tarefa!");
        campoTarefa.focus();
        return;
    }

    tarefas.push({
        id: Date.now(),
        texto: texto,
        concluida: false
    });

    campoTarefa.value = "";
    mostrarTarefas();
    campoTarefa.focus();
}

function mostrarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa) {
        const item = document.createElement("li");
        item.classList.add("item-tarefa");

        if (tarefa.concluida) {
            item.classList.add("concluido");
        }

        const texto = document.createElement("span");
        texto.textContent = tarefa.texto;

        const acoes = document.createElement("div");
        acoes.classList.add("acoes-tarefa");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.type = "button";
        botaoConcluir.classList.add("botao-acao", "concluir");
        botaoConcluir.title = "Concluir tarefa";
        botaoConcluir.innerHTML = '<i class="fa-solid fa-check"></i>';

        botaoConcluir.addEventListener("click", function () {
            tarefa.concluida = !tarefa.concluida;
            mostrarTarefas();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.classList.add("botao-acao", "excluir");
        botaoExcluir.title = "Excluir tarefa";
        botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';

        botaoExcluir.addEventListener("click", function () {
            tarefas = tarefas.filter(function (item) {
                return item.id !== tarefa.id;
            });
            mostrarTarefas();
        });

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoExcluir);

        item.appendChild(texto);
        item.appendChild(acoes);

        listaTarefas.appendChild(item);
    });

    atualizarContador();
}

function atualizarContador() {
    const quantidade = tarefas.length;

    if (quantidade === 0) {
        contadorTarefas.textContent = "0 tarefas na lista ";
    } else if (quantidade === 1) {
        contadorTarefas.textContent = "1 tarefa na lista ";
    } else {
        contadorTarefas.textContent = `${quantidade} tarefas na lista `;
    }
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-escuro");
});

mostrarTarefas();