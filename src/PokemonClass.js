class PokemonClass {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.sprite = data.sprites.front_default;
      this.data = data; 
    }
  }
  
  export default PokemonClass;