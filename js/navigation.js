let topics = [];
let currentTopicIndex = -1;

const topicListElement = document.getElementById('topic-list');
const mainContentElement = document.getElementById('main-content');
const loaderElement = document.getElementById('content-loader');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

async function init() {
    try {
        const response = await fetch('content/topics.json');
        topics = await response.json();
        renderSidebar();
        handleInitialNavigation();
    } catch (error) {
        console.error('Erro ao carregar tópicos:', error);
    }
}

function renderSidebar() {
    topicListElement.innerHTML = '';
    topics.forEach((topic, index) => {
        const li = document.createElement('li');
        li.className = 'topic-item';
        if (topic.completed) li.classList.add('completed');
        li.textContent = topic.title;
        li.dataset.id = topic.id;
        li.addEventListener('click', () => navigateToTopic(index));
        topicListElement.appendChild(li);
    });
}

async function navigateToTopic(index) {
    if (index < 0 || index >= topics.length) return;

    currentTopicIndex = index;
    const topic = topics[index];

    // Atualizar Hash sem recarregar
    window.location.hash = topic.id;

    // Atualizar UI da Sidebar
    document.querySelectorAll('.topic-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Carregar Conteúdo
    await loadTopicContent(topic.id);

    // Atualizar Botões de Navegação
    updateNavButtons();
}

async function loadTopicContent(id) {
    loaderElement.style.display = 'block';
    mainContentElement.style.opacity = '0.5';

    try {
        const response = await fetch(`content/${id}.json`);
        if (!response.ok) throw new Error('Falha ao carregar conteúdo');

        const content = await response.json();
        renderContent(content);
    } catch (error) {
        mainContentElement.innerHTML = `
            <div class="error-screen">
                <h2>Ops! Tópico em construção.</h2>
                <p>O conteúdo para "${id}" ainda não foi adicionado.</p>
            </div>
        `;
    } finally {
        loaderElement.style.display = 'none';
        mainContentElement.style.opacity = '1';
        mainContentElement.scrollTo(0, 0);
    }
}

function renderContent(content) {
    let imagesHTML = '';
    if (content.images && content.images.length > 0) {
        imagesHTML = `
            <section class="image-gallery">
                ${content.images.map((img, index) => `
                    <div class="image-viewer-container" id="zoom-container-${index}">
                        <img src="${img}" id="zoom-img-${index}" class="zoomable-image" alt="Visualização Didática">
                        <div class="zoom-controls">
                            <button class="zoom-btn" onclick="window.zoomIn(${index})">+</button>
                            <button class="zoom-btn" onclick="window.zoomOut(${index})">−</button>
                            <button class="zoom-btn" onclick="window.zoomReset(${index})">⟲</button>
                        </div>
                    </div>
                    <p class="image-caption">Dica: Use o mouse para arrastar e a roda para dar zoom.</p>
                `).join('')}
            </section>
        `;
    }

    mainContentElement.innerHTML = `
        <h1>${content.title}</h1>
        
        <div class="context-grid">
            <section class="card card-pain">
                <h3>🤕 A DOR</h3>
                <p>${content.pain}</p>
            </section>
            <section class="card card-cure">
                <h3>✨ A CURA</h3>
                <p>${content.cure}</p>
            </section>
        </div>

        ${imagesHTML}

        <div class="explanation">
            ${marked.parse(content.explanation)}
        </div>

        <section class="code-section">
            <div class="code-container">
                <div class="code-header">
                    <span>${content.codeFile || 'Exemplo de Código'}</span>
                    <a href="${content.githubUrl}" target="_blank" class="github-link">Ver no GitHub</a>
                </div>
                <pre><code id="code-block">${escapeHTML(content.code)}</code></pre>
            </div>
        </section>
    `;

    // Inicializar controles de zoom
    if (content.images) {
        window.zoomControllers = content.images.map((img, index) => {
            return window.initZoomController(`zoom-container-${index}`, `zoom-img-${index}`);
        });

        // Helpers globais para os botões
        window.zoomIn = (i) => window.zoomControllers[i].zoom(1.2);
        window.zoomOut = (i) => window.zoomControllers[i].zoom(0.8);
        window.zoomReset = (i) => window.zoomControllers[i].reset();
    }

    // Reinicializar interatividade de código se houver
    if (window.initCodeInteraction) window.initCodeInteraction();
}

function updateNavButtons() {
    prevBtn.disabled = currentTopicIndex <= 0;
    nextBtn.disabled = currentTopicIndex >= topics.length - 1;
}

prevBtn.addEventListener('click', () => navigateToTopic(currentTopicIndex - 1));
nextBtn.addEventListener('click', () => navigateToTopic(currentTopicIndex + 1));

function handleInitialNavigation() {
    const hash = window.location.hash.replace('#', '');
    const index = topics.findIndex(t => t.id === hash);
    if (index !== -1) {
        navigateToTopic(index);
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}

// Inicializar
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    const index = topics.findIndex(t => t.id === hash);
    if (index !== -1 && index !== currentTopicIndex) {
        navigateToTopic(index);
    }
});

init();
