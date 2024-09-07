import { useState } from "react";
import { Pessoas } from "../../types/Pessoas";
import { pessoaApi } from "../../hooks/pessoaApi";
import { useNavigate } from "react-router-dom";

export const PessoasCreate = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const novaPessoa: Pessoas = {
            nome,
            sobrenome,
            telefone,
            email,
        };

        try {
            const api = pessoaApi();
            const data =  await api.create(novaPessoa);
            setSuccessMessage(data.messagemsResponser);
            setErrorMessage('');
            // Limpar os campos após o sucesso
            setNome('');
            setSobrenome('');
            setTelefone('');
            setEmail('');

            window.alert(data.messagemsResponser || 'Pessoa cadastrada com sucesso!');
            navigate('/pessoas');  // Redireciona para a lista de pessoas
        } catch (error) {
            setErrorMessage('Erro ao cadastrar a pessoa.');
            setSuccessMessage('');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Cadastrar Pessoa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Sobrenome:</label>
                    <input 
                        type="text" 
                        value={sobrenome} 
                        onChange={(e) => setSobrenome(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input 
                        type="text" 
                        value={telefone} 
                        onChange={(e) => setTelefone(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>

            {/* Exibir mensagens de sucesso ou erro */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}