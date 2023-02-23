import {createSlice, nanoid} from "@reduxjs/toolkit";
import {sub} from "date-fns";

const initialState = [
    {
        id: 1,
        title: "Test 01",
        userId: 10,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum eius eum" +
            "laudantium ut! Ab aliquam, dignissimos eum facilis fuga in magni nisi officia perspiciatis qui quibusdam" +
            "reiciendis reprehenderit velit veritatis?",
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            star: 0,
            like: 0,
        }
    },
    {
        id: 2,
        title: "Test 02",
        userId: 2,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cum, delectus doloremque ducimus" +
            "expedita laudantium quidem. Aperiam corporis deleniti doloribus eos id impedit maxime molestiae," +
            "necessitatibus odio quia sed voluptatem!",
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            star: 0,
            like: 0,
        }
    }
]

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, userId, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        userId,
                        content,
                        date: new Date().toISOString(),
                        reactions: {
                            star: 0,
                            like: 0,
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const selectAllPost = (state) => state.posts

export const {postAdded, reactionAdded} = postSlice.actions

export default postSlice.reducer