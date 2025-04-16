import {
    mostrarMenu,
    criarTarefa,
    VisualizarTodasTarefas,
    VisualizarTarefasConcluidas,
    VisualizarTarefasNaoConcluidas,
    concluirTarefas

} from "./adiciona_funcoes.js"

import promptSync from "prompt-sync"

const prompt = promptSync()

let opcao = ''
do {
    mostrarMenu()
    opcao = prompt("Qual opção deseja? ")

    switch (opcao) {
        case "1":
            await criarTarefa()
            break
        case "2":
            await VisualizarTodasTarefas()
            break
        case "3":
            await VisualizarTarefasConcluidas()
            break
        case "4":
            await VisualizarTarefasNaoConcluidas()
            break
        case "5":
            await concluirTarefas()
            break
        case "6":
            console.log("saindo do MENU! ")
            break
        default:
            console.log("Opção invalida!. Tente outra opção... ")
    }
}
while (opcao !== "6")