import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Contatos } from "../../types/Contatos";
import { contatoApi } from "../../hooks/contatoApi";

export const Contato = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pessoaId } = location.state || {};  // Acessa o pessoaId do estado

    const [contatos, setContatos] = useState<Contatos[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContatos = async () => {
            try {
                const api = contatoApi();
                const data = await api.list(pessoaId);  // Se o id for passado, ele lista os contatos dessa pessoa
                setContatos(data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar os contatos.');
                setLoading(false);
            }
        };

        fetchContatos();
    }, [pessoaId]);

    const handleDelete = async (id: string) => {
        try {
            const api = contatoApi();
            await api.delete(id);
            setContatos(contatos.filter(contato => contato.id !== id));  // Remove da lista local
        } catch (err) {
            setError('Erro ao deletar o contato.');
            console.error(err);
        }
    };

    const handleCreateContact = () => {
        navigate('/contatoscreate', { state: { pessoaId } });  // Redireciona para a página de criação de contato com o pessoaId
    };

    return (
        <div>
            <h2>Lista de Contatos</h2>
            {pessoaId && (
                <button onClick={handleCreateContact}>Criar Novo Contato</button>
            )}
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && contatos.length > 0 && (
                <table>
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
                                <td>{contato.whatsapp}</td>
                                <td>
                                    <button onClick={() => handleDelete(contato.id || '')}>Excluir</button>
                                    {/* Aqui você pode adicionar um botão de editar se quiser */}
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