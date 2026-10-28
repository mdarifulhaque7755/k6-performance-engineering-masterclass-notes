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
} from './cheatSheetData';

const BASE_MARKDOWN = `# 📘 Chapter 1: Performance Testing Mastery with Grafana k6
**Course Series:** Advanced Automation & Performance Engineering (Batch 15)  
**Instructor / Mentor:** Shouvik Datta (*Road to SDET*)  
**Source Video:** \`K6_Part1_57b9a509.mp4\` (Duration: 01:59:27)  
**Target Systems:** \`https://quickpizza.grafana.com\` & \`https://restful-booker.herokuapp.com\`

---

## 🚀 Topic 1: The Modern Performance Paradigm — Why k6 Over Apache JMeter?
**Timestamp:** [03:00 - 12:30]

### Visual Mapping
* **[03:00 - 09:30]**: Microsoft Edge browser showing PDF slide \`K6_Details.pdf\` with a comparison matrix titled \`FEATURES: k6 vs APACHE JMeter\`. Mentor highlights lightweight Go architecture, cloud-native design, and JavaScript scripting.
* **[10:00 - 10:45]**: Browser switches to \`https://github.com/grafana/k6/releases\` showing v1.2.2 with 28.6k GitHub stars.
* **[11:00 - 12:45]**: Windows Command Prompt opens executing \`k6.exe --help\`, showing flags: \`--address\`, \`--config\`, \`--log-format\`, \`--no-color\`, \`--quiet\`, \`--verbose\`.

### Mentor's Speech (Bilingual / Banglish)
> "JMeter amra onek bochor dhore use korchi, but JMeter holo Java/JVM-based and heavyweight. Onek memory consume kore, and XML-based test plan maintain kora complex hoye jay. On the other hand, k6 hocche developer-friendly, modern tool ja Go language diye lekha, ar scripts lekha hoy standard ES6 JavaScript e! k6 khub lightweight, Cloud-native apps er jonno perfect, and CI/CD pipeline er sathe bina plugin e directly integration kora jay."

### English Explanation
Grafana k6 is built in Go for high concurrency while providing developer-friendly JavaScript (ES6) scripting. Unlike JMeter which demands a heavy Java Runtime Environment (JRE) and complex XML GUI, k6 is CLI-first and code-as-configuration. It returns standard shell exit codes (0 for pass, non-zero for threshold breach) making automation pipeline triggers instant.

### Extracted Code / CLI Verification
\`\`\`bash
# Verify installation and inspect CLI flags
C:\\Users\\ASUS> k6.exe --help
\`\`\`

### Core Takeaways
1. k6 is built in Go for maximum performance and efficiency, while tests are written in readable modern JavaScript (ES6).
2. Unlike JMeter which demands a heavy Java Runtime Environment (JRE) and complex XML GUI, k6 is CLI-first and code-as-configuration.
3. Native CI/CD friendliness: k6 returns standard shell exit codes making automation pipeline triggers instant.

---

## 📝 Topic 2: Setting Up the First k6 Test Script & The Anatomy of a VU
**Timestamp:** [13:30 - 20:30]

### Visual Mapping
* **[13:30 - 18:30]**: VS Code opens in \`K6_Codes\`. Files: \`script.js\` and \`package.json\`. Mentor writes script targeting \`https://quickpizza.grafana.com\` with \`import http from 'k6/http'\` and \`sleep(1)\`.
* **[19:00 - 20:30]**: Windows Command Prompt opens at \`P:\\My Class Notes\\K6\\K6_Class\\K6_Codes>\` and executes \`k6 run script.js\`.

### Extracted Code: \`script.js\`
\`\`\`javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {
    http.get('https://quickpizza.grafana.com');
    sleep(1);
}
\`\`\`

### Core Takeaways
1. \`import http from 'k6/http'\` is the built-in HTTP client tailored specifically for load generation.
2. The exported \`default function()\` represents the core test scenario executed repeatedly by Virtual Users.
3. \`sleep(duration)\` mimics real human think-time between user actions, preventing unrealistically artificial hammering of the server.

---

## 📊 Topic 3: Deconstructing the k6 Terminal Output & Performance Metrics
**Timestamp:** [21:00 - 26:30]

### Terminal Output
\`\`\`text
          /\\      |‾‾| /‾‾/   /‾‾/   
     /\\  /  \\     |  |/  /   /  /    
    /  \\/    \\    |     (   /   ‾‾\\  
   /          \\   |  |\\  \\ |  (‾)  | 
  / __________ \\  |__| \\__\\ \\_____/ .io

  execution: local
     script: script.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration:
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

running (00m01.7s), 0/1 VUs, 1 complete and 0 interrupted iterations
default [======================================] 1 VUs 00m01.7s/10m0s 1/1 iters, 1 per VU

     ✓ TOTAL RESULTS 
     ✓ HTTP
       http_req_duration..............: avg=366.25ms min=337.84ms med=351.86ms max=430.08ms p(90)=411.91ms p(95)=422.73ms
         { expected_response:true }...: avg=366.25ms min=337.84ms med=351.86ms max=430.08ms p(90)=411.91ms p(95)=422.73ms
       http_req_failed................: 0.00% 0 out of 20
       http_reqs......................: 1.101507/s
     ✓ EXECUTION
       iteration_duration.............: avg=907.82ms min=837.88ms med=852.27ms max=1.67s p(90)=923.36ms p(95)=968.03ms
       vus............................: 10 min=10 max=10
       vus_max........................: 10 min=10 max=10
\`\`\`

### Core Takeaways
1. \`http_req_duration\` encapsulates the full round-trip HTTP lifecycle (DNS + TLS Handshake + TTFB + Content Transfer).
2. Percentiles (\`p90\`, \`p95\`, \`p99\`) are the industry gold standard for performance evaluation rather than the arithmetic average.
3. \`http_req_failed\` tracks the failure rate (HTTP 4xx/5xx errors). 0.00% indicates all requests succeeded.

---

## 🧮 Topic 4: Concurrency Math: VUs vs Iterations vs Duration
**Timestamp:** [27:00 - 41:30]

### Key Formula
$$\\text{Throughput (RPS)} = \\frac{\\text{Active VUs}}{\\text{Response Time} + \\text{Think Time}}$$

### Core Takeaways
1. In \`shared-iterations\`, total requests equal the iteration count regardless of VU speed differences.
2. In \`constant-vus\` with a \`duration\`, total requests = \`(Duration / Iteration Time) * VUs\`.
3. Throughput is governed by server latency plus sleep pacing.

---

## 🔄 Topic 5: The 4-Stage Test Life Cycle: Init, Setup, VU, Teardown
**Timestamp:** [42:00 - 50:30]

### Extracted Code: \`script0.js\`
\`\`\`javascript
// 1. INIT STAGE (Runs once during test initialization)
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '10s',
};

// 2. SETUP STAGE (Runs ONCE before VUs start)
export function setup() {
    console.log("=== Setup: Preparing test environment / Auth ===");
    return { authToken: "secret-token-123", testId: 999 };
}

// 3. VU STAGE (Executed repeatedly by each VU in parallel)
export default function (data) {
    http.get('https://quickpizza.grafana.com');
    sleep(1);
}

// 4. TEARDOWN STAGE (Runs ONCE after all VUs terminate)
export function teardown(data) {
    console.log("=== Teardown: Cleaning up test data for ID:", data.testId);
}
\`\`\`

### Core Takeaways
1. \`setup()\` and \`teardown()\` run in separate isolated environments, outside the VU iterations.
2. Never put login/auth in \`default function\` if you only need a single session token; put it in \`setup()\` to save unnecessary load on your authentication service.
3. Data returned from \`setup()\` is passed read-only to \`default(data)\` and \`teardown(data)\`.

---

## 🌐 Topic 6: Real-World REST API Scripting: Authentication & Dynamic Token Chaining
**Timestamp:** [51:00 - 75:30]

### Extracted Code: \`script2.js\`
\`\`\`javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {
    // Step 1: Authentication Request
    const authUrl = 'https://restful-booker.herokuapp.com/auth';
    const authPayload = JSON.stringify({
        username: 'admin',
        password: 'password123',
    });

    const authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        },
    };

    const loginRes = http.post(authUrl, authPayload, authHeaders);

    check(loginRes, {
        'login status code is 200': (r) => r.status === 200,
    });

    // Extract authentication token
    const token = loginRes.json().token;

    // Step 2: Create Booking using the retrieved Token
    const bookingUrl = 'https://restful-booker.herokuapp.com/booking';
    const bookingPayload = JSON.stringify({
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2022-08-13T14:23:45.000Z',
            checkout: '2023-08-13T14:23:45.000Z',
        },
        additionalneeds: 'Breakfast',
    });

    const bookingHeaders = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Cookie': \`token=\${token}\`,
        },
    };

    const createRes = http.post(bookingUrl, bookingPayload, bookingHeaders);

    check(createRes, {
        'booking status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
\`\`\`

---

## ✅ Topic 7: Assertions & Checks: Validating Response Codes, Latency & JSON Body
**Timestamp:** [76:00 - 89:30]

### Extracted Code: \`checks-demo.js\`
\`\`\`javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://restful-booker.herokuapp.com/booking/1');

    check(res, {
        '✓ status code is 200': (r) => r.status === 200,
        '✓ response time < 700ms': (r) => r.timings.duration < 700,
        '✓ body has valid firstname': (r) => r.json().firstname !== undefined,
        '✓ content-type header is json': (r) => r.headers['Content-Type'].includes('application/json'),
    });
}
\`\`\`

---

## 🔐 Topic 8: High-Performance Architecture — Moving Auth from VU Loop to setup()
**Timestamp:** [90:00 - 99:30]

### Extracted Code: \`script3.js\`
\`\`\`javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '20s',
};

// SETUP: Authenticate once and pass token to all VUs
export function setup() {
    const loginPayload = JSON.stringify({
        username: "admin",
        password: "password123",
    });

    const loginHeaders = {
        headers: { "Content-Type": "application/json" },
    };

    const loginRes = http.post(
        "https://restful-booker.herokuapp.com/auth",
        loginPayload,
        loginHeaders
    );

    check(loginRes, {
        "login status 200": (r) => r.status === 200,
    });

    return { token: loginRes.json().token };
}

// DEFAULT: Each VU uses the shared auth token
export default function (data) {
    const bookingPayload = JSON.stringify({
        firstname: "John",
        lastname: "Doe",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-01-01",
            checkout: "2024-01-05",
        },
        additionalneeds: "Dinner",
    });

    const bookingHeaders = {
        headers: {
            "Content-Type": "application/json",
            "Cookie": \`token=\${data.token}\`,
        },
    };

    const createRes = http.post(
        "https://restful-booker.herokuapp.com/booking",
        bookingPayload,
        bookingHeaders
    );

    check(createRes, {
        "booking created successfully": (r) => r.status === 200,
        "response time acceptable": (r) => r.timings.duration < 1000,
    });

    sleep(1);
}
\`\`\`

---

## 📈 Topic 9: Traffic Simulation with Stages (Load, Stress & Spike Testing)
**Timestamp:** [100:00 - 111:30]

### Extracted Code: \`script5.js\`
\`\`\`javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '15s', target: 10 }, // Stage 1: Ramp-up to 10 VUs in 15 seconds
        { duration: '1m',  target: 30 }, // Stage 2: Ramp-up and sustain 30 VUs for 1 minute
        { duration: '30s', target: 0  }, // Stage 3: Ramp-down to 0 VUs in 30 seconds
    ],
};

export default function () {
    const res = http.get('https://grafana.com/docs/k6/latest/');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
\`\`\`

---

## 🎯 Topic 10: Thresholds: Automated Quality Gates & CI/CD Pass/Fail
**Timestamp:** [112:00 - 119:27]

### Extracted Code: \`script6.js\`
\`\`\`javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5s',  target: 5  }, // Quick ramp up
        { duration: '20s', target: 15 }, // Stay at 15 VUs
        { duration: '10s', target: 0  }, // Ramp down
    ],
    thresholds: {
        // 95% of requests must respond within 1000ms
        http_req_duration: ['p(95)<1000'],
        // Error rate must remain under 1%
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const res = http.get('https://grafana.com/docs/k6/latest/');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}
\`\`\`
`;

function buildCheatSheetMarkdown(): string {
  let md = `\n\n---\n\n# 📋 Complete k6 Cheat Sheet & Advanced SDET Reference\n\n`;

  // 1. Glossary Table
  md += `## 1. 📊 k6 Built-in Metrics Glossary\n\n`;
  md += `| Metric | Type | Meaning in Plain English | Healthy Target Value |\n`;
  md += `|---|---|---|---|\n`;
  METRICS_GLOSSARY.forEach((m) => {
    md += `| \`${m.metric}\` | ${m.type} | ${m.meaning} | ${m.healthyValue} |\n`;
  });
  md += `\n`;

  // 2. Executors
  md += `## 2. ⚙️ Executors & Scenarios Guide\n\n`;
  EXECUTORS_DATA.forEach((e) => {
    md += `### \`${e.name}\` (${e.type})\n`;
    md += `* **Summary:** ${e.summary}\n`;
    md += `* **When to use:** ${e.whenToUse}\n\n`;
  });
  md += `### Working Multi-Scenario Example (\`orders-api\`)\n\`\`\`javascript\n${SCENARIOS_CODE_EXAMPLE}\n\`\`\`\n\n`;

  // 3. Custom Metrics
  md += `## 3. 📈 Custom Metrics (Counter, Gauge, Rate, Trend)\n\n`;
  md += `\`\`\`javascript\n${CUSTOM_METRICS_CODE_EXAMPLE}\n\`\`\`\n\n`;

  // 4. Groups & Tags
  md += `## 4. 🏷️ Organizing Results with Groups & Tags\n\n`;
  md += `\`\`\`javascript\n${GROUPS_TAGS_CODE_EXAMPLE}\n\`\`\`\n\n`;

  // 5. Data Parameterization
  md += `## 5. 🗂️ Data Parameterization with SharedArray\n\n`;
  md += `> **Why NEVER read files inside \`default()\`:** Every VU repeats file parsing on every iteration, leading to rapid Out-of-Memory (OOM) crashes. \`SharedArray\` reads and parses once in the init phase into shared read-only memory.\n\n`;
  md += `\`\`\`javascript\n${SHARED_ARRAY_CODE_EXAMPLE}\n\`\`\`\n\n`;

  // 6. GitHub Actions CI
  md += `## 6. 🤖 Running k6 in CI: Ready GitHub Actions YAML\n\n`;
  md += `\`\`\`yaml\n${GITHUB_ACTIONS_YAML}\n\`\`\`\n\n`;

  // 7. Dashboard & Reporting
  md += `## 7. 🖥️ Viewing Results as a Dashboard\n\n`;
  md += `### 1. Built-in Real-Time Web Dashboard\nRun your test with:\n\`\`\`bash\nK6_WEB_DASHBOARD=true k6 run script.js\n\`\`\`\nThen open **http://localhost:5665** in your browser for live interactive throughput, VU ramp, and latency charts.\n\n`;
  md += `### 2. Standalone HTML Report Export\nExport a static, self-contained HTML report file for stakeholders or CI build artifacts:\n\`\`\`bash\nK6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=report.html k6 run script.js\n\`\`\`\n\n`;
  md += `### 3. Enterprise Observability (Grafana + Prometheus / InfluxDB)\nStream live test metrics directly to enterprise time-series stores:\n\`\`\`bash\n# Stream directly to Prometheus\nk6 run -o experimental-prometheus-rw=http://localhost:9090/api/v1/write script.js\n\n# Stream directly to InfluxDB\nk6 run -o influxdb=http://localhost:8086/k6 script.js\n\`\`\`\n\n`;

  // 8. Top 10 Mistakes
  md += `## 8. ⚠️ Top 10 Common Beginner Mistakes & Fixes\n\n`;
  TOP_10_MISTAKES.forEach((mst) => {
    md += `### ${mst.title}\n`;
    md += `* **Symptom:** ${mst.symptom}\n`;
    md += `* **Problem:** ${mst.problem}\n`;
    md += `* **Fix:** ${mst.fix}\n\n`;
  });

  // 9. 15 Interview Questions
  md += `## 9. 🎯 15 SQA / SDET Interview Questions & Answers\n\n`;
  INTERVIEW_QUESTIONS.forEach((q) => {
    md += `### Q${q.id}: ${q.question}\n`;
    md += `**Answer:** ${q.answer}\n\n`;
  });

  // 10. Next Steps
  md += `## 10. 🗺️ Next Steps QA Learning Roadmap\n\n`;
  NEXT_STEPS_PATH.forEach((st) => {
    md += `### Step ${st.step}: ${st.title} (${st.duration})\n${st.description}\n\n`;
  });

  // 11. Grafana + InfluxDB Real-Time Monitoring
  md += `## 11. 📊 Real-Time Monitoring with Grafana + InfluxDB 1.8\n\n`;
  md += `### What each tool does in plain English:\n`;
  md += `* **k6 (Load Generator):** Executes test iterations across concurrent VUs and continuously streams live HTTP metric points.\n`;
  md += `* **InfluxDB 1.8 (Time-Series Store):** Ingests and stores raw metrics in real time inside the \`k6\` database on port 8086.\n`;
  md += `* **Grafana (Visualization UI):** Queries InfluxDB on port 3000 to render interactive latency, RPS, and VU graphs as the test runs.\n\n`;
  md += `### docker-compose.yml\n\`\`\`yaml\n${INFLUXDB_DOCKER_COMPOSE_YAML}\n\`\`\`\n\n`;
  md += `### Execution Command\n\`\`\`bash\nk6 run --out influxdb=http://localhost:8086/k6 script.js\n\`\`\`\n\n`;
  md += `### How to Configure InfluxDB in Grafana:\n`;
  md += `1. Open **http://localhost:3000** in your browser.\n`;
  md += `2. Go to **Connections / Data Sources** -> **Add data source** -> select **InfluxDB** (Query language: **InfluxQL**).\n`;
  md += `3. Set HTTP URL to \`http://influxdb:8086\` (or \`http://localhost:8086\` if not in Docker).\n`;
  md += `4. Under Database, type \`k6\` and click **Save & test**.\n\n`;
  md += `### How to Import Ready k6 Dashboard (ID 2587):\n`;
  md += `1. In Grafana, click **Dashboards** -> **New** -> **Import**.\n`;
  md += `2. Enter Dashboard ID **2587** (official Grafana community k6 dashboard) and click **Load**.\n`;
  md += `3. Choose your InfluxDB data source and click **Import**.\n\n`;
  md += `> **Modern Alternative Note:** In modern cloud-native Kubernetes environments, Grafana recommends the **Prometheus remote-write output** (\`k6 run -o experimental-prometheus-rw=http://localhost:9090/api/v1/write script.js\`) to stream directly to Prometheus or Grafana Mimir.\n\n`;

  // 12. Environment Variables
  md += `## 12. 🔧 Passing Values with Environment Variables\n\n`;
  md += `Execute via CLI flag:\n\`\`\`bash\nk6 run -e BASE_URL=https://orders-api.company.internal script.js\n\`\`\`\n\n`;
  md += `### Script Code Reading \`__ENV\` with Fallback Defaults:\n\`\`\`javascript\n${ENV_VARS_CODE_EXAMPLE}\n\`\`\`\n\n`;
  md += `### Platform Execution Commands:\n`;
  md += `* **Windows PowerShell:**\n\`\`\`powershell\nk6 run -e BASE_URL=https://orders-api.company.internal script.js\n$env:BASE_URL="https://orders-api.company.internal"; k6 run script.js\n\`\`\`\n`;
  md += `* **Windows Command Prompt (CMD):**\n\`\`\`cmd\nk6 run -e BASE_URL=https://orders-api.company.internal script.js\nset BASE_URL=https://orders-api.company.internal && k6 run script.js\n\`\`\`\n`;
  md += `* **macOS & Linux (Bash / Zsh):**\n\`\`\`bash\nBASE_URL=https://orders-api.company.internal k6 run script.js\nk6 run -e BASE_URL=https://orders-api.company.internal script.js\n\`\`\`\n\n`;

  // 13. Chapter Map
  md += `## 13. 🗺️ Your Class Book Chapter Map (Self-Study Guide)\n\n`;
  md += `| Self-Study Chapter Focus | Core Concepts Covered | Where It Lives on This Site |\n`;
  md += `|---|---|---|\n`;
  CHAPTER_MAP_DATA.forEach((row) => {
    md += `| **${row.selfStudyChapter}** | ${row.coreConcepts} | ${row.whereItLives} |\n`;
  });
  md += `\n`;

  return md;
}

export const EMBEDDED_MARKDOWN = BASE_MARKDOWN + buildCheatSheetMarkdown();

export const EMBEDDED_TXT = `================================================================================
GRAFANA K6 PERFORMANCE TESTING MASTERCLASS - COMPLETE COURSE DOCUMENTATION
Course: Advanced Automation & Performance Engineering (Batch 15)
Mentor: Shouvik Datta (Road to SDET)
Source Video: K6_Part1_57b9a509.mp4 (Full 01:59:27 Session)
Target Systems: https://quickpizza.grafana.com & https://restful-booker.herokuapp.com
================================================================================

TABLE OF CONTENTS:
1. Installation & How to Run k6 (Windows, Mac, Linux, Docker)
2. The Golden AI Prompting Framework for k6 Script Generation
3. The 7 Performance Testing Variants (Smoke, Load, Stress, Spike, Soak, Breakpoint, Capacity)
4. Full Textbook Chapter (10 Topics, Transcripts, Screen Descriptions & Code)
5. k6 Built-in Metrics Glossary Table
6. Executors & Scenarios Explained
7. Custom Metrics, Groups & Tags, Data Parameterization (SharedArray)
8. CI/CD GitHub Actions Pipeline Configuration
9. Web Dashboard & Reporting
10. Top 10 Common Beginner Mistakes & Solutions
11. 15 SQA / SDET Interview Questions & Answers
12. Next Steps QA Learning Path
13. Real-Time Telemetry: Grafana + InfluxDB 1.8 & Prometheus Remote-Write
14. Environment Variables (__ENV) across Windows PowerShell, CMD & Mac/Linux
15. Class Book Chapter Map Correlation Matrix

================================================================================
PART 1: INSTALLATION & HOW TO RUN K6 (FREE & OPEN SOURCE)
================================================================================
- Windows (WinGet): winget install k6 --source winget
- macOS (Homebrew): brew install k6
- Linux (Ubuntu/Debian): sudo apt-get install -y k6
- Docker: docker run --rm -i grafana/k6 run - <script.js

EXECUTION COMMANDS:
- Basic: k6 run script.js
- CLI Flags: k6 run --vus 25 --duration 2m script.js
- Live Dashboard: K6_WEB_DASHBOARD=true k6 run script.js (open http://localhost:5665)
- Export HTML: K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=report.html k6 run script.js

================================================================================
PART 2: TOP 10 COMMON BEGINNER MISTAKES & FIXES
================================================================================
1. Authenticating inside default() on every iteration -> Move to setup()
2. Reading files inside default() -> Use SharedArray from k6/data in init context
3. Omitting sleep() think time -> Add realistic sleep(1) pauses
4. Expecting check() to fail CI -> Define thresholds in options (exit code 99)
5. Confusing VUs with RPS -> Use constant-arrival-rate executor for strict RPS
6. Reusing hardcoded IDs -> Extract dynamic response parameters (res.json().id)
7. Importing standard Node.js packages -> Use native k6 modules or jslib.k6.io
8. Starting without ramp-up stages -> Configure gradual stages in options
9. Not tagging requests -> Add tags: { service: 'orders-api' } to isolate latencies
10. Default file descriptor limits -> Run ulimit -n 65535 on runner machines

================================================================================
PART 3: 15 HIGH-YIELD SQA / SDET INTERVIEW QUESTIONS & ANSWERS
================================================================================
Q1: Architecture difference between k6 and JMeter?
A: k6 is written in Go, uses goroutines (~20-40KB/VU), and modern ES6 JS. JMeter is Java JVM-based, thread-per-VU, and requires XML test plans.

Q2: What exit code does k6 return on threshold failure?
A: Non-zero POSIX status code 99, halting CI/CD pipelines.

Q3: Explain the 4 stages of k6 test lifecycle.
A: 1) Init (load SharedArray), 2) Setup (auth/seed once), 3) VU (parallel test loops), 4) Teardown (cleanup once).

Q4: Difference between check() and threshold?
A: Checks are diagnostic assertions that never halt tests; thresholds are enforceable SLAs that return exit code 99 on breach.

Q5: Why use SharedArray?
A: It loads datasets once into read-only shared memory, eliminating per-VU RAM duplication and preventing OOM crashes.

================================================================================
FULL MARKDOWN & CODE REPOSITORY:
================================================================================
` + EMBEDDED_MARKDOWN;

export const EMBEDDED_PDF_BASE64 = ""; // Superseded by client-side dynamic jsPDF generator
