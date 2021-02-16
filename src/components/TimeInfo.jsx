import { Button, Grid } from "@material-ui/core";
import React, { memo, useEffect, useState, useContext } from "react";
import moment from "moment";
import client from "../client";
import FormRecord from "./FormRecord";
import { DataContext } from "../App";

const TimeInfo = ({ selected, doctor, onTime }) => {
  const { token, idClinic } = useContext(DataContext);
  const [selectedTime, setSelectedTime] = useState(null);
  const [windows, setWindows] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    setLoading(true);
    let date = onTime.toISOString().substr(0, 10);
    client
      .getInfoDoctors(selected, date, token, idClinic)
      .then((result) => setWindows(result))
      .then(() => setLoading(false))
      .catch(({ message }) => {
        console.error(message);
        setLoading(false);
      });
  }, [onTime]);

  if (loading)
    return (
      <Grid container spacing={2}>
        <Grid container item>
          Загрузка...
        </Grid>
      </Grid>
    );

  if (windows.length !== 0)
    return (
      <Grid container spacing={2}>
        <Grid container item>
          Выберите время приёма:
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          {windows.map((time) => (
            <Grid item key={time}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSelectedTime(time.Start)}
              >
                {moment(time.Start).format("HH:mm")}
              </Button>
            </Grid>
          ))}
        </Grid>
        <FormRecord
          time={selectedTime}
          id={selected}
          onClose={() => setSelectedTime(null)}
          doctor={doctor}
        />
      </Grid>
    );
  else
    return (
      <Grid container spacing={2}>
        <Grid container item>
          Свободного времени для записи нет
        </Grid>
      </Grid>
    );
};

export default memo(TimeInfo);
