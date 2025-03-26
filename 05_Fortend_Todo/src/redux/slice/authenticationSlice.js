import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'http://localhost:3000/authservice';

const SignUpActions = createAsyncThunk(
    'authentication/signup',
    async (data, { rejectWithValue }) => {
        try {
            // console.log('thunkapi => ', thunkAPI);

            const response = await axios.post(`${baseUrl}/signup`, data);
            if (response?.status === 201)
                return response.data;

        } catch (error) {
            const errorMessage = error?.response?.data?.err || error?.response?.data?.message || 'Failed to signup';
            return rejectWithValue(errorMessage);
        }
    }
);

const LoginAction = createAsyncThunk(
    'authentication/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}/signin`, data);

            if (response?.status === 201)
                return response.data;
        } catch (error) {
            console.log('error from => ', error);

            const errorMessage = error?.response?.data?.err || error?.response?.data?.message || 'Failed to Login';
            return rejectWithValue(errorMessage);
        }
    }
);


const changePasswordAction = createAsyncThunk('authentication/changepassword', async ({ email, oldPassword, newPassword, token }, { rejectWithValue }) => {
    try {

        const data = { email, oldPassword, newPassword };
        console.log((email), oldPassword, newPassword);

        const response = await axios.post(`${baseUrl}/changepassword`, data, {
            params: { token }
        });
        if (response?.status === 201)
            return response.data;

    } catch (error) {
        const errorMessage = error?.response?.data?.err || error?.response?.data?.message || 'Failed to Change password';

        return rejectWithValue(errorMessage);
    }
});

const verifyProcessAction = createAsyncThunk('authentication/verifyprocess', async ({ email, token }, { rejectWithValue }) => {

    try {
        // http://localhost:3003/api/v1/sendVerification?email=Saroj@gmail.com

        const response = await axios.post(`${baseUrl}/sendVerification`, { email }, {
            params: { token }
        });
        if (response?.status === 201)
            return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.err || error?.response?.data?.message || 'Failed to Send Link';

        return rejectWithValue(errorMessage)
    }

})


const ForgetProcessAction = createAsyncThunk('authentication/resetprocess', async ({ email }, { rejectWithValue }) => {

    try {
        // http://localhost:3003/api/v1/sendResetLink

        const response = await axios.post(`${baseUrl}/sendResetLink`, { email: email }

        );
        if (response?.status === 201)
            return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.err || error?.response?.data?.message || 'Failed to Send Reset Link';

        return rejectWithValue(errorMessage)
    }

})

const ResetPasswordAction = createAsyncThunk('authentication/resetpasswordprocess', async ({ token, password }, { rejectWithValue }) => {

    try {



        const response = await axios.post(`${baseUrl}/resetPassword`, { password }, { params: { token } });
        if (response?.status === 201)
            return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.err || error?.response?.data?.message || 'Failed to Reset Passsword';

        return rejectWithValue(errorMessage)
    }

})

const checkTokenAction = createAsyncThunk('authentication/checktokenprocess', async ({ token }, { rejectWithValue }) => {

    try {

        // http://localhost:3003/api/v1/authenticate

        const response = await axios.post(
            `${baseUrl}/authenticate`,
            null,
            {
                headers: {
                    'x-access-token': token, // Add the token in the headers
                },
            }
        );

        if (response?.status === 201)
            return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.err || error?.response?.data?.message || 'Failed to Reset Passsword';

        return rejectWithValue(errorMessage)
    }

})


const checkBodyTokenAction = createAsyncThunk('authentication/checkBodytokenprocess', async (token, { rejectWithValue }) => {

    try {
        // console.log('slice => token ', token);

        // http://localhost:3003/api/v1/authenticate

        const response = await axios.post(
            `${baseUrl}/verifyBodyToken`, { token });

        if (response?.status === 200)
            return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.err || error?.response?.data?.message || 'Failed to Reset Passsword';

        return rejectWithValue(errorMessage)
    }

})




const authenticationSlice = createSlice({
    name: 'loginSignUpSlice',
    initialState: {

        curUser: null, // email, token , verified, isLogin
        error: null,
        isLogin: false,

        status: 'idle'
    },

    reducers: {
        setUser: (state, action) => {
            state.curUser = action.payload;
            state.isLogin = action.payload.isLogin;
        },

        logOutUser: (state) => {
            state.isLogin = false;
            state.curUser = null;
            state.error = null;
            state.status = 'idle';

            localStorage.removeItem('currentUser');

        },
        clearError: (state) => {
            state.status = 'idle';
            state.error = null;
        }

    },
    extraReducers: (builder) => {
        builder
            //sign up 
            .addCase(SignUpActions.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(SignUpActions.fulfilled, (state) => {
                state.error = null;
                state.status = 'Fulfilled';

            })
            .addCase(SignUpActions.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;

            })

            //login action
            .addCase(LoginAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(LoginAction.fulfilled, (state, action) => {

                const data = {
                    email: action.payload.data.email,
                    token: action.payload.data.token,
                    verified: action.payload.data?.isVerified || false,
                    isLogin: true,
                }

                state.status = 'Fulfilled';
                state.error = null;
                state.isLogin = true;
                state.curUser = data;

                localStorage.setItem('currentUser', JSON.stringify(state.curUser));

            })
            .addCase(LoginAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
                state.isLogin = false;
                state.curUser = null;
            })

            // change password 
            .addCase(changePasswordAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(changePasswordAction.fulfilled, (state) => {
                state.status = 'Fulfilled';
                state.error = null;
            })

            .addCase(changePasswordAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            })

            // verify Process
            .addCase(verifyProcessAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(verifyProcessAction.fulfilled, (state) => {
                state.status = 'Fulfilled';
                state.error = null;
            })
            .addCase(verifyProcessAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
            })

            // reset password process
            .addCase(ForgetProcessAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(ForgetProcessAction.fulfilled, (state) => {
                state.status = 'Fulfilled';
                state.error = null;

            })
            .addCase(ForgetProcessAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;

            })


            //ResetPasswordAction
            .addCase(ResetPasswordAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(ResetPasswordAction.fulfilled, (state) => {
                state.status = 'Fulfilled';
                state.error = null;

            })
            .addCase(ResetPasswordAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;

            })

            //checkTokenAction checkTokenAction (check token Authenticaton)
            .addCase(checkTokenAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(checkTokenAction.fulfilled, (state) => {
                state.status = 'Fulfilled';
                state.error = null;

            })
            .addCase(checkTokenAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
                localStorage.removeItem('currentUser');

            })


            //checkBodyTokenAction
            .addCase(checkBodyTokenAction.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(checkBodyTokenAction.fulfilled, (state, action) => {

                // console.log(action.payload.data.data);

                const data = {
                    email: action.payload.data.data?.email,
                    token: action.payload.data.data?.token,
                    verified: action.payload.data?.data?.verified || false,
                    isLogin: true,
                }

                state.status = 'Fulfilled';
                state.error = null;
                state.isLogin = true;
                state.curUser = data;

                localStorage.setItem('currentUser', JSON.stringify(state.curUser));

            })
            .addCase(checkBodyTokenAction.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload;
                // localStorage.removeItem('currentUser');

            })



    }


});

export default authenticationSlice.reducer;

export const { clearError, logOutUser, setUser } = authenticationSlice.actions;

export { SignUpActions, LoginAction, changePasswordAction, verifyProcessAction, ForgetProcessAction, ResetPasswordAction, checkTokenAction, checkBodyTokenAction };