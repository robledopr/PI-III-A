class No { // Cada nó armazena um aluno e aponta para o próximo nó, formando uma lista encadeada
    constructor(dado) {
        this.dado = dado;
        this.proximo = null;
    }
}
// A classe ListaEncadeada representa a lista encadeada de alunos
// Ela possui métodos para adicionar, remover, encontrar e exibir alunos
class ListaEncadeada {
    constructor() {
        this.head = null;
    }

    // Adicionar um novo aluno à lista, garantindo que o CPF não seja duplicado
    adicionarAluno(aluno) {
        if (this.encontrarAlunoPorCPF(aluno.cpf)) {
            console.log("Aluno com este CPF já existe.");
            return;
        }
        
        const novoNo = new No(aluno);
        if (!this.head) {
            this.head = novoNo;
        } else {
            let atual = this.head;
            while (atual.proximo) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
    }

    // Exibir todos os alunos da lista de forma organizada
    exibirAlunos() {
        let atual = this.head;
        while (atual) {
            console.log(`Nome: ${atual.dado.nome}, CPF: ${atual.dado.cpf}, Data de Nascimento: ${atual.dado.dataNascimento}, Turma: ${atual.dado.turma}`);
            atual = atual.proximo;
        }
    }

    // Encontrar um aluno pelo CPF
    encontrarAlunoPorCPF(cpf) {
        let atual = this.head;
        while (atual) {
            if (atual.dado.cpf === cpf) {
                return atual.dado;
            }
            atual = atual.proximo;
        }
        console.log("Aluno não encontrado."); // Mensagem de erro caso o aluno não seja encontrado
    }

    // Remover um aluno pelo CPF
    removerAlunoPorCPF(cpf) {
        if (!this.head) return;

        if (this.head.dado.cpf === cpf) { // Rremover o primeiro nó, se o CPF for igual o passado como argumento, o head passa a ser o próximo nó
            this.head = this.head.proximo;
            return;
        }

        let atual = this.head;
        while (atual.proximo && atual.proximo.dado.cpf !== cpf) { // Procurar o nó a ser removido
            atual = atual.proximo;
        }

        if (atual.proximo) { // Se o nó a ser removido for encontrado, o próximo nó do nó atual passa a ser o próximo nó do nó a ser removido
            atual.proximo = atual.proximo.proximo;
        }
    }

    // Contar a quantidade de alunos na lista
    contarAlunos() {
        let atual = this.head;
        let contador = 0;
        while (atual) {
            contador++;
            atual = atual.proximo;
        }
        return contador;
    }

    // Atualizar os dados de um aluno pelo CPF
    atualizarAlunoPorCPF(cpf, novosDados) {
        let atual = this.head;
        while (atual) {
            if (atual.dado.cpf === cpf) {
                atual.dado = { ...atual.dado, ...novosDados }; // Atualiza os dados do aluno com os novos dados fornecidos
                return true;
            }
            atual = atual.proximo;
        }
        return false;
    }

    // Filtrar alunos por turma
    filtrarPorTurma(turma) {
        let atual = this.head;
        let alunosTurma = [];
        let contador = 0;
        while (atual) {
            if (atual.dado.turma === turma) { // Verifica se o aluno pertence à turma passada como argumento
                alunosTurma.push(atual.dado); // Adiciona o aluno à lista de alunos da turma
                contador++;
            }
            atual = atual.proximo;
        }
        if(contador > 0){
            return alunosTurma;
        }else{
            return "Nenhum aluno encontrado nesta turma.";
        }
    
    }
}

// Alguns exemplos de uso 
const listaAlunos = new ListaEncadeada();

listaAlunos.adicionarAluno({ nome: "Robledo", cpf: "12345678900", dataNascimento: "01-10-2000", turma: "A" });
listaAlunos.adicionarAluno({ nome: "Rogério", cpf: "98765432100", dataNascimento: "25-10-1980", turma: "B" });
listaAlunos.adicionarAluno({ nome: "Gian", cpf: "11111111111", dataNascimento: "25-10-1980", turma: "B" });

console.log("Todos os alunos:");
listaAlunos.exibirAlunos();

console.log("Total de alunos:", listaAlunos.contarAlunos());

console.log("Encontrar aluno pelo CPF:");
console.log(listaAlunos.encontrarAlunoPorCPF("11111111111"));

console.log("Atualizar dados do aluno Robledo:");
listaAlunos.atualizarAlunoPorCPF("12345678900", { turma: "C" });
listaAlunos.exibirAlunos();

console.log("Remover aluno pelo CPF:");
listaAlunos.removerAlunoPorCPF("12345678900");

console.log("Todos os alunos após remoção:");
listaAlunos.exibirAlunos();

console.log("Filtrar alunos da turma B:");
console.log(listaAlunos.filtrarPorTurma("B"));
