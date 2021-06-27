export const insert_meeting = (meeting_json) => {
    
    meeting_json["settings"] = {
        announcements: [], 
        faqs: [],
        textCommands: [], 
        queueCommands: [],
        wakeWord: "!"
    }
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meeting_json)
    };
    return fetch('/api/local', requestOptions).then(response => response.json());
}