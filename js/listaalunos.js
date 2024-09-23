console.log('DOM completamente carregado e analisado anoformatura.js, arquivo anoformatura.js');
fetch('./json/dados.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        return response.json();
    })
    .then(data => {
        // console.log('Dados JSON carregados:', data);

        const anoSelecionado = sessionStorage.getItem('anoSelecionado');
        carregarAlunos(anoSelecionado);

        // Adicionando o botão de "Voltar" flutuante
        criarBotaoVoltar();
        criarBotaoVoltarAoTopo();


    })
    .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
    });

function criarBotaoVoltar() {

    // Cria o botão de "Voltar"
    const voltarButton = document.createElement('button');
    voltarButton.className = 'btn btn-secondary m-4 btn-lg '; // Classe Bootstrap para estilização
    voltarButton.textContent = 'Voltar';

    // Adiciona estilo para posicionar o botão como flutuante
    voltarButton.style.position = 'fixed';
    voltarButton.style.bottom = '0.01px';
    voltarButton.style.left = '1rem';
    voltarButton.style.zIndex = '1000';
    voltarButton.style.ariaLabel = 'Botão Voltar para a pagina de lista de ano de formatura do respectivo curso selecionado.'

    voltarButton.onclick = () => {

        if (sessionStorage.getItem('anoSelecionado') !== null && sessionStorage.getItem('cursoSelecionado') !== null ) {
            sessionStorage.removeItem('anoSelecionado');
            // Exemplo de fetch ao clicar no botão "Voltar"
            fetch('../pages/anoformatura.html')  // Caminho para o arquivo HTML
            .then(response => response.text())  // Converte a resposta para texto
            .then(data => {

                // Limpa o conteúdo existente dentro de #fetching
                document.getElementById('fetching').innerHTML = ''

                // Remove o script anterior, se existir
                const existingScript = document.querySelector('script[src="./js/curso.js"]')

                if (existingScript) {
                    existingScript.remove();
                }

                // Cria e insere dinamicamente um elemento <script> para carregar anoformatura.js
                const script = document.createElement('script');
                script.src = './js/anoformatura.js';
                script.async = true; // Adiciona o atributo defer
                document.body.appendChild(script);
                
                // Insere o conteúdo do anoformatura.html
                document.getElementById('fetching').innerHTML = data;
                
            })
               
        } else {
            sessionStorage.removeItem('cursoSelecionado');

            // Exemplo de fetch ao clicar no botão "Voltar"
            fetch('../index.html')  // Caminho para o arquivo HTML
            .then(response => response.text())  // Converte a resposta para texto
            .then(data => {

                // Remove o script anterior, se existir
                const existingScript = document.querySelector('script[src="./js/anoformatura.js"]')
                if (existingScript) {
                    existingScript.remove()
                }

                // Cria e insere dinamicamente um elemento <script> para carregar anoformatura.js
                const script = document.createElement('script');
                script.src = './js/curso.js';
                script.async = true; // Adiciona o atributo defer
                document.body.appendChild(script);
                
                // Insere o conteúdo do anoformatura.html
                document.documentElement.innerHTML = data;

            })
        }
    }

    // Adiciona o botão ao body do documento
    document.body.appendChild(voltarButton);
}


function criarBotaoVoltarAoTopo(){
    // Criar o botão
    const voltarAoTop = document.createElement('button');
    voltarAoTop.id = 'btnVoltarTopo';
    voltarAoTop.className = 'btn btn-primary';
    voltarAoTop.title = "Voltar ao topo";
    voltarAoTop.innerHTML = '&#8679; Topo';

    // Estilizar o botão dinamicamente
    voltarAoTop.style.position = 'fixed';
    voltarAoTop.style.bottom = '20px';
    voltarAoTop.style.right = '30px';
    voltarAoTop.style.display = 'none';
    voltarAoTop.style.zIndex = '99';
    voltarAoTop.style.border = 'none';
    voltarAoTop.style.outline = 'none';
    voltarAoTop.style.cursor = 'pointer';
    voltarAoTop.style.padding = '15px';
    voltarAoTop.style.borderRadius = '50px';
    // voltarAoTop.style.backgroundColor = '#007bff';
    voltarAoTop.style.backgroundColor = '#203258';
    voltarAoTop.style.color = 'white';

    // Adicionar o botão ao body
    document.body.appendChild(voltarAoTop);

    // Mostrar o botão quando a página for rolada
    window.onscroll = function(){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
            voltarAoTop.style.display = 'block'; // Mostrar o botão
        } else {
            voltarAoTop.style.display = 'none'; // Esconder o botão
        }
    };

    // Quando o botão for clicado, voltar ao topo suavemente
    voltarAoTop.onclick = function(){
        window.scrollTo({ top:0, behavior: 'smooth'});
    };

}

// Organizar palavras e deixar em primeira letra maiuscula.
function capitalizeW(str) {
    return str.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
}

function carregarAlunos(anoSelecionado) {
    fetch('./json/dados.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da rede');
            }
            return response.json();
        })
        .then(data => {
            //
            const elemento = document.querySelector("#titulo");
            if(elemento){
                elemento.remove();
            }

            //
            // Pegar o ano selecionado salvo no sessionStorage
            const anoSelecionado = sessionStorage.getItem('anoSelecionado');

            // Pegar o curso selecionado salvo no sessionStorage
            const cursoSelecionado = sessionStorage.getItem('cursoSelecionado');
            console.log(cursoSelecionado)

            // Adicionando agora titulo
            const cursoSelecionado1 = sessionStorage.getItem('cursoSelecionado');
            const cursoSelecionadoElement1 = document.getElementById('fetching1');
            const h2curso1 = document.createElement('h2');
            h2curso1.className = 'text-center';
            h2curso1.id = 'cursoHeader'; // Adiciona um ID para fácil seleção
            h2curso1.textContent = `Formados em ${cursoSelecionado1} ${anoSelecionado}/1 e ${anoSelecionado}/2`;
            cursoSelecionadoElement1.appendChild(h2curso1);

            const anoPeriodoSelecionado = "1° e 2°";
            
            let formacao = "";
            if (cursoSelecionado == "Geologia"){
                formacao = "Geologo";
            } else if (cursoSelecionado == "Geofísica"){
                formacao = "Geofísico";
            } else if (cursoSelecionado == "Ciências Ambientais"){
                formacao = "Cientista Ambiental";
            }

            console.log(formacao);
            
            // Faz o filtro dos alunos do ano e curso selecionados
            const alunosDoAno = data.Plan1.filter(item => {
                return capitalizeW(item.ano_formatura.trim()) == anoSelecionado && capitalizeW(item.curso.trim()) == cursoSelecionado;
            });

            //Primeira tabela
            let alunosHTMLTable = '<table class="list-group-item text-center d-inline-flex border-0">';
            alunosHTMLTable += '<thead>';
            alunosHTMLTable += '<tr>';
            // alunosHTMLTable += '<td>';
            // alunosHTMLTable += '<th class="list-group-item fs-4 border-0">Ano:</th>';
            // alunosHTMLTable += `<td class="list-group-item border-0">${anoSelecionado}</td>`;
            // alunosHTMLTable += '</td>';
            // alunosHTMLTable += '<td>';
            // alunosHTMLTable += '<th class="list-group-item border-0">Periodo:</th>';
            // alunosHTMLTable += `<td class="list-group-item border-0">${anoPeriodoSelecionado}</td>`;
            // alunosHTMLTable += '<td>';
            alunosHTMLTable += '</tr>';
            alunosHTMLTable += '</thead>';

            alunosHTMLTable += '<tbody>';
            alunosHTMLTable += '<tr>';
            alunosHTMLTable += `<th class="list-group-item border-0 h3" colspan="4">${formacao}:</th>`;
            alunosHTMLTable += '</tr>';

            alunosDoAno.forEach(aluno => {
                alunosHTMLTable += '<tr colspan="4">'; // Adiciona uma linha para cada aluno
                alunosHTMLTable += `<td class="list-group-item border-0" colspan="4">${capitalizeW(aluno.nome.trim())}</td>`;
                alunosHTMLTable += '</tr>';
            });

            alunosHTMLTable += '</tbody>';
            alunosHTMLTable += '</table>';
            //

            // //Segunda tabela
            // let alunosHTMLTable2 = '<table class="list-group-item text-center d-inline-flex">';
            // alunosHTMLTable2 += '<thead>';
            // alunosHTMLTable2 += '<tr>';
            // alunosHTMLTable2 += '<td>';
            // alunosHTMLTable2 += '<th class="list-group-item fs-4">Ano:</th>';
            // alunosHTMLTable2 += `<td class="list-group-item">${anoSelecionado}</td>`;
            // alunosHTMLTable2 += '</td>';
            // alunosHTMLTable2 += '<td>';
            // alunosHTMLTable2 += '<th class="list-group-item">Periodo:</th>';
            // alunosHTMLTable2 += `<td class="list-group-item">${anoPeriodoSelecionado}</td>`;
            // alunosHTMLTable2 += '<td>';
            // alunosHTMLTable2 += '</tr>';
            // alunosHTMLTable2 += '</thead>';

            // alunosHTMLTable2 += '<tbody>';
            // alunosHTMLTable2 += '<tr>';
            // alunosHTMLTable2 += `<th class="list-group-item" colspan="4">${formacao}:</th>`;
            // alunosHTMLTable2 += '</tr>';

            // alunosDoAno.forEach(aluno => {
            //     alunosHTMLTable2 += '<tr colspan="4">'; // Adiciona uma linha para cada aluno
            //     alunosHTMLTable2 += `<td class="list-group-item" colspan="4">${capitalizeW(aluno.nome.trim())}</td>`;
            //     alunosHTMLTable2 += '</tr>';
            // });

            // alunosHTMLTable2 += '</tbody>';
            // alunosHTMLTable2 += '</table>';
            // //

            // Inserir lista de alunos no container específico de alunos
            const alunosContainer = document.getElementById('alunosContainer');
            

            //alunosContainer.insertAdjacentHTML('beforeend', alunosHTMLTable);

            
            alunosContainer.innerHTML += alunosHTMLTable;
            // alunosContainer.innerHTML += alunosHTMLTable2;
            
        })

        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON ou filtrar os alunos:', error);
        });
}

