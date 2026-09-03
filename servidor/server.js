const express = require("express");
const pacientes = require("../dados.json")

const mostrarPacientes = (req, res) => {
    calcularIMC()
    res.send(pacientes)
}
const novoPacientes = (req, res) => {
    if (req.body) {
        res.send("IMC em analise")
        pacientes.push(req.body)
    } else {
        res.send("Erro ao receber IMC")
    }
}

const calcularIMC = ()=>{
    pacientes.forEach(p=>{
        p.IMC = p.peso / (p.altura * p.altura)
    })
};

const listarPacientes = (req, res) => {
    calcularIMC()
    res.send(pacientes)

}

const excluirPacientes = (req, res) =>{
    const id = req.params.id;

    pacientes.forEach((paciente, indice) => {
        if(paciente.id == id){
            pacientes.splice(indice, 1);
        }
    });

    res.send("Paciente excluido com sucesso!")
};

const atualizarPacientes = (req, res) => {
   const id = req.query.id;
   const dados = req.body;

   pacientes.forEach((paciente) =>{
    if(paciente.id == id){
        paciente.nome = dados.nome;
        paciente.paciente = dados.paciente;
        paciente.altura = dados.altura;
        paciente.peso = dados.peso;
    }
   });

   res.send("Paciente atualizado com sucesso!");
};

const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", listarPacientes)
app.post("/", novoPacientes)
app.delete("/:id", excluirPacientes)
app.patch("/", atualizarPacientes)

app.listen(PORT, () => {
     console.log(`Servidor http://127.0.0.1:${PORT}`)
})