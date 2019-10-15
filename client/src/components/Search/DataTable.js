import * as React from "react";
import Cell from "./Cell";
import { dataTable, tableStyle } from "../../assets/jss/components/searchStyle";

class DataTable extends React.Component {
  renderHeadingRow = (_cell, cellIndex) => {
    const { headers } = this.props;

    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={headers[cellIndex]}
        header={true}
      />
    );
  };

  renderRow = (_row, rowIndex) => {
    const { rows } = this.props;
    var onTableUpdate = this.props.onTableUpdate;
    var filterText = this.props.filterText;
    var names = this.props.names;
    var curps = this.props.curps;

    if (
      names[rowIndex].indexOf(filterText) === -1 &&
      curps[rowIndex].indexOf(filterText) === -1
    ) {
      return;
    }

    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex]}
              onTableUpdate={onTableUpdate}
            />
          );
        })}
      </tr>
    );
  };

  render() {
    const { headers, rows } = this.props;

    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    this.renderRow = this.renderRow.bind(this);

    const theadMarkup = (
      <tr key="heading">{headers.map(this.renderHeadingRow)}</tr>
    );

    const tbodyMarkup = rows.map(this.renderRow);

    return (
      <div style={dataTable}>
        <table style={tableStyle}>
          <thead>{theadMarkup}</thead>
          <tbody>{tbodyMarkup}</tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
