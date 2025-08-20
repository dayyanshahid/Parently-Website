import React from "react";

export default function ProjectCard({ emoji, title, overview, features, tech }) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-gray-700 shadow-lg hover:scale-[1.03] transform transition">
      <div className="absolute top-4 right-4 text-3xl">{emoji}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      {overview && <p className="text-gray-200 mb-4">{overview}</p>}
      {features?.length > 0 && (
        <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
      <p className="text-xs text-gray-400 italic">Tech: {tech}</p>
    </div>
  );
}
