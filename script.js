document.addEventListener('DOMContentLoaded', function() {
    
    // Animação dos cards da galeria
    const cards = document.querySelectorAll('.galeria-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.classList.add('hidden');
        observer.observe(card);
    });

    // Funcionalidade dos Modais
    const cardTriggers = document.querySelectorAll('.galeria-card');
    
    cardTriggers.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    const closeButtons = document.querySelectorAll('.modal .close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Funcionalidade do botão de voltar ao topo
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efeito de digitação no cabeçalho
    const typedTextElement = document.getElementById('typed-text');
    const textToType = "Potência, design e velocidade inigualáveis.";
    let charIndex = 0;

    // Adicionar o cursor piscando
    const cursorElement = document.createElement('span');
    cursorElement.classList.add('blinking-cursor');
    cursorElement.textContent = '|';
    typedTextElement.parentNode.appendChild(cursorElement);

    function typeText() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        } else {
            // Quando a digitação terminar, podemos remover o cursor se quisermos
            // cursorElement.style.display = 'none';
        }
    }

    // Iniciar a animação quando a página carregar
    window.addEventListener('load', typeText);

    // Nova funcionalidade: Navegação Ativa
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`header nav a[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                // Adiciona a classe 'active' ao link da seção visível
                if (navLink) {
                    navLink.classList.add('active');
                }
            } else {
                // Opcional: Remove a classe 'active' quando a seção não está mais visível
                if (navLink) {
                    navLink.classList.remove('active');
                }
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.5
    });

    // Observar cada seção
    sections.forEach(section => {
        activeNavObserver.observe(section);
    });
});