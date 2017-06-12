export const RECEIVE_CSRF_TOKEN = "RECEIVE_CSRF_TOKEN";

export const receiveCsrfToken = (csrfToken) => ({
  type: RECEIVE_CSRF_TOKEN,
  csrfToken
});

export const fetchCsrfToken = () => dispatch => {
  $.ajax({
    method: 'GET',
    url: 'api/csrf',
    dataType: 'json'
  }).then((data) => {
    $.ajaxSetup({
        headers: { "X-CSRF-Token": data.csrfToken }
    });
    dispatch(receiveCsrfToken(data.csrfToken));
  });
}
