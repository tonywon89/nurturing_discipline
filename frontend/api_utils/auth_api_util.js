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

