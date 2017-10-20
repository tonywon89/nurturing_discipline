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

export const emailResetPassword = (email) => (
  $.ajax({
    method: 'POST',
    url: 'api/auth/emailresetpassword',
    dataType: 'json',
    data: { email: email }
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

