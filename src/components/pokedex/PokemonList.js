import React, { Component } from "react";
import { observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import PokemonCard from "./PokemonCard";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  pokemonCard: {
    width: "100%"
  }
});

@observer //We make the component oserver to update if the observable data in the store change
/**
 * The PokemonList component class.
 * Display the list of cards of all created pokemons
 */
class PokemonList extends Component {
  render() {
    const { classes, pokemonList } = this.props;

    //Transform the list of pokemon object into a list of Card component
    const PokemonListComponent = pokemonList.map(pokemon => (
      <Grid key={pokemon.id} item xs={3}>
        <PokemonCard
          className={classes.pokemonCard}
          id={pokemon.id}
          name={pokemon.name}
          type={pokemon.type}
          description={pokemon.description}
        />
      </Grid>
    ));

    //Display
    return (
      <Grid container spacing={3}>
        {PokemonListComponent}
      </Grid>
    );
  }
}

export default withStyles(styles)(PokemonList);
