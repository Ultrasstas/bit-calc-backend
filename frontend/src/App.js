import React, { Component } from 'react';
import styled from 'styled-components';
import CoinsData from './components/CoinsData/CoinsData';
import {PageTitle} from './components/PageTitle/PageTitle';
import InputData from './components/InputData/InputData';
import Results from './components/Results/Results';
import Chart from './components/Chart/Chart';

import './App.css';

const colorBars = [
    {colorR: '255', colorG: '235', colorB: '59', title: 'Total coins you own'},
    //{colorR: '100', colorG: '255', colorB: '218', title: 'Staking reward'},
];

const DivFlexRow = styled.div`
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          margin-right: 5rem;
        `;

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <div className="App-input-data-wrapper">
              <PageTitle/>
              <div className="App-input-container">
                  <InputData/>
                  <Results/>
              </div>
              <div className="App-color-bars-container">
                  {colorBars.map(bar => <ColorBar {...bar} key={bar.title} />)}
              </div>
          </div>
          <div className="App-chart-wrapper">
            <Chart/>
          </div>
          <div className="App-coins-data-wrapper">
            <CoinsData/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const ColorBar = (props) => (
    <DivFlexRow>
        <div style={{width: 75, height: 25, marginRight: 10, backgroundColor: `rgba(${props.colorR},${props.colorG},${props.colorB},.3)`, border: `solid 1px rgba(${props.colorR},${props.colorG},${props.colorB},1)`}}></div>
        <div>{props.title}</div>
    </DivFlexRow>
)
