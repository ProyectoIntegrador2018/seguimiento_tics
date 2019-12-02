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
import { title } from "../../assets/jss/sharedStyling";
import { API_URL } from "../../constants/apiurl";
import Axios from "axios";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import MoreIcon from '@material-ui/icons/MoreVert';
import FaceIcon from '@material-ui/icons/Face';

const COLORS = ["#33A8FF", "#FF3386"];
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
const GRAPH_MENU = [
  "Género en TI",
  "Edad de género en TI"
];


class Data extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      selected: this.props.location.state.selected,
      genderData: {},
      ageData: {},
      selected: 0,
    };
    this.onMenuPickChange = this.onMenuPickChange.bind(this);
    this.getGenderDataAPI = this.getGenderDataAPI.bind(this);
    this.getGenderDataAPI();
    this.getAgeGenderDataAPI = this.getAgeGenderDataAPI.bind(this);
    this.getAgeGenderDataAPI();
  }

  render() {
    return (
      <div style={graphsContainer}>
        <AppBar position="static"  color="default">
          <Toolbar>
            <IconButton aria-label="display more actions" 
                        edge="end" 
                        onClick={this.onMenuToggle}
                        color="inherit">
              <MoreIcon />
            </IconButton>
            {GRAPH_MENU.map((lbl, idx) => {
              return(
                <Chip
                  key={lbl}
                  icon={<FaceIcon />}
                  onClick={() => this.onMenuPickChange(idx)}
                  label={lbl}
                  color= {idx === this.state.selected ? "secondary" : "primary" }
                  variant = {idx === this.state.selected ? "default" : "outlined"}
                  clickable
                />
              )
            })}
            
          </Toolbar>
        </AppBar>
        
        {this.renderMenuOption()}
       
      </div>
    );
  }

  renderMenuOption() {
    switch(this.state.selected) {
      case 0:
        return this.getGenderITGraph();
      case 1:
        return this.getAgeGenderITGraph();
    }
  }

  //  INPUT FUNCTIONS
  onMenuPickChange(idx) {
    this.setState({ selected: idx });
  }

  //  API CALLS
  getGenderDataAPI = function() {
    let url = API_URL + '/graph/gender-demographic';
    Axios.get(url)
     .then((data) => {
       this.setState({ genderData: data.data })
     })
     .catch((error) => console.log(error));
  }

  getAgeGenderDataAPI = function() {
    let url = API_URL + '/graph/age-demographic';
    Axios.get(url)
     .then(data => {
       this.setState({ ageData: data.data });
       console.log(this.state.ageData);
     })
     .catch(error => console.log(error));
  }

  //  GRAPH FUNCTIONS
  getGenderITGraph = () => {
    let graph_data = [
      {
        "name": "Hombres",
        "value": this.state.genderData.male
      },
      {
        "name": "Mujeres",
        "value": this.state.genderData.female
      }
    ];

    return (
      <div>
        <span style={title}>Hombres y Mujeres en TI</span>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie
              dataKey="value"
              data={graph_data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
            >
              {graph_data.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  getAgeGenderITGraph = () => {
    const graph_data = [];
    for(let item in this.state.ageData) {
      for(let ages in this.state.ageData[item]) {
        let obj = {};
        obj["name"] = ages;
        obj[item] = this.state.ageData[item][ages]
        graph_data.push(obj);
      }
    }

    console.log(graph_data);

    return (
      <div>
        <span style={title}>Edad de Hombres y Mujeres en TI</span>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graph_data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Mujeres" fill="#FF3386" />
            <Bar dataKey="Hombres" fill="#4287f5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

}
export default Data;
