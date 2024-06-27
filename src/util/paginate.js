export function paginate(array = [], limit, page) {
    const desc = array.sort((a, b) => b.timestamps - a.timestamps)

    if ( array.length > 0 ) {
        return desc.splice((page - 1) * limit, page * limit).sort((a, b) => a.timestamps - b.timestamps)
    }

    return desc
}