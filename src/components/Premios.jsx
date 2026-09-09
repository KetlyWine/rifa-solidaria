export default function Premios() {
  const listaPremios = [
    {
      id: 1,
      nome: "Kit Presente EGEO Dolce",
      desc: "Desodorante Colônia, Body Spray, Hidratante para Mãos",
      estado: "Novo",
      badgeClass: "badge-novo",
      img: "./src/assets/kit-egeo.webp"
    },
    {
      id: 2,
      nome: "Percy Jackson: O Ladrão de Raios",
      desc: "Volume 1 da saga Percy Jackson e os Olimpianos",
      estado: "Ótimo estado",
      badgeClass: "badge-otimo",
      img: "/src/assets/Percy-1.png"
    },
    {
      id: 3,
      nome: "Percy Jackson: O Mar de Monstros",
      desc: "Volume 2 da saga Percy Jackson e os Olimpianos",
      estado: "Ótimo estado",
      badgeClass: "badge-otimo",
      img: "/src/assets/Percy-2.png"
    },
    {
      id: 4,
      nome: "Percy Jackson: A Maldição do Titã",
      desc: "Volume 3 da saga Percy Jackson e os Olimpianos",
      estado: "Ótimo estado",
      badgeClass: "badge-otimo",
      img: "/src/assets/Percy-3.png"
    }
  ];

  return (
    <section id="premios" className="section-premios">
      <h2 className="section-title">PRÊMIOS</h2>
      <div className="premios-grid">
        {listaPremios.map((premio) => (
          <div key={premio.id} className="premio-card">
            <div className="premio-img-wrapper">
              <img src={premio.img} alt={premio.nome} className="premio-img" />
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
