import * as React from "react";
import Cell from "./Cell";
import {
  dataTable,
  tableStyle,
  scrollContainer
} from "../../assets/jss/components/searchStyle";
import { Checkbox } from "antd";
import {
  button100,
  buttonWrapper,
  button100Wrapper
} from "../../assets/jss/sharedStyling";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cellHeights: [],
      selected: {},
      rows: []
    };

    const { rows } = this.props;
    this.rows = rows;
    this.tableRef = React.createRef();
    this.onSelectRow.bind(this);
  }

  componentDidMount() {
    this.handleCellHeightResize();
    window.addEventListener("resize", this.handleCellHeightResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      this.handleCellHeightResize.bind(this)
    );
  }

  renderHeadingRow = (_cell, cellIndex) => {
    const { headers } = this.props;
    const { cellHeights } = this.state;
    
    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={headers[cellIndex]}
        isHeader={true}
        isFixed={cellIndex === 0}
        height={cellHeights[0]}
      />
    );
  };

  onSelectRow = (rowIndex, event) => {
    var aux = this.state.selected;
    if (event.target.checked) {
      aux[rowIndex] = 1;
    } else {
      aux[rowIndex] = 0;
    }
    this.setState({ ...this, selected: aux });
  };

  onAnalyze = rows => {
    var ret = [];
    for (var i in this.state.selected) {
      ret.push(rows[i]);
    }

    this.props.history.push({
      pathname: "/data",
      state: { selected: ret }
    });
  };

  renderRow = (_row, rowIndex) => {
    const { rows } = this.props;
    var filterText = this.props.filterText;
    var names = this.props.names;
    var curps = this.props.curps;
    const { cellHeights } = this.state;
    const heightIndex = rowIndex + 1;

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
              content={
                cellIndex === rows[rowIndex].length - 1 ? (
                  <Checkbox onChange={e => this.onSelectRow(rowIndex, e)}>
                    Seleccionar
                  </Checkbox>
                ) : (
                  rows[rowIndex][cellIndex]
                )
              }
              isHeader={false}
              isFixed={cellIndex === 0}
              height={cellHeights[heightIndex]}
            />
          );
        })}
      </tr>
    );
  };

  setTable = table => {
    this.table = table;
  };

  getTallestCellHeights = () => {
    const rows = Array.from(this.tableRef.current.getElementsByTagName("tr"));
    let { cellHeights } = this.state;

    if (rows.length > 1) {
      cellHeights = rows.map(row => {
        const fixedCell = row.childNodes[1];
        return Math.max(row.clientHeight, fixedCell.clientHeight);
      });
    }

    return cellHeights;
  };

  handleCellHeightResize = () => {
    this.setState({ ...this.state, cellHeights: this.getTallestCellHeights() });
  };

  render() {
    const { headers, rows } = this.props;
    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    
    this.renderRow = this.renderRow.bind(this);

    const theadMarkup = (
      <tr key="heading">{headers.map(this.renderHeadingRow)}</tr>
    );

    const tbodyMarkup = rows.map(this.renderRow);
    console.log(theadMarkup);

    return (
      <div>
        <div style={dataTable}>
          <div style={scrollContainer}>
            <table style={tableStyle} ref={this.tableRef}>
              <thead>{theadMarkup}</thead>
              <tbody>{tbodyMarkup}</tbody>
            </table>
          </div>
        </div>
        <div style={buttonWrapper}>
          <div style={button100Wrapper}>
            <Button onClick={this.onAnalyze.bind(this, rows)} style={button100}>
              Analizar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DataTable);
