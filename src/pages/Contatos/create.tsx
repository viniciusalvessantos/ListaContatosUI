import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Contatos } from "../../types/Contatos";
import { contatoApi } from "../../hooks/contatoApi";
import './create.css'
export const ContatoCreate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pessoaId, pessoa } = location.state || {};  // Acessa o pessoaId passado pela navegação

    const [contato, setContato] = useState<Contatos>({
        nome: '',
        email: '',
        telefone: '',
        whatsApp: '',
        pessoaid: pessoaId || '',  // Inicializa com o pessoaId se estiver presente
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContato((prevContato) => ({
            ...prevContato,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pessoaId) {
            setError('ID da pessoa não foi fornecido. Não é possível criar o contato.');
            return;
        }

        try {
            const api = contatoApi();
            const data = await api.create(contato);  // Cria o contato
            setSuccessMessage(data.messagemsResponser);
            setError('');

            // Redireciona de volta para a lista de contatos
            navigate('/contatos', { state: { pessoaId, pessoa } });
        } catch (error) {
            setError('Erro ao criar o contato.');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
    <h2>Criar Contato</h2>

    {error && <p className="error-message">{error}</p>}
    {successMessage && <p className="success-message">{successMessage}</p>}

    <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
            <label>Nome:</label>
            <input
                type="text"
                name="nome"
                value={contato.nome}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group">
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={contato.email}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group">
            <label>Telefone:</label>
            <input
                type="text"
                name="telefone"
                value={contato.telefone}
                onChange={handleChange}
                required
            />
        </div>

        <div className="form-group">
            <label>WhatsApp:</label>
            <input
                type="text"
                name="whatsApp"
                value={contato.whatsApp}
                onChange={handleChange}
                required
            />
        </div>

        <button type="submit" className="submit-button">Criar Contato</button>
    </form>
</div>
    );
}