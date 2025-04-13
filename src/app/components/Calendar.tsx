"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import { getEvents } from "@/utils/storage";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Record<string, string>>({});

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const today = dayjs();
  const days = [];
  let day = startOfWeek;

  while (day.isBefore(endOfWeek, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-2xl rounded-2xl">
  <div className="flex justify-between items-center mb-4">
    <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))} className="text-lg px-3 py-1 bg-gray-200 rounded-md">
      &lt;
    </button>
    <h2 className="text-2xl font-bold">{currentDate.format("YYYY年 MM月")}</h2>
    <button onClick={() => setCurrentDate(currentDate.add(1, "month"))} className="text-lg px-3 py-1 bg-gray-200 rounded-md">
      &gt;
    </button>
  </div>

  <div className="grid grid-cols-7 text-center font-semibold text-gray-600">
    {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
      <div key={day} className="p-2">{day}</div>
    ))}
  </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className={`p-4 text-center border rounded-lg cursor-pointer transition-all duration-200 
            ${day.isSame(currentDate, "month") ? "bg-gray-50" : "text-gray-400"} 
            ${day.isSame(today, "day") ? "bg-blue-500 text-white font-bold scale-105" : "hover:bg-gray-100"}
        `}           
         onClick={() => setSelectedDate(day.format("YYYY-MM-DD"))}
          >
            {day.format("D")}
            {events[day.format("YYYY-MM-DD")] && (
              <div className="text-xs mt-1 text-red-500">
                {events[day.format("YYYY-MM-DD")]}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedDate && (
        <EventModal 
          date={selectedDate} 
          onClose={() => setSelectedDate(null)} 
          refreshEvents={() => setEvents(getEvents())}
        />
      )}
    </div>
  );
};

export default Calendar;
