import React from 'react';

  const Pokemon = ({ pokemon, id, handleOnClick}) => {
    return <div className="pokemon">
            <div className="pokemon-container" onClick={() => handleOnClick(id)}>
              <div className="pokemon-sprite">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
              </div>
              <div className="pokemon"> {pokemon.name} </div>
            </div>
          </div>;
  };
  
  export default Pokemon;