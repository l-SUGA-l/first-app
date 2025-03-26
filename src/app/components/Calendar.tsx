"use client";

import { useState } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const days = [];
  let day = startOfWeek;

  while (day.isBefore(endOfWeek, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* 月のナビゲーション */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>&lt;</button>
        <h2 className="text-xl font-bold">{currentDate.format("YYYY年 MM月")}</h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>&gt;</button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 text-center font-bold">
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>

      {/* カレンダーの日付 */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className={`p-4 text-center border rounded-lg ${day.isSame(currentDate, "month") ? "bg-gray-100" : "text-gray-400"}`}
          >
            {day.format("D")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
