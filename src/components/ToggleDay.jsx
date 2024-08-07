import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";
import { tokens } from "../theme";
const DAYS = [
  { key: "sunday", label: "S" },
  { key: "monday", label: "M" },
  { key: "tuesday", label: "T" },
  { key: "wednesday", label: "W" },
  { key: "thursday", label: "T" },
  { key: "friday", label: "F" },
  { key: "saturday", label: "S" },
];

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(2),
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      border: "1px solid",
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
    "&:first-child": {
      border: "1px solid",
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
  },
}))(ToggleButtonGroup);

const StyledToggle = withStyles({
  root: {
    color: "#4cceac",
    "&$selected": {
      color: "white",
      background: "#4cceac",
    },
    "&:hover": {
      borderColor: "#BA9BC3",
      background: "#BA9BC3",
    },
    "&:hover$selected": {
      borderColor: "#BA9BC3",
      background: "#BA9BC3",
    },
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.75rem",
  },
  selected: {},
})(ToggleButton);

const ToggleDays = ({ value, onChange }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [days, setDays] = useState(value);

  const handleToggle = (event, newValue) => {
    setDays(newValue);
    onChange(event, newValue);
  };

  return (
    <StyledToggleButtonGroup
      size="small"
      aria-label="Days of the week"
      value={days}
      onChange={handleToggle}
    >
      {DAYS.map((day, index) => (
        <StyledToggle key={day.key} value={index} aria-label={day.key}>
          {day.label}
        </StyledToggle>
      ))}
    </StyledToggleButtonGroup>
  );
};

export default ToggleDays;
