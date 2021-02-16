import { AppBar, Container, Grid, Toolbar } from "@material-ui/core";
import React, { createContext, useEffect, useState, useReducer } from "react";
import client from "./client";
import Catalog from "./components/Catalog";
import Info from "./components/Info";
import _ from "lodash";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Switch } from "react-router-dom";

const token = `Qaz741wsX741!12`;
const idClinic = document.location.search.replace(/[?]/, "").split("&")[0];

export const DataContext = createContext({});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const timesReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return { ...state, [action.id]: new Date() };
    }
    case "DELETE": {
      return _.omit(state, action.id);
    }
    case "CHANGE_TIME": {
      return { ...state, [action.id]: action.date };
    }
    default: {
      return state;
    }
  }
};

const App = () => {
  const classes = useStyles();
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [times, setTimes] = useReducer(timesReducer, {});

  useEffect(() => {
    client
      .getDoctors(token, idClinic)
      .then((docs) => {
        setDoctors(docs);
      })
      .catch(({ message }) => {
        console.error(message);
      });
    client
      .getSpecialities(token, idClinic)
      .then((specs) => {
        setSpecialities(specs);
        setLoading(false);
      })
      .catch(({ message }) => {
        console.error(message);
        setLoading(false);
        setError(true);
      });
  }, []);

  return loading ? (
    <>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  ) : error ? (
    <>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={error}
        onClose={error}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Сервис не доступен</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            На данный момент сервис не доступен попробуйте перезагрузить
            страницу или воспользоваться сервисом позже...
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <>
      <BrowserRouter>
        <Switch>
          <DataContext.Provider
            value={{
              specialities,
              doctors,
              token,
              idClinic,
              setTimes,
            }}
          >
            <Container maxWidth="xl">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={11}
                  xl={11}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <AppBar position="static">
                    <Toolbar>Запишитесь к врачу</Toolbar>
                  </AppBar>
                  <Grid container item xs={12} sm={12} md={11} xl={11}>
                    <hr />
                    <Grid container item spacing={5}>
                      <Grid item xs={12} sm={6} md={4} xl={3}>
                        Выберите доктора:
                        <hr />
                        <Catalog times={times} setTimes={setTimes} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={5} xl={4}>
                        <Info times={times} setTimes={setTimes} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </DataContext.Provider>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
