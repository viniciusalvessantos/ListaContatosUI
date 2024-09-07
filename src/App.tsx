
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/lauyout';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { Home } from './pages/Home';
import { Pessoas } from './pages/Pessoas';
import { Contato } from './pages/Contatos';
import { PessoasCreate } from './pages/Pessoas/create';
import { PessoasUpdate } from './pages/Pessoas/update';
import { ContatoCreate } from './pages/Contatos/create';
import { ContatoUpdate } from './pages/Contatos/update';

function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/pessoas" element={<RequireAuth><Layout><Pessoas /></Layout></RequireAuth>} />
        <Route path="/pessoacreate" element={<RequireAuth><Layout><PessoasCreate /></Layout></RequireAuth>} />
        <Route path="/pessoasupdate/:id" element={<RequireAuth><Layout><PessoasUpdate /></Layout></RequireAuth>} />
        <Route path="/contatos" element={<RequireAuth><Layout><Contato /></Layout></RequireAuth>} />
        <Route path="/contatoscreate" element={<RequireAuth><Layout><ContatoCreate /></Layout></RequireAuth>} />
        <Route path="/contatosupdate" element={<RequireAuth><Layout><ContatoUpdate /></Layout></RequireAuth>} />
      </Routes>
    </div>
  </>
  );
}

export default App;
