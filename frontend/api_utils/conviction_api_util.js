var $ = require("jquery");

export const fetchConvictions = (userId) => (
  $.ajax({
    method: 'GET',
    url: 'api/convictions',
    dataType: 'json',
    data: { userId }
  })
);

export const createConviction = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/convictions',
    dataType: 'json',
    data
  })
);

export const deleteConviction = (convictionId) => (
  $.ajax({
    method: 'DELETE',
    url: 'api/convictions',
    dataType: 'json',
    data: { convictionId }
  })
);

export const editConviction = (data) => (
  $.ajax({
    method: 'PATCH',
    url: 'api/convictions',
    dataType: 'json',
    data
  })
);
