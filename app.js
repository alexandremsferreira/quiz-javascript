const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const h2 = document.querySelector('h2')
const inputsNames = [...new Set([...inputs].map(input => input.name))]
const correctAnswers = ["Uzumaki", "Iruka", "Kurama", "Konoha", "Sasuke"];

function verifyAnswers(event) {
    event.preventDefault()

    const userAnswers = []

    for (let i = 0; i < inputsNames.length; i++) {
        let answer = document.querySelector(`input[name='${inputsNames[i]}']:checked`)?.value || "Não selecionado"
        userAnswers.push(answer)
    }

    const result = correctAnswers.reduce((acc, answer, index) => {
        if (answer === userAnswers[index]) {
            acc.correct++
        } else {
            acc.incorrect++
        }

        return acc

    }, { correct: 0, incorrect: 0 })

    // Verifica se o resultado já foi exibido
    if (document.querySelector('.result')) return

    const p = document.createElement('p')
    p.textContent = `Acertos: ${result.correct} | Erros: ${result.incorrect}`
    p.style.textAlign = 'center'
    p.classList.add('h6', 'text-muted', 'result')
    
    // Feedback de acordo com a pontuação
    const feedback = document.createElement('p')
    if (result.correct === userAnswers.length) {
        feedback.textContent = 'Parabéns! Você acertou todas questões.'
        feedback.classList.add('text-success', 'text-center')
    } else {
        feedback.textContent = "Tente novamente!";
        feedback.classList.add('text-danger', 'text-center');
    }
    
    h2.insertAdjacentElement('afterend', p)
    h2.insertAdjacentElement('afterend', feedback)

    // Rola a página para o topo
    window.scrollTo(0, 0);

}

form.addEventListener("submit", verifyAnswers)
