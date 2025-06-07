"use client"

import { useTheme } from "@/components/theme-provider"

export default function Resume() {
  const { theme } = useTheme()

  return (
    <div className={`resume-container ${theme}`}>
      <div className="resume-header">
        <h1>SUMAN THAPA</h1>
        <p>2252 Esprit Drive, Orleans | 613-301-1240 | sumanthapa326@gmail.com</p>
      </div>

      <div className="resume-section">
        <h2>Education</h2>

        <div className="resume-item">
          <div className="resume-item-header">
            <h3>Post Graduate Degree</h3>
            <p className="resume-date">MAY 2024 - JANUARY 2026</p>
          </div>
          <p className="resume-institution">FROM: LAMBTON COLLEGE, OTTAWA, ONTARIO</p>
          <p className="resume-degree">Full Stack Software Development</p>
          <p>
            Focuses on Computer Science fundamentals, software engineering, backend development, and user interface
            design. Courses include: Frontend Development, Web Frameworks, Full Stack Projects, and Agile Project
            Management.
          </p>
        </div>

        <div className="resume-item">
          <div className="resume-item-header">
            <h3>Bachelor's Degree</h3>
            <p className="resume-date">NOVEMBER 2017 - SEPTEMBER 2022</p>
          </div>
          <p className="resume-institution">FROM: BRITISH COLLEGE, KATHMANDU, NEPAL</p>
          <p className="resume-degree">Qualification: BSc. Hons Computing</p>
          <p>
            Graduated with Honours, specializing in computer science with a focus on software engineering, web
            development, and project management. Developed strong analytical and problem-solving skills applicable to
            coding and technical design.
          </p>
        </div>
      </div>

      <div className="resume-section">
        <h2>Work Experience</h2>

        <div className="resume-item">
          <div className="resume-item-header">
            <h3>FRONTEND DEVELOPER</h3>
            <p className="resume-date">APRIL 2022 - MARCH 2024</p>
          </div>
          <p className="resume-institution">TECH COMMUNITY NEPAL, KATHMANDU, NEPAL</p>
          <ul className="resume-list">
            <li>
              Developed and maintained user interfaces for web applications, focusing on a seamless and intuitive user
              experience across various platforms.
            </li>
            <li>
              Created immersive 3D web experiences using Three.js, implementing interactive 3D models, animations, and
              visual effects that significantly enhanced user engagement.
            </li>
            <li>
              Utilized GSAP (GreenSock Animation Platform) to build smooth, high-performance animations and transitions
              that improved the overall user experience and visual appeal of web applications.
            </li>
            <li>
              Collaborated with designers and backend developers to implement interactive features using JavaScript,
              HTML, and CSS.
            </li>
            <li>
              Worked on optimizing application performance, resulting in improved load times and significant boost in
              user engagement.
            </li>
            <li>
              Performed unit tests on frontend components to ensure code quality, reliability, and adherence to project
              requirements.
            </li>
            <li>
              Played a key role in collaborative coding sessions and Agile sprints, fostering an environment of teamwork
              and iterative development.
            </li>
            <li>
              Contributed to full software engineering lifecycle from planning and design to deployment and maintenance.
            </li>
            <li>
              Technologies: HTML, CSS, JavaScript (ES6+), React, Three.js, GSAP, Tailwind CSS, Bootstrap, Git, PHP, Vue
              (basic for specific projects).
            </li>
          </ul>
        </div>

        <div className="resume-item">
          <div className="resume-item-header">
            <h3>FRONTEND INTERN</h3>
            <p className="resume-date">SEPTEMBER 2021 - MARCH 2022</p>
          </div>
          <p className="resume-institution">STYLUS TECHNOLOGY, LALITPUR, NEPAL</p>
          <ul className="resume-list">
            <li>
              Supported frontend and backend development efforts, working on smaller components and UI enhancements
              using HTML and CSS.
            </li>
            <li>Assisted in design improvements to enhance user experience, leveraging HTML, CSS, and JavaScript.</li>
            <li>
              Participated in code reviews, debugging sessions, and gained exposure to Agile development methodologies.
            </li>
            <li>
              Began exploring animation libraries like GSAP for creating engaging user interfaces under senior developer
              guidance.
            </li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2>Skills</h2>
        <ul className="resume-list">
          <li>
            HTML5 & CSS3: Strong expertise in creating clean, semantic markup and utilizing CSS for layouts, animations,
            and styling and proficient knowledge of CSS frameworks such as Bootstrap and Tailwind.
          </li>
          <li>
            JavaScript (ES6+): Proficient in JavaScript, including experience with asynchronous functions, DOM
            manipulation, and event handling.
          </li>
          <li>React: Skilled in React for component-based architecture.</li>
          <li>
            Three.js: Experienced in creating 3D web experiences, including scene setup, lighting, camera controls, and
            interactive elements.
          </li>
          <li>
            GSAP: Proficient with GreenSock Animation Platform for creating high-performance animations and interactive
            user interfaces.
          </li>
          <li>Python (Basic): Familiarity with Python for basic scripting and automation tasks.</li>
          <li>
            Agile Development: Comfortable working in Agile environments with experience in sprint planning,
            retrospectives, and iterative development.
          </li>
          <li>
            Backend Development (Basic): Some exposure to backend technologies like PHP, Laravel Framework and
            experience integrating with REST APIs.
          </li>
          <li>Version Control (Git): Skilled in Git for version control, familiar with GitHub for collaboration.</li>
          <li>
            Testing & Code Quality: Experienced in writing unit tests, conducting code reviews, and debugging using
            Chrome DevTools to maintain quality assurance.
          </li>
          <li>
            Debugging Tools: Proficient with Chrome DevTools, Firefox Developer Tools and other debugging tools to
            identify and resolve issues effectively.
          </li>
          <li>
            Analytics: Basic understanding of Google Analytics for tracking user interactions and gathering insights on
            web performance.
          </li>
          <li>Collaborative and adaptable, comfortable working in team-oriented settings.</li>
          <li>Detail-oriented with the ability to meet deadlines and handle project pressures effectively.</li>
          <li>Eager to learn new technologies and stay updated on industry trends.</li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Certifications</h2>
        <ul className="resume-list">
          <li>
            Bachelor's Hons. In Computing from The British College affiliated to Leeds Beckett University of England.
          </li>
          <li>Higher National Diploma in BSc. IT from ISMT College, Nepal.</li>
          <li>"Responsive Web Design" from freecodecamp.org</li>
          <li>"JavaScript Algorithms and Data Structures" from FreeCodeCamp.org.</li>
        </ul>
      </div>

      <div className="resume-section">
        <h2>Hobbies</h2>
        <p>Travelling to explore scenic landscapes and natural beauty.</p>
        <p>Photography enthusiast and enjoy capturing moments during trips.</p>
        <p>Playing guitar during leisure time for relaxation and creativity.</p>
      </div>

      <div className="resume-section">
        <h2>Summary</h2>
        <p>
          A proactive and skilled Frontend Developer with a solid computer science foundation and practical knowledge of
          backend development principles. Proficient in coding using modern frontend technologies such as HTML, CSS,
          JavaScript, React, Three.js, and GSAP, with hands-on experience in creating responsive, user-centered
          interfaces and immersive 3D web experiences. Known for collaborative work style and ability to effectively
          manage tasks in Agile environments, seeking to leverage design and development expertise to contribute to
          innovative projects.
        </p>
      </div>

      <div className="resume-section">
        <h2>Reference</h2>
        <p>Available Upon Request</p>
      </div>
    </div>
  )
}
