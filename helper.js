const Mam = require('./lib/mam.client.js')
const Converter = require('@iota/converter')

let node = 'https://nodes.iota.fm:443/'

const logData = data => console.log('log data: -> ', JSON.parse(Converter.trytesToAscii(data)))

module.exports = {

    mamPublish: async function(requestData, responseObject) {
        let mode = 'public'
        console.log('requestData:', requestData);
        let mamState = Mam.init(node, requestData.seed, 2)
        // console.log('mamState:', mamState);
        const trytes = Converter.asciiToTrytes(JSON.stringify(requestData.data))
        // console.log('trytes:', trytes);
        const message = Mam.create(mamState, trytes)
        // console.log('message:', message);
        mamState = message.state
        // console.log('mamState:', mamState);
        // Attach the payload.
        const resp = await Mam.attach(message.payload, message.address)
        // console.log('resp:', resp);

        const fetchResp = await Mam.fetch(message.root, 'public', null, logData)
        console.log('fetchResp:', fetchResp);

        responseObject(message.root)
    },

    mamFetch: async function(requestData, responseObject) {
        Mam.init(node)
        console.log('requestData:', requestData);
        let mode = 'public'
        let key = null
        const resp = await Mam.fetch(requestData.root, mode, key, data => console.log('data:', Converter.trytesToAscii(data)))
        console.log('resp:', resp)
        responseObject(resp)
    }
};
