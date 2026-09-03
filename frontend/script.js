async function buscarFilmes() {
    // acessar a rota GET do backend, trazer os filmes e mostrar os filmes na tela
    const resposta = await fetch("https://filmes-vert-theta.vercel.app/") // resposta do backend
    const filmes = await resposta.json() // converte a resposta num objeto JS
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        console.log(filme)
        sectionFilmes.innerHTML += `
                    <div>
                        <h2>${filme.title}</h2>
                        <p><strong>Gênero:</strong> ${filme.genre}</p>
                        <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                        <p><strong>Classificação indicativa:</strong> ${filme.age_rating > 0 ? filme.age_rating + ' anos' : 'Livre'}</p>
                    </div>
                `
    })
}

buscarFilmes()