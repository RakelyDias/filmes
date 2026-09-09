async function buscarFilmes() {
    const resposta = await fetch("https://filmes-vert-theta.vercel.app/")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.title}</h2>
                <p><strong>Gênero:</strong> ${filme.genre}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.age_rating > 0 ? filme.age_rating + ' anos' : 'Livre'}</p>

                <button onclick="apagarFilme(${filme.id})">Apagar</button>
            </div>
        `
    })
}

buscarFilmes()

async function apagarFilme(id) {
    const respostaDeSucessoAoApagar = await fetch(
        `https://filmes-vert-theta.vercel.app/delete/${id}`,
        {
            method: "DELETE"
        }
    )

    const mensagem = await respostaDeSucessoAoApagar.json()

    alert(mensagem.message)

    window.location.reload()
}