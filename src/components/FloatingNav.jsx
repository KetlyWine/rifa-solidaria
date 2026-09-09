import { useEffect, useState } from 'react';

export default function FloatingNav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['rifa', 'premios', 'contato'];
      let current = '';
      
      // Encontra qual seção está visível na tela
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 200) {
            current = id;
          }
        }
      });
      
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="floating-nav">
      <div className="nav-container">
        <a href="#rifa" className={`nav-link ${active === 'rifa' ? 'active' : ''}`}>
          Números
        </a>
        <a href="#premios" className={`nav-link ${active === 'premios' ? 'active' : ''}`}>
          Prêmios
        </a>
        <a href="#contato" className={`nav-link ${active === 'contato' ? 'active' : ''}`}>
          Contato
        </a>
      </div>
    </nav>
  );
}
