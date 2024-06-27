import { describe } from "vitest"
import messageSlice, { getAllMessages } from "../src/redux/slices/messageSlice"

describe('Messages Slice', () => {
    it('should return the initial state', () => {
        expect(messageSlice.reducer(undefined, { type: 'unknown' })).toEqual({
            data: [],
            limit: 25,
            page: 1,
            total: 0
        })
    })

    it('should handle getAllMessages Action', () => {
        const previousState = {
            data: [],
            limit: 25,
            page: 1,
            total: 0
        }

        const predict = {
            data: [
                { sender: 1, message: 'Hello werw', timestamps: 12233434 }
            ],
            limit: 25,
            page: 1,
            total: 1
        }

        expect(messageSlice.reducer(previousState, getAllMessages(predict))).toEqual(predict)
    })

    it('should add more data to getAllMessages reducer when page size change', () => {
        
    })
})