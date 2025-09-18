
// Array global para armazenar os nomes dos amigos
let amigos = [];

/**
 * Adiciona um novo amigo à lista.
 * Esta função é chamada pelo botão "Adicionar".
 */
function adicionarAmigo() {
    // 1. Pega o valor do campo de input com o ID 'amigo'
    let nomeAmigo = document.getElementById('amigo').value;

    // 2. Valida a entrada: verifica se o campo está vazio ou contém apenas espaços em branco
    if (nomeAmigo.trim() === '') {
        alert('Por favor, digite um nome válido para adicionar.');
        return; // Sai da função para não adicionar um nome vazio
    }

    // 3. Adiciona o nome à array 'amigos' (removendo espaços extras no início e fim)
    amigos.push(nomeAmigo.trim());

    // 4. Atualiza a lista visual na página
    let listaAmigos = document.getElementById('listaAmigos');
    // Limpa a lista existente antes de reconstruí-la para evitar duplicatas
    listaAmigos.innerHTML = '';
    
    // Itera sobre a array 'amigos' para criar um novo item de lista para cada nome
    amigos.forEach(amigo => {
        let li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
    
    // 5. Limpa o campo de input após adicionar o nome
    document.getElementById('amigo').value = '';
}

/**
 * Realiza o sorteio do Amigo Secreto.
 * Esta função é chamada pelo botão "Sortear amigo".
 */
function sortearAmigo() {
    // 1. Valida a quantidade de participantes
    if (amigos.length < 4) {
        alert('Para um sorteio de Amigo Secreto, você precisa de pelo menos 4 participantes!');
        return; // Sai da função se não houver participantes suficientes
    }

    // 2. Embaralha a array 'amigos' para garantir um sorteio aleatório e justo
    embaralhar(amigos);

    // 3. Exibe o resultado do sorteio na página
    let resultado = document.getElementById('resultado');
    // Limpa o resultado anterior
    resultado.innerHTML = '';

    // 4. Cria os pares de Amigo Secreto e os exibe
    // O loop percorre a lista de amigos para criar os pares (quem tira e quem recebe)
    for (let i = 0; i < amigos.length; i++) {
        let doador = amigos[i];
        
        // Se for o último da lista, ele tira o primeiro amigo da array
        // Caso contrário, ele tira o próximo amigo na sequência
        let recebedor = amigos[i + 1] ? amigos[i + 1] : amigos[0];

        // Cria o elemento <li> para exibir o par no formato "Doador -> Recebedor"
        let itemResultado = document.createElement('li');
        itemResultado.innerHTML = `${doador} &rArr; ${recebedor}`; // Usa a seta HTML para melhor visual
        itemResultado.setAttribute('role', 'listitem'); // Adiciona um atributo para acessibilidade
        resultado.appendChild(itemResultado);
    }
}

/**
 * Função utilitária para embaralhar uma array.
 * Implementa o algoritmo de Fisher-Yates, que é eficiente e garante um embaralhamento justo.
 * @param {Array} lista - A array a ser embaralhada.
 */
function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Troca os elementos de posição para embaralhar a array
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
}