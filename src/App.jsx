import Header from './components/Header';
import RifaGrid from './components/RifaGrid';
import Premios from './components/Premios';
import Contato from './components/Contato';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';

function App() {
  return (
    <>
      <Header />
      <main>
        <RifaGrid />
        <Premios />
        <Contato />
      </main>
      <FloatingNav />
      <Footer />
    </>
  )
}

export default App;
