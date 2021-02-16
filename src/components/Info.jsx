import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import _ from "lodash";
import React, { memo, useContext } from "react";
import { DataContext } from "../App";
import TimeInfo from "./TimeInfo";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";

const Info = ({ times, setTimes }) => {
  const { doctors } = useContext(DataContext);

  return (
    <>
      <List>
        {_.keys(times).map((id) => (
          <ListItem alignItems="flex-start" key={id}>
            <ListItemAvatar>
              <Person />
            </ListItemAvatar>
            <ListItemText
              primary={_.find(doctors, { info: { id } }).info.name}
              secondary={
                <>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={ruLocale}
                  >
                    <DatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Выберите дату приёма"
                      format="dd:MM:yyyy"
                      value={times[id]}
                      onChange={(date) =>
                        setTimes({ type: "CHANGE_TIME", id, date })
                      }
                      cancelLabel={"Отмена"}
                      okLabel={"Ок"}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TimeInfo
                    selected={id}
                    doctor={_.find(doctors, { info: { id } }).info.name}
                    onTime={times[id]}
                  />
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(Info);
