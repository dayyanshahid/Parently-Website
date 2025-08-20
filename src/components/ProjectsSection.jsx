import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection({ aiProjects, otherProjects }) {
  return (
    <section id="projects" className="py-20 px-6">
      {[
        { title: "AI Projects", list: aiProjects },
        { title: "Other Notable Projects", list: otherProjects },
      ].map((group, idx) => (
        <div key={idx} className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">{group.title}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {group.list.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <ProjectCard {...proj} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
