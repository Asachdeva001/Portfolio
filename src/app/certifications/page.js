"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const sampleCertificates = [
  {
    certi_id: "1CCE7217AD5B",
    certi_name: "Frontend Developer (React)",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/frontend.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/1cce7217ad5b",
  },
  {
    certi_id: "BF64C6F95D34",
    certi_name: "Software Engineer",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/software.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/bf64c6f95d34",
  },
  {
    certi_id: "",
    certi_name: "Frontend Developer Intern",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/intern.jpg",
    certificate_url: null,
  },
  {
    certi_id: "F3910C8289A1",
    certi_name: "SQL (Advanced)",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/sql.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/f3910c8289a1",
  },
  {
    certi_id: "AF166D84A282",
    certi_name: "React (Basic)",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/react.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/af166d84a282",
  },
  {
    certi_id: "31C892E120DA",
    certi_name: "JavaScript (Intermediate)",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/js.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/31c892e120da",
  },
  {
    certi_id: "91DD00277819",
    certi_name: "Node (Basic)",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/node.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/91dd00277819",
  },
  {
    certi_id: "1D010EE8FAA5",
    certi_name: "Rest API (Intermediate)",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/rest.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/1d010ee8faa5",
  },
  {
    certi_id: "7F92B4DAF90C",
    certi_name: "Python (Basic)",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/python.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/7f92b4daf90c",
  },
  {
    certi_id: "A70662AB9013",
    certi_name: "Problem Solving (Intermediate)",
    issue_organisation: "HackerRank",
    certificate_image: "/certis/problem.jpg",
    certificate_url: "https://www.hackerrank.com/certificates/a70662ab9013",
  },
  {
    certi_id: "",
    certi_name: "Top 5%  June Season #T20DSAChallenge",
    issue_organisation: "Audevday",
    certificate_image: "/certis/DSA.jpg",
    certificate_url: null,
  },
  {
    certi_id: "2025H2S04GENAI-A500050",
    certi_name: "GEN AI Academy",
    issue_organisation: "Hack2Skill",
    certificate_image: "/certis/genai.jpg",
    certificate_url: "https://certificate.hack2skill.com/user/genai5/2025H2S04GENAI-A500050",
  },
  {
    certi_id: "",
    certi_name: "Cloud Study Jam",
    issue_organisation: "GDSC PEC",
    certificate_image: "/certis/cloud.jpg",
    certificate_url: null,
  },
  
];

export default function Certifications() {
  const [current, setCurrent] = useState(0);
  const len = sampleCertificates.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % len);
    }, 5000);
    return () => clearInterval(timer);
  }, [len]);

  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + len) % len);
  const next = () => setCurrent((prev) => (prev + 1) % len);

  const cert = sampleCertificates[current];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-100 mb-4">Certifications</h1>
        <p className="text-lg text-gray-400 mb-6">
          Here you&apos;ll find a curated list of my professional certifications and achievements.
        </p>
        <div
          className="relative mx-auto flex flex-col items-center justify-center"
          style={{ width: 750, maxWidth: '100%' }}
        >
          {/* Velvet petrol gradient border */}
          <div className="absolute inset-0 rounded-2xl p-1"
            style={{
              background: 'linear-gradient(135deg, #0A0F0D 0%, #2D4F4A 50%, #8DB1A4 100%)',
              opacity: 0.85,
              filter: 'blur(2px)',
              pointerEvents: 'none',
            }}
          />
          {/* Certificate card with gradient background */}
          <div
            className="relative w-full rounded-2xl shadow-2xl border border-[#2D4F4A] flex flex-col items-center px-6 py-6 z-10"
            style={{
              background: 'linear-gradient(135deg, #0A0F0D 0%, #2D4F4A 50%, #8DB1A4 100%)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Certificate image (show full, no cropping) */}
            {cert.certificate_image && (
              <div className="flex justify-center items-center w-full mb-4" style={{ minHeight: 220 }}>
                <Image
                  src={cert.certificate_image}
                  alt={cert.certi_name + ' certificate'}
                  width={650}
                  height={340}
                  priority
                  className="rounded-lg shadow-xl border border-[#8DB1A4] bg-black object-contain"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 340,
                    width: '100%',
                    objectFit: 'contain',
                    background: '#111',
                    padding: 8,
                  }}
                />
              </div>
            )}
            {/* Certificate details below image */}
            <div className="flex flex-col items-center w-full mt-2">
              <div className="mb-1 text-xs tracking-widest font-mono text-grey-200 text-center">{cert.certi_id}</div>
              <div className="text-xl font-extrabold text-white mb-1 drop-shadow-lg text-center">{cert.certi_name}</div>
              <div className="text-md mb-2 font-semibold text-grey-200 text-center">{cert.issue_organisation}</div>
              {cert.certificate_url && (
                <a
                  href={cert.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200 mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #0A0F0D 0%, #2D4F4A 50%, #8DB1A4 100%)',
                    color: '#fff',
                  }}
                >
                  View Certificate
                </a>
              )}
            </div>
          </div>
        </div>
        {/* Pagination Controls */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={prev}
              className="px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #0A0F0D 0%, #2D4F4A 50%, #8DB1A4 100%)',
                color: '#fff',
              }}
            >
              Prev
            </button>
            <button
              onClick={next}
              className="px-5 py-2 rounded-lg font-semibold shadow transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #0A0F0D 0%, #2D4F4A 50%, #8DB1A4 100%)',
                color: '#fff',
              }}
            >
              Next
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            {sampleCertificates.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-8 h-8 rounded-full font-bold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8DB1A4] ${
                  idx === current
                    ? 'scale-110 shadow-lg'
                    : ''
                }`}
                style={
                  idx === current
                    ? {
                        background: 'linear-gradient(135deg, #0A0F0D 0%, #2D4F4A 50%, #8DB1A4 100%)',
                        color: '#fff',
                        borderColor: '#8DB1A4',
                      }
                    : {
                        background: 'rgba(10,15,13,0.7)',
                        color: '#8DB1A4',
                        borderColor: '#2D4F4A',
                      }
                }
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 