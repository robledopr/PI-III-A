
const mysql = require('mysql2');

// ======= CONEXÃO COM MYSQL =======

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha_aqui',
  database: 'instituto'
});

// ======= CLASSES DA LISTA ENCADEADA =======
class No {
    constructor(dado) {
        this.dado = dado;
        this.proximo = null;
    }
}

class ListaEncadeada {
    constructor() {
        this.head = null;
    }

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

    exibirAlunos() {
        let atual = this.head;
        while (atual) {
            console.log(`Nome: ${atual.dado.nome}, CPF: ${atual.dado.cpf}, Data de Nascimento: ${atual.dado.dataNascimento}, Turma: ${atual.dado.turma}`);
            atual = atual.proximo;
        }
    }

    encontrarAlunoPorCPF(cpf) {
        let atual = this.head;
        while (atual) {
            if (atual.dado.cpf === cpf) {
                return atual.dado;
            }
            atual = atual.proximo;
        }
        return null;
    }

    removerAlunoPorCPF(cpf) {
        if (!this.head) return;

        if (this.head.dado.cpf === cpf) {
            this.head = this.head.proximo;
            return;
        }

        let atual = this.head;
        while (atual.proximo && atual.proximo.dado.cpf !== cpf) {
            atual = atual.proximo;
        }

        if (atual.proximo) {
            atual.proximo = atual.proximo.proximo;
        }
    }

    contarAlunos() {
        let atual = this.head;
        let contador = 0;
        while (atual) {
            contador++;
            atual = atual.proximo;
        }
        return contador;
    }

    atualizarAlunoPorCPF(cpf, novosDados) {
        let atual = this.head;
        while (atual) {
            if (atual.dado.cpf === cpf) {
                atual.dado = { ...atual.dado, ...novosDados };
                return true;
            }
            atual = atual.proximo;
        }
        return false;
    }

    filtrarPorTurma(turma) {
        let atual = this.head;
        let alunosTurma = [];
        while (atual) {
            if (atual.dado.turma === turma) {
                alunosTurma.push(atual.dado);
            }
            atual = atual.proximo;
        }
        return alunosTurma.length > 0 ? alunosTurma : "Nenhum aluno encontrado nesta turma.";
    }

    // Novo método: retorna todos os alunos em formato de array
    paraArray() {
        let atual = this.head;
        const resultado = [];
        while (atual) {
            resultado.push(atual.dado);
            atual = atual.proximo;
        }
        return resultado;
    }
}

// ======= INSERINDO ALUNOS NA LISTA =======
const listaAlunos = new ListaEncadeada();

listaAlunos.adicionarAluno({ nome: "Robledo2", cpf: "12345678910", dataNascimento: "2000-10-01", turma: "A" });
listaAlunos.adicionarAluno({ nome: "Rogério2", cpf: "98765432120", dataNascimento: "1980-10-25", turma: "B" });
listaAlunos.adicionarAluno({ nome: "Gian2", cpf: "11191111111", dataNascimento: "1980-10-25", turma: "B" });

console.log("Todos os alunos:");
listaAlunos.exibirAlunos();



// ======= SALVAR NO BANCO DE DADOS =======
const salvarNoBanco = () => {
    const alunos = listaAlunos.paraArray();
    alunos.forEach(aluno => {
        const query = `INSERT INTO alunos (nome, cpf, data_nascimento, turma) VALUES (?, ?, ?, ?)`;
        connection.execute(query, [aluno.nome, aluno.cpf, aluno.dataNascimento, aluno.turma], (err, results) => {
            if (err) {
                console.error("Erro ao inserir:", err);
            } else {
                console.log("Aluno inserido:", aluno.nome);
            }
        });
    });

    // Fecha a conexão após um pequeno delay
    setTimeout(() => connection.end(), 2000);
};

salvarNoBanco();
