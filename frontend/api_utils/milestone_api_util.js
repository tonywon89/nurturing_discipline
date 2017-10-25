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
