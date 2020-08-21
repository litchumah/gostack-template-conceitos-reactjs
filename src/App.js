import React, { useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  //Criando variaveis de estado para poder manipular os dados.
  const [repositories, setRepository] = useState([]);

  /*useEffect permite escolher uma funcao e quando usa-la.
  -Nesse caso, eh feito uma pesquisa na url: api/repositories.
  -O .then espera o resultado do api.get. Apos receber a resposta eh possivel utiliza-la.
  -Com isso, a resposta eh inserida em repositories.
  -As chaves no fim indicam que isso tudo sera feito ao iniciar a tela.
  */
  useEffect(() => {
    api.get('repositories').then(response => setRepository(response.data));
  }, []);

  /*Para adicionar, primeiro eh necessario efetuar um post na url api/repositories.
  -Esse post proporciona uma resposta contendo os dados do repositorio adicionado.
  -Para que o novo repositorio possa ser visto eh necessario adiciona-lo em repositories.
  -Um problema, repositories eh imutavel, para isso eh necessario substituir o valor de repositories (setRepository) por todos os seus valores antigos + o novo.
  -Basicamente eh criado uma nova variavel que pega emprestado tudo que havia na variavel anterior e coloca-se uma nova.
  */
  async function handleAddRepository() {
    const response = await api.post('repositories',{});
    setRepository([...repositories,response.data]);
  }


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
