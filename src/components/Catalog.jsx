import { Checkbox } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { ChevronRight, ExpandMore } from "@material-ui/icons";
import { TreeItem, TreeView } from "@material-ui/lab";
import _ from "lodash";
import React, { memo, useContext } from "react";
import { DataContext } from "../App";

const Catalog = ({ times, setTimes }) => {
  const { specialities, doctors } = useContext(DataContext);

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      {specialities.map((speciality) => (
        <TreeItem
          key={speciality.id}
          nodeId={speciality.id}
          label={speciality.name}
        >
          {doctors
            .filter(({ specialities }) =>
              _.includes(specialities, speciality.id)
            )
            .map(({ info }) => (
              <FormGroup key={info.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      key={info.id}
                      name={info.id}
                      color="primary"
                      checked={typeof times[info.id] !== "undefined"}
                      onChange={(_event, checked) =>
                        setTimes({
                          type: checked ? "ADD" : "DELETE",
                          id: info.id,
                        })
                      }
                    />
                  }
                  label={info.name}
                />
              </FormGroup>
            ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default memo(Catalog);
