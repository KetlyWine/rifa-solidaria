import { useState } from 'react';
import kitEgeo from '../assets/kit-egeo.webp';
import percy1 from '../assets/Percy-1.webp';
import percy2 from '../assets/Percy-2.webp';
import percy3 from '../assets/Percy-3.webp';
import memorias from '../assets/memorias.jpg';

const percyVolumes = [
  { src: percy1, label: 'Vol. 1 — O Ladrão de Raios' },
  { src: percy2, label: 'Vol. 2 — O Mar de Monstros' },
  { src: percy3, label: 'Vol. 3 — A Maldição do Titã' },
];

function PercyCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + percyVolumes.length) % percyVolumes.length);
  const next = () => setCurrent((c) => (c + 1) % percyVolumes.length);

  return (
    <div className="percy-carousel">
      <button className="percy-btn percy-btn-prev" onClick={prev} aria-label="Anterior">&#8249;</button>
      <div className="percy-slides">
        {percyVolumes.map((vol, i) => (
          <div
            key={i}
            className={`percy-slide ${i === current ? 'percy-slide-active' : ''}`}
            aria-hidden={i !== current}
          >
            <img src={vol.src} alt={vol.label} className="premio-img" loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
      <button className="percy-btn percy-btn-next" onClick={next} aria-label="Próximo">&#8250;</button>
      <div className="percy-label">{percyVolumes[current].label}</div>
      <div className="percy-dots">
        {percyVolumes.map((_, i) => (
          <button
            key={i}
            className={`percy-dot ${i === current ? 'percy-dot-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Volume ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Premios() {
  const premiosSimples = [
    {
      id: 1,
      nome: 'Kit Presente EGEO Dolce',
      desc: 'Desodorante Colônia, Body Spray, Hidratante para Mãos',
      estado: 'Novo',
      badgeClass: 'badge-novo',
      img: kitEgeo,
    },
    {
      id: 2,
      nome: 'Memórias Póstumas de Brás Cubas',
      desc: 'Clássico da literatura brasileira de Machado de Assis',
      estado: 'Novo',
      badgeClass: 'badge-novo',
      img: memorias,
    },
  ];

  return (
    <section id="premios" className="section-premios">
      <h2 className="section-title">PRÊMIOS</h2>
      <div className="premios-grid">

        {/* Cards simples */}
        {premiosSimples.map((premio) => (
          <div key={premio.id} className="premio-card">
            <div className="premio-img-wrapper">
              <img src={premio.img} alt={premio.nome} className="premio-img" loading="lazy" decoding="async" />
            </div>
            <div className="premio-content">
              <h3 className="premio-nome">{premio.nome}</h3>
              <p className="premio-desc">{premio.desc}</p>
              <span className={`badge ${premio.badgeClass}`}>{premio.estado}</span>
            </div>
          </div>
        ))}

        {/* Card único da trilogia Percy Jackson */}
        <div className="premio-card">
          <div className="premio-img-wrapper premio-img-wrapper--carousel">
            <PercyCarousel />
          </div>
          <div className="premio-content">
            <h3 className="premio-nome">Trilogia Percy Jackson</h3>
            <p className="premio-desc">3 volumes da saga Percy Jackson e os Olimpianos</p>
            <span className="badge badge-otimo">Ótimo estado</span>
          </div>
        </div>

      </div>
    </section>
  );
}
