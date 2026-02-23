import React, { useEffect, useRef } from "react";

const BridgeIllustration: React.FC = () => {
  const peopleContainerRef = useRef<SVGGElement>(null);
  const cloudContainerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Walker Spawning Logic
    const spawnWalker = () => {
      if (!peopleContainerRef.current) return;

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const startX = 220;
      const endX = 1220;
      const midPoint = 720;
      const bridgeY = 550;

      let x = startX;
      let isPro = false;
      const speed = 1.2;

      g.innerHTML = '<use href="#student-shape" />';

      const step = () => {
        x += speed;
        // Simple vertical bob for gait weight
        const bob = Math.abs(Math.sin(x * 0.1)) * 2;

        if (x > midPoint && !isPro) {
          isPro = true;
          g.innerHTML = '<use href="#professional-shape" />';
          // Add Poof
          const poof = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
          );
          poof.setAttribute("r", "25");
          poof.setAttribute("cy", "-40");
          poof.setAttribute("fill", "white");
          poof.setAttribute("opacity", "0.8");
          g.appendChild(poof);

          let op = 0.8;
          const fade = setInterval(() => {
            op -= 0.1;
            poof.setAttribute("opacity", op.toString());
            if (op <= 0) {
              clearInterval(fade);
              if (g.contains(poof)) g.removeChild(poof);
            }
          }, 50);
        }

        if (x > endX) {
          if (peopleContainerRef.current?.contains(g)) {
            peopleContainerRef.current.removeChild(g);
          }
          return;
        }

        const transformValue = "translate(" + x + ", " + (bridgeY - bob) + ")";
        g.setAttribute("transform", transformValue);
        requestAnimationFrame(step);
      };

      peopleContainerRef.current.appendChild(g);
      step();
    };

    const interval = setInterval(spawnWalker, 3000);
    spawnWalker(); // Initial spawn

    // Cloud Logic
    const initClouds = () => {
      if (!cloudContainerRef.current) return;
      const cloudPath =
        "M25,60.2c-1.7-18.1-17-31.5-35.2-30.8c-11.2,0.4-21.2,6.4-26.6,15.9c-4.4-4-10.2-6.2-16.2-6.1c-12.7,0.2-22.9,10.7-22.7,23.4c0.1,6.3,2.7,12.3,7.2,16.7c-4.2,2.3-6.9,6.7-6.8,11.5c0.2,7.5,6.4,13.4,13.9,13.2h86.6c7.5-0.2,13.4-6.4,13.2-13.9C38.2,79.8,33.1,65.3,25,60.2z";

      for (let i = 0; i < 5; i++) {
        const cloud = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        cloud.setAttribute("d", cloudPath);
        cloud.setAttribute("fill", "white");
        cloud.setAttribute("opacity", (Math.random() * 0.1 + 0.05).toString());

        let cx = Math.random() * 1440;
        let cy = Math.random() * 300;
        let cscale = 0.5 + Math.random() * 1.5;
        let cspeed = 0.1 + Math.random() * 0.2;

        const animateCloud = () => {
          cx += cspeed;
          if (cx > 1540) {
            cx = -200;
            cy = Math.random() * 300;
          }
          const cloudTransform =
            "translate(" + cx + ", " + cy + ") scale(" + cscale + ")";
          cloud.setAttribute("transform", cloudTransform);
          requestAnimationFrame(animateCloud);
        };
        cloudContainerRef.current.appendChild(cloud);
        animateCloud();
      }
    };
    initClouds();

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMax slice"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
        </filter>

        <g id="pine-tree">
          <path
            d="M0,0 L-5,15 L-2,15 L-6,30 L-3,30 L-7,45 H7 L3,30 H6 L2,15 H5 Z"
            fill="#061221"
          />
        </g>

        <g id="grass-tuft">
          <path
            d="M0,0 Q-2,-10 -5,-15 M0,0 Q2,-12 5,-18 M0,0 Q-1,-8 1,-10"
            stroke="#4a6b38"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g id="rock-stone">
          <path d="M0,0 L5,-5 L12,0 L10,6 L-2,5 Z" fill="#4a3b2a" />
          <path
            d="M0,0 L5,-5 L8,-2"
            stroke="#6d5843"
            strokeWidth="1"
            fill="none"
          />
        </g>

        <g id="bird">
          <path
            d="M0,0 Q5,-5 10,0 Q5,2 0,0 M10,0 Q15,-5 20,0 Q15,2 10,0"
            fill="#000"
            opacity="0.6"
          >
            <animate
              attributeName="d"
              values="M0,0 Q5,-5 10,0 Q5,2 0,0 M10,0 Q15,-5 20,0 Q15,2 10,0; M0,0 Q5,0 10,0 Q5,0 0,0 M10,0 Q15,0 20,0 Q15,0 10,0; M0,0 Q5,5 10,0 Q5,-2 0,0 M10,0 Q15,5 20,0 Q15,-2 10,0; M0,0 Q5,-5 10,0 Q5,2 0,0 M10,0 Q15,-5 20,0 Q15,2 10,0"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        <g id="student-shape">
          <g className="leg-left">
            <path
              d="M0,-35 Q-5,-35 -4,-15 L-5,0 L5,0 L4,-15 Q5,-35 0,-35 Z"
              fill="#1A202C"
            />
            <path d="M-5,0 L5,0 L5,2 Q5,4 1,4 L-2,4 Q-5,4 -5,0 Z" fill="#000" />
          </g>
          <g className="arm-left">
            <path
              d="M0,-55 L-4,-35 L0,-33 L3,-55 Z"
              fill="#2D3748"
              opacity="0.8"
            />
            <circle cx="-1.5" cy="-33" r="2" fill="#E2B08E" />
          </g>
          <path
            d="M-7,-60 L-9,-35 L-11,-10 L11,-10 L9,-35 L7,-60 Z"
            fill="#2D3748"
          />
          <path d="M-7,-60 L0,-38 L7,-60" fill="#4A5568" />
          <g className="leg-right">
            <path
              d="M0,-35 Q-4,-35 -1,-15 L-1,0 L9,0 L8,-15 Q11,-35 0,-35 Z"
              fill="#2D3748"
            />
            <path d="M-1,0 L9,0 L9,2 Q9,4 5,4 L2,4 Q-1,4 -1,0 Z" fill="#111" />
          </g>
          <g className="arm-right">
            <path d="M0,-55 L4,-38 L9,-36 L7,-55 Z" fill="#2D3748" />
            <circle cx="7" cy="-36" r="2" fill="#E2B08E" />
            <rect
              x="5"
              y="-40"
              width="3"
              height="8"
              fill="#FFF"
              transform="rotate(-15, 7, -36)"
            />
            <rect
              x="4"
              y="-38"
              width="5"
              height="1"
              fill="#F00"
              transform="rotate(-15, 7, -36)"
            />
          </g>
          <g transform="translate(0, -62)">
            <path
              d="M-2.5,4 L-2.5,-4 Q-2.5,-8 0,-8 Q2.5,-8 2.5,-4 L2.5,4 Z"
              fill="#E2B08E"
            />
            <path
              d="M-4,-3 Q-5,4 0,7 Q5,4 5,-3 Q5,-9 0,-9 Q-5,-9 -4,-3 Z"
              fill="#E2B08E"
            />
            <path d="M-9,-8 L0,-12 L9,-8 L0,-4 Z" fill="#1A202C" />
            <path
              d="M-3.5,-7 L-3.5,-4 Q-3.5,-1 3.5,-1 L3.5,-7"
              fill="#1A202C"
            />
            <circle cx="2.5" cy="-1" r="0.8" fill="#F6AD55" />
          </g>
        </g>

        <g id="professional-shape">
          <g className="leg-left">
            <path
              d="M0,-35 Q-5,-35 -4,-15 L-5,0 L5,0 L4,-15 Q5,-35 0,-35 Z"
              fill="#1A365D"
            />
            <path d="M-5,0 L5,0 L5,2 Q5,4 1,4 L-2,4 Q-5,4 -5,0 Z" fill="#000" />
          </g>
          <g className="arm-left">
            <path d="M0,-55 L-3,-38 L0,-36 L4,-55 Z" fill="#2C5282" />
            <circle cx="-1" cy="-36" r="2" fill="#E2B08E" />
          </g>
          <path
            d="M-7,-62 L-7,-30 L-7,-15 L7,-15 L7,-30 L7,-62 Z"
            fill="#2C5282"
          />
          <path d="M-7,-62 L0,-38 L7,-62" fill="#FFF" />
          <path d="M0,-58 L-1.5,-42 L0,-36 L1.5,-42 Z" fill="#E53E3E" />
          <g className="leg-right">
            <path
              d="M0,-35 Q-3,-35 -1,-15 L-1,0 L9,0 L8,-15 Q11,-35 0,-35 Z"
              fill="#2B6CB0"
            />
            <path d="M-1,0 L9,0 L9,2 Q9,4 5,4 L2,4 Q-1,4 -1,0 Z" fill="#111" />
          </g>
          <g className="arm-right">
            <path d="M2,-55 L5,-38 L9,-36 L9,-55 Z" fill="#2C5282" />
            <circle cx="7" cy="-36" r="2" fill="#E2B08E" />
            <g transform="translate(7, -36) rotate(-10)">
              <rect
                x="-1.5"
                y="0"
                width="12"
                height="8"
                rx="1"
                fill="#4A5568"
              />
              <path
                d="M1.5,0 V-2 H7 V0"
                stroke="#4A5568"
                strokeWidth="1.5"
                fill="none"
              />
            </g>
          </g>
          <g transform="translate(0, -62)">
            <path
              d="M-2.5,4 L-2.5,-4 Q-2.5,-8 0,-8 Q2.5,-8 2.5,-4 L2.5,4 Z"
              fill="#E2B08E"
            />
            <path
              d="M-4,-3 Q-5,4 0,7 Q5,4 5,-3 Q5,-9 0,-9 Q-5,-9 -4,-3 Z"
              fill="#E2B08E"
            />
            <path
              d="M-4,-4 Q-4,-10 0,-10 Q4,-10 4,-4 L4,-1 L3.5,-1 L3.5,-5 Q0,-7 -3.5,-5 L-3.5,0 L-4,0 Z"
              fill="#1A202C"
            />
          </g>
        </g>
      </defs>

      <rect width="1440" height="800" fill="url(#skyGradient)" />

      <g ref={cloudContainerRef}></g>

      <g id="bird-flock">
        <use href="#bird" x="1200" y="100" />
        <use href="#bird" x="1150" y="120" transform="scale(0.8)" />
        <use href="#bird" x="1250" y="80" transform="scale(0.9)" />
      </g>

      {/* Mountains */}
      <path
        d="M0,800 L200,450 L350,600 L500,400 L650,550 L800,350 L1000,600 L1200,420 L1400,650 L1440,800 Z"
        fill="#1e293b"
        opacity="0.6"
      />
      <g opacity="0.8">
        <path
          d="M100,800 L350,250 L550,500 L750,200 L950,550 L1150,300 L1400,800 Z"
          fill="#334155"
        />
        <path
          d="M350,250 L390,320 L350,310 L310,320 Z"
          fill="#F0F4F8"
          opacity="0.8"
        />
        <path
          d="M750,200 L790,280 L750,270 L710,280 Z"
          fill="#F0F4F8"
          opacity="0.8"
        />
        <path
          d="M1150,300 L1190,370 L1150,360 L1110,370 Z"
          fill="#F0F4F8"
          opacity="0.8"
        />
      </g>

      <g transform="translate(0, 750) scale(0.6)">
        <use href="#pine-tree" x="100" y="0" opacity="0.5" />
        <use href="#pine-tree" x="120" y="10" opacity="0.5" />
        <use href="#pine-tree" x="80" y="10" opacity="0.5" />
        <use href="#pine-tree" x="1200" y="0" opacity="0.5" />
        <use href="#pine-tree" x="1240" y="10" opacity="0.5" />
        <use href="#pine-tree" x="1160" y="15" opacity="0.5" />
      </g>

      <path
        d="M-100,800 L100,600 L250,750 L400,550 L600,800 Z"
        fill="#0f172a"
        opacity="0.9"
      />
      <path
        d="M900,800 L1100,550 L1300,750 L1500,500 L1600,800 Z"
        fill="#0f172a"
        opacity="0.9"
      />

      {/* Water */}
      <rect
        x="0"
        y="650"
        width="1440"
        height="150"
        fill="#3B82F6"
        opacity="0.8"
      />
      <path
        id="wave1"
        fill="#93C5FD"
        opacity="0.4"
        d="M0,650 C360,640 720,660 1440,650 V800 H0 Z"
      />
      <path
        id="wave2"
        fill="#FFFFFF"
        opacity="0.1"
        d="M0,660 C300,670 800,640 1440,660 V800 H0 Z"
      />

      {/* Bridge */}
      <g transform="translate(0, 50)">
        <rect x="250" y="500" width="940" height="15" fill="#6F4E37" />
        <rect x="250" y="485" width="940" height="5" fill="#8B5A2B" />
        <g fill="#5C4033">
          {[300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((x) => (
            <rect key={x} x={x} y={485} width="5" height="15" />
          ))}
        </g>
        <path
          d="M300,515 L350,560 L400,515 L450,560 L500,515 L550,560 L600,515 L650,560 L700,515 L750,560 L800,515 L850,560 L900,515 L950,560 L1000,515 L1050,560 L1100,515"
          stroke="#6F4E37"
          strokeWidth="8"
          fill="none"
          strokeLinejoin="round"
        />
        <path d="M350,560 L1050,560" stroke="#5C4033" strokeWidth="6" />
      </g>

      <g ref={peopleContainerRef}></g>

      {/* Education & Career Visuals */}
      <g transform="translate(20, 310)">
        <text
          x="75"
          y="10"
          fontFamily="sans-serif"
          fontSize="14"
          fontWeight="bold"
          fill="#60A5FA"
          textAnchor="middle"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            letterSpacing: "1px",
          }}
        >
          EDUCATION
        </text>
        <g transform="translate(40, 50)">
          <path d="M0,80 L50,40 L100,80 V150 H0 Z" fill="#D2B48C" />
          <rect x="15" y="80" width="8" height="70" fill="#C19A6B" />
          <rect x="46" y="80" width="8" height="70" fill="#C19A6B" />
          <rect x="77" y="80" width="8" height="70" fill="#C19A6B" />
          <circle cx="50" cy="65" r="8" fill="#8B4513" opacity="0.5" />
        </g>
        <g transform="translate(0, 70)">
          <rect x="0" y="20" width="60" height="60" fill="#A0522D" />
          <polygon points="0,20 30,0 60,20" fill="#8B4513" />
          <rect
            x="10"
            y="30"
            width="10"
            height="15"
            fill="#FFF"
            opacity="0.6"
          />
          <rect
            x="40"
            y="30"
            width="10"
            height="15"
            fill="#FFF"
            opacity="0.6"
          />
          <rect
            x="10"
            y="55"
            width="10"
            height="15"
            fill="#FFF"
            opacity="0.6"
          />
          <rect
            x="40"
            y="55"
            width="10"
            height="15"
            fill="#FFF"
            opacity="0.6"
          />
        </g>
        <g transform="translate(120, 60)">
          <rect x="0" y="20" width="30" height="70" fill="#BC8F8F" />
          <polygon points="-5,20 15,-10 35,20" fill="#8B4513" />
          <circle cx="15" cy="40" r="5" fill="#FFF" opacity="0.8" />
        </g>
      </g>

      <g transform="translate(1260, 260)">
        <text
          x="80"
          y="20"
          fontFamily="sans-serif"
          fontSize="14"
          fontWeight="bold"
          fill="#60A5FA"
          textAnchor="middle"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            letterSpacing: "1px",
          }}
        >
          JOB
        </text>
        <g transform="translate(20, 40)">
          <rect x="60" y="0" width="50" height="180" fill="#2C3E50" />
          <rect
            x="65"
            y="5"
            width="40"
            height="170"
            fill="#7FA1B6"
            opacity="0.3"
          />
          <line
            x1="60"
            y1="40"
            x2="110"
            y2="40"
            stroke="#34495E"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="80"
            x2="110"
            y2="80"
            stroke="#34495E"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="120"
            x2="110"
            y2="120"
            stroke="#34495E"
            strokeWidth="1"
          />
          <rect x="100" y="80" width="70" height="100" fill="#3E4E59" />
          <rect x="110" y="90" width="50" height="10" fill="#8DA3B0" />
          <rect x="110" y="110" width="50" height="10" fill="#8DA3B0" />
          <rect x="110" y="130" width="50" height="10" fill="#8DA3B0" />
          <rect x="10" y="60" width="40" height="120" fill="#5F6F79" />
          <rect
            x="15"
            y="70"
            width="10"
            height="100"
            fill="#AAB7B8"
            opacity="0.4"
          />
          <rect
            x="30"
            y="70"
            width="10"
            height="100"
            fill="#AAB7B8"
            opacity="0.4"
          />
          <polygon points="90,10 80,40 100,40" fill="#34495E" />
          <line
            x1="90"
            y1="10"
            x2="90"
            y2="-20"
            stroke="#7F8C8D"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* Foreground Cliffs */}
      <g filter="url(#shadow)">
        <path d="M0,800 V450 L100,440 L250,550 L350,800 Z" fill="#5C4033" />
        <path d="M0,450 L100,440 L80,550 Z" fill="#755242" opacity="0.6" />
        <use href="#pine-tree" x="20" y="440" transform="scale(1.2)" />
        <use href="#pine-tree" x="80" y="430" transform="scale(1.5)" />
        <use href="#pine-tree" x="140" y="460" transform="scale(1.0)" />
        <use href="#grass-tuft" x="50" y="450" />
        <use href="#grass-tuft" x="150" y="460" />
        <use href="#rock-stone" x="100" y="500" transform="scale(1.5)" />
      </g>
      <g filter="url(#shadow)">
        <path
          d="M1440,800 V450 L1340,440 L1190,550 L1090,800 H1440 Z"
          fill="#5C4033"
        />
        <path
          d="M1440,450 L1340,440 L1360,550 Z"
          fill="#755242"
          opacity="0.6"
        />
        <use href="#pine-tree" x="1350" y="430" transform="scale(1.3)" />
        <use href="#pine-tree" x="1400" y="450" transform="scale(1.1)" />
        <use href="#pine-tree" x="1280" y="460" transform="scale(0.8)" />
        <use href="#grass-tuft" x="1300" y="450" />
        <use href="#grass-tuft" x="1200" y="550" />
        <use href="#rock-stone" x="1250" y="480" transform="scale(2)" />
      </g>
    </svg>
  );
};

export default BridgeIllustration;
