import {createSlice} from '@reduxjs/toolkit'

const initialState={
    data:[],
    
}

export const todoSlice=createSlice({
    name:'todos',
    initialState,
    reducers:{

        setData:(state, action) => {
            state.data = action.payload;
        },

        add :(state,action)=>{
            state.data=[...state.data, action.payload]
        },

        remove:(state,action)=>{
            const index = state.data.findIndex(

                (data) => {
                   return data._id === action.payload._id
                }
                
            )
                console.log(index)

            let newData = [...state.data]

            if(index >=0){
                newData.splice(index, 1)
            }
            else{
                console.warn(`Cannot remove (id: ${action.payload.id}) as it is not in the todo`)
            }

            state.data = newData;
        },

        clearData: (state, action) =>{
            state.data = action.payload
        }
    }
})

export const {add, remove, setData}=todoSlice.actions
export default todoSlice.reducer