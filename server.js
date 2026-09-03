import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03MB"
})

app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_LorenaMendesRakelyDias"

    sql.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ message: "Erro ao buscar filmes", error })
        }

        response.json(data)
    })
})

app.post("/create", (request, response) => {
    const { title, gender, ageLimit, duration } = request.body

    const insertCommand = "INSERT INTO filmes_LorenaMendesRakelyDias(title, gender, ageLimit, duration) VALUES (?, ?, ?, ?)"

    sql.query(insertCommand, [title, gender, ageLimit, duration], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ message: "Erro ao cadastrar filme", error })
        }

        response.status(201).json({
            message: "Filme cadastrado com sucesso!"
        })
    })
})

app.delete("/delete/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_LorenaMendesRakelyDias WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ message: "Erro ao apagar filme", error })
        }

        response.json({
            message: "Filme apagado com sucesso!"
        })
    })
})

app.put("/update/:id", (request, response) => {
    const { id } = request.params
    const { title, gender, ageLimit, duration } = request.body

    const updateCommand = "UPDATE filmes_LorenaMendesRakelyDias SET title = ?, gender = ?, ageLimit = ?, duration = ? WHERE id = ?"

    sql.query(updateCommand, [title, gender, ageLimit, duration, id], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ message: "Erro ao alterar filme", error })
        }

        response.json({
            message: "Filme alterado com sucesso!"
        })
    })
})

export default app