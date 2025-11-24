"use client";

import { FaInstagram, FaYoutube, FaTiktok, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Card } from "@/components/ui/card";

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/galdora_gmbh/",
    // Instagram gradient
    className: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white border-none",
    iconColor: "text-white",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://youtube.com",
    // YouTube Red
    className: "bg-[#FF0000] text-white border-none",
    iconColor: "text-white",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    url: "https://www.tiktok.com/@galdora1",
    // TikTok Black
    className: "bg-black text-white border-none",
    iconColor: "text-white",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/company/galdora-personalmanagement/",
    // LinkedIn Blue
    className: "bg-[#0077b5] text-white border-none",
    iconColor: "text-white",
  },
  {
    name: "Website",
    icon: FaGlobe,
    url: "https://www.galdora.de",
    // Neutral/Brand color (using a dark slate for contrast or brand color if known)
    className: "bg-slate-800 text-white border-none",
    iconColor: "text-white",
  },
];

export function SocialLinks() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Card className={`p-4 relative flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${link.className}`}>
            <div className="absolute left-4 flex items-center">
              <link.icon className={`w-6 h-6 ${link.iconColor} group-hover:scale-110 duration-300`} />
            </div>
            <span className="font-medium text-lg text-center">{link.name}</span>
            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-white">
              →
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}
