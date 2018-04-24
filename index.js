const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Workaround to fix 'application/x-www-form-urlencoded' in axios
axios.interceptors.request.use((config) => {
    if (config.headers['Content-Type'] && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.transformRequest = (data) => {
        const str = [];
        Object.keys(data).forEach(key => str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`));
        return str.join('&');
      };
    }

    return config;
  }, error => Promise.reject(error));


// Calculate chance to get block today
const calculateChance = (coin, stakes, day_reward = 1350 * 8) => {
    return coin / stakes * day_reward;
}

const app = express();
app.use(bodyParser.json());

const appDir = path.resolve(`${__dirname}/frontend/build`)

app.use(
    express.static(appDir)
);


app.get('/api/currencies', (req, res) => {
    res.send({
        currency: [
            {
                'name': 'USD',
                'id': 'USD',
                'isCompulsory': true
            },
            {
                'name': 'EUR',
                'id': 'EUR',
                'isCompulsory': true
            },
            {
                'name': 'JPY',
                'id': 'JPY',
                'isCompulsory': false
            },
            {
                'name': 'CNY',
                'id': 'CNY',
                'isCompulsory': false
            }
        ]
    });
});

app.post('/api/calculate', async (req, res) => {
    let total_coins = parseFloat(req.body.coins);
    let start_coins = total_coins;

    const bay_info_response = await axios.get('https://chainz.cryptoid.info/explorer/index.data.dws?coin=bay&n=10');
    const block_id = bay_info_response.data.blocks[0].out;
    const stakes_info_response = await axios.get(`https://chainz.cryptoid.info/explorer/index.stakes.dws?coin=bay&${block_id}.js`);
    const stakes_amount = stakes_info_response.data.stakes.reduce((summ, curr) => summ + curr.amount, 0);
    
    const rate = await axios.post('https://currencio.co/rate.php', 
        {from: 'BAY', to: req.body.currency}, 
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'} }
    );

    let percent = 1 / (stakes_amount / block_id) / 12;//calculateChance(total_coins, stakes_amount);
    const graph = [];

    let date = new Date(); let prevDate;
    date.setHours(0); date.setMinutes(0); 
    date.setSeconds(0); date.setMilliseconds(0);
    
    for (let i = 0; i < parseInt(req.body.period); i++) {
        prevDate = new Date(date);
        date.setMonth(date.getMonth() + 1);
        let diff = parseInt((date - prevDate) / (1000 * 60 * 60 * 24));

        total_coins = total_coins + diff * percent;
        // percent = calculateChance(total_coins, stakes_amount);

        graph.push({
            date: new Date(date),
            tc: total_coins,
            sr: percent
        });
    }

    res.send({
        reward: total_coins - start_coins,
        total: total_coins,
        inCurrency: total_coins * rate.data,
        graph: graph
    });
});

app.post('/api/convert', async (req, res) => {   
    const rate = await axios.post('https://currencio.co/rate.php', 
        {from: 'BAY', to: req.body.currency}, 
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'} }
    );

    res.send({
        inCurrency: parseFloat(req.body.amount) * rate.data,
    })
});

app.listen(8080);
