import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pessoaApi } from "../../hooks/pessoaApi";
import { Pessoas } from "../../types/Pessoas";

export const PessoasUpdate = () => {
    const { id } = useParams<{ id: string }>();  // Pega o parâmetro 'id' da URL
    const [pessoa, setPessoa] = useState<Pessoas>({
        nome: '',
        sobrenome: '',
        telefone: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPessoa = async () => {
            try {
                const api = pessoaApi();
                const data = await api.visualizar(id!);  // Chama o método visualizar com o id
                setPessoa(data);  // Define os dados da pessoa no formulário
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar os dados da pessoa.');
                setLoading(false);
            }
        };

        if (id) {
            fetchPessoa();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPessoa(prevPessoa => ({
            ...prevPessoa,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const api = pessoaApi();
            await api.update(id!, pessoa);  // Chama o método update com os novos dados
            setSuccessMessage('Pessoa atualizada com sucesso!');
            navigate('/pessoas');  // Redireciona de volta para a lista de pessoas após o sucesso
        } catch (err) {
            setError('Erro ao atualizar a pessoa.');
            console.error(err);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h2>Atualizar Pessoa</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {pessoa && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input 
                            type="text" 
                            name="nome" 
                            value={pessoa.nome} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Sobrenome:</label>
                        <input 
                            type="text" 
                            name="sobrenome" 
                            value={pessoa.sobrenome} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Telefone:</label>
                        <input 
                            type="text" 
                            name="telefone" 
                            value={pessoa.telefone} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={pessoa.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Atualizar Pessoa</button>
                </form>
            )}
        </div>
    );
}