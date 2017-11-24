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

export const stopTaskTimer = (taskActivity) => (
  $.ajax({
    method: "POST",
    url: "api/tasks/stop_task_timer",
    dataType: 'json',
    data: { taskActivity }
  })
);

export const pauseTaskTimer = (taskActivity) => (
  $.ajax({
    method: "POST",
    url: "api/tasks/pause_task_timer",
    dataType: 'json',
    data: { taskActivity }
  })
);

export const resumeTaskTimer = (taskActivity) => (
  $.ajax({
    method: "POST",
    url: "api/tasks/resume_task_timer",
    dataType: 'json',
    data: { taskActivity }
  })
);
