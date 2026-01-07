"use client";
import React, { useState } from "react";

function MemberCard({
  name,
  title,
  bio,
  imageUrl,
  hoverImageUrl,
}: {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  hoverImageUrl: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 10px 20px 0px",
    cursor: "pointer",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "280px",
    height: "380px",
    maxWidth: "280px",
    overflow: "hidden",
    position: "relative",
    width: "280px",
    backgroundImage: `url("${isHovered ? hoverImageUrl : imageUrl}")`, // swap on hover
    borderRadius: "20px",
    padding: "20px",
    transition: "all 0.4s ease-in-out",
  };

  const overlayStyle: React.CSSProperties = {
    backgroundColor: "rgba(58, 59, 63, 0.8)",
    height: "100%",
    left: 0,
    opacity: isHovered ? 1 : 0,
    position: "absolute",
    top: 0,
    transition: "opacity 0.3s ease-out",
    width: "100%",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
  };

  const titleStyle: React.CSSProperties = {
    color: "#fff",
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "10px",
  };

  const roleStyle: React.CSSProperties = {
    color: "rgb(221, 224, 226)",
    fontSize: "16px",
    marginBottom: "10px",
  };

  const bioStyle: React.CSSProperties = {
    color: "#fff",
    fontSize: "14px",
    lineHeight: "20px",
    fontFamily: '"Titillium Web", "sans-serif"',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={overlayStyle}>
        <h4 style={titleStyle}>{name}</h4>
        <span style={roleStyle}>
          <em>{title}</em>
        </span>
        <p style={bioStyle}>{bio}</p>
      </div>
    </div>
  );
}

export default function Component() {
  const teamMembers = [
    {
      name: "Dr. Martine Rothblatt",
      title: "Director",
      bio: "Founder of Sirius XM radio and United Therapeutics...",
      imageUrl: "https://beta.team/hubfs/Team%20Photos/Martine_Rothblatt.png",
      hoverImageUrl: "https://beta.team/hubfs/Team%20Photos/francesco-capretti.jpg",
    },
    {
      name: "Chuck Davis",
      title: "Chair, Director",
      bio: "CEO of Stone Point Capital, Board member of Progressive Insurance.",
      imageUrl: "https://beta.team/hubfs/Team%20Photos/chuck-davis.jpg",
      hoverImageUrl: "https://beta.team/hubfs/Team%20Photos/eric-hirshberg.jpg",
    },
    {
      name: "John Abele",
      title: "Advisor",
      bio: "Co-founder of Boston Scientific, experienced leader in healthcare innovation.",
      imageUrl: "https://beta.team/hubfs/Team%20Photos/John-Abele.png",
      hoverImageUrl: "https://beta.team/hubfs/Team%20Photos/dean-kamen.jpg",
    },
    {
      name: "David Churchill",
      title: "Director",
      bio: "Business leader with expertise in strategic growth and aerospace development.",
      imageUrl: "https://beta.team/hubfs/Team%20Photos/CHURCHILL_DAVID-2.jpg",
      hoverImageUrl: "https://beta.team/hubfs/Team%20Photos/McConville_Jim.jpg",
    },
    {
      name: "Kyle Clark",
      title: "Director",
      bio: "CEO of BETA Technologies, driving innovation in electric aviation.",
      imageUrl: "https://beta.team/hubfs/Clark_Kyle.jpg",
      hoverImageUrl: "https://beta.team/hubfs/Team%20Photos/Mike-Stone.png",
    },
    {
      name: "Chris Timchak",
      title: "Advisor",
      bio: "Expert in financial structuring and growth strategies.",
      imageUrl: "https://beta.team/hubfs/Team%20Photos/chris-timchak.jpg",
      hoverImageUrl: "https://beta.team/hubfs/Team%20Photos/ed-eppler-portrait.jpg",
    },
    {
      name: "John Abele",
      title: "Advisor",
      bio: "Co-founder of Boston Scientific, experienced leader in healthcare innovation.",
      imageUrl: "https://beta.team/hubfs/Team%20Photos/John-Abele.png",
      hoverImageUrl: "https://beta.team/hubfs/Team%20Photos/dean-kamen.jpg",
    },
    {
      name: "Chuck Davis",
      title: "Chair, Director",
      bio: "CEO of Stone Point Capital, Board member of Progressive Insurance.",
      imageUrl: "https://beta.team/hubfs/Team%20Photos/chuck-davis.jpg",
      hoverImageUrl: "https://beta.team/hubfs/Team%20Photos/eric-hirshberg.jpg",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        color: "rgb(58, 59, 63)",
        fontSize: "16px",
        lineHeight: "24px",
        fontFamily: '"Titillium Web", "sans-serif"',
        padding: "40px 80px",
      }}
    >
      {/* Header Section */}
      <div
        style={{  
          width: "100%",
          marginTop: "120px",
          marginBottom: "80px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            fontWeight: 600,
            fontFamily: '"Titillium Web", "sans-serif"',
            color: "#3a3b3f",
            marginBottom: "10px",
          }}
        >
          Meet our Team
        </h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          Passionate leaders, advisors, and innovators behind our mission.
        </p>
      </div>

      {/* Grid of Member Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {teamMembers.map((member, index) => (
          <MemberCard
            key={index}
            name={member.name}
            title={member.title}
            bio={member.bio}
            imageUrl={member.imageUrl}
            hoverImageUrl={member.hoverImageUrl}
          />
        ))}
      </div>
    </div>
  );
}
