"use client";

import { useState } from "react";
import { saveEvent, deleteEvent } from "@/utils/storage";

interface EventModalProps {
  date: string;
  onClose: () => void;
  refreshEvents: () => void;
}

const EventModal = ({ date, onClose, refreshEvents }: EventModalProps) => {
  const [eventText, setEventText] = useState("");

  const handleSave = () => {
    if (eventText.trim()) {
      saveEvent(date, eventText);
      refreshEvents();
      onClose();
    }
  };

  const handleDelete = () => {
    deleteEvent(date);
    refreshEvents();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-2">{date} の予定</h2>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="予定を入力"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            キャンセル
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>
            削除
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
