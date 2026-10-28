import React, { useState } from 'react';
import { 
  Gauge, 
  Layers, 
  Workflow, 
  Copy, 
  Check, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Terminal, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink,
  Code2,
  Table,
  Zap,
  Activity,
  Compass,
  FileCode,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  METRICS_GLOSSARY, 
  EXECUTORS_DATA, 
  SCENARIOS_CODE_EXAMPLE, 
  CUSTOM_METRICS_CODE_EXAMPLE, 
  GROUPS_TAGS_CODE_EXAMPLE, 
  SHARED_ARRAY_CODE_EXAMPLE, 
  GITHUB_ACTIONS_YAML, 
  TOP_10_MISTAKES, 
  INTERVIEW_QUESTIONS, 
  NEXT_STEPS_PATH,
  INFLUXDB_DOCKER_COMPOSE_YAML,
  ENV_VARS_CODE_EXAMPLE,
  CHAPTER_MAP_DATA
} from '../data/cheatSheetData';

interface CheatSheetTabProps {
  isDark: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleCopy: (code: string, key: string) => void;
  copiedKey: string | null;
}

export const CheatSheetTab: React.FC<CheatSheetTabProps> = ({
  isDark,
  searchQuery,
  setSearchQuery,
  handleCopy,
  copiedKey,
}) => {
  const [expandedMistakes, setExpandedMistakes] = useState<Record<number, boolean>>({});
  const [expandedInterviewQ, setExpandedInterviewQ] = useState<Record<number, boolean>>({});

  const toggleMistake = (idx: number) => {
    setExpandedMistakes(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleInterviewQ = (id: number) => {
    setExpandedInterviewQ(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const q = searchQuery.toLowerCase().trim();

  // Filtered views
  const filteredMetrics = METRICS_GLOSSARY.filter(m => 
    !q || m.metric.toLowerCase().includes(q) || m.meaning.toLowerCase().includes(q) || m.type.toLowerCase().includes(q)
  );

  const filteredExecutors = EXECUTORS_DATA.filter(e => 
    !q || e.name.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q) || e.whenToUse.toLowerCase().includes(q)
  );

  const filteredMistakes = TOP_10_MISTAKES.filter(m => 
    !q || m.title.toLowerCase().includes(q) || m.problem.toLowerCase().includes(q) || m.fix.toLowerCase().includes(q)
  );

  const filteredInterview = INTERVIEW_QUESTIONS.filter(i => 
    !q || i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
  );

  const filteredChapterMap = CHAPTER_MAP_DATA.filter(row =>
    !q || row.selfStudyChapter.toLowerCase().includes(q) || row.coreConcepts.toLowerCase().includes(q) || row.whereItLives.toLowerCase().includes(q)
  );

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
      {/* Tab Banner */}
      <div className={`p-6 rounded-2xl border transition-colors ${
        isDark ? 'bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border-orange-500/20' : 'bg-gradient-to-r from-orange-50 via-white to-amber-50 border-orange-200 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>QA Engineer & SDET Reference Manual</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Grafana k6 Cheat Sheet & Advanced Guide
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              13 comprehensive reference modules in plain English: built-in metrics, executor architectures, custom metrics, data parameterization, continuous integration workflows, Grafana & InfluxDB monitoring, environment variables, self-study chapter map, and interview prep.
            </p>
          </div>

          {/* Jump Navigation Chips */}
          <div className="flex flex-wrap gap-1.5 max-w-lg">
            {[
              { id: 'sec-metrics', label: '1. Metrics Glossary' },
              { id: 'sec-executors', label: '2. Executors & Scenarios' },
              { id: 'sec-custom-metrics', label: '3. Custom Metrics' },
              { id: 'sec-groups-tags', label: '4. Groups & Tags' },
              { id: 'sec-shared-array', label: '5. SharedArray' },
              { id: 'sec-ci-cd', label: '6. GitHub Actions CI' },
              { id: 'sec-dashboards', label: '7. Dashboards & Reports' },
              { id: 'sec-mistakes', label: '8. Top 10 Mistakes' },
              { id: 'sec-interview', label: '9. 15 Interview Q&As' },
              { id: 'sec-roadmap', label: '10. Next Steps' },
              { id: 'sec-grafana-influx', label: '11. Grafana + InfluxDB' },
              { id: 'sec-env-vars', label: '12. Env Variables' },
              { id: 'sec-chapter-map', label: '13. Class Chapter Map' },
            ].map(chip => (
              <a
                key={chip.id}
                href={`#${chip.id}`}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-md border transition-all ${
                  isDark 
                    ? 'bg-slate-800/80 hover:bg-orange-500/20 border-slate-700 text-slate-300 hover:text-orange-300' 
                    : 'bg-white hover:bg-orange-50 border-slate-200 text-slate-700 hover:text-orange-600 shadow-2xs'
                }`}
              >
                {chip.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. BUILT-IN METRICS GLOSSARY TABLE */}
      {/* ========================================================================= */}
      <section id="sec-metrics" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1. k6 Built-in Metrics Glossary & Health Criteria
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Every primary metric produced by the k6 engine with its plain English meaning and expected target.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
            {filteredMetrics.length} Metrics Listed
          </span>
        </div>

        <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'}`}>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b font-semibold ${isDark ? 'border-slate-800 bg-slate-850/80 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'}`}>
                <th className="py-3 px-4 w-44">Metric Name</th>
                <th className="py-3 px-3 w-28">Type</th>
                <th className="py-3 px-4">Meaning in Plain English</th>
                <th className="py-3 px-4 w-72">Healthy Target Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredMetrics.map((item) => (
                <tr key={item.metric} className={`transition-colors hover:bg-orange-500/5 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                  <td className="py-3 px-4 font-mono font-bold text-orange-400">
                    {item.metric}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      item.type === 'Trend' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                      item.type === 'Rate' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      item.type === 'Counter' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className={`py-3 px-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {item.meaning}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-teal-400">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{item.healthyValue}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EXECUTORS AND SCENARIOS EXPLAINED SIMPLY */}
      {/* ========================================================================= */}
      <section id="sec-executors" className="scroll-mt-24 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2. Executors & Scenarios Architecture
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Understand how k6 schedules Virtual Users: Closed workloads vs. Open arrival-rate workloads.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(SCENARIOS_CODE_EXAMPLE, 'scenarios-code')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            {copiedKey === 'scenarios-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'scenarios-code' ? 'Copied Script!' : 'Copy Multi-Scenario Script'}</span>
          </button>
        </div>

        {/* 6 Executors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExecutors.map((ex) => (
            <div key={ex.name} className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-sky-400">{ex.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    ex.type.includes('Open') ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {ex.type}
                  </span>
                </div>
                <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {ex.summary}
                </p>
              </div>
              <div className={`p-2.5 rounded-lg text-[11px] border ${
                isDark ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <span className="font-semibold text-orange-400">When to use: </span>
                {ex.whenToUse}
              </div>
            </div>
          ))}
        </div>

        {/* Working Code Block */}
        <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-sky-400" />
              scenarios-multi-workload.js (Targeting realistic orders-api)
            </span>
            <button
              onClick={() => handleCopy(SCENARIOS_CODE_EXAMPLE, 'scenarios-code-2')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'scenarios-code-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'scenarios-code-2' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto text-sky-300 leading-relaxed">
            {SCENARIOS_CODE_EXAMPLE}
          </pre>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CUSTOM METRICS */}
      {/* ========================================================================= */}
      <section id="sec-custom-metrics" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3. Custom Metrics: Counter, Gauge, Rate, Trend
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Track proprietary business events and specific microservice processing times beyond basic HTTP timings.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(CUSTOM_METRICS_CODE_EXAMPLE, 'custom-metrics-code')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            {copiedKey === 'custom-metrics-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'custom-metrics-code' ? 'Copied Script!' : 'Copy Metrics Example'}</span>
          </button>
        </div>

        {/* 4 Metric Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="font-mono text-xs font-bold text-purple-400">1. Counter</span>
            <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Cumulative sum that only increases (e.g. total orders submitted, total error count).
            </p>
          </div>
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="font-mono text-xs font-bold text-amber-400">2. Gauge</span>
            <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Instantaneous snapshot that can move up or down (e.g. cart item size, queue depth).
            </p>
          </div>
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="font-mono text-xs font-bold text-emerald-400">3. Rate</span>
            <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Percentage of occurrences (0 or 1) matching criteria (e.g. payment success rate &gt; 98%).
            </p>
          </div>
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <span className="font-mono text-xs font-bold text-sky-400">4. Trend</span>
            <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Statistical distributor calculating min, max, avg, and percentiles on arbitrary durations.
            </p>
          </div>
        </div>

        {/* Code Snippet */}
        <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              custom-metrics-demo.js
            </span>
            <button
              onClick={() => handleCopy(CUSTOM_METRICS_CODE_EXAMPLE, 'custom-metrics-code-btn')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'custom-metrics-code-btn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'custom-metrics-code-btn' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-300 leading-relaxed">
            {CUSTOM_METRICS_CODE_EXAMPLE}
          </pre>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GROUPS AND TAGS */}
      {/* ========================================================================= */}
      <section id="sec-groups-tags" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                4. Groups & Tags: Organizing Complex Test Transactions
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Structure realistic user journeys (Browse → Add to Cart → Checkout) and attach queryable labels to metrics.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(GROUPS_TAGS_CODE_EXAMPLE, 'groups-tags-code')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            {copiedKey === 'groups-tags-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'groups-tags-code' ? 'Copied!' : 'Copy Groups & Tags Code'}</span>
          </button>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              groups-and-tags-demo.js
            </span>
            <button
              onClick={() => handleCopy(GROUPS_TAGS_CODE_EXAMPLE, 'groups-tags-code-2')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'groups-tags-code-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'groups-tags-code-2' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto text-purple-300 leading-relaxed">
            {GROUPS_TAGS_CODE_EXAMPLE}
          </pre>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DATA PARAMETERIZATION WITH SHAREDARRAY */}
      {/* ========================================================================= */}
      <section id="sec-shared-array" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                5. Data Parameterization: SharedArray with JSON/CSV
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Feed thousands of distinct customer logins into parallel VUs with zero memory leaks.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(SHARED_ARRAY_CODE_EXAMPLE, 'shared-array-code')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            {copiedKey === 'shared-array-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'shared-array-code' ? 'Copied!' : 'Copy SharedArray Code'}</span>
          </button>
        </div>

        {/* Big Warning Callout Box */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isDark ? 'bg-red-950/30 border-red-500/30 text-red-200' : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold">Why you must NEVER read or parse files inside the default() function:</p>
            <p className="leading-relaxed opacity-90">
              If you call <code className="px-1 py-0.5 rounded bg-red-900/40 font-mono text-[11px]">open()</code> or <code className="px-1 py-0.5 rounded bg-red-900/40 font-mono text-[11px]">JSON.parse()</code> inside <code className="px-1 py-0.5 rounded bg-red-900/40 font-mono text-[11px]">export default function()</code>, every single VU will reload and re-parse the file from disk on every iteration. 100 VUs running 1,000 iterations will parse the file 100,000 times! This creates high Garbage Collection (GC) pauses, 100% CPU lockups, and sudden Out-Of-Memory (OOM) crashes.
            </p>
            <p className="font-semibold text-emerald-500 dark:text-emerald-400">
              ✓ Solution: Use <code className="font-mono">SharedArray</code> in the init context to parse once into read-only shared memory.
            </p>
          </div>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              shared-array-parameterization.js
            </span>
            <button
              onClick={() => handleCopy(SHARED_ARRAY_CODE_EXAMPLE, 'shared-array-code-2')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'shared-array-code-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'shared-array-code-2' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto text-amber-300 leading-relaxed">
            {SHARED_ARRAY_CODE_EXAMPLE}
          </pre>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. RUNNING K6 IN CI: GITHUB ACTIONS YAML */}
      {/* ========================================================================= */}
      <section id="sec-ci-cd" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                6. Running k6 in CI: Ready GitHub Actions YAML Pipeline
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Drop this workflow into your repository to enforce strict performance quality gates on every Pull Request.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(GITHUB_ACTIONS_YAML, 'ci-yaml-code')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            {copiedKey === 'ci-yaml-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'ci-yaml-code' ? 'Copied YAML!' : 'Copy GitHub Actions YAML'}</span>
          </button>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-teal-400" />
              .github/workflows/k6-performance.yml
            </span>
            <button
              onClick={() => handleCopy(GITHUB_ACTIONS_YAML, 'ci-yaml-code-2')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'ci-yaml-code-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'ci-yaml-code-2' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto text-teal-300 leading-relaxed">
            {GITHUB_ACTIONS_YAML}
          </pre>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. VIEWING RESULTS AS A DASHBOARD */}
      {/* ========================================================================= */}
      <section id="sec-dashboards" className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              7. Viewing Results as Visual Dashboards & HTML Reports
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Built-in live web UI, standalone HTML reports, and enterprise time-series observability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dashboard 1 */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-indigo-400">
                <Gauge className="w-4 h-4" />
                <span>1. Built-in Web Dashboard</span>
              </div>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Stream live charts, VU ramp progression, and real-time response time distribution directly to your local browser on port 5665.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-indigo-300">
                <span>K6_WEB_DASHBOARD=true k6 run script.js</span>
                <button
                  onClick={() => handleCopy('K6_WEB_DASHBOARD=true k6 run script.js', 'cmd-web-dash')}
                  className="hover:text-white cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'cmd-web-dash' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400">Opens at: <strong className="text-indigo-400">http://localhost:5665</strong></span>
            </div>
          </div>

          {/* Dashboard 2 */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                <FileText className="w-4 h-4" />
                <span>2. Export Static HTML Report</span>
              </div>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Generate a single standalone, self-contained HTML report with interactive charts that can be emailed or attached to CI build artifacts.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300">
                <span className="truncate">K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=report.html k6 run script.js</span>
                <button
                  onClick={() => handleCopy('K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=report.html k6 run script.js', 'cmd-html-export')}
                  className="hover:text-white shrink-0 ml-1 cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'cmd-html-export' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400">Output: <strong className="text-emerald-400">report.html</strong></span>
            </div>
          </div>

          {/* Dashboard 3 */}
          <div className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
                <Workflow className="w-4 h-4" />
                <span>3. Prometheus & Grafana</span>
              </div>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Stream real-time metrics to Prometheus via remote-write or InfluxDB, visualized on the official Grafana k6 Community Dashboard #2587.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300">
                <span className="truncate">k6 run -o experimental-prometheus-rw=http://...</span>
                <button
                  onClick={() => handleCopy('k6 run -o experimental-prometheus-rw=http://localhost:9090/api/v1/write script.js', 'cmd-prom')}
                  className="hover:text-white shrink-0 ml-1 cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'cmd-prom' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400">Dashboards: <strong className="text-amber-400">Grafana Dashboard #2587</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TOP 10 COMMON BEGINNER MISTAKES & HOW TO FIX EACH */}
      {/* ========================================================================= */}
      <section id="sec-mistakes" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                8. Top 10 Common Beginner Mistakes in k6 (And How to Fix Them)
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Frequent engineering pitfalls that cause false bottlenecks, runner crashes, and invalid performance metrics.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredMistakes.map((mistake, idx) => {
            const isExpanded = expandedMistakes[idx] !== false; // Default expanded for easy reading
            return (
              <div
                key={mistake.title}
                className={`rounded-xl border transition-all ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <button
                  onClick={() => toggleMistake(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <span className="text-rose-500 dark:text-rose-400 font-mono">⚠️</span>
                    <span className={isDark ? 'text-slate-100' : 'text-slate-800'}>{mistake.title}</span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isExpanded && (
                  <div className={`px-4 pb-4 pt-1 space-y-2 border-t text-xs ${isDark ? 'border-slate-850' : 'border-slate-100'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg border ${
                        isDark ? 'bg-red-950/20 border-red-500/20 text-red-200' : 'bg-red-50 border-red-200 text-red-900'
                      }`}>
                        <div className="font-semibold text-red-400 flex items-center gap-1.5 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>The Symptom & Problem:</span>
                        </div>
                        <p className="opacity-90">{mistake.symptom}</p>
                        <p className="mt-1 opacity-80">{mistake.problem}</p>
                      </div>

                      <div className={`p-3 rounded-lg border ${
                        isDark ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      }`}>
                        <div className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>The Correct Fix:</span>
                        </div>
                        <p className="leading-relaxed">{mistake.fix}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. 15 INTERVIEW QUESTIONS WITH SHORT ANSWERS FOR SQA / SDET */}
      {/* ========================================================================= */}
      <section id="sec-interview" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                9. 15 SQA / SDET Performance Testing Interview Questions
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Crisp, technically authoritative answers for Senior QA, Lead SDET, and Performance Engineering interviews.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
            {filteredInterview.length} Questions
          </span>
        </div>

        <div className="space-y-3">
          {filteredInterview.map((item) => {
            const isExpanded = expandedInterviewQ[item.id] !== false;
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <button
                  onClick={() => toggleInterviewQ(item.id)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
                      Q{item.id}
                    </span>
                    <span className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                      {item.question}
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isExpanded && (
                  <div className={`px-4 pb-4 pt-1 text-xs leading-relaxed border-t ${
                    isDark ? 'border-slate-850 text-slate-300 bg-slate-950/40' : 'border-slate-100 text-slate-700 bg-slate-50/60'
                  }`}>
                    <div className="p-3 rounded-lg border border-slate-700/40 bg-slate-900/60 font-sans">
                      <strong className="text-teal-400 font-semibold block mb-1">Crisp SDET Answer:</strong>
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. NEXT STEPS LEARNING PATH */}
      {/* ========================================================================= */}
      <section id="sec-roadmap" className="scroll-mt-24 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              10. 'Next Steps' Progressive Learning Roadmap for QA Engineers
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              From your first staging API smoke test to enterprise CI quality gates and browser Core Web Vitals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NEXT_STEPS_PATH.map((step) => (
            <div
              key={step.step}
              className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {step.duration}
                  </span>
                </div>
                <h4 className={`mt-3 font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h4>
                <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-1 text-[11px] font-semibold text-orange-400">
                <span>Action Checklist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. REAL-TIME MONITORING WITH GRAFANA + INFLUXDB */}
      {/* ========================================================================= */}
      <section id="sec-grafana-influx" className="scroll-mt-24 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                11. Real-Time Telemetry: Grafana + InfluxDB 1.8 Architecture
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Stream live performance metrics during load generation instead of waiting for terminal summaries.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy('k6 run --out influxdb=http://localhost:8086/k6 script.js', 'copy-influx-cmd')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            {copiedKey === 'copy-influx-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'copy-influx-cmd' ? 'Copied CLI Command!' : 'Copy k6 InfluxDB Command'}</span>
          </button>
        </div>

        {/* 3 Component Roles Explained in Plain English */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="font-mono text-xs font-bold text-orange-400">1. Grafana k6 (Load Generator)</span>
            <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Executes your JavaScript test scenarios across thousands of concurrent VUs. On every HTTP request, it pushes instantaneous metric data points (latency, status codes, errors) over HTTP to InfluxDB in real time.
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="font-mono text-xs font-bold text-sky-400">2. InfluxDB 1.8 (Time-Series Store)</span>
            <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              A dedicated time-series database optimized for high-throughput writes. It ingests the raw metrics from k6 and stores them in the <code className="font-mono font-bold text-sky-400">k6</code> database on port 8086 with timestamps.
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="font-mono text-xs font-bold text-emerald-400">3. Grafana (Live Visualization UI)</span>
            <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Runs on port 3000. It queries InfluxDB every 1 to 5 seconds and renders interactive live graphs: active VU ramps, throughput gauges, p95 response times, and failure rates while your test is actively running.
            </p>
          </div>
        </div>

        {/* Docker Compose File */}
        <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-orange-400" />
              docker-compose.yml (Starts InfluxDB 1.8 & Grafana)
            </span>
            <button
              onClick={() => handleCopy(INFLUXDB_DOCKER_COMPOSE_YAML, 'copy-docker-compose')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'copy-docker-compose' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'copy-docker-compose' ? 'Copied YAML!' : 'Copy Compose YAML'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto text-orange-300 leading-relaxed">
            {INFLUXDB_DOCKER_COMPOSE_YAML}
          </pre>
        </div>

        {/* Step-by-Step Setup Guide */}
        <div className={`p-5 rounded-xl border space-y-4 ${
          isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
        }`}>
          <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Workflow className="w-4 h-4 text-orange-500" />
            <span>Step-by-Step Configuration Guide (From Zero to Live Dashboard)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className={`p-4 rounded-lg border space-y-2 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-semibold text-sky-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold text-[10px] flex items-center justify-center">1</span>
                <span>Add InfluxDB as Grafana Data Source</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 leading-relaxed">
                <li>Start stack: <code className="text-orange-400 font-mono">docker-compose up -d</code></li>
                <li>Open browser at <strong className="text-white">http://localhost:3000</strong></li>
                <li>Go to <strong>Connections</strong> → <strong>Data Sources</strong> → <strong>Add data source</strong></li>
                <li>Select <strong>InfluxDB</strong> (Query language: <em>InfluxQL</em>)</li>
                <li>HTTP URL: <code className="text-sky-300 font-mono">http://influxdb:8086</code> (or <code className="text-sky-300 font-mono">http://localhost:8086</code>)</li>
                <li>Under Database name, type: <code className="text-emerald-400 font-mono">k6</code></li>
                <li>Click <strong>Save & Test</strong> (confirms with green success badge)</li>
              </ol>
            </div>

            <div className={`p-4 rounded-lg border space-y-2 ${isDark ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center">2</span>
                <span>Import Pre-Built k6 Dashboard (ID 2587)</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 leading-relaxed">
                <li>In Grafana, click <strong>Dashboards</strong> → <strong>New</strong> → <strong>Import</strong></li>
                <li>Under "Import via grafana.com", paste ID: <strong className="text-white font-mono">2587</strong></li>
                <li>Click <strong>Load</strong></li>
                <li>Select your configured <code className="text-sky-300 font-mono">InfluxDB</code> data source</li>
                <li>Click <strong>Import</strong></li>
                <li>Execute your test:
                  <div className="mt-1 p-2 rounded bg-slate-900 font-mono text-[11px] text-orange-300 flex items-center justify-between">
                    <span className="truncate">k6 run --out influxdb=http://localhost:8086/k6 script.js</span>
                    <button
                      onClick={() => handleCopy('k6 run --out influxdb=http://localhost:8086/k6 script.js', 'copy-influx-run')}
                      className="hover:text-white shrink-0 ml-2 cursor-pointer"
                    >
                      {copiedKey === 'copy-influx-run' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Modern Prometheus Remote Write Note */}
          <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
            isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold">Modern Production Alternative: Prometheus Remote-Write</p>
              <p className="leading-relaxed opacity-90">
                While InfluxDB 1.8 is widely taught and battle-tested for quick local runs, modern cloud-native Kubernetes environments increasingly favor Prometheus or Grafana Mimir. You can stream metrics natively without InfluxDB using:
              </p>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300 mt-1">
                <span className="truncate">k6 run -o experimental-prometheus-rw=http://localhost:9090/api/v1/write script.js</span>
                <button
                  onClick={() => handleCopy('k6 run -o experimental-prometheus-rw=http://localhost:9090/api/v1/write script.js', 'copy-prom-rw')}
                  className="hover:text-white shrink-0 ml-2 cursor-pointer"
                >
                  {copiedKey === 'copy-prom-rw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. PASSING VALUES WITH ENVIRONMENT VARIABLES */}
      {/* ========================================================================= */}
      <section id="sec-env-vars" className="scroll-mt-24 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                12. Passing Dynamic Values with Environment Variables
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Switch target hosts, user counts, and credentials between Staging and Production without modifying script code.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCopy(ENV_VARS_CODE_EXAMPLE, 'copy-env-script')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            {copiedKey === 'copy-env-script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'copy-env-script' ? 'Copied Code!' : 'Copy Script Example'}</span>
          </button>
        </div>

        {/* Operating System Command Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Windows PowerShell */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <span className="font-mono text-xs font-bold text-sky-400">Windows PowerShell</span>
              <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Set session variable or pass with the <code className="font-mono text-sky-400">-e</code> flag.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-sky-300 flex items-center justify-between">
                <span className="truncate">k6 run -e BASE_URL=https://orders-api.company.internal script.js</span>
                <button
                  onClick={() => handleCopy('k6 run -e BASE_URL=https://orders-api.company.internal script.js', 'copy-ps-flag')}
                  className="hover:text-white shrink-0 ml-1 cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'copy-ps-flag' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span className="truncate">$env:BASE_URL="https://orders-api.company.internal"; k6 run script.js</span>
                <button
                  onClick={() => handleCopy('$env:BASE_URL="https://orders-api.company.internal"; k6 run script.js', 'copy-ps-env')}
                  className="hover:text-white shrink-0 ml-1 cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'copy-ps-env' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Windows Command Prompt */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <span className="font-mono text-xs font-bold text-amber-400">Windows Command Prompt (CMD)</span>
              <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Use standard <code className="font-mono text-amber-400">set</code> command or k6 CLI flag.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300 flex items-center justify-between">
                <span className="truncate">k6 run -e BASE_URL=https://orders-api.company.internal script.js</span>
                <button
                  onClick={() => handleCopy('k6 run -e BASE_URL=https://orders-api.company.internal script.js', 'copy-cmd-flag')}
                  className="hover:text-white shrink-0 ml-1 cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'copy-cmd-flag' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span className="truncate">set BASE_URL=https://orders-api.company.internal && k6 run script.js</span>
                <button
                  onClick={() => handleCopy('set BASE_URL=https://orders-api.company.internal && k6 run script.js', 'copy-cmd-set')}
                  className="hover:text-white shrink-0 ml-1 cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'copy-cmd-set' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* macOS & Linux */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <span className="font-mono text-xs font-bold text-teal-400">macOS & Linux (Bash / Zsh)</span>
              <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Prefix inline or export globally into your shell session.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-teal-300 flex items-center justify-between">
                <span className="truncate">BASE_URL=https://orders-api.company.internal k6 run script.js</span>
                <button
                  onClick={() => handleCopy('BASE_URL=https://orders-api.company.internal k6 run script.js', 'copy-unix-inline')}
                  className="hover:text-white shrink-0 ml-1 cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'copy-unix-inline' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span className="truncate">k6 run -e BASE_URL=https://orders-api.company.internal script.js</span>
                <button
                  onClick={() => handleCopy('k6 run -e BASE_URL=https://orders-api.company.internal script.js', 'copy-unix-flag')}
                  className="hover:text-white shrink-0 ml-1 cursor-pointer"
                  title="Copy command"
                >
                  {copiedKey === 'copy-unix-flag' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Code Block Reading __ENV */}
        <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-teal-400" />
              orders-env-configurable.js (Reading __ENV with Fallback Defaults)
            </span>
            <button
              onClick={() => handleCopy(ENV_VARS_CODE_EXAMPLE, 'copy-env-code-box')}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {copiedKey === 'copy-env-code-box' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'copy-env-code-box' ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono overflow-x-auto text-teal-300 leading-relaxed">
            {ENV_VARS_CODE_EXAMPLE}
          </pre>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. YOUR CLASS BOOK CHAPTER MAP */}
      {/* ========================================================================= */}
      <section id="sec-chapter-map" className="scroll-mt-24 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                13. Your Class Book Chapter Map (Self-Study Guide)
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                A simple correlation matrix mapping your self-study chapters to where each concept is explained in this masterclass applet.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
            {filteredChapterMap.length} Curricula Mapped
          </span>
        </div>

        <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'}`}>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b font-semibold ${isDark ? 'border-slate-800 bg-slate-850/80 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'}`}>
                <th className="py-3 px-4 w-56">Self-Study Chapter Focus</th>
                <th className="py-3 px-4">Core Concepts Covered</th>
                <th className="py-3 px-4 w-72">Where It Lives on This Site</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredChapterMap.map((row) => (
                <tr key={row.selfStudyChapter} className={`transition-colors hover:bg-orange-500/5 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                  <td className="py-3.5 px-4 font-bold text-indigo-400 font-sans text-sm">
                    {row.selfStudyChapter}
                  </td>
                  <td className={`py-3.5 px-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {row.coreConcepts}
                  </td>
                  <td className="py-3.5 px-4">
                    <a
                      href={row.anchorLink}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-400 hover:underline"
                    >
                      <span>{row.whereItLives}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
