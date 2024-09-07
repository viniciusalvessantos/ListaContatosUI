import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Contatos } from "../../types/Contatos";
import { contatoApi } from "../../hooks/contatoApi";

export const ContatoCreate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pessoaId } = location.state || {};  // Acessa o pessoaId passado pela navegação

    const [contato, setContato] = useState<Contatos>({
        nome: '',
        email: '',
        telefone: '',
        whatsapp: '',
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
            navigate('/contatos', { state: { pessoaId } });
        } catch (error) {
            setError('Erro ao criar o contato.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Criar Contato</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={contato.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={contato.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        name="telefone"
                        value={contato.telefone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>WhatsApp:</label>
                    <input
                        type="text"
                        name="whatsapp"
                        value={contato.whatsapp}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Criar Contato</button>
            </form>
        </div>
    );
}