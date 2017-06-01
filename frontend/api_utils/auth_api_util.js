export const login = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/auth/login',
    dataType: 'json',
    data
  })
);
