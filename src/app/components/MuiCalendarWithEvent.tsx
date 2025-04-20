"use client";
import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function MuiCalendarWithEvents() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [event, setEvent] = React.useState<string>("");
  const [savedEvents, setSavedEvents] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    const stored = localStorage.getItem("events");
    if (stored) {
      setSavedEvents(JSON.parse(stored));
    }
  }, []);

  React.useEffect(() => {
    if (date) {
      const key = date.format("YYYY-MM-DD");
      setEvent(savedEvents[key] || "");
    }
  }, [date, savedEvents]);

  const handleSave = () => {
    if (!date) return;
    const key = date.format("YYYY-MM-DD");
    const updatedEvents = { ...savedEvents, [key]: event };
    setSavedEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="max-w-md mx-auto p-4 bg-white shadow-2xl rounded-xl space-y-4">
        <DateCalendar
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />

        <div>
          <h2 className="text-lg font-semibold mb-2">
            {date ? date.format("YYYY年MM月DD日") : "日付を選択してください"}
          </h2>
          <textarea
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            placeholder="予定を入力..."
            className="w-full h-24 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSave}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            保存
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
}
