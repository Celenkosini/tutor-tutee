import React, { useState } from "react";
import api from "../api/axios";
import { formatISO } from "date-fns";

export default function SessionModal({ tutorId, onClose }) {
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [duration, setDuration] = useState(60);
  const [err, setErr] = useState(null);

  const submit = async () => {
    setErr(null);
    try {
      const payload = {
        tutorId,
        subject,
        description: desc,
        locationType: "ONLINE",
        scheduledAt: scheduledAt,
        durationMinutes: duration,
      };
      await api.post("/api/sessions", payload);
      onClose();
      alert("Session requested");
    } catch (e) {
      setErr(e.message || "Failed");
    }
  };

  return (
    <div className="modal">
      <div className="modal__card">
        <h3>Request Session</h3>
        {err && <div className="error">{err}</div>}
        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          placeholder="Short description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value || 0))}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--primary" onClick={submit}>
            Request
          </button>
          <button className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
