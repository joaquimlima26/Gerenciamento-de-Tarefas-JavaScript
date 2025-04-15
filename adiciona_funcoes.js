import fs from "fs/promises"
import promptSync from "prompt-sync"

const prompt = promptSync()
const caminhoAteArquivo = "./tarefas.json"

export async function mostrarMenu() {

  let opcao = ''
  do{
    console.log(`
        1. Criar uma nova tarefa:

          - ○ O usuário deve fornecer um título e uma descrição.
          - ○ O sistema deve atribuir um id automaticamente (o maior id
          - existente + 1).
          - ○ A tarefa será salva no arquivo tarefas.json.

        2. Visualizar todas as tarefas:

          - ○ Exibir todas as tarefas cadastradas no arquivo tarefas.json.

        3. Visualizar apenas tarefas concluídas:

          - ○ Filtrar e exibir apenas as tarefas cujo status concluida seja
        true.

        4. Visualizar apenas tarefas não concluídas:

          - ○ Filtrar e exibir apenas as tarefas cujo status concluida seja
        false.

        5. Concluir uma tarefa:

          - ○ O usuário informa o id da tarefa que deseja concluir.
          - ○ O sistema atualiza a tarefa correspondente, alterando o status
          concluida para true.
          - ○ O arquivo tarefas.json é atualizado com essa modificação.

        6. Sair:

          - Finaliza a execução do programa.

  `)

  opcao = prompt("Qual opção deseja? ")
  
    switch(opcao){
      case "1":
         await  criarTarefa()
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
while(opcao !== "6")
}

export async function lerTarefas() {
  try{
  const dados = await fs.readFile(caminhoAteArquivo, "utf-8")
  return JSON.parse(dados)
}catch(error){
  console.error(`Erro ao ler o arquivo: ${error.message}`)
  return undefined
}
}

export async function salvarTarefas(tarefas) {
  const salvandoTarefa = JSON.stringify(tarefas, "", 2)

  try{
  await fs.writeFile(caminhoAteArquivo,  salvandoTarefa, "utf-8")
  console.log("Arquivo atualizado com sucesso! ")
  }catch(error){
      console.log("Erro ao escrever no arquivo: ", error)
  }
}

export async function criarTarefa() {
  const titulo = prompt('Digite o título da tarefa: ')
  const descricao = prompt('Digite a descrição da tarefa: ') 

    const tarefas = await lerTarefas()

    const novoId = tarefas.length + 1

    const novaTarefa = {
      id: novoId,
      titulo: titulo,
      descricao: descricao,
      concluida: false
    }
    tarefas.push(novaTarefa)
    await salvarTarefas(tarefas)
}


export async function VisualizarTodasTarefas() {

const mostrarTarefa = await lerTarefas()

console.log(mostrarTarefa)

}

export async function VisualizarTarefasConcluidas() {
  const tarefas = await lerTarefas()
  const concluida = tarefas.filter(elemen => elemen.concluida == true )
  console.log(concluida)
}

export async function VisualizarTarefasNaoConcluidas() {
  const tarefas = await lerTarefas()
  const naoConcluida = tarefas.filter(elemen => elemen.concluida == false )
  console.log(naoConcluida)
}

export async function concluirTarefas() {
  const idAtualizado = prompt("Diga o id da tarefa que deseja concluir: ")

  const tarefas = await lerTarefas()
  
  const tarefa = tarefas.find(eleme => eleme.id === parseInt(idAtualizado)) 
    if(tarefa){
      tarefa.concluida = true
      await salvarTarefas(tarefas)
      console.log("Tarefa concluida! ")
    }else{
      console.log("Tarefa nao concluida! ")
    }
}