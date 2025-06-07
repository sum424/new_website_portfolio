"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Award, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const skillsRef = useRef(null)
  const isInView = useInView(skillsRef, { once: true, amount: 0.3 })

  return (
    <div className="page about-page" id="about">
      <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        About Me
      </motion.h2>

      <div className="about-content">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            I'm a proactive Frontend Developer with a solid computer science foundation and practical knowledge of
            backend development principles. I specialize in creating responsive, user-centered interfaces using modern
            web technologies.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            With over 2 years of professional experience at Tech Community Nepal, I've developed and maintained user
            interfaces for web applications, focusing on seamless and intuitive user experiences across various
            platforms.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
            I'm passionate about the intersection of technology and design, where I can create experiences that are both
            functional and beautiful. My collaborative work style and ability to effectively manage tasks in Agile
            environments allow me to contribute effectively to innovative projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="resume-actions-container"
          >
            <Link href="/resume" className="resume-view-button">
              <FileText size={18} />
              <span>View Resume</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="image-placeholder"></div>
        </motion.div>
      </div>

      <motion.div
        className="skills"
        ref={skillsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h3>Skills & Expertise</h3>

        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-icon">
              <Award size={24} />
            </div>
            <h4>Frontend Development</h4>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                animate={{ width: isInView ? "90%" : 0 }}
                transition={{ duration: 1, delay: 0.1 }}
              ></motion.div>
              <span className="skill-percentage">90%</span>
            </div>
            <p>HTML5, CSS3, JavaScript, React, Responsive Design</p>
          </div>

          <div className="skill-card">
            <div className="skill-icon">
              <Award size={24} />
            </div>
            <h4>React & JavaScript</h4>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                animate={{ width: isInView ? "85%" : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              ></motion.div>
              <span className="skill-percentage">85%</span>
            </div>
            <p>React Hooks, Context API, Redux, ES6+, TypeScript</p>
          </div>

          <div className="skill-card">
            <div className="skill-icon">
              <Award size={24} />
            </div>
            <h4>Three.js & GSAP</h4>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                animate={{ width: isInView ? "75%" : 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              ></motion.div>
              <span className="skill-percentage">75%</span>
            </div>
            <p>3D Web Experiences, Animations, Interactive Elements</p>
          </div>

          <div className="skill-card">
            <div className="skill-icon">
              <Award size={24} />
            </div>
            <h4>UI/UX Design</h4>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                animate={{ width: isInView ? "80%" : 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              ></motion.div>
              <span className="skill-percentage">80%</span>
            </div>
            <p>User-Centered Design, Wireframing, Prototyping</p>
          </div>

          <div className="skill-card">
            <div className="skill-icon">
              <Award size={24} />
            </div>
            <h4>Backend Development</h4>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                animate={{ width: isInView ? "65%" : 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
              <span className="skill-percentage">65%</span>
            </div>
            <p>Node.js, Express, RESTful APIs, Database Integration</p>
          </div>
        </div>
      </motion.div>

      <div className="experience-education">
        <motion.div
          className="experience-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3>
            <Briefcase size={20} className="section-icon" />
            Work Experience
          </h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Frontend Developer</h4>
                <p className="timeline-company">Tech Community Nepal</p>
                <p className="timeline-period">April 2022 - March 2024</p>
                <ul className="timeline-details">
                  <li>Developed responsive user interfaces for web applications</li>
                  <li>Created immersive 3D web experiences using Three.js</li>
                  <li>Implemented animations with GSAP for enhanced UX</li>
                  <li>Collaborated with cross-functional teams in Agile environment</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Frontend Intern</h4>
                <p className="timeline-company">Stylus Technology, Lalitpur</p>
                <p className="timeline-period">September 2021 - March 2022</p>
                <ul className="timeline-details">
                  <li>Supported frontend development efforts</li>
                  <li>Worked on UI enhancements using HTML, CSS, and JavaScript</li>
                  <li>Gained exposure to Agile development methodologies</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="education-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h3>
            <GraduationCap size={20} className="section-icon" />
            Education
          </h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Post Graduate Degree</h4>
                <p className="timeline-company">Lambton College, Ottawa, Ontario</p>
                <p className="timeline-period">May 2024 - January 2026</p>
                <p className="timeline-degree">Full Stack Software Development</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Bachelor's Degree</h4>
                <p className="timeline-company">British College, Kathmandu, Nepal</p>
                <p className="timeline-period">November 2017 - September 2022</p>
                <p className="timeline-degree">BSc. Hons Computing</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
