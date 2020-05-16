import React from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Button from "@material-ui/core/Button";
import styles from "./App.module.css";
import { getCars } from "./actions/getCars";
import { setFilter } from "./actions/setFilter";
import { setSort } from "./actions/setSort";
import { setOpen } from "./actions/modal/setOpen";
import { getTenants } from "./actions/modal/getTenants";
import { getCarBrands } from "./actions/modal/getCarBrands";
import { getCarModels } from "./actions/modal/getCarModels";
import { saveModal } from "./actions/modal/saveModal";
import { setModalField } from "./actions/modal/setModalField";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { columns, sortDirections } from "./constants";
import SimpleModal from "./components/Modal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.props.onGetCars();
  }

  render() {
    const {
      cars,
      onSetFilter,
      onSetSort,
      sortBy,
      modal,
      onSetIsModalOpen,
      onGetCarModels,
      onSetModalField,
      onSaveModal,
    } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.addButon}>
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={onSetIsModalOpen}
          >
            Добавть автомобиль в список
          </Button>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                {" "}
                <Button variant="contained" disabled>
                  н т
                </Button>{" "}
              </th>
              <th>
                <Button
                  classes={{ root: styles.headerButton }}
                  variant="outlined"
                  onClick={() =>
                    onSetSort(columns.brand, sortBy[columns.brand])
                  }
                >
                  <ArrowDownwardIcon
                    fontSize="inherit"
                    classes={{
                      root: [
                        sortBy[columns.brand] === sortDirections.none
                          ? styles.hideArrow
                          : "",
                        sortBy[columns.brand] === sortDirections.up
                          ? styles.rotateArrow
                          : "",
                      ].join(" "),
                    }}
                  />
                  Бренд
                </Button>
              </th>
              <th>
                <Button
                  classes={{ root: styles.headerButton }}
                  variant="outlined"
                  onClick={() =>
                    onSetSort(columns.model, sortBy[columns.model])
                  }
                >
                  <ArrowDownwardIcon
                    fontSize="inherit"
                    classes={{
                      root: [
                        sortBy[columns.model] === sortDirections.none
                          ? styles.hideArrow
                          : "",
                        sortBy[columns.model] === sortDirections.up
                          ? styles.rotateArrow
                          : "",
                      ].join(" "),
                    }}
                  />
                  Модель
                </Button>
              </th>
              <th>
                <Button
                  classes={{ root: styles.headerButton }}
                  variant="outlined"
                  onClick={() =>
                    onSetSort(columns.number, sortBy[columns.number])
                  }
                >
                  <ArrowDownwardIcon
                    fontSize="inherit"
                    classes={{
                      root: [
                        sortBy[columns.number] === sortDirections.none
                          ? styles.hideArrow
                          : "",
                        sortBy[columns.number] === sortDirections.up
                          ? styles.rotateArrow
                          : "",
                      ].join(" "),
                    }}
                  />
                  Гос.номер
                </Button>
              </th>
              <th>
                <Button
                  classes={{ root: styles.headerButton }}
                  variant="outlined"
                  onClick={() =>
                    onSetSort(columns.tenant, sortBy[columns.tenant])
                  }
                >
                  <ArrowDownwardIcon
                    fontSize="inherit"
                    classes={{
                      root: [
                        sortBy[columns.tenant] === sortDirections.none
                          ? styles.hideArrow
                          : "",
                        sortBy[columns.tenant] === sortDirections.up
                          ? styles.rotateArrow
                          : "",
                      ].join(" "),
                    }}
                  />
                  Арендатор
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <th>
                <input
                  className={styles.checkbox}
                  name={columns.here}
                  type="checkbox"
                  onChange={(e) => onSetFilter(columns.here)}
                />
              </th>
              <th>
                <input
                  className={styles.filter}
                  name={columns.brand}
                  onChange={(e) => onSetFilter(columns.brand, e.target.value)}
                />
              </th>
              <th>
                <input
                  className={styles.filter}
                  name={columns.model}
                  onChange={(e) => onSetFilter(columns.model, e.target.value)}
                />
              </th>
              <th>
                <input
                  className={styles.filter}
                  name={columns.number}
                  onChange={(e) => onSetFilter(columns.number, e.target.value)}
                />
              </th>
              <th>
                <input
                  className={styles.filter}
                  name={columns.tenant}
                  onChange={(e) => onSetFilter(columns.tenant, e.target.value)}
                />
              </th>
            </tr>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>
                  <input
                    className={[styles.checkboxReadOnly, styles.checkbox].join(
                      " "
                    )}
                    type="checkbox"
                    name={`${columns.here} - ${car.id}`}
                    checked={car.isOnTerritory}
                    readOnly
                  />
                </td>
                <td>{car.car_brand ? car.car_brand.name : "---"}</td>
                <td>{car.car_model ? car.car_model.name : "---"}</td>
                <td>{car.car_number}</td>
                <td>{car.car_tenant ? car.car_tenant.name : "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <SimpleModal
          isOpen={modal.isOpen}
          setIsOpen={onSetIsModalOpen}
          tenantsList={modal.tenants}
          carBrandsList={modal.carBrands}
          carModelsList={modal.carModels}
          onGetCarModels={onGetCarModels}
          onSetModalField={onSetModalField}
          currentValues={modal.current}
          onSaveModal={onSaveModal}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    filters: state.filters,
    sortBy: state.sortBy,
    modal: state.modal,
    cars: state.cars
      .filter((car) => {
        const territoryFiltration =
          car.isOnTerritory || !Boolean(state.filters[columns.here]);
        const isSuitBrand =
          !car.car_brand ||
          car.car_brand.name
            .toLowerCase()
            .includes(state.filters[columns.brand]);
        const isSuitModel =
          !car.car_model ||
          car.car_model.name
            .toLowerCase()
            .includes(state.filters[columns.model]);
        const isSuitNumber =
          !car.car_number ||
          car.car_number.toLowerCase().includes(state.filters[columns.number]);
        const isSuitTenant =
          !car.car_tenant ||
          car.car_tenant.name
            .toLowerCase()
            .includes(state.filters[columns.tenant]);
        return (
          territoryFiltration &&
          isSuitBrand &&
          isSuitModel &&
          isSuitNumber &&
          isSuitTenant
        );
      })
      .sort((a, b) => {
        if (state.sortBy[columns.brand]) {
          if (!a.car_brand) return 1;
          if (!b.car_brand) return -1;
          if (a.car_brand.name === b.car_brand.name) return 0;
          if (state.sortBy[columns.brand] === sortDirections.up)
            return a.car_brand.name < b.car_brand.name ? -1 : 1;
          if (state.sortBy[columns.brand] === sortDirections.down)
            return a.car_brand.name < b.car_brand.name ? 1 : -1;
        }
        if (state.sortBy[columns.model]) {
          if (!a.car_model) return 1;
          if (!b.car_model) return -1;
          if (a.car_model.name === b.car_model.name) return 0;
          if (state.sortBy[columns.model] === sortDirections.up)
            return a.car_model.name < b.car_model.name ? -1 : 1;
          if (state.sortBy[columns.model] === sortDirections.down)
            return a.car_model.name < b.car_model.name ? 1 : -1;
        }
        if (state.sortBy[columns.number]) {
          if (!a.car_number) return 1;
          if (a.car_number === b.car_number) return 0;
          if (state.sortBy[columns.number] === sortDirections.up)
            return a.car_number < b.car_number ? -1 : 1;
          if (state.sortBy[columns.number] === sortDirections.down)
            return a.car_number < b.car_number ? 1 : -1;
        }
        if (state.sortBy[columns.tenant]) {
          if (!a.car_tenant) return 1;
          if (!b.car_tenant) return -1;
          if (a.car_tenant.name === b.car_tenant.name) return 0;
          if (state.sortBy[columns.tenant] === sortDirections.up)
            return a.car_tenant.name.toLowerCase() <
              b.car_tenant.name.toLowerCase()
              ? -1
              : 1;
          if (state.sortBy[columns.tenant] === sortDirections.down)
            return a.car_tenant.name.toLowerCase() <
              b.car_tenant.name.toLowerCase()
              ? 1
              : -1;
        }
        return 0;
      }),
  }),
  (dispatch) => ({
    onGetCars: () => {
      dispatch(getCars());
    },
    onSetFilter: (filterBy, query) => {
      dispatch(setFilter(filterBy, query));
    },
    onSetSort: (column, sortBy) => {
      dispatch(setSort(column, sortBy));
    },
    onSetIsModalOpen: () => {
      dispatch(setOpen());
      dispatch(getTenants());
      dispatch(getCarBrands());
    },
    onGetCarModels: (id_brand) => {
      dispatch(getCarModels(id_brand));
    },
    onSetModalField: (fieldName, value) => {
      dispatch(setModalField(fieldName, value));
    },
    onSaveModal: () => {
      dispatch(saveModal());
    },
  })
)(App);

App.propTypes = {
  cars: PropTypes.array,
  onSetFilter: PropTypes.func,
  onSetSort: PropTypes.func,
  sortBy: PropTypes.object,
};
