var $ = require("jquery");

export const login = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/auth/login',
    dataType: 'json',
    data
  })
);

export const register = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/auth/register',
    dataType: 'json',
    data
  })
);

export const logout = () => (
  $.ajax({
    method: 'POST',
    url: 'api/auth/logout',
    dataType: 'json',
  })
);

export const emailForgotAuthInfo = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/auth/emailForgotAuthInfo',
    dataType: 'json',
    data: { email: data.email, forgotUsername: data.forgotUsername, forgotPassword: data.forgotPassword }
  })
);

export const resetPassword = (data) => (
  $.ajax({
    method: 'POST',
    url: '/api/auth/resetpassword',
    dataType: 'json',
    data
  })
);

export const checkValidToken = (token) => (
  $.ajax({
    method: 'GET',
    url: '/api/auth/checkValidToken',
    dataType: 'json',
    data: { token: token }
  })
)

