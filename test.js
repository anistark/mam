const Mam = require('./lib/mam.client.js')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

// Initialise MAM State - PUBLIC
// let mamState = Mam.init('https://nodes.iota.fm:443/', 'MVGNOJGFTIOEUHYOGQITCJWUKYXSWMYXHCPREXJTKVPTZAIYDFPCJTSJFYYKTHBABJSACNFWNQWKTGPNW')

    let mamState = {
        subscribed: [],
        channel: {
            side_key: null,
            mode: 'public',
            next_root: 'NOEABVJAHDPEYFCUTWNHAKWJAQF9SFFGOKQDLUUEJJXERFMYUWJODNQHHARWFLALFRJTMFDKEQEFOPQMJ',
            security: 2,
            start: 3,
     count: 1,
     next_count: 1,
     index: 0 },
  seed: 'MVGNOJGFTIOEUHYOGQITCJWUKYXSWMYXHCPREXJTKVPTZAIYDFPCJTSJFYYKTHBABJSACNFWNQWKTGPNW' }

// Publish to tangle
const publish = async packet => {
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)
    console.log('message root:', message.root);
    // Save new mamState
    mamState = message.state
    console.log('mamState:', mamState);
    // Attach the payload.
    const resp = await Mam.attach(message.payload, message.address)

    // console.log('resp :', resp);
}

publish('POTATO FOUR')
publish('POTATO FIVE')
publish('POTATO SIX')
