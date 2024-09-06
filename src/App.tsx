
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/lauyout';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { Home } from './pages/Home';
import { Pessoas } from './pages/Pessoas';
import { Contato } from './pages/Contatos';

function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/pessoas" element={<RequireAuth><Layout><Pessoas /></Layout></RequireAuth>} />
        <Route path="/contatos" element={<RequireAuth><Contato /></RequireAuth>} />
      </Routes>
    </div>
  </>
  );
}

export default App;
