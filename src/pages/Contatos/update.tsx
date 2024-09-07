import { useEffect, useState } from "react";
import { contatoApi } from "../../hooks/contatoApi";
import { useLocation, useParams } from "react-router-dom";
import { Contatos } from "../../types/Contatos";
import './update.css'
export const ContatoUpdate = () => {
    const location = useLocation();
    const { pessoaId, contatoId } = location.state || {}; // Acessa o pessoaId e contatoId passados pela navegação
    
    const [contato, setContato] = useState<Contatos>({
        id: '',
        nome: '',
        email: '',
        telefone: '',
        whatsApp: '',
        pessoaid: '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const api = contatoApi();
    // Função para buscar os detalhes do contato ao carregar o componente
    useEffect(() => {
        const fetchContact = async () => {
            try {
                const api = contatoApi(); // Pega a instância da API diretamente
                const response = await api.visualiza(contatoId);
                setContato({
                    ...response, // Garante que todos os campos são preenchidos corretamente
                    pessoaid: pessoaId, // Caso precise do pessoaId
                });
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar contato.');
                setLoading(false);
            }
        };

        if (contatoId) {
            fetchContact();
        }
    }, []); // Apenas uma vez ao montar o componente, sem dependências

    // Função para manipular as mudanças no formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setContato((prevState) => ({
            ...prevState,
            [name]: value, // Garante que o campo correto está sendo atualizado
        }));
    };

    // Função para submeter o formulário e atualizar o contato
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await api.update(contatoId, contato);
            setSuccessMessage('Contato atualizado com sucesso!');
            setError('');
        } catch (err) {
            setError('Erro ao atualizar o contato.');
            setSuccessMessage('');
        }
    };

    return (
        <>
            <div className="form-container">
                <h2>Atualizar Contato</h2>

                {loading && <p>Carregando contato...</p>}
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                {!loading && (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="nome"
                                value={contato.nome || ''} // Garante que o campo seja controlado
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={contato.email || ''} // Garante que o campo seja controlado
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Telefone:</label>
                            <input
                                type="text"
                                name="telefone"
                                value={contato.telefone || ''} // Garante que o campo seja controlado
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>WhatsApp:</label>
                            <input
                                type="text"
                                name="whatsApp"
                                value={contato.whatsApp || ''} // Garante que o campo seja controlado
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">Atualizar Contato</button>
                    </form>
                )}
            </div>
        </>
    );
}