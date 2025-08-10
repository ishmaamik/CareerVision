import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './profileSlice.js'
import successReducer from './successSlice.js'
import userReducer from './userSlice.js'
import uploadReducer from './uploadSlice.js'

const store= configureStore({
    reducer:{
        profile: profileReducer,
        success: successReducer,
        user: userReducer,
        upload: uploadReducer,
    }
})

export default store