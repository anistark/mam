const Mam = require('./lib/mam.client.js')
const Converter = require('@iota/converter')
// var bluebird = require('bluebird')

let node = 'https://nodes.iota.fm:443/'

// Mam.init(provider, seed, security)
// var mamState = Mam.init(node)

const logData = data => console.log('log data: -> ', JSON.parse(Converter.trytesToAscii(data)))

module.exports = {

    mamPublish: async function(requestData, responseObject) {
        let mode = 'public'
        console.log('requestData:', requestData);
        // console.log('mamState 1:', mamState);
        try {
            var mamState = Mam.init(node, requestData.seed, 2)
            // mamState = Mam.changeMode(mamState, mode, requestData.seed)
            // console.log('mamState 2:', mamState);
            const trytes = Converter.asciiToTrytes(JSON.stringify(requestData.data))
            console.log('trytes:', trytes);
            const message = Mam.create(mamState, trytes)
            // console.log('message:', message);
            mamState = message.state
            // console.log('mamState:', mamState);
            // Attach the payload.
            const resp = await Mam.attach(message.payload, message.address)
            // console.log('resp:', resp);

            // const fetchResp = await Mam.fetch(message.root, 'public', null, logData)
            // console.log('fetchResp:', fetchResp);

            responseObject(null, message.root)
        } catch (e) {
            console.log('mamPublish error:', e);
            responseObject(e)
        }
    },

    mamFetch: async function(requestData, responseObject) {
        try {
            // console.log('requestData:', requestData);
            Mam.init(node, requestData.seed, 2)
            let mode = 'public'
            let key = null
            let tempData;
            // const resp = await Mam.fetch(requestData.root, mode, key, data => console.log('data:', Converter.trytesToAscii(data)))
            // console.log('resp:', resp)
            let allMamData = []

            const fetchResp = await Mam.fetch(requestData.root, 'public', null, data => {
                tempData = JSON.parse(Converter.trytesToAscii(data))
                console.log('log data: =->', tempData)
                allMamData.push(tempData)
            })
            console.log('fetchResp:', fetchResp);

            responseObject(null, fetchResp)
        } catch (e) {
            console.log('mamFetch error:', e);
            responseObject(e)
        }
    }
};
