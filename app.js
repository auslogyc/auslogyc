/* ==========================================================================
   Danilo Sarmento Barros - Interactive Portfolio Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initTypingEffect();
    initProjectFilters();
    initStatCounters();
    initMobileMenu();
    initContactForm();
});

/* 1. Navbar Scroll Effect */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* 2. Dynamic Typing Effect */
function initTypingEffect() {
    const target = document.getElementById('typing-element');
    if (!target) return;

    const words = [
        'Engenharia de Software',
        'Inteligência Artificial & NLP',
        'Sistemas de Alto Desempenho',
        'Compiladores & Algoritmos'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            target.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            target.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* 3. Project Filter Buttons */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* 4. Animated Stat Counters */
function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-bar');
        if (!statsSection || animated) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = Math.ceil(target / 40);

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.innerText = count;
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
            animated = true;
        }
    });
}

/* 5. Mobile Menu Toggle */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

/* 6. Modal Details System */
const projectData = {
    liaison: {
        title: "Liaison - Plataforma de Integração Universitária",
        subtitle: "Plataforma de Impacto Social | Universidade de Brasília (UnB)",
        icon: "fa-handshake-angle",
        gradient: "linear-gradient(135deg, #008751 0%, #00f2fe 100%)",
        desc: "O Liaison é um projeto focado na conexão estratégica entre estudantes da Universidade de Brasília (UnB), organizações não governamentais (ONGs) e projetos de extensão. A plataforma viabiliza a alocação de talentos acadêmicos em demandas comunitárias reais.",
        features: [
            "Mural interativo para postagem de oportunidades de voluntariado e extensão",
            "Filtro inteligente de alunos por competências técnicas e disponibilidade",
            "Painel administrativo para ONGs gerenciarem candidaturas e projetos",
            "Arquitetura escalável com foco na experiência do usuário (UX/UI)"
        ],
        techs: ["TypeScript", "React", "Node.js", "Express", "CSS Glassmorphism", "PostgreSQL"],
        github: "https://github.com/auslogyc"
    },
    jakebot: {
        title: "JakeBot - Classificador de Sentimentos",
        subtitle: "Bot Inteligente de NLP | MDS - UnB",
        icon: "fa-robot",
        gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        desc: "Jakebot é uma solução desenvolvida para a disciplina de Métodos de Desenvolvimento de Software (MDS) na UnB. O sistema realiza mineração de textos e classifica sentenças em sentimentos Positivos, Negativos ou Neutros utilizando algoritmos de Processamento de Linguagem Natural (NLP).",
        features: [
            "Pré-processamento de texto (lemmatização, remoção de stopwords, tokenização)",
            "Classificação estatística de polaridade e subjetividade",
            "Pipeline de Integração Contínua (CI) via GitHub Actions",
            "Documentação automatizada de arquitetura e cobertura de testes"
        ],
        techs: ["Python 3", "NLP (Natural Language Processing)", "Machine Learning", "GitHub Actions", "PyTest", "Docker"],
        github: "https://github.com/unb-mds/2025_1-Jakebot"
    },
    gastos: {
        title: "Controle de Gastos Residenciais",
        subtitle: "Sistema de Gestão Financeira Doméstica",
        icon: "fa-wallet",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        desc: "Uma aplicação robusta desenvolvida em C# / .NET para automatizar o acompanhamento financeiro de orçamentos domésticos. Permite categorizar despesas, prever gastos recorrentes e gerar balanços detalhados.",
        features: [
            "Gestão de receitas, despesas fixas e variáveis por categoria",
            "Cálculo automático de saldo residual e projeção orçamentária",
            "Modelagem orientada a objetos (POO) com separação em camadas",
            "Persistência de dados eficiente com LINQ e ORM"
        ],
        techs: ["C#", ".NET 8", "Programação Orientada a Objetos (POO)", "LINQ", "Clean Architecture"],
        github: "https://github.com/auslogyc/controle-gastos-residenciais"
    },
    compiladores: {
        title: "Compiladores com Flex & Bison",
        subtitle: "Análise Léxica e Sintática | Compiladores UnB",
        icon: "fa-code-compare",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        desc: "Projeto desenvolvido na disciplina de Compiladores da UnB para o desenho e implementação de uma linguagem de programação customizada. Utiliza o Flex para tokenização e o Bison para parsing sintático baseados em gramática livre de contexto.",
        features: [
            "Analisador Léxico (Flex) com suporte a números, identificadores e operadores",
            "Analisador Sintático LALR (Bison/Yacc) com recuperação de erros",
            "Construção de Árvore Sintática Abstrata (AST) em C/C++",
            "Tabela de Símbolos com verificação de escopo e tipos"
        ],
        techs: ["C / C++", "Flex (Lexer)", "Bison (Parser)", "Teoria dos Compiladores", "Makefile"],
        github: "https://github.com/auslogyc/compiladores-flex-bison"
    },
    gces: {
        title: "GCES Individual - DevOps & Automação",
        subtitle: "Gestão de Configuração e Evolução de Software | UnB",
        icon: "fa-server",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        desc: "Projeto prático focado nas disciplinas avançadas de Engenharia de Software da UnB. Explora a automação completa do ciclo de vida de desenvolvimento, desde a criação de imagens Docker até pipelines de integração e entrega contínua.",
        features: [
            "Containerização multi-stage para otimização de imagens Docker",
            "Automação de suíte de testes unitários e medição de cobertura de código",
            "Integração contínua verificando padronização linter e builds de produção",
            "Gestão rigorosa de dependências e versionamento semântico"
        ],
        techs: ["Docker", "Docker Compose", "CI/CD Pipelines", "Testes Automatizados", "Git Flow"],
        github: "https://github.com/auslogyc/gces_individual"
    },
    ed: {
        title: "Estruturas de Dados Avançadas",
        subtitle: "Algoritmos e Estruturas de Dados | UnB",
        icon: "fa-diagram-project",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        desc: "Repositório com a implementação do zero de estruturas de dados fundamentais e avançadas para a resolução de problemas de alta complexidade computacional.",
        features: [
            "Árvores Balanceadas (AVL e Red-Black Tree)",
            "Representação de Grafos e Algoritmos de Caminho Mínimo (Dijkstra, BFS, DFS)",
            "Tabelas Hash otimizadas com tratamento dinâmico de colisões",
            "Análise de complexidade assintótica (Notação Big-O)"
        ],
        techs: ["C / C++", "Estruturas de Dados", "Algoritmos em Grafos", "Ponteiros & Alocação Dinâmica"],
        github: "https://github.com/auslogyc/Estruturas-de-Dados"
    }
};

function openProjectModal(key) {
    const modal = document.getElementById('project-modal');
    const contentArea = document.getElementById('modal-content-area');

    const data = projectData[key];
    if (!data || !modal || !contentArea) return;

    contentArea.innerHTML = `
        <div style="background: ${data.gradient}; padding: 24px; border-radius: 16px; color: #fff; margin-bottom: 24px; text-align: center;">
            <i class="fa-solid ${data.icon}" style="font-size: 3rem; margin-bottom: 12px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));"></i>
            <h2 style="font-size: 1.6rem; color: #fff; margin-bottom: 4px;">${data.title}</h2>
            <p style="font-size: 0.9rem; opacity: 0.9;">${data.subtitle}</p>
        </div>

        <div style="margin-bottom: 24px;">
            <h4 style="color: var(--primary-cyan); font-size: 1rem; margin-bottom: 8px;">Descrição do Projeto</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${data.desc}</p>
        </div>

        <div style="margin-bottom: 24px;">
            <h4 style="color: var(--primary-cyan); font-size: 1rem; margin-bottom: 12px;">Principais Funcionalidades & Destaques</h4>
            <ul style="list-style: none; padding: 0;">
                ${data.features.map(f => `
                    <li style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-check-circle" style="color: var(--accent-green);"></i>
                        ${f}
                    </li>
                `).join('')}
            </ul>
        </div>

        <div style="margin-bottom: 28px;">
            <h4 style="color: var(--primary-cyan); font-size: 1rem; margin-bottom: 12px;">Tecnologias Utilizadas</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${data.techs.map(t => `
                    <span style="background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.2); color: var(--primary-cyan); padding: 6px 12px; border-radius: 6px; font-family: var(--font-code); font-size: 0.8rem;">${t}</span>
                `).join('')}
            </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.88rem;">
                <i class="fa-brands fa-github"></i> Ver no GitHub
            </a>
        </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

/* Close modal on outside click */
window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

/* 7. Contact Form Handler with Toast */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (toast) {
                toast.classList.add('active');
                setTimeout(() => {
                    toast.classList.remove('active');
                }, 3500);
            }

            form.reset();
        });
    }
}
