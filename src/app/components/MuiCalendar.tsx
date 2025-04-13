// components/MuiCalendar.tsx
"use client";
import * as React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function MuiCalendar() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={date}
        onChange={(newValue) => setDate(newValue)}
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 4,
          p: 2,
        }}
      />
    </LocalizationProvider>
  );
}
