import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Tutors() {
  const { token } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!token) return; //Wait until token is available
    fetchTutors();
  }, [token]); // rerun when token changes

  async function fetchTutors() {
    try {
      const res = await api.get("/api/tutors?subject=" + encodeURIComponent(q));
      setTutors(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="app__grid">
      <div className="card">
        <div className="card__head">
          <h2>Tutors</h2>
          <div className="search_spacer">
            <input
              placeholder="Search subject"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="btn" onClick={fetchTutors}>
              Search
            </button>
          </div>
        </div>
        <div className="card__body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subjects</th>
                <th>Rate</th>
                <th>City</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(tutors || []).map((t) => (
                <tr key={t.id}>
                  <td>{t.user?.name || t.userName || t.userName}</td>
                  <td>{JSON.stringify(t.subjectsJson || t.subjects)}</td>
                  <td>
                    {t.hourlyRateCents
                      ? `R${(t.hourlyRateCents / 100).toFixed(2)}`
                      : "-"}
                  </td>
                  <td>{t.city}</td>
                  <td>
                    <Link to={`/tutors/${t.id}`} className="btn btn--sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
