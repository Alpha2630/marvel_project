import { useState, useEffect } from 'react';

function App() {
  const [heroes, setHeroes] = useState([]);
  const [formData, setFormData] = useState({ name: "", power: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5000/heroes";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setHeroes(data);
        setLoading(false);
      })
      .catch(() => {
        showMessage("Erreur de chargement");
        setLoading(false);
      });
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.power) {
      showMessage("Veuillez remplir tous les champs");
      return;
    }
    editId ? updateHero() : addHero();
  };

  const addHero = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newHero => {
        setHeroes([...heroes, newHero]);
        resetForm();
        showMessage("Héros ajouté !");
      })
      .catch(() => showMessage("Erreur d'ajout"));
  };

  const updateHero = () => {
    fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(() => {
        setHeroes(heroes.map(h => h.id === editId ? { ...h, ...formData } : h));
        resetForm();
        showMessage("Héros modifié !");
      })
      .catch(() => showMessage("Erreur de modification"));
  };

  const deleteHero = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce héros ?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
          setHeroes(heroes.filter(h => h.id !== id));
          showMessage("Héros supprimé !");
        })
        .catch(() => showMessage("Erreur de suppression"));
    }
  };

  const startEdit = (hero) => {
    setEditId(hero.id);
    setFormData({ name: hero.name, power: hero.power });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ name: "", power: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 
                        bg-green-600 px-6 py-2 rounded-lg shadow-lg text-white text-sm">
          {message}
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editId ? "Modifier un héros" : "Ajouter un héros"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Nom du héros</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 
                           focus:outline-none focus:border-red-500"
                placeholder="Ex: Spider-Man"
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm">Pouvoirs</label>
              <input
                type="text"
                name="power"
                value={formData.power}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 
                           focus:outline-none focus:border-red-500"
                placeholder="Ex: Toiles d'araignée"
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg font-bold transition-colors duration-200 
                  ${editId 
                    ? "bg-yellow-500 hover:bg-yellow-400 text-black" 
                    : "bg-red-600 hover:bg-red-500"}`}
              >
                {editId ? "Modifier" : "Ajouter"}
              </button>
              
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Chargement en cours...</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {heroes.map(hero => (
              <div key={hero.id} 
                   className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <h3 className="text-xl font-bold text-red-400">{hero.name}</h3>
                <p className="text-gray-300 my-2">{hero.power}</p>
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => startEdit(hero)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-lg"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteHero(hero.id)}
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}

export default App;
