import React from "react";
import "./App.css";
import { getCars } from "./actions/getCars";
import { setFilter } from "./actions/setFilter";
import { setSort } from "./actions/setSort";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { columns, sortDirections } from "./constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.props.onGetCars();
  }

  render() {
    const { cars, onSetFilter, onSetSort, sortBy } = this.props;
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>На территории</th>
              <th>
                <button
                  onClick={() =>
                    onSetSort(columns.brand, sortBy[columns.brand])
                  }
                >
                  Бренд авто
                </button>
              </th>
              <th>
                <button
                  onClick={() =>
                    onSetSort(columns.model, sortBy[columns.model])
                  }
                >
                  Модель авто
                </button>
              </th>
              <th>
                <button
                  onClick={() =>
                    onSetSort(columns.number, sortBy[columns.tenate])
                  }
                >
                  Гос. номер
                </button>
              </th>
              <th>
                <button
                  onClick={() =>
                    onSetSort(columns.tenant, sortBy[columns.tenant])
                  }
                >
                  Арендатор
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  name={columns.here}
                  type="checkbox"
                  onChange={(e) => onSetFilter(columns.here)}
                />
              </th>
              <th>
                <input
                  name={columns.brand}
                  onChange={(e) => onSetFilter(columns.brand, e.target.value)}
                />
              </th>
              <th>
                <input
                  name={columns.model}
                  onChange={(e) => onSetFilter(columns.model, e.target.value)}
                />
              </th>
              <th>
                <input
                  name={columns.number}
                  onChange={(e) => onSetFilter(columns.number, e.target.value)}
                />
              </th>
              <th>
                <input
                  name={columns.tenant}
                  onChange={(e) => onSetFilter(columns.tenant, e.target.value)}
                />
              </th>
            </tr>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>
                  <input
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
      </div>
    );
  }
}

export default connect(
  (state) => ({
    filters: state.filters,
    sortBy: state.sortBy,
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
  })
)(App);

App.propTypes = {
  cars: PropTypes.array,
  onSetFilter: PropTypes.func,
  onSetSort: PropTypes.func,
  sortBy: PropTypes.object,
};
