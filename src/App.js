import { getRemainingRequest } from "loader-utils";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [pokemonList, setPokemonList] = useState();
  const [loading, setLoading] = useState(true);

  console.log("pokemonList debug", pokemonList);

  // const pokemonListNew = [pokemonList[0]]

  async function createPokeonObject(data) {
    const { results = [] } = data;

    let pokemonList = [];

    for (const pokemon of results) {
      // API call here so that you get the data of the pokemon ...
      const { url } = pokemon;
      const response = await fetch(url);
      const data = await response.json(); //[ { id1 bulabasaur}]

      pokemonList.push(data[0]);
    }

    setPokemonList(pokemonList);
    console.log("all the pokeon ", pokemonList);
  }

  async function getAllPokemons() {
    const url =
      "https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1";

    const response = await fetch(url, { method: "get" });
    let data = await response.json();

    data = data[0];

    await createPokeonObject(data); // blank pokemon

    // Resetting the loading
    setLoading(false);

    console.log("data debug", data);
  }

  // side effect, -> API call

  useEffect(() => {
    // I want to get all the pokemons....

    getAllPokemons();
  }, []);

  return (
    <>
      {loading ? (
        <div>Hey there Loading the pokemon</div>
      ) : (
        <div className="main-comtainer">
          {/* Heading section  */}

          <div className="heading-section">
            <h2>Pokemon Kingdom</h2>
          </div>

          {/* Pokemon Container */}

          <div className="pokemon-container">
            {pokemonList && pokemonList.length && (
              <>
                <div className={`card-container`}>
                  <div className="number">#{pokemonList[0].id}</div>
                </div>
                <img src={pokemonList[0].image} alt={pokemonList[0].name} />

                <div className={"detail-container"}>
                  <h3>{pokemonList[0].name.toUpperCase()}</h3>
                  <h4>Type: {pokemonList[0].type}</h4>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
