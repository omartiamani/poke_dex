import { observable, action, computed } from "mobx";
import { savePokemon, loadPokemons, removePokemon } from "../../api/pokedexAPI";
import { DELETE_SUCCESS_MSG } from "../../constants";

// A list of error message
const ID_PARAM_ERR = "Parameter id must be an non null integer";
const NAME_PARAM_ERR = "Parameter name must be a non null string";
const TYPE_PARAM_ERR = "Parameter type must be a non null string";

/**
 * The pokedex store. This class stores the data related to the pokemons.
 * Attributes:
 * rootStore: The root store
 * pokemonList: The list of all loaded pokemons
 * currentPokemon: The current selected pokemon
 * searchValue: The searched value in the search bar
 * isLoading: True if data are loading from database
 * saveSuccess: True if the database request has succeeded
 * reqError: The errorMessage if saveSuccess is false
 */
export class PokedexStore {
  rootStore = null;
  @observable pokemonList = [];
  @observable currentPokemon = null;
  @observable searchValue = "";
  @observable isLoading = false;
  @observable saveSuccess = null;
  @observable reqError = null;

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

    this.isLoading = true;
    loadPokemons()
      .then(pokemons => {
        this.setPokemonList(pokemons);
        this.isLoading = false;
        this.reqError = null;
      })
      .catch(err => {
        this.isLoading = false;
        this.reqError = err;
      });
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
    if (pokemon) {
      savePokemon(pokemon)
        .then(res => {
          this.pokemonList.push(pokemon);

          this.saveSuccess = DELETE_SUCCESS_MSG;
          this.reqError = null;
        })
        .catch(err => {
          this.saveSuccess = null;
          this.reqError = err;
        });
    }
  }

  /**
   *
   * @param {number} id The id of the pokemon to remove
   * Remove a pokemon from the list
   */
  @action removePokemon(id) {
    if (id) {
      removePokemon(id)
        .then(res => {
          this.pokemonList = this.pokemonList.filter(
            pokemon => pokemon.id !== id
          );
          this.reqError = null;
        })
        .catch(err => {
          this.reqError = err;
        });
    }
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
