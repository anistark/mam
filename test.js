function fetchData(requestData, cb) {
    console.log('requestData:', requestData);
    try {
        if(requestData.root == requestData.baseRoot) {
            // End of line
            cb(null, {
                'data': '',
                'next': false
            })
        }
        else {
            // Might have another
            cb(null, {
                'data': '',
                'next': true
            })
        }
    } catch (err) {
        console.log('err:', err);
        cb(err)
    }
}

var requestData = {
    baseRoot: '',
    root: ''
}

fetchData(requestData, function (err, co) {
    if(err) {
        console.log('err caught:', err);
    }
    else {
        console.log('data found:', co);
    }
})
