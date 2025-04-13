export const getEvents = (): Record<string, string> => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("events");
      return data ? JSON.parse(data) : {};
    }
    return {};
  };
  
  export const saveEvent = (date: string, event: string) => {
    const events = getEvents();
    events[date] = event;
    localStorage.setItem("events", JSON.stringify(events));
  };
  
  export const deleteEvent = (date: string) => {
    const events = getEvents();
    delete events[date];
    localStorage.setItem("events", JSON.stringify(events));
  };
  