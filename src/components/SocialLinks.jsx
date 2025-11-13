"use client"

export default function SocialLinks() {
  const socials = [
    { icon: "github", link: "https://github.com" },
    { icon: "linkedin", link: "https://linkedin.com" },
    { icon: "twitter", link: "https://twitter.com" },
    { icon: "envelope", link: "mailto:contact@example.com" },
  ]

  return (
    <div
      style={{
        position: "fixed",
        right: "40px",
        bottom: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        zIndex: 10,
      }}
    >
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-circle"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10, 25, 47, 0.7)",
            color: "#e6f1ff",
            border: "2px solid #00a8ff",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#00a8ff"
            e.target.style.color = "#0a192f"
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(10, 25, 47, 0.7)"
            e.target.style.color = "#e6f1ff"
          }}
        >
          <i className={`fab fa-${social.icon}`}></i>
        </a>
      ))}
    </div>
  )
}
