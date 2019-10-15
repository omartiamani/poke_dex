import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";

import rootStore from "./store/RootStore";
import PokemonList from "./components/pokedex/PokemonList";
import AddForm from "./components/pokedex/AddForm";
import { POKEBALL_ICON_URL } from "./api/urlConstants";

//Style object that keeps styling related to the component in the same page
//This styling has been copied from Material-ui site
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  avatar: {
    margin: 10
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputSearch: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    border: "solid 1px white",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  appBody: {
    marginLeft: "1%",
    marginTop: "1%"
  },
  addForm: {
    marginBottom: "1%"
  }
});

/**
 * The App component class.
 * This is the root React component
 */
@observer
class App extends Component {
  /**
   *
   * @param {Event} event
   */
  handleOnSearchInputChange(event) {
    rootStore.pokedexStore.searchValue = event.target.value;
  }

  render() {
    const { classes } = this.props;
    const { filterPokemonList, searchValue } = rootStore.pokedexStore;
    return (
      <Provider rootStore={rootStore}>
        <AppBar position="sticky">
          <Toolbar>
            <Avatar
              alt="Remy Sharp"
              src={POKEBALL_ICON_URL}
              className={classes.avatar}
            />
            <Typography className={classes.title} variant="h6" noWrap>
              Poke App
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                value={searchValue}
                onChange={this.handleOnSearchInputChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputSearch
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.appBody}>
          <AddForm className={classes.addForm} />
          <PokemonList pokemonList={filterPokemonList} />
        </div>
      </Provider>
    );
  }
}

//Here we inject the styles object to the component. We can then access it through this.props.classes
export default withStyles(styles)(App);
