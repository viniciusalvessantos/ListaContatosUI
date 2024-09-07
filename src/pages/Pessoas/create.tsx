import { useState } from "react";
import { Pessoas } from "../../types/Pessoas";
import { pessoaApi } from "../../hooks/pessoaApi";
import { useNavigate } from "react-router-dom";
import './create.css'
export const PessoasCreate = () => {
    const [nome, setNome] = useState('');
    const [sobreNome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const novaPessoa: Pessoas = {
            nome,
            sobreNome,
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
        <div className="form-container">
        <h2>Cadastrar Pessoa</h2>
    
        <form onSubmit={handleSubmit} className="create-form">
            <div className="form-group">
                <label>Nome:</label>
                <input 
                    type="text" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Sobrenome:</label>
                <input 
                    type="text" 
                    value={sobreNome} 
                    onChange={(e) => setSobrenome(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Telefone:</label>
                <input 
                    type="text" 
                    value={telefone} 
                    onChange={(e) => setTelefone(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="submit-button">Cadastrar</button>
        </form>
    
        {/* Exibir mensagens de sucesso ou erro */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    );
}