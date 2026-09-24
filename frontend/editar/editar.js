const API = "https://filmes-vert-theta.vercel.app"

const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id")

async function carregarFilme() {
    const resposta = await fetch(`${API}/`)
    const filmes = await resposta.json()

    const filme = filmes.find((filme) => filme.id == id)

    if (!filme) {
        alert("Filme não encontrado!")
        return
    }

    document.getElementById("title").value = filme.title
    document.getElementById("gender").value = filme.genre
    document.getElementById("ageLimit").value =
        filme.age_rating === "Livre" ? 0 : filme.age_rating

    document.getElementById("duration").value = filme.duration
}

async function atualizarFilme(event) {
    event.preventDefault()

    const title = document.getElementById("title").value
    const gender = document.getElementById("gender").value
    const ageLimit = Number(
        document.getElementById("ageLimit").value
    )
    const duration = Number(
        document.getElementById("duration").value
    )

    const filmeAtualizado = {
        title,
        gender,
        ageLimit,
        duration
    }

    const resposta = await fetch(
        `${API}/update/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filmeAtualizado)
        }
    )

    const mensagem = await resposta.json()

    console.log(mensagem)
    
    alert(mensagem.message)

    if (resposta.ok) {
        window.location.href = "../index.html"
    }
}

document
    .getElementById("form-editar")
    .addEventListener("submit", atualizarFilme)

carregarFilme()