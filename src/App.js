import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  
  const loadRepositories = async () => {
    const { data } = await api.get("/repositories");
    setRepositories(data);
  };

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories",{
      "title": "Desafio Native",
      "url": "https://github.com/slooock",
      "techs": "React JS"
   });
   setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('/repositories/'+id);
    setRepositories(repositories.filter((repository) => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map(item=>{
            return (
              <li  key={item.id}>
                {item.title}

                <button onClick={() => handleRemoveRepository(item.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
