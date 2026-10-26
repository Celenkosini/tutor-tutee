import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import SessionModal from "../../shared/SessionModal";

export default function TutorProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/api/tutors/${id}`)
      .then((r) => setProfile(r.data.data || r.data))
      .catch(console.error);
  }, [id]);

  if (!profile) return <div className="card">Loading...</div>;

  return (
    <div className="app__grid">
      <div className="card card__head">
        <h2>{profile.user?.name || profile.userName}</h2>
      </div>
      <div className="card card__body">
        <p>{profile.bio}</p>
        <p className="muted">Subjects: {profile.subjectsJson}</p>
        <p className="muted">
          Rate:{" "}
          {profile.hourlyRateCents
            ? `R${(profile.hourlyRateCents / 100).toFixed(2)}`
            : "—"}
        </p>
        <button className="btn btn--primary" onClick={() => setOpen(true)}>
          Request Session
        </button>
      </div>
      {open && (
        <SessionModal
          onClose={() => setOpen(false)}
          tutorId={profile.user?.id || profile.userId || profile.id}
        />
      )}
    </div>
  );
}
