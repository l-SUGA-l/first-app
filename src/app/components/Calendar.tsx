"use client";

import { useState } from "react";


const Calendar = () => {
    const [currentDate, setCalentDate] = useState (dayjs());

    const startOfMonth = currentDate.start0f("month");
    const endOfMonth = currentDate.endOf("month");
    const startOfWeek = startOfMonth.startOf("week");
    const endOfWeek = endOfMonth.endOf("week");

    const days = [];
    let day = startOfWeek;
    
    while (day.isBefore(endOfWeek, "day")){
        days.push(day);
        day = days.add(1, "day");
    }
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            {/* 月のナビゲーション */}
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setCalentDate.(currentDate.subtract(1, "month"))}>&lt;</button>

            </div>
        </div>
    )
}
