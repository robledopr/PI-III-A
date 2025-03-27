class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    // Add a new student to the list
    addStudent(student) {
        const newNode = new Node(student);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Display all students in the list
    displayStudents() {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }

    // Find a student by CPF
    findStudentByCPF(cpf) {
        let current = this.head;
        while (current) {
            if (current.data.cpf === cpf) {
                return current.data;
            }
            current = current.next;
        }
        return null;
    }

    // Remove a student by CPF
    removeStudentByCPF(cpf) {
        if (!this.head) return;

        if (this.head.data.cpf === cpf) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next && current.next.data.cpf !== cpf) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
        }
    }
}

// Example usage
const studentsList = new LinkedList();

studentsList.addStudent({ name: "João", cpf: "12345678900", birthDate: "2000-01-01", class: "A" });
studentsList.addStudent({ name: "Maria", cpf: "98765432100", birthDate: "1999-05-15", class: "B" });

console.log("All students:");
studentsList.displayStudents();



console.log("Find student by CPF:");
console.log(studentsList.findStudentByCPF("12345678900"));

console.log("Remove student by CPF:");
studentsList.removeStudentByCPF("12345678900");

console.log("All students after removal:");
studentsList.displayStudents();