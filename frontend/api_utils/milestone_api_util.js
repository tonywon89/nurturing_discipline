export const createMilestone = (data) => (
  $.ajax({
    method: 'POST',
    url: 'api/milestones',
    dataType: 'json',
    data
  })
);
