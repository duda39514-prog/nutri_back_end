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

const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", listarPacientes)
app.post("/", novoPacientes)

app.listen(PORT, () => {
     console.log(`Servidor http://127.0.0.1:${PORT}`)
})