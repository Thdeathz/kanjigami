import apiSlice from '~/app/api/apiSlice'

import { logout, resetEmailSuccess, setCredentitals, setResetEmail, setVerified } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    loginByEmail: builder.mutation({
      query: (credentials: UserCredentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data as { accessToken: string }

          dispatch(setCredentitals({ accessToken }))
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (error) {
          console.error(error)
        }
      }
    }),

    loginByGoogle: builder.mutation({
      query: (googleIdToken: string) => ({
        url: '/auth/google',
        method: 'POST',
        body: { googleIdToken }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data as { accessToken: string }

          dispatch(setCredentitals({ accessToken }))
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (error) {
          console.error(error)
        }
      }
    }),

    signup: builder.mutation({
      query: (userData: RegisterRequest) => ({
        url: '/user',
        method: 'POST',
        body: { ...userData }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data as { accessToken: string }

          dispatch(setCredentitals({ accessToken }))
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (error) {
          console.error(error)
        }
      }
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(logout(undefined))
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (error) {
          console.error(error)
        }
      }
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data as { accessToken: string }

          dispatch(setCredentitals({ accessToken }))
        } catch (error) {
          console.error(error)
        }
      }
    }),

    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: '/password',
        method: 'POST',
        body: { email }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const response = data as ApiResponse<{ email: string }>

          dispatch(setResetEmail({ email: response.data.email }))
        } catch (error) {
          console.error(error)
        }
      }
    }),

    verifyOTPToken: builder.mutation({
      query: data => ({
        url: '/password/verify',
        method: 'POST',
        body: { ...data }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(setVerified({ verified: true }))
        } catch (error) {
          console.error(error)
        }
      }
    }),

    resetPassword: builder.mutation({
      query: ({ password }) => ({
        url: '/password/reset',
        method: 'POST',
        body: { password }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(resetEmailSuccess())
        } catch (error) {
          console.error(error)
        }
      }
    })
  })
})

export const {
  useLoginByEmailMutation,
  useLoginByGoogleMutation,
  useSendLogoutMutation,
  useSignupMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useVerifyOTPTokenMutation,
  useResetPasswordMutation
} = authApiSlice
