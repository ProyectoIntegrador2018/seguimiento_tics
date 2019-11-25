import React, { PureComponent } from "react";
import { graphsContainer } from "../../assets/jss/components/dataStyle";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Row, Col } from "react-bootstrap";
import { title } from "../../assets/jss/sharedStyling";

const data2 = [
  { name: "Group A", value: 14 },
  { name: "Group B", value: 5 }
];
const COLORS = ["#18b532", "#db2727"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

var data1 = [];

class Data extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.location.state.selected };
    this.loadData = this.loadData.bind(this);
    this.loadData();
  }

  loadData = () => {
    var rows = this.state.selected;
    var m = {};
    var f = {};
    var ages = new Set();
    for (var e in rows) {
      var year = rows[e][3];
      year = year.substring(6, 8);
      var curYear = new Date().getFullYear();
      if (year >= curYear % 100) {
        year = "19" + year;
      } else {
        year = "20" + year;
      }

      if (rows[e][5][0] == "m" || rows[e][5][0] == "M") {
        m[curYear - year] = (m[curYear - year] || 0) + 1;
      } else {
        f[curYear - year] = (f[curYear - year] || 0) + 1;
      }

      ages.add(curYear - year);
    }

    ages = Array.from(ages);
    ages.sort();
    for (var i in ages) {
      var nxt = {};
      var age = ages[i];
      nxt["age"] = age;
      if (m[age]) {
        nxt["hombres"] = m[age];
      } else {
        nxt["hombres"] = 0;
      }
      if (f[age]) {
        nxt["mujeres"] = f[age];
      } else {
        nxt["mujeres"] = 0;
      }

      data1.push(nxt);
    }
  };

  getAgeGenderGraph = () => {
    return (
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data1}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hombres" fill="#4459e3" />
            <Bar dataKey="mujeres" fill="#f569f0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  getYesNoITGraph = () => {
    return (
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie
              dataKey="value"
              data={data2}
              cx={150}
              cy={150}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
            >
              {data2.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  render() {
    return (
      <div style={graphsContainer}>
        <span style={title}>Edad de hombres y mujeres</span>
        <Row>
          <Col>{this.getAgeGenderGraph()}</Col>
        </Row>
        <br />
        <br />
        <br />
        <span style={title}>Personas que estudian TI</span>
        <Row>
          <Col>{this.getYesNoITGraph()}</Col>
        </Row>
      </div>
    );
  }
}

export default Data;
