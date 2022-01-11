const view = require('./view')
const create = require('./create')
const update = require('./update')

const actionHandler = ({ action }) => {
    if (/view/i.test(action)) {
        return view(action)
    } else if (/add/i.test(action)) {
        return create(action)
    } else if (/remove/i.test(action)) {
        return remove(action)
    } else {
        return update(action)
    }
}


module.exports = actionHandler