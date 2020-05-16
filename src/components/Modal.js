import React from "react";
import Modal from "@material-ui/core/Modal";
import Select from "./Select";
import { columns } from "../constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "8px 0 8px 0",
      width: "44ch",
    },
    "& > .MuiButton-root": {
      margin: "8px 0 8px 0",
      width: "100%",
    },
  },
  paper: {
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    position: "absolute",
    width: "400px",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: `0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)`,
    padding: `16px 32px 24px`,
  },
}));

export default function SimpleModal({
  setIsOpen,
  isOpen,
  tenantsList,
  carBrandsList,
  carModelsList,
  onGetCarModels,
  onSetModalField,
  currentValues,
  onSaveModal,
}) {
  const classes = useStyles();

  const onSaveClick = (e) => {
    if (
      currentValues[columns.brand].id &&
      currentValues[columns.tenant].id &&
      currentValues[columns.model].id
    ) {
      onSaveModal();
    } else {
      console.error("Unhandled saving, please check fields filling");
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={setIsOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <h2 id="simple-modal-title">Добавить автомобиль в список</h2>
        <p id="simple-modal-description">Заполните поля:</p>
        <form className={classes.root} noValidate autoComplete="off">
          <Select
            items={tenantsList}
            value={currentValues[columns.tenant]}
            setItem={(value) => onSetModalField(columns.tenant, value)}
            label="Арендатор"
          />
          <Select
            items={carBrandsList}
            value={currentValues[columns.brand]}
            setItem={(value) => {
              onSetModalField(columns.brand, value);
              onGetCarModels(value.id);
            }}
            label="Бренд авто"
          />
          <Select
            items={carModelsList}
            value={currentValues[columns.model]}
            setItem={(value) => onSetModalField(columns.model, value)}
            label="Модель авто"
          />
          <TextField
            id="outlined-basic"
            label="Номер"
            variant="outlined"
            onChange={(e) => onSetModalField(columns.number, e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onSaveClick();
              setIsOpen();
            }}
          >
            Сохранить
          </Button>
          <Button variant="contained" onClick={setIsOpen}>
            Отмена
          </Button>
        </form>
      </div>
    </Modal>
  );
}
