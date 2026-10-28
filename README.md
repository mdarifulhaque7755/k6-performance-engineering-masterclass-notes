# Grafana k6 Performance Engineering Masterclass

> An interactive, 100% free, static study guide and reference companion for QA Engineers and SDETs mastering modern load and performance testing with Grafana k6.

---

## 🌐 Live Website

* **Live Demo:** `https://<your-username>.github.io/<repo-name>/`  
  *(Automatically deployed via the included GitHub Pages workflow on every push to `main`)*

---

## 📚 What This App Covers

This web application compiles detailed study notes and architectural reference material into an interactive textbook and cheat sheet:

1. **10 Core Masterclass Topics:**
   - Topic 1: The Modern Performance Paradigm — k6 Architecture vs Apache JMeter
   - Topic 2: Writing Your First k6 Script & The Anatomy of a Virtual User (VU)
   - Topic 3: Deconstructing the k6 Terminal Output & Standard Performance Metrics
   - Topic 4: Concurrency Mathematics (VUs vs Iterations vs Duration & Throughput Formula)
   - Topic 5: The 4-Stage Test Life Cycle (`init`, `setup`, `default` VU, `teardown`)
   - Topic 6: Real-World REST API Scripting: Authentication & Dynamic Token Chaining
   - Topic 7: Assertions & Checks: Validating Status Codes, Latencies & JSON Bodies
   - Topic 8: High-Performance Architecture: Moving Auth from VU Loop to `setup()`
   - Topic 9: Traffic Simulation with Stages (Load, Stress & Spike Testing)
   - Topic 10: Thresholds: Automated Quality Gates & CI/CD Pass/Fail Criteria

2. **Cheat Sheet & Advanced SDET Reference:**
   - **Built-in Metrics Glossary Table:** 12 core metrics (`http_req_duration`, `http_req_failed`, `http_req_waiting`, etc.) with healthy value targets.
   - **Executors & Scenarios:** Explanations of `constant-vus`, `ramping-vus`, `constant-arrival-rate`, `ramping-arrival-rate`, `per-vu-iterations`, and `shared-iterations` with working multi-workload scripts.
   - **Custom Metrics:** Practical implementations of `Counter`, `Gauge`, `Rate`, and `Trend`.
   - **Groups & Tags:** Structuring multi-step transactions and isolating microservice SLA thresholds.
   - **Data Parameterization:** `SharedArray` from `k6/data` with JSON/CSV datasets and reasons why loading files inside `default()` causes memory crashes.
   - **CI/CD Integration:** Ready GitHub Actions workflow enforcing SLA thresholds.
   - **Visual Dashboards:** Built-in web dashboard (`K6_WEB_DASHBOARD=true`), standalone HTML report export, and Grafana + Prometheus integration.
   - **Top 10 Beginner Mistakes:** Symptoms, root causes, and fixes.
   - **15 Interview Q&As:** Technical interview questions tailored for SQA / SDET roles.
   - **Next Steps Learning Roadmap:** Progressive 4-stage guide for QA engineers.
   - **Real-Time Monitoring (Grafana + InfluxDB):** InfluxDB 1.8 `docker-compose.yml`, Dashboard ID 2587 import, and Prometheus remote-write.
   - **Environment Variables:** Reading `__ENV` with safe fallbacks and cross-platform CLI commands (PowerShell, CMD, Bash/Zsh).
   - **Class Book Chapter Map:** Correlation matrix connecting self-study chapters to topics across the site.

3. **Multi-Format Exports & Zero-Network Downloads:**
   - **📋 Copy for Notion:** Copies clean, structured Markdown to your clipboard to paste directly into Notion.
   - **📄 PDF Guide:** Client-side dynamic PDF generation without server-side redirects or cookie issues.
   - **📝 Plain TXT & Markdown (.MD):** Complete offline documentation downloads.
   - **Interactive Concurrency Calculator & Q&A Finder:** Instant latency, RPS, and VU modeling.

---

## ⚠️ Attribution & Course Video Note

- **Study Material Source:** These notes and summaries were compiled as study material from the **Batch 15 Advanced Automation & Performance Engineering Masterclass** conducted by **Shouvik Datta (*Road to SDET*)**. All original course curriculum and intellectual property belong to the original author.
- **Video Not Included:** The original class recording video is private course content and is **not included or hosted** in this repository. The *Video & Q&A* tab displays all chapter timestamps, screen walkthrough descriptions, and code references. If you have an authorized YouTube unlisted recording link, you can configure `const VIDEO_URL = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'` at the top of `src/App.tsx` to view it inside the player.

---

## 🛠️ Local Development & Build

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Run TypeScript check
npm run lint

# Build static production bundle for GitHub Pages / static hosting
npm run build
```

---

## 🚀 GitHub Pages Deployment

The repository includes an automated workflow at `.github/workflows/deploy.yml`. To enable GitHub Pages:

1. Push your repository to GitHub.
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Push to `main` (or run the workflow manually via **Actions** → **Deploy to GitHub Pages**).
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
