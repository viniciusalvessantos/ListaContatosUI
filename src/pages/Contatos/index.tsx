import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Contatos } from "../../types/Contatos";
import { contatoApi } from "../../hooks/contatoApi";
import './contatos.css'
export const Contato = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pessoaId, pessoa } = location.state || {}; // Acessa o pessoaId do estado

    const [contatos, setContatos] = useState<Contatos[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContatos = async () => {
            try {
                const api = contatoApi();
                const data = await api.list(pessoaId); // Se o id for passado, ele lista os contatos dessa pessoa
                setContatos(data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar os contatos.');
                setLoading(false);
            }
        };

        fetchContatos();
    }, [pessoaId]);

    // Função para excluir um contato
    const handleDelete = async (id: string) => {
        try {
            const api = contatoApi();
            await api.delete(id);
            setContatos(contatos.filter((contato) => contato.id !== id)); // Remove da lista local
        } catch (err) {
            setError('Erro ao deletar o contato.');
            console.error(err);
        }
    };

    // Função para redirecionar para a criação de contato
    const handleCreateContact = () => {
        navigate('/contatoscreate', { state: { pessoaId, pessoa } }); // Redireciona para a página de criação de contato com o pessoaId
    };

    // Função para redirecionar para a atualização de contato
    const handleEdit = (contatoId: string) => {
        navigate(`/contatosupdate`, { state: { pessoaId, contatoId } }); // Redireciona para a página de atualização de contato
    };

    return (
        <div>
            {pessoa ? (
                <h2>Lista de contatos de {pessoa}</h2>
            ) : (
                <h2>Lista de Contatos</h2>
            )}
            {pessoaId && (
                <button className="create-button" onClick={handleCreateContact}>
                    Criar Novo Contato
                </button>
            )}

            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && contatos.length > 0 && (
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>WhatsApp</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contatos.map((contato) => (
                            <tr key={contato.id}>
                                <td>{contato.nome}</td>
                                <td>{contato.email}</td>
                                <td>{contato.telefone}</td>
                                <td>{contato.whatsApp}</td>
                                <td className="action-buttons">
                                    {pessoaId && (
                                        <button
                                            className="edit-button"
                                            onClick={() => handleEdit(contato.id || '')}
                                        >
                                            Editar
                                        </button>
                                    )}
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(contato.id || '')}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && contatos.length === 0 && <p>Nenhum contato encontrado.</p>}
        </div>
    );
}