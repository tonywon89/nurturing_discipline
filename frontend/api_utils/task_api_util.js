export const fetchTasks = () => (
  $.ajax({
    method: "GET",
    url: "api/tasks",
    dataType: 'json',
  })
);
