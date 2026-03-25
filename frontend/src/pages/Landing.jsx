import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* ── tiny hook: detects when element enters viewport ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── floating mini-calendar decoration ── */
const DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];
const DATES = [
  [null,null,1,2,3,4,5],
  [6,7,8,9,10,11,12],
  [13,14,15,16,17,18,19],
  [20,21,22,23,24,25,26],
  [27,28,29,30,null,null,null],
];
const DOTS = { 3:"#f87171", 9:"#fb923c", 16:"#facc15", 23:"#86efac", 24:"#86efac" };

function MiniCalendar() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 20,
      padding: "22px 20px",
      backdropFilter: "blur(12px)",
      fontFamily: "'DM Mono', monospace",
      width: 260,
      userSelect: "none",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <span style={{ color:"#e2d9c8", fontSize:13, fontWeight:600, letterSpacing:1 }}>APRIL 2026</span>
        <div style={{ display:"flex", gap:8 }}>
          <span style={{ color:"rgba(255,255,255,0.3)", fontSize:16, cursor:"pointer" }}>‹</span>
          <span style={{ color:"rgba(255,255,255,0.3)", fontSize:16, cursor:"pointer" }}>›</span>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:6 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:10, fontWeight:600, padding:"2px 0" }}>{d}</div>
        ))}
      </div>
      {DATES.map((week, wi) => (
        <div key={wi} style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
          {week.map((d, di) => (
            <div key={di} style={{
              textAlign:"center", padding:"5px 0", fontSize:12, borderRadius:8,
              background: d === 16 ? "rgba(99,102,241,0.35)" : "transparent",
              color: d === null ? "transparent" : d === 16 ? "#fff" : "rgba(255,255,255,0.65)",
              position:"relative",
              fontWeight: d === 16 ? 700 : 400,
            }}>
              {d}
              {DOTS[d] && (
                <span style={{
                  position:"absolute", bottom:1, left:"50%", transform:"translateX(-50%)",
                  width:4, height:4, borderRadius:"50%", background: DOTS[d], display:"block"
                }}/>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── sticky note decoration ── */
function StickyNote({ color, text, rotate, top, right, delay = "0s" }) {
  return (
    <div style={{
      position:"absolute", top, right,
      background: color,
      borderRadius: 12,
      padding: "14px 16px",
      width: 140,
      transform: `rotate(${rotate}deg)`,
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      animation: `floatNote 6s ease-in-out infinite`,
      animationDelay: delay,
      fontFamily: "'DM Mono', monospace",
      fontSize: 12,
      color: "#374151",
      lineHeight: 1.4,
      zIndex: 2,
    }}>
      <span style={{ fontSize:14 }}>📌</span>
      <div style={{ marginTop:6, fontWeight:600 }}>{text}</div>
    </div>
  );
}

/* ── feature card ── */
function FeatureCard({ icon, title, desc, delay, visible }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: "32px 28px",
      transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: "rgba(99,102,241,0.15)",
        border: "1px solid rgba(99,102,241,0.25)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize: 22, marginBottom: 20,
      }}>
        {icon}
      </div>
      <h4 style={{ color:"#e2d9c8", fontSize:17, fontWeight:700, marginBottom:10, fontFamily:"'DM Sans', sans-serif" }}>
        {title}
      </h4>
      <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, lineHeight:1.7, margin:0 }}>
        {desc}
      </p>
    </div>
  );
}

export default function Landing() {
  const [featRef, featVisible] = useInView();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight:"100vh",
      background:"#0f1117",
      fontFamily:"'DM Sans', sans-serif",
      overflowX:"hidden",
    }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap');

        @keyframes floatNote {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50%       { transform: translateY(-10px) rotate(var(--r, 0deg)); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .nav-link {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #e2d9c8; }
        .cta-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          letter-spacing: 0.2px;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99,102,241,0.5);
        }
        .cta-ghost {
          color: rgba(255,255,255,0.55);
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
          transition: color 0.2s;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .cta-ghost:hover { color: #e2d9c8; border-color: rgba(255,255,255,0.25); }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"22px 48px",
        position:"sticky", top:0, zIndex:50,
        background:"rgba(15,17,23,0.85)",
        backdropFilter:"blur(16px)",
        borderBottom:"1px solid rgba(255,255,255,0.06)",
        transition:"opacity 0.5s ease",
        opacity: heroVisible ? 1 : 0,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:32, height:32, borderRadius:10,
            background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:15,
          }}>📅</div>
          <span style={{ color:"#e2d9c8", fontWeight:700, fontSize:17, letterSpacing:"-0.3px" }}>
            Scheduler
          </span>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <a href="#features" className="nav-link">Features</a>
          <Link to="/login" className="nav-link">Login</Link>
          <Link
            to="/register"
            style={{
              background:"rgba(99,102,241,0.15)",
              border:"1px solid rgba(99,102,241,0.4)",
              color:"#a5b4fc",
              padding:"8px 20px",
              borderRadius:10,
              fontSize:14,
              fontWeight:600,
              textDecoration:"none",
              transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background="rgba(99,102,241,0.28)"; }}
            onMouseLeave={e => { e.target.style.background="rgba(99,102,241,0.15)"; }}
          >
            Register
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        maxWidth:1100, margin:"0 auto",
        padding:"80px 48px 100px",
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:48,
        alignItems:"center",
        position:"relative",
      }}>

        {/* Left copy */}
        <div>
          {/* pill badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(99,102,241,0.12)",
            border:"1px solid rgba(99,102,241,0.28)",
            borderRadius:100,
            padding:"6px 16px",
            marginBottom:28,
            transition:"opacity 0.7s ease, transform 0.7s ease",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(16px)",
          }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#818cf8", display:"inline-block" }}/>
            <span style={{ color:"#a5b4fc", fontSize:12, fontWeight:600, letterSpacing:0.5 }}>
              STICKY NOTES → CALENDAR
            </span>
          </div>

          <h1 style={{
            color:"#e2d9c8",
            fontSize:52,
            fontWeight:700,
            lineHeight:1.08,
            letterSpacing:"-1.5px",
            margin:"0 0 24px",
            fontFamily:"'DM Sans', sans-serif",
            transition:"opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          }}>
            Your schedule,<br />
            <span style={{
              background:"linear-gradient(90deg,#818cf8,#c084fc)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
            }}>finally visual.</span>
          </h1>

          <p style={{
            color:"rgba(255,255,255,0.45)",
            fontSize:17,
            lineHeight:1.75,
            maxWidth:440,
            margin:"0 0 40px",
            transition:"opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          }}>
            Write sticky notes, pick a color, drag them straight onto your
            calendar. No forms, no friction — just your thoughts, organized.
          </p>

          <div style={{
            display:"flex", gap:12, alignItems:"center",
            transition:"opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          }}>
            <Link to="/Dashboard" className="cta-primary">
              Open Scheduler →
            </Link>
            <Link to="/login" className="cta-ghost">
              Sign in
            </Link>
          </div>

          {/* Social proof line */}
          <div style={{
            marginTop:36, display:"flex", alignItems:"center", gap:12,
            transition:"opacity 0.7s ease 0.4s",
            opacity: heroVisible ? 1 : 0,
          }}>
            <div style={{ display:"flex" }}>
              {["#6366f1","#8b5cf6","#ec4899","#f59e0b"].map((c,i) => (
                <div key={i} style={{
                  width:28, height:28, borderRadius:"50%",
                  background:c,
                  border:"2px solid #0f1117",
                  marginLeft: i === 0 ? 0 : -8,
                }}/>
              ))}
            </div>
            <span style={{ color:"rgba(255,255,255,0.35)", fontSize:13 }}>
              Simple. Fast. Yours.
            </span>
          </div>
        </div>

        {/* Right: floating UI decorations */}
        <div style={{
          position:"relative", height:420, display:"flex",
          alignItems:"center", justifyContent:"center",
          transition:"opacity 0.9s ease 0.3s",
          opacity: heroVisible ? 1 : 0,
        }}>
          {/* Glow orb behind */}
          <div style={{
            position:"absolute",
            width:300, height:300,
            borderRadius:"50%",
            background:"radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
            top:"50%", left:"50%",
            transform:"translate(-50%,-50%)",
            pointerEvents:"none",
          }}/>

          {/* Calendar card */}
          <div style={{ position:"relative", zIndex:3 }}>
            <MiniCalendar />
          </div>

          {/* Sticky notes floating around */}
          <div style={{ position:"absolute", top:20, right:0, "--r":"-4deg", animation:"floatNote 5s ease-in-out infinite" }}>
            <div style={{
              background:"#fef08a", borderRadius:12, padding:"14px 16px", width:130,
              boxShadow:"0 8px 24px rgba(0,0,0,0.3)",
              fontFamily:"'DM Mono',monospace", fontSize:12, color:"#374151", lineHeight:1.5,
              transform:"rotate(-4deg)",
            }}>
              <div>📌</div>
              <div style={{ marginTop:6, fontWeight:600 }}>Team standup</div>
              <div style={{ opacity:0.6, fontSize:11 }}>10:00 AM</div>
            </div>
          </div>

          <div style={{
            position:"absolute", bottom:40, right:20,
            animation:"floatNote 7s ease-in-out infinite", animationDelay:"1.5s",
          }}>
            <div style={{
              background:"#fecaca", borderRadius:12, padding:"14px 16px", width:130,
              boxShadow:"0 8px 24px rgba(0,0,0,0.3)",
              fontFamily:"'DM Mono',monospace", fontSize:12, color:"#374151", lineHeight:1.5,
              transform:"rotate(3deg)",
            }}>
              <div>📌</div>
              <div style={{ marginTop:6, fontWeight:600 }}>Deadline!</div>
              <div style={{ opacity:0.6, fontSize:11 }}>Urgent</div>
            </div>
          </div>

          <div style={{
            position:"absolute", bottom:80, left:0,
            animation:"floatNote 8s ease-in-out infinite", animationDelay:"0.8s",
          }}>
            <div style={{
              background:"#bbf7d0", borderRadius:12, padding:"14px 16px", width:130,
              boxShadow:"0 8px 24px rgba(0,0,0,0.3)",
              fontFamily:"'DM Mono',monospace", fontSize:12, color:"#374151", lineHeight:1.5,
              transform:"rotate(-2deg)",
            }}>
              <div>📌</div>
              <div style={{ marginTop:6, fontWeight:600 }}>Design review</div>
              <div style={{ opacity:0.6, fontSize:11 }}>2:00 PM</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{
        maxWidth:1100, margin:"0 auto", padding:"0 48px",
        borderTop:"1px solid rgba(255,255,255,0.06)",
      }}/>

      {/* ── Features ── */}
      <section id="features" ref={featRef} style={{
        maxWidth:1100, margin:"0 auto",
        padding:"96px 48px",
      }}>
        <div style={{
          textAlign:"center", marginBottom:64,
          transition:"opacity 0.6s ease, transform 0.6s ease",
          opacity: featVisible ? 1 : 0,
          transform: featVisible ? "translateY(0)" : "translateY(24px)",
        }}>
          <p style={{ color:"#818cf8", fontSize:12, fontWeight:700, letterSpacing:2, marginBottom:12, fontFamily:"'DM Mono',monospace" }}>
            WHAT YOU GET
          </p>
          <h3 style={{ color:"#e2d9c8", fontSize:36, fontWeight:700, margin:0, letterSpacing:"-0.8px" }}>
            Built for how you think
          </h3>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {[
            { icon:"🖊️", title:"Write & Color", desc:"Jot a thought, pick from 8 colors. Your notes look as important as they feel.", delay:"0s" },
            { icon:"🎯", title:"Drag to Schedule", desc:"Drop any sticky note onto a calendar date. It becomes a real event instantly.", delay:"0.1s" },
            { icon:"📋", title:"Live Agenda", desc:"The right panel auto-updates with today's events, upcoming, and past — always in sync.", delay:"0.2s" },
            { icon:"🌙", title:"Dark Mode", desc:"One click switches the whole app. Your eyes will thank you at 11 PM.", delay:"0.3s" },
            { icon:"🎨", title:"Priority Colors", desc:"Red for urgent, orange for important, yellow for reminders. Scan your week at a glance.", delay:"0.4s" },
            { icon:"💾", title:"Persists Locally", desc:"Events survive page refreshes. No account needed to get started.", delay:"0.5s" },
          ].map(f => (
            <FeatureCard key={f.title} visible={featVisible} {...f} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding:"0 48px 96px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{
          background:"linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))",
          border:"1px solid rgba(99,102,241,0.2)",
          borderRadius:24,
          padding:"56px 64px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          gap:32,
        }}>
          <div>
            <h3 style={{ color:"#e2d9c8", fontSize:28, fontWeight:700, margin:"0 0 10px", letterSpacing:"-0.5px" }}>
              Ready to get organized?
            </h3>
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:15, margin:0 }}>
              No sign-up required. Just open the scheduler and start dragging.
            </p>
          </div>
          <Link to="/Dashboard" className="cta-primary" style={{ whiteSpace:"nowrap", flexShrink:0 }}>
            Open Scheduler →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop:"1px solid rgba(255,255,255,0.06)",
        padding:"28px 48px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        maxWidth:"100%",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{
            width:24, height:24, borderRadius:7,
            background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11,
          }}>📅</div>
          <span style={{ color:"rgba(255,255,255,0.25)", fontSize:13 }}>Scheduler</span>
        </div>
        <span style={{ color:"rgba(255,255,255,0.2)", fontSize:13 }}>
          © 2026 Scheduling System
        </span>
        <div style={{ display:"flex", gap:20 }}>
          <Link to="/login" style={{ color:"rgba(255,255,255,0.25)", fontSize:13, textDecoration:"none" }}>Login</Link>
          <Link to="/register" style={{ color:"rgba(255,255,255,0.25)", fontSize:13, textDecoration:"none" }}>Register</Link>
        </div>
      </footer>

    </div>
  );
}