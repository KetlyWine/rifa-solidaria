import kitEgeo from '../assets/kit-egeo.webp';
import percy1 from '../assets/Percy-1.webp';
import percy2 from '../assets/Percy-2.webp';
import percy3 from '../assets/Percy-3.webp';

export default function Premios() {
  const listaPremios = [
    {
      id: 1,
      nome: "Kit Presente EGEO Dolce",
      desc: "Desodorante Colônia, Body Spray, Hidratante para Mãos",
      estado: "Novo",
      badgeClass: "badge-novo",
      img: kitEgeo
    },
    {
      id: 2,
      nome: "Percy Jackson: O Ladrão de Raios",
      desc: "Volume 1 da saga Percy Jackson e os Olimpianos",
      estado: "Ótimo estado",
      badgeClass: "badge-otimo",
      img: percy1
    },
    {
      id: 3,
      nome: "Percy Jackson: O Mar de Monstros",
      desc: "Volume 2 da saga Percy Jackson e os Olimpianos",
      estado: "Ótimo estado",
      badgeClass: "badge-otimo",
      img: percy2
    },
    {
      id: 4,
      nome: "Percy Jackson: A Maldição do Titã",
      desc: "Volume 3 da saga Percy Jackson e os Olimpianos",
      estado: "Ótimo estado",
      badgeClass: "badge-otimo",
      img: percy3
    }
  ];

  return (
    <section id="premios" className="section-premios">
      <h2 className="section-title">PRÊMIOS</h2>
      <div className="premios-grid">
        {listaPremios.map((premio) => (
          <div key={premio.id} className="premio-card">
            <div className="premio-img-wrapper">
              <img src={premio.img} alt={premio.nome} className="premio-img" loading="lazy" decoding="async" />
            </div>
            <div className="premio-content">
              <h3 className="premio-nome">{premio.nome}</h3>
              <p className="premio-desc">{premio.desc}</p>
              <span className={`badge ${premio.badgeClass}`}>{premio.estado}</span>
              <div className="gold-brace">{"}"}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
