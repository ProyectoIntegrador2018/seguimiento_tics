import React, { PureComponent } from "react";
import { limiter, dataContainer } from "../../assets/jss/components/dataStyle";
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

const data2 = [{ name: "Group A", value: 14 }, { name: "Group B", value: 5 }];
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

const data1 = [
  {
    age: "10",
    hombres: 4,
    mujeres: 2
  },
  {
    age: "11",
    hombres: 3,
    mujeres: 1
  },
  {
    age: "12",
    hombres: 2,
    mujeres: 9
  },
  {
    age: "13",
    hombres: 3,
    mujeres: 4
  },
  {
    age: "14",
    hombres: 2,
    mujeres: 5
  },
  {
    age: "15",
    hombres: 2,
    mujeres: 4
  },
  {
    age: "16",
    hombres: 3,
    mujeres: 4
  }
];

class Data extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={limiter}>
        <Row>
          <Col md={{ span: 5, offset: 1 }}>
            <div style={dataContainer}>
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
          </Col>

          <Col md={{ span: 5 }}>
            <div style={dataContainer}>
              <p>Personas que estudiaron TI</p>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart onMouseEnter={this.onPieEnter}>
                  <Pie
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default Data;
