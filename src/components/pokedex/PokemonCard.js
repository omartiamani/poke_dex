import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import WhatshotRoundedIcon from "@material-ui/icons/WhatshotRounded";
import OpacityRoundedIcon from "@material-ui/icons/OpacityRounded";
import FlashOnRoundedIcon from "@material-ui/icons/FlashOnRounded";
import EcoRoundedIcon from "@material-ui/icons/EcoRounded";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

import { POKEMON_TYPES } from "../../constants";
import { capitalize } from "../../utils";
import { POKEBALL_IMAGE_URL } from "../../api/urlConstants";

const styles = theme => ({
  card: {
    // margin: "4%"
    // backgroundColor: "#424242"
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  waterIcon: {
    color: red[500]
  },
  iconDiv: {
    display: "inline-block",
    marginRight: "2%"
  }
});

@inject("rootStore")
@observer
/**
 * The PokemonCard component class.
 * Display a pokemon in the form of a card
 */
class PokemonCard extends Component {
  handleDeleteClick(id) {
    this.props.rootStore.pokedexStore.removePokemon(id);
    console.log(this.props.rootStore.pokedexStore.pokemonList);
  }

  render() {
    const { classes, id, name, type, description } = this.props;

    //Set a different icon given the chosen type of pokemon
    let Icon = null;
    switch (type.toLowerCase()) {
      case POKEMON_TYPES.fire:
        Icon = (
          <WhatshotRoundedIcon className={classes.fireIcon} fontSize="small" />
        );
        break;
      case POKEMON_TYPES.water:
        Icon = (
          <OpacityRoundedIcon className={classes.fireIcon} fontSize="small" />
        );
        break;
      case POKEMON_TYPES.electric:
        Icon = (
          <FlashOnRoundedIcon className={classes.fireIcon} fontSize="small" />
        );
        break;
      case POKEMON_TYPES.grass:
        Icon = <EcoRoundedIcon className={classes.fireIcon} fontSize="small" />;
        break;
      default:
        Icon = null;
    }

    //The part of the card representing the icon of the type and the type of the pokemon
    const CardTypeComponent = (
      <div>
        <div className={classes.iconDiv}>{Icon}</div>
        {capitalize(type)}
      </div>
    );

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={capitalize(name)}
            action={
              <IconButton
                aria-label="settings"
                onClick={() => {
                  this.handleDeleteClick(id);
                }}>
                <ClearRoundedIcon />
              </IconButton>
            }
            subheader={CardTypeComponent}
          />
          <CardMedia
            className={classes.media}
            image={POKEBALL_IMAGE_URL}
            title="Pokemon photo"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PokemonCard);
