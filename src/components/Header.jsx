export default function Header() {
  return (
    <header className="hero">
      <div className="hero-content">
        <h2 className="subtitle">PARTICIPE</h2>
        <h1 className="title">Rifa Solidária</h1>

        <div className="ticket-wrapper">
          <svg width="160" height="80" viewBox="0 0 160 80" className="ticket-svg">
            <path d="M10,0 L150,0 C155.522847,0 160,4.4771525 160,10 L160,25 C154.477153,25 150,29.4771525 150,35 C150,40.5228475 154.477153,45 160,45 L160,70 C160,75.5228475 155.522847,80 150,80 L10,80 C4.4771525,80 0,75.5228475 0,70 L0,45 C5.5228475,45 10,40.5228475 10,35 C10,29.4771525 5.5228475,25 0,25 L0,10 C0,4.4771525 4.4771525,0 10,0 Z" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="6,4"></path>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="var(--gold)" fontFamily="Poppins" fontWeight="700" fontSize="28">R$ 10</text>
          </svg>
        </div>
      </div>
    </header>
  );
}
