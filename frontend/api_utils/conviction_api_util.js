export const fetchConvictions = () => (
  $.ajax({
    method: 'GET',
    url: 'api/convictions',
    dataType: 'json',
  })
);
