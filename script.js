
alert("Requisitos Funcionais adicionados:\n1. RF de Filtragem  (Todas e Pendentes).\n2. RF de Limpeza de Tarefas concluídas.");

const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-alternar-tema");
const botaoLimparConcluidas = document.getElementById("botao-limpar-concluidas");

let tarefas = [];
let filtroAtual = "todas"; 

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


    const tarefasFiltradas = tarefas.filter(function (tarefa) {
        if (filtroAtual === "pendentes") return !tarefa.concluida;
        return true; 
    });

    tarefasFiltradas.forEach(function (tarefa) {
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


function filtrarStatus(status) {
    filtroAtual = status;
    mostrarTarefas();
}

function atualizarContador() {
    const quantidade = tarefas.length;

    if (quantidade === 0) {
        contadorTarefas.textContent = " Nenhuma tarefa por enquanto!";
    } else if (quantidade === 1) {
        contadorTarefas.textContent = "1 tarefa na lista!";
    } else {
        contadorTarefas.textContent = `${quantidade} tarefas na lista. Foco que você dá conta! `;
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

botaoLimparConcluidas.addEventListener("click", function () {
    tarefas = tarefas.filter(function (tarefa) {
        return !tarefa.concluida; // Mantém apenas as que NÃO estão concluídas
    });
    mostrarTarefas();
});

mostrarTarefas();