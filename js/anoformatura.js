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
        const anosOrdenados = ordenarAnosDesc(data.Plan1);
        console.log('Anos Ordenados:', anosOrdenados);
        const cursoSelecionado = sessionStorage.getItem('cursoSelecionado');
        const cursoSelecionadoElement = document.getElementById('cursoSelecionado');
        //

        //
        const h2curso = document.createElement('h1');
        h2curso.className = 'text-center';
        h2curso.id = 'cursoHeader'; // Adiciona um ID para fácil seleção
        h2curso.textContent = `Curso de Graduação em ${cursoSelecionado}`;
        cursoSelecionadoElement.appendChild(h2curso);
        //

        criarBotoesAno(anosOrdenados);
        ajustarTamanhoBotoes(); // Ajustar o tamanho dos botões após serem criados

        // Adicionando o botão de "Voltar" flutuante
        criarBotaoVoltar()
        criarBotaoVoltarAoTopo()

    })
    .catch(error => {
        console.error('Erro ao carregar o arquivo JSON:', error);
    });

function criarBotaoVoltar() {

    // Cria o botão de "Voltar"
    const voltarButton = document.createElement('button');
    voltarButton.className = 'btn btn-secondary m-4 btn-lg'; // Classe Bootstrap para estilização
    voltarButton.textContent = 'Voltar';

    // Adiciona estilo para posicionar o botão como flutuante
    voltarButton.style.position = 'fixed';
    voltarButton.style.bottom = '0.01px';
    voltarButton.style.left = '1rem';
    voltarButton.style.zIndex = '1000';
    voltarButton.style.ariaLabel = 'Botão de voltar para a pagina de lista de cursos do Instituto Geociencias.'

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

// Organizar palavras e deixar em primeira letra maiuscula.
function capitalizeW(str) {
    return str.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
}

// Função para a pagina lista de anos
function ordenarAnosDesc(dados) {
    const cursoSelecionado = sessionStorage.getItem('cursoSelecionado');

    const anosFiltrados = dados.filter(item => capitalizeW(item.curso.trim()) === cursoSelecionado)
                                .map(item => capitalizeW(item.ano_formatura.trim()));

    // Extrair anos de formatura únicos
    const anosUnicos = Array.from(new Set(anosFiltrados));

    // Ordenar anos de forma decrescente
    anosUnicos.sort((a, b) => b - a);
    // console.log('Anos filtrados e ordenados:', anosUnicos);
    return anosUnicos;
}

// Função para a pagina lista de anos
function criarBotoesAno(anos) {
    const buttonContainer = document.getElementById('buttonContainer');

    anos.forEach(ano => {

        // Cria um botão para cada ano de formatura
        const button = document.createElement('button');
        button.className = 'btn btn-primary btn-lg m-2 custom-btn'; // Classe Bootstrap para estilização básica
        button.textContent = `${ano}`;  // Texto do botão
        button.id = `${ano}`;

        button.onclick = () => {
            const anoSelecionado = ano;
            sessionStorage.setItem('anoSelecionado', anoSelecionado);
            console.log(anoSelecionado);

            fetch('../pages/alunos.html')  // Caminho para o arquivo HTML
                .then(response => response.text())  // Converte a resposta para texto
                .then(data => {

                    // Limpa o conteúdo existente dentro de #fetching
                    document.getElementById('fetching').innerHTML = ''

                    // Remove o script anterior, se existir
                    const existingScript = document.querySelector('script[src="./js/anoformatura.js"]')
                    if (existingScript) {
                        existingScript.remove()
                    }

                    // Cria e insere dinamicamente um elemento <script> para carregar anoformatura.js
                    const script = document.createElement('script');
                    script.src = './js/listaalunos.js';
                    script.async = true; // Adiciona o atributo defer
                    document.body.appendChild(script);

                    // Insere o conteúdo do anoformatura.html
                    document.getElementById('fetching').innerHTML = data;
                })
                .catch(error => {
                    console.error('Erro ao carregar o arquivo HTML dos alunos:', error);
                });
        };
        buttonContainer.appendChild(button);
    });
}

function ajustarTamanhoBotoes() {
    const buttons = document.querySelectorAll('#buttonContainer button');
    if (buttons.length > 0) {
        let maxWidth = 0;

        // Encontra a largura máxima entre os botões
        buttons.forEach(button => {
            const width = button.offsetWidth;
            if (width > maxWidth) {
                maxWidth = width;
            }
        });

        // Define a largura máxima para todos os botões
        buttons.forEach(button => {
            button.style.width = `${maxWidth}px`;
        });
    }
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

