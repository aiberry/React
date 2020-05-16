import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export default function MultilineTextFields({ items, setItem, value, label }) {
  return (
    <div>
      <TextField
        id="outlined-select-currency"
        select
        label={label}
        value={value}
        onChange={(event) => {
          setItem(event.target.value);
        }}
        variant="outlined"
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
