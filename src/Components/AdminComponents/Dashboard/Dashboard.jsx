// DashboardSection.jsx
import React from "react";
import { motion } from "framer-motion";
// Use the exact image path. If you moved the file, update this import accordingly.
// import dashboardImage from "/mnt/data/WhatsApp Image 2025-09-29 at 5.18.59 PM.jpeg";

/**
 * DashboardSection
 * - Responsive, mobile-first dashboard section
 * - All styling via TailwindCSS
 * - Subcomponents: Donut, Sparkline, ProgressBar, StatRow
 */

function DonutChart({ size = 140 }) {
  // simple SVG donut with segments matching the image vibe
  const stroke = 18;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  // segments - numbers are illustrative to create colored arcs
  const segments = [
    { color: "#2b8cff", value: 0.28 }, // blue
    { color: "#f59e0b", value: 0.24 }, // amber
    { color: "#10b981", value: 0.22 }, // green
    { color: "#ef4444", value: 0.12 }, // red
    { color: "#a78bfa", value: 0.14 }, // purple
  ];

  let offset = 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
      aria-hidden="true"
    >
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {segments.map((s, i) => {
          const dash = circumference * s.value;
          const strokeDasharray = `${dash} ${circumference - dash}`;
          const strokeDashoffset = -offset * circumference;
          offset += s.value;
          return (
            <circle
              key={i}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90)"
            />
          );
        })}
        {/* center label */}
        <circle r={radius - stroke - 4} fill="#ffffff" />
        <text
          x="0"
          y={4}
          textAnchor="middle"
          className="font-semibold"
          style={{ fontSize: 14, fill: "#111827" }}
        >
          Behavioral
        </text>
        <text
          x="0"
          y={22}
          textAnchor="middle"
          className="text-sm"
          style={{ fontSize: 11, fill: "#6b7280" }}
        >
          Competency
        </text>
      </g>
    </svg>
  );
}

function Sparkline({ points = [6, 8, 7, 9, 8, 10, 9] }) {
  // Simple sparkline SVG. Points normalized to width/height.
  const width = 220;
  const height = 48;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v) => ((v - min) / (max - min || 1)) * height;
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${((i / (points.length - 1)) * width).toFixed(1)} ${(
      height -
      norm(p)
    ).toFixed(1)}`)
    .join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className="block">
      <path d={d} fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
      {/* subtle fill */}
      <path d={`${d} L ${width} ${height} L 0 ${height} Z`} fill="#1118270a" stroke="none" />
    </svg>
  );
}

function ProgressBar({ value = 60, label, compact }) {
  return (
    <div aria-hidden="false" className={`w-full ${compact ? "py-1" : "py-2"}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value}%`, background: "linear-gradient(90deg,#34d399,#60a5fa)" }}
          aria-valuenow={value}
          role="progressbar"
        />
      </div>
    </div>
  );
}

function StatRow({ label, value, variant = "default" }) {
  // variant controls small accent
  const accent =
    variant === "danger" ? "bg-red-400" : variant === "warn" ? "bg-amber-400" : "bg-blue-400";
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${accent}`} aria-hidden="true" />
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="font-semibold text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSection() {
  return (
    <section className="px-4 py-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left column (Seafarers Card) */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-5 md:p-6"
          aria-labelledby="left-title"
        >
          <header className="flex items-start justify-between">
            <div>
              <h2 id="left-title" className="text-lg font-semibold text-slate-800">
                Sor Seafarers
              </h2>
              <p className="text-sm text-gray-500 mt-1">Good afternoon, Ra</p>
            </div>
            {/* small image thumbnail using the exact image */}
            {/* <img
              src={dashboardImage}
              alt="Dashboard preview thumbnail"
              className="w-20 h-12 object-cover rounded-md shadow-sm hidden sm:block"
            /> */}
          </header>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            <div className="col-span-1 flex flex-col items-center">
              <DonutChart size={140} />
              <div className="text-center mt-3">
                <div className="text-sm text-gray-600">Behavioral Competency</div>
                <div className="text-xs text-gray-400">Progress</div>
              </div>
            </div>

            <div className="sm:col-span-2 space-y-4">
              <section aria-labelledby="emotional-trends">
                <h3 id="emotional-trends" className="text-sm font-medium text-gray-700">
                  Emotional Trends <span className="text-xs text-gray-400 ml-2">Last 38 days</span>
                </h3>
                <div className="mt-2 bg-gray-50 rounded-md p-3">
                  <Sparkline points={[3, 4, 4, 5, 5.5, 6, 6.2, 6, 7, 6.8, 7.2]} />
                </div>
              </section>

              <section aria-labelledby="learning-milestones">
                <h3 id="learning-milestones" className="text-sm font-medium text-gray-700">
                  Learning Milestones
                </h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Stretches</div>
                    <div className="text-sm font-semibold text-gray-900">Completed</div>
                  </div>
                  <ProgressBar label="Improving communication during stressful situations" value={67} compact />
                </div>
              </section>
            </div>
          </div>
        </motion.article>

        {/* Right column (Management Card) */}
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="bg-white rounded-2xl shadow-md p-5 md:p-6"
          aria-labelledby="right-title"
        >
          <header className="flex items-start justify-between">
            <div>
              <h2 id="right-title" className="text-lg font-semibold text-slate-800">
                Management
              </h2>
              <p className="text-sm text-gray-500 mt-1">Training Progress & Behavioral Safety</p>
            </div>
            {/* image used here again but hidden on small screens to save space */}
            {/* <img
              src={dashboardImage}
              alt="Dashboard preview thumbnail"
              className="w-20 h-12 object-cover rounded-md shadow-sm hidden md:block"
            /> */}
          </header>

          <div className="mt-5 space-y-4">
            <section aria-labelledby="training-completion">
              <h3 id="training-completion" className="text-sm font-medium text-gray-700">
                Training Completion
              </h3>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-800 ease-out"
                    style={{ width: "77%", background: "linear-gradient(90deg,#60a5fa,#fbbf24)" }}
                    aria-valuenow={77}
                    role="progressbar"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>80%+</span>
                  <span>60-78%</span>
                  <span>40-59%</span>
                  <span>&lt;20%</span>
                </div>
              </div>
            </section>

            <section aria-labelledby="competency-trends">
              <h3 id="competency-trends" className="text-sm font-medium text-gray-700">
                Competency Trends
              </h3>
              <div className="mt-2 bg-gray-50 rounded-md p-3">
                <Sparkline points={[5, 5.5, 6, 6.5, 7.2, 7.0, 7.8, 8, 7.6]} />
                <div className="mt-2 text-xs text-gray-500 flex gap-3">
                  <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400" /> Communication</span>
                  <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Decision-Making</span>
                  <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400" /> Fatigue Management</span>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-md p-3">
                <h4 className="text-sm font-medium text-gray-700">Emotional Wellbeing Risk</h4>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">8</div>
                    <div className="text-xs text-gray-500">Prolonged distress risk</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">NEW</div>
                    <div className="text-sm font-semibold text-red-500">HIGH</div>
                    <div className="text-xs text-gray-500">this week</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-3">
                <h4 className="text-sm font-medium text-gray-700">Behavioral Risk Indicators</h4>
                <div className="mt-3 space-y-2">
                  <StatRow label="Communication Breakdowns" value="29%" />
                  <StatRow label="Conflict Frequency" value="18%" variant="warn" />
                  <StatRow label="Decision-Making Under Pressure" value="15%" />
                  <StatRow label="Fatigue Risk" value="9%" variant="danger" />
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Footer area: full-width image preview (uses EXACT image) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mt-6 rounded-lg overflow-hidden shadow-sm"
      >
        <figure className="w-full">
          {/* <img
            src={dashboardImage}
            alt="Full dashboard screenshot preview"
            className="w-full h-auto object-cover"
            loading="lazy"
          /> */}
          <figcaption className="sr-only">Exact dashboard image provided by user</figcaption>
        </figure>
      </motion.div>
    </section>
  );
}
