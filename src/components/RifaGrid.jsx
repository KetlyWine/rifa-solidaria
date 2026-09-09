import { useState, useEffect, useRef } from 'react';

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1RR_PQG-kPcgTdoxUpK3zJ_ruwRW1-g-zqobe4j3e9ow/gviz/tq?tqx=out:csv"; 
const UPDATE_INTERVAL = 30000; // 30 segundos

export default function RifaGrid() {
  const [numeros, setNumeros] = useState([]);
  const [totalNumeros, setTotalNumeros] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const accordionContentRef = useRef(null);

  const fetchCSVData = async (showLoading = false) => {
    if (showLoading) {
      setLoading(true);
      setError(false);
    }

    try {
      const url = `${SHEET_CSV_URL}&t=${new Date().getTime()}`;
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      setNumeros(parsedData);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar números:", err);
      if (showLoading) {
        setError(true);
        setLoading(false);
      }
    }
  };

  const calculateTotalNumeros = (mapaStatus) => {
    let limit = 100;
    while (mapaStatus.size >= limit * 0.7) {
      limit += 50;
    }
    let highestSold = 0;
    for (let key of mapaStatus.keys()) {
      const num = parseInt(key, 10);
      if (num > highestSold) highestSold = num;
    }
    while (highestSold > limit) {
      limit += 50;
    }
    return limit;
  };

  const parseCSV = (csvText) => {
    const linhas = csvText.trim().split('\n');
    if (linhas.length < 2) {
      setTotalNumeros(100);
      return criarNumerosPadrao(100);
    }

    const headerLine = linhas[0].toLowerCase();
    const separator = headerLine.includes(';') ? ';' : ',';

    const mapaStatus = new Map();
    for (let i = 2; i < linhas.length; i++) {
      const linha = linhas[i].split(separator);
      const numStr = linha[0]?.replace(/["']/g, '').trim();
      if (!numStr || isNaN(parseInt(numStr))) continue; 
      
      const num = parseInt(numStr).toString();
      const nomeComprador = linha[1]?.replace(/["']/g, '').trim();

      if (nomeComprador && nomeComprador.length > 0) {
        mapaStatus.set(num, 'vendido');
      }
    }

    const novoTotal = calculateTotalNumeros(mapaStatus);
    setTotalNumeros(novoTotal);
    return mesclarComPadrao(mapaStatus, novoTotal);
  };

  const criarNumerosPadrao = (total) => {
    const arr = [];
    for (let i = 1; i <= total; i++) {
      arr.push({
        numero: i.toString(),
        status: 'disponivel'
      });
    }
    return arr;
  };

  const mesclarComPadrao = (mapaStatus, total) => {
    const arr = [];
    for (let i = 1; i <= total; i++) {
      const numStr = i.toString();
      let status = mapaStatus.get(numStr) || 'disponivel';
      
      if (status !== 'vendido') {
        status = 'disponivel';
      }

      arr.push({ numero: numStr, status });
    }
    return arr;
  };

  useEffect(() => {
    fetchCSVData(true);
    const interval = setInterval(() => fetchCSVData(false), UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  // Separa disponíveis e indisponíveis
  const disponiveis = numeros.filter(n => n.status === 'disponivel');
  const indisponiveis = numeros.filter(n => n.status !== 'disponivel');

  return (
    <section id="rifa" className="section-rifa">
      <h2 className="section-title">Escolha seu número e <span style={{ color: 'var(--gold)' }}>concorra</span>!</h2>

      {loading && (
        <div className="message-box">Carregando números...</div>
      )}

      {error && (
        <div className="message-box error">
          Não foi possível carregar os números no momento.<br />
          <button onClick={() => fetchCSVData(true)} className="btn-refresh">Tentar Novamente</button>
        </div>
      )}

      {!loading && !error && (
        <div id="rifa-container">
          <p className="contador">
            {disponiveis.length} números disponíveis de {totalNumeros}
          </p>

          <div className="numeros-grid">
            {disponiveis.map(item => (
              <div
                key={item.numero}
                className={`numero-item ${item.status}`}
              >
                {item.numero}
              </div>
            ))}
          </div>

          {indisponiveis.length > 0 && (
            <div className="accordion">
              <button
                className={`accordion-header ${accordionOpen ? 'active' : ''}`}
                onClick={toggleAccordion}
              >
                {accordionOpen ? 'Ocultar números reservados' : `Ver números já reservados (${indisponiveis.length})`}
                <svg className="icon-arrow" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M7 10l5 5 5-5z"></path>
                </svg>
              </button>
              <div
                className={`accordion-content ${accordionOpen ? 'open' : ''}`}
                ref={accordionContentRef}
                style={{ maxHeight: accordionOpen ? `${accordionContentRef.current?.scrollHeight}px` : '0px' }}
              >
                <div className="numeros-grid indisponiveis-grid">
                  {indisponiveis.map(item => (
                    <div
                      key={item.numero}
                      className={`numero-item ${item.status}`}
                    >
                      {item.numero}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={() => fetchCSVData(false)} className="btn-refresh">
              Atualizar números
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
