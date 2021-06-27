export const update_meeting = (meeting_json) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(meeting_json)
    };
    return fetch('/api/local', requestOptions).then(response => response.json());
    
} 