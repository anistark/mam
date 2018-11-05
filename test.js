const Mam = require('./lib/mam.client.js')
const Converter = require('@iota/converter')

let node = 'https://nodes.iota.fm:443/'

Mam.init(node, 'TUULMYMFZUFKWBKXUHWVDZHADXLTFQAGYOLERFFPTMRNVBYTQWMQPZIURAZHIGZSUVQVLHPFSLF9DOKLQ', 2);

var output;
var results = [true, false];

var requestData = {
    'root': 'HSQQMDSIKFLUIHAIOKO9CYRYPGASGETJFIYOTOBHQBVRWZYXERQSTUIISLHZFHFOTJXVQTV9UWYPEWDXH',
    'nextRoot': 'anything'
}

var allMamData = []

fetchData(requestData, function repeat(result) {
    console.log('result:', result);
    output += result.winner;
    console.log('output:', output);
    if (result.winner) {
        // console.log('repeat:', repeat);
        requestData['nextRoot']= 'empty'
        fetchData(requestData, repeat);
    }
    else {
        console.log('-- done --');
        console.log('\n\nallMamData:', allMamData);
    }
});

async function fetchData(requestData, callback) {
    // call fetch api with root
    console.log('requestData:', requestData, '\n\n');
    var fetchResp = await Mam.fetch(requestData.root, 'public', null, data => {
        tempData = JSON.parse(Converter.trytesToAscii(data))
        // console.log('log data: =->', tempData)
        allMamData.push(tempData)
        console.log('allMamData:', allMamData);
        let winner = results.shift()
        console.log('winner:', winner);
        callback({winner: winner});
    })
    console.log('fetchResp:', fetchResp);
}
