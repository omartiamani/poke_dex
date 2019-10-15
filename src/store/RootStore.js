import { PokedexStore } from "./pokedex/PokedexStore";

/**
 * The root store.
 * This store contains a reference to all the stores.
 * This is to have a single point where to find all the different domain stores and to inject a single container store to the app
 */
class RootStore {
  /**
   * Instanciate all the stores of the app
   */
  constructor() {
    this.pokedexStore = new PokedexStore(this);
  }
}

export default new RootStore();
