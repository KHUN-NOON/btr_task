import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    limit: 25,
    page: 1,
    total: 0
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        getAllMessages: (state, action) => {
            const newData = action.payload.data 

            const orgData = [...state.data]

            const mergedArr = [...newData, ...orgData].reduce((acc, currVal) => {
                const found = acc.some(val => val.id == currVal.id)   

                if (!found) {
                    acc.push(currVal)
                }

                return acc
            }, [])

            state.data = mergedArr
            state.total = action.payload.total
        },
        addMessage: (state, action) => {
            const copied = state.data

            if ( copied.length > 25 ) {
                copied.shift()
            }

            state.data.push(action.payload)
            state.total += 1
        },
        changePage: (state) => {
            const calc = state.page * state.limit 

            if ( calc < state.total ) {
                state.page = state.page + 1
            }
        }
    }
})

export const { getAllMessages, addMessage, changePage } = messageSlice.actions

export default messageSlice