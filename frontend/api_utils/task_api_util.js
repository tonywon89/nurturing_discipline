export const fetchTasks = () => (
  $.ajax({
    method: "GET",
    url: "api/tasks",
    dataType: 'json',
  })
);

export const startTaskTimer = (selectedTask) => (
  $.ajax({
    method: "POST",
    url: "api/tasks/start_timer",
    dataType: 'json',
    data: { selectedTask: selectedTask },
  })
);

export const pingTaskTimer = () => (
  $.ajax({
    method: "GET",
    url: "api/tasks/ping_task_timer",
    dataType: 'json',
  })
);
