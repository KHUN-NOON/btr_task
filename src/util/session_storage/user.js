export function setCurrUser(id) {
    sessionStorage.setItem('curr_user_id', id)
}

export function getCurrUser() {
    return sessionStorage.getItem('curr_user_id')
}

export function removeCurrUser() {
    sessionStorage.removeItem('curr_user_id')
}