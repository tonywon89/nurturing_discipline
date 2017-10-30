export const createMilestone = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/milestones',
    dataType: 'json',
    data
  })
);

export const fetchMilestones = () => (
  $.ajax({
    method: 'GET',
    url: 'api/milestones',
    dataType: 'json'
  })
);

export const createSubMilestone = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/milestones/submilestones',
    dataType: 'json',
    data
  })
);

export const updateMilestone = (data) => (
  $.ajax({
    method: 'PATCH',
    url: 'api/milestones',
    dataType: 'json',
    data
  })
);

export const deleteMilestone = (data) => (
  $.ajax({
    method: 'DELETE',
    url: 'api/milestones',
    dataType: 'json',
    data
  })
);

export const createTask = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/milestones/tasks',
    dataType: 'json',
    data
  })
);

export const deleteTask = (data) => (
  $.ajax({
    method: 'DELETE',
    url: 'api/milestones/tasks',
    dataType: 'json',
    data
  })
)
