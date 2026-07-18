import React from "react";
export default function StatCard({icon,label,value,growth,color="purple"}){
  return <div className={`stat-card ${color}`}>
    <div className="stat-icon">{icon}</div>
    <div><span>{label}</span><strong>{value}</strong><small>↑ {growth}% <em>vs last 30 days</em></small></div>
  </div>
}
