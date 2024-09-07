import { useEffect, useState } from "react";
import { pessoaApi } from "../../hooks/pessoaApi";
import { Link, useNavigate } from "react-router-dom";
import { Pessoas as PessoasType } from '../../types/Pessoas';
export const Pessoas = () => {
    const [pessoas, setPessoas] = useState<PessoasType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPessoas = async () => {
            try {
                const api = pessoaApi();
                const data = await api.list();
                setPessoas(data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar as pessoas.');
                setLoading(false);
            }
        };

        fetchPessoas();
    }, []);

    // Função para excluir pessoa
    const handleDelete = async (id: string) => {
        try {
            const api = pessoaApi();
            await api.delete(id);
            setPessoas(pessoas.filter(pessoa => pessoa.id !== id));  // Remove da lista local
        } catch (err) {
            setError('Erro ao excluir a pessoa.');
            console.error(err);
        }
    };

    // Função para editar pessoa (visualizar e redirecionar)
    const handleEdit = async (id: string) => {
        try {
            const api = pessoaApi();
            const pessoa = await api.visualizar(id);  // Busca os dados da pessoa
            navigate(`/pessoasupdate/${id}`, { state: { pessoa } });  // Redireciona para a página de edição, enviando os dados
        } catch (err) {
            setError('Erro ao carregar os dados da pessoa.');
            console.error(err);
        }
    };

    // Função para criar contato, redirecionando com o id da pessoa
    const handleContact = (id: string) => {
        navigate(`/contatos`, { state: { pessoaId: id } });
    };

    return (
        <div>
            <h2>Lista de Pessoas</h2>

            <Link to="/pessoacreate">
                <button>Criar Nova Pessoa</button>
            </Link>

            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && pessoas.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas.map((pessoa) => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.nome}</td>
                                <td>{pessoa.sobrenome}</td>
                                <td>{pessoa.telefone}</td>
                                <td>{pessoa.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(pessoa.id || '')}>Editar</button>
                                    <button onClick={() => handleDelete(pessoa.id || '')}>Excluir</button>
                                    <button onClick={() => handleContact(pessoa.id || '')}>Contatos</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!loading && pessoas.length === 0 && <p>Nenhuma pessoa cadastrada.</p>}
        </div>
    );
}