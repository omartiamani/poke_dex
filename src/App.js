import React, { Component } from "react";
import { Provider, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { green } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

import rootStore from "./store/RootStore";
import PokemonList from "./components/pokedex/PokemonList";
import AddForm from "./components/pokedex/AddForm";
import { POKEBALL_ICON_URL } from "./api/urlConstants";
import { SAVE_SUCCESS_MSG } from "./constants";

//Style object that keeps styling related to the component in the same page
//This styling has been copied from Material-ui site
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
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

function MySnackbarContentWrapper(props) {
  const { classes, message, onClose, variant, ...other } = props;

  const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon
  };

  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={[classes[variant], classes]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={[classes.icon, classes.iconVariant]} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

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

  /**
   * Handle the snackbar close event
   */
  handleSnackbarClose() {
    rootStore.pokedexStore.saveSuccess = null;
    rootStore.pokedexStore.reqError = null;
  }

  render() {
    const { classes } = this.props;
    const {
      filterPokemonList,
      searchValue,
      isLoading,
      saveSuccess,
      reqError
    } = rootStore.pokedexStore;

    return (
      <Provider rootStore={rootStore}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={saveSuccess}
          onClose={this.handleSnackbarClose}
          autoHideDuration={6000}>
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            classes={classes}
            variant={saveSuccess ? "success" : "error"}
            message={saveSuccess ? SAVE_SUCCESS_MSG : reqError}
          />
        </Snackbar>
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
          <PokemonList pokemonList={filterPokemonList} isLoading={isLoading} />
        </div>
      </Provider>
    );
  }
}

//Here we inject the styles object to the component. We can then access it through this.props.classes
export default withStyles(styles)(App);
