import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { observable, action, computed } from "mobx";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MenuItem from "@material-ui/core/MenuItem";
import { POKEMON_TYPES } from "../../constants";
import uuidv1 from "uuid/v1";
import { capitalize } from "../../utils";

const styles = theme => ({
  nameTextField: {
    marginRight: "2%"
  },
  typeTextField: {
    width: "15%",
    marginRight: "2%"
  },
  descriptionTextField: {
    marginRight: "2%"
  },
  addButton: {}
});

@inject("rootStore")
@observer
/**
 * The AddForm component class.
 * Display a form to fill the name, the type and the description of the pokemon to create.
 * Attributes:
 * nameTextFieldValue: The string of the name text field
 * typeTextFieldValue: The string of the type text field
 * descriptionTextFieldValue: The string of the description text field
 */
class AddForm extends Component {
  @observable nameTextFieldValue = "";
  @observable typeTextFieldValue = "";
  @observable descriptionTextFieldValue = "";

  @computed get isAddButtonDisabled() {
    return !(
      this.nameTextFieldValue.length !== 0 &&
      this.typeTextFieldValue.length !== 0 &&
      this.descriptionTextFieldValue.length !== 0
    );
  }

  /**
   *
   * @param {Event} event The event triggered by the name text field onChange action
   */
  @action handleNameTextFieldChange = event => {
    this.nameTextFieldValue = event.target.value;
  };

  /**
   *
   * @param {Event} event The event triggered by the type text field onChange action
   */
  @action handleTypeTextFieldChange = event => {
    this.typeTextFieldValue = event.target.value;
  };

  /**
   *
   * @param {Event} event The event triggered by the type text field onChange action
   */
  @action handleDescriptionTextFieldChange = event => {
    this.descriptionTextFieldValue = event.target.value;
  };

  /**
   * Add a new pokemon in the store given the name and type in the text fields
   */
  handleAddClick = () => {
    const newPokemon = {
      id: uuidv1(),
      name: this.nameTextFieldValue,
      type: this.typeTextFieldValue,
      description: this.descriptionTextFieldValue
    };
    this.props.rootStore.pokedexStore.addPokemon(newPokemon);
    this.nameTextFieldValue = "";
    this.typeTextFieldValue = "";
    this.descriptionTextFieldValue = "";
  };

  render() {
    const { classes, className } = this.props;

    const ItemComponent = Object.values(POKEMON_TYPES).map(type => (
      <MenuItem key={type} value={type}>
        {capitalize(type)}
      </MenuItem>
    ));

    return (
      <div className={className}>
        <TextField
          className={classes.nameTextField}
          label="Nom du Pokémon"
          variant="outlined"
          value={capitalize(this.nameTextFieldValue)}
          onChange={this.handleNameTextFieldChange}
        />
        <TextField
          select
          className={classes.typeTextField}
          label="Type"
          variant="outlined"
          value={this.typeTextFieldValue}
          onChange={this.handleTypeTextFieldChange}>
          {ItemComponent}
        </TextField>
        <TextField
          className={classes.descriptionTextField}
          label="Description"
          variant="outlined"
          value={capitalize(this.descriptionTextFieldValue)}
          onChange={this.handleDescriptionTextFieldChange}
        />
        <Button
          className={classes.addButton}
          disabled={this.isAddButtonDisabled}
          variant="contained"
          color="primary"
          onClick={this.handleAddClick}>
          <AddRoundedIcon />
          Create
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AddForm);
