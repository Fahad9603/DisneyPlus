import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Gamification() {
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setPoints(data.points || 0);

         
          const newBadges = [];
          if (data.points >= 100) newBadges.push("🎖️ Master");
          if (data.points >= 50) newBadges.push("🏅 Intermediate");
          if (data.points >= 10) newBadges.push("🎯 Beginner");

          setBadges(newBadges);
        }
      }
    };
    fetchData();
  }, []);

  const progressPercent = Math.min((points / 100) * 100, 100);

  return (
    <div>
      <h2>Your Progress</h2>
      <div style={{ border: "1px solid #ccc", width: "100%", marginBottom: "10px" }}>
        <div style={{
          width: `${progressPercent}%`,
          backgroundColor: "#4caf50",
          height: "20px"
        }} />
      </div>
      <p>Points: {points}</p>
      <h4>Badges:</h4>
      {badges.map((badge, idx) => (
        <span key={idx} style={{ marginRight: "10px" }}>{badge}</span>
      ))}
    </div>
  );
}

export default Gamification;
