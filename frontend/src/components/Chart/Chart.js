import React from 'react';
import { connect } from 'react-redux';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

class Chart extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return this.props.graph.length ? (
            <ResponsiveContainer>
                <AreaChart data={this.props.graph}
                           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorTC" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFEB3B" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#FFEB3B" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSR" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#64FFDA" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#64FFDA" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis axisLine={false} dataKey="date" />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        domain={[dataMin => (Math.floor((dataMin - (dataMin/100))/100)*100), dataMax => (Math.ceil((dataMax + (dataMax/100))/100)*100)]}
                    />
                    <CartesianGrid  vertical={false} strokeDasharray="1 5" />
                    <Area type="monotone" dataKey="tc" stroke="#FFEB3B" strokeWidth={3} fillOpacity={.3} fill="url(#colorTC)" />
                    {/*<Area type="monotone" dataKey="sr" stroke="#64FFDA" strokeWidth={3} fillOpacity={.3} fill="url(#colorSR)" />*/}
                </AreaChart>
            </ResponsiveContainer>
        ) : null
    }
}

const mapStateToProps = state => ({
    graph: state.calcData.graph
});

export default connect(mapStateToProps)(Chart);