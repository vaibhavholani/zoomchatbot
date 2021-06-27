export const delete_meeting = (meeting_id) => {
    return fetch(`api/local/${meeting_id}`, {method: 'DELETE'}).then(response => response.json())
}