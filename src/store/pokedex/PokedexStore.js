import { observable, action, computed } from "mobx";

// A list of error message
const ID_PARAM_ERR = "Parameter id must be an non null integer";
const NAME_PARAM_ERR = "Parameter name must be a non null string";
const TYPE_PARAM_ERR = "Parameter type must be a non null string";

/**
 * The pokedex store. This class stores the data related to the pokemons.
 * Attributes: rootStore, pokemonList, currentPokemon, searchValue
 */
export class PokedexStore {
  rootStore = null;
  @observable pokemonList = [
    {
      id: 0,
      name: "Pikachu",
      type: "Foudre",
      description: "Pokemon au teint jaune"
    },
    {
      id: 1,
      name: "Bulbizard",
      type: "Plante",
      description: "Pokemon au teint vert"
    },
    {
      id: 2,
      name: "Salameche",
      type: "Feu",
      description: "Pokemon au teint rouge"
    }
  ];
  @observable currentPokemon = null;
  @observable searchValue = "";

  /**
   * Filter the pokemonList given the searchValue
   */
  @computed get filterPokemonList() {
    return this.pokemonList.filter(
      pokemon =>
        !this.searchValue ||
        pokemon.name.toLowerCase().startsWith(this.searchValue.toLowerCase()) ||
        pokemon.type.toLowerCase().startsWith(this.searchValue.toLowerCase()) ||
        pokemon.description
          .toLowerCase()
          .startsWith(this.searchValue.toLowerCase())
    );
  }

  /**
   *
   * @param {Store} rootStore the root store
   */
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  /**
   *
   * @param {number} id The id of the pokemon to get
   * Get a pokemon by its id
   */
  getPokemonById(id) {
    if (!id || !Number.isInteger(id)) throw ID_PARAM_ERR;
    return this.pokemonList.filter(pokemon => pokemon.id === id)[0];
  }

  /**
   *
   * @param {Array} pokemonList An array of pokemons
   * Set the pokemon list
   */
  @action setPokemonList(pokemonList) {
    if (Array.isArray(pokemonList)) this.pokemonList = pokemonList;
  }

  /**
   *
   * @param {Object} pokemon A pokemon object
   * Add a new pokemon to the list
   */
  @action addPokemon(pokemon) {
    return pokemon ? this.pokemonList.push(pokemon) : -1;
  }

  /**
   *
   * @param {number} id The id of the pokemon to remove
   * Remove a pokemon from the list
   */
  @action removePokemon(id) {
    if (id)
      this.pokemonList = this.pokemonList.filter(pokemon => pokemon.id !== id);
  }

  /**
   *
   * @param {number} id The id of the pokemon to modify
   * @param {string} name The new name of the pokemon
   * Change a pokemon name by id
   */
  @action changePokemonNameById(id, name) {
    if (!id || !Number.isInteger(id)) throw ID_PARAM_ERR;
    if (!name || typeof name != "string") throw NAME_PARAM_ERR;

    const pokemon = this.getPokemonById(id);
    if (pokemon) {
      pokemon.name = name;
      return 0;
    } else {
      return 1;
    }
  }

  /**
   *
   * @param {number} id The id of the pokemon to modify
   * @param {string} type The new type of the pokemon
   */
  @action changePokemonType(id, type) {
    if (!id || !Number.isInteger(id)) throw ID_PARAM_ERR;
    if (!type || typeof type != "string") throw TYPE_PARAM_ERR;

    const pokemon = this.getPokemonById(id);
    if (pokemon) {
      pokemon.type = type;
      return 0;
    } else {
      return 1;
    }
  }
}
