const Mam = require('./lib/mam.client.js')
const Converter = require('@iota/converter')

let node = 'https://nodes.iota.fm:443/'

module.exports = {

    mamPublish: function(requestData, responseObject) {
        let mode = 'public'
        console.log('requestData:', requestData);
        responseObject({'root': 'asdsdasd'})
    },

    mamFetch: async function(requestData, responseObject) {
        console.log('requestData:', requestData);
        let mode = 'public'
        let key = null
        const resp = await Mam.fetch(requestData.root, mode, key, data => console.log('data:', Converter.trytesToAscii(data)))
        console.log('resp', resp)
        responseObject(resp)
    }
};
