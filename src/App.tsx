import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Terminal, 
  Code2, 
  Calculator, 
  CheckCircle2, 
  Copy, 
  Check, 
  Bookmark, 
  Search, 
  ExternalLink, 
  Gauge, 
  HelpCircle, 
  FileText, 
  Video, 
  Sparkles, 
  Download, 
  Play, 
  RotateCcw, 
  Zap, 
  Activity, 
  ShieldAlert, 
  Flame, 
  TrendingUp,
  Sun,
  Moon,
  Lock,
  ChevronDown,
  ChevronUp,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { 
  EMBEDDED_MARKDOWN, 
  EMBEDDED_TXT, 
  EMBEDDED_PDF_BASE64 
} from './data/embeddedDownloads';
import { CheatSheetTab } from './components/CheatSheetTab';
import { generateFullGuidePdf } from './utils/pdfGenerator';

/**
 * =========================================================================
 * OPTIONAL VIDEO CONFIGURATION
 * =========================================================================
 * If you have a YouTube recording link for this class, paste it below:
 * e.g. const VIDEO_URL = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';
 *
 * If left empty (''), the app displays a clean private video card while
 * keeping all 10 chapter timestamps, visual mappings, and code fully accessible.
 */
const VIDEO_URL = '';

interface ChapterSection {
  id: string;
  title: string;
  emoji: string;
  timestamp: string;
  seconds: number;
  screenVisual: string;
  transcriptionBanglaBanglish: string;
  englishExplanation: string;
  extractedCode?: {
    filename: string;
    language: string;
    code: string;
    command?: string;
  };
  terminalOutput?: string;
  coreTakeaways: string[];
}

const CHAPTER_DATA: ChapterSection[] = [
  {
    id: "sec-intro",
    title: "Introduction & Why k6? (k6 vs. Apache JMeter)",
    emoji: "🚀",
    timestamp: "03:00 - 12:30",
    seconds: 180,
    screenVisual: "Microsoft Edge browser showing PDF slide 'K6_Details.pdf' with a side-by-side comparison matrix titled 'FEATURES: k6 vs APACHE JMeter'. Mentor highlights lightweight architecture, cloud-native design, and JavaScript scripting. At [10:00], browser switches to github.com/grafana/k6/releases showing v1.2.2 with 28.6k stars. At [11:00], Windows Command Prompt opens executing 'k6.exe --help' displaying CLI flags.",
    transcriptionBanglaBanglish: "Mentor shuruতেই shobai ke welcome janan Batch-15 er advanced automation performance testing class e. Shouvik vai explain korchen: 'JMeter amra onek bochor dhore use korchi, but JMeter holo Java/JVM-based and heavyweight. Onek memory consume kore, and XML-based test plan maintain kora complex hoye jay. On the other hand, k6 hocche developer-friendly, modern tool ja Go language diye lekha, ar scripts lekha hoy standard ES6 JavaScript e! k6 khub lightweight, Cloud-native apps er jonno perfect, and CI/CD pipeline er sathe bina plugin e directly integration kora jay.'",
    englishExplanation: "The session begins by contrasting Grafana k6 with Apache JMeter. While JMeter remains a legacy giant, its heavy memory footprint and cumbersome XML GUI make it painful in modern DevOps pipelines. k6 solves this by combining Go's ultra-efficient concurrency engine under the hood with developer-friendly JavaScript/ES6 scripting. It requires no JVM and seamlessly integrates into GitHub Actions, GitLab CI, or Jenkins.",
    extractedCode: {
      filename: "Terminal / Installation Verification",
      language: "bash",
      command: "k6.exe --help",
      code: `C:\\Users\\ASUS> k6.exe --help
k6 is a modern load testing tool, using Go and JavaScript.

Flags:
  -a, --address string        address for the REST API server (default "localhost:6565")
  -c, --config string         JSON config file (default "C:\\Users\\...\\AppData\\Roaming\\k6\\config.json")
  -h, --help                  help for k6.exe
      --log-format string     log output format
      --log-output string     change the output for k6 logs ('stderr', 'stdout', 'loki', 'file')
      --no-color              disable colored output
      --profiling-enabled     enable profiling (pprof) endpoints
  -q, --quiet                 disable progress updates
  -v, --verbose               enable verbose logging
      --version               version for k6.exe`
    },
    coreTakeaways: [
      "k6 is built in Go for maximum performance and efficiency, while tests are written in readable modern JavaScript (ES6).",
      "Unlike JMeter which demands a heavy Java Runtime Environment (JRE) and complex XML GUI, k6 is CLI-first and code-as-configuration.",
      "Native CI/CD friendliness: k6 returns standard shell exit codes (0 for pass, non-zero for threshold breach) making automation pipeline triggers instant."
    ]
  },
  {
    id: "sec-first-script",
    title: "Writing Your First k6 Script & Execution Life Cycle",
    emoji: "📝",
    timestamp: "13:30 - 20:30",
    seconds: 810,
    screenVisual: "VS Code opens with the workspace folder 'K6_Codes'. Inside the explorer, we see 'script.js' and 'package.json'. Shouvik writes the initial k6 script targeting 'https://quickpizza.grafana.com'. Mentor explains imports from 'k6/http' and 'k6' (sleep). Then opens Windows Command Prompt at [19:30] pointing to 'P:\\My Class Notes\\K6\\K6_Class\\K6_Codes>' and prepares to execute 'k6 run script.js'.",
    transcriptionBanglaBanglish: "'Ebar amra amader first k6 script likhbo. Kheyal rakhben, k6 e normal Node.js er moto standard npm packages direct run hoy na; er nijer internal modules ache jemon k6/http ebong k6 theke sleep. Amra prottek request er por ektu 'sleep' kori think time simulate korar jonno. Default function ta hocche main entry point jekhane proti ta Virtual User (VU) loop kore code run korbe.'",
    englishExplanation: "The instructor sets up the quintessential minimal k6 script. k6 does not run directly in NodeJS; it executes JavaScript in a customized embedded Goja JS runtime engine. The `http.get()` call initiates an HTTP GET request to Grafana's official demo app QuickPizza (`https://quickpizza.grafana.com`), followed by a 1-second simulated user think time (`sleep(1)`).",
    extractedCode: {
      filename: "script.js",
      language: "javascript",
      command: "k6 run script.js",
      code: `import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {
    http.get('https://quickpizza.grafana.com');
    sleep(1);
}`
    },
    coreTakeaways: [
      "Import `http` from `'k6/http'` and helper utilities like `sleep` from `'k6'`.",
      "The exported `default function()` represents the core test scenario executed repeatedly by Virtual Users.",
      "`sleep(duration)` mimics real human think-time between user actions, preventing unrealistically artificial hammering of the server."
    ]
  },
  {
    id: "sec-metrics",
    title: "Deconstructing the k6 Terminal Output & Metrics",
    emoji: "📊",
    timestamp: "21:00 - 26:30",
    seconds: 1260,
    screenVisual: "CMD terminal displays the ASCII banner and formatted summary table under 'TOTAL RESULTS'. Mentor selects lines with cursor explaining http_req_duration, avg, min, med, max, p(90), p(95), http_req_failed, and iteration_duration.",
    transcriptionBanglaBanglish: "'Terminal er ei output ta bojha performance tester der jonno shobcheye crucial. Average dekhe kokhono shanti paben na! Karon average e outlier hide hoye jay. Amra look korbo p(90) ebong p(95) percentiles er dike. Er mane holo 95% users er response time ei limit er moddhe chilo kina. R http_req_failed jodi 0.00% er beshi hoy, tahole system e error ashte shuru koreche.'",
    englishExplanation: "k6 outputs a rich, real-time statistical breakdown upon completion. Shouvik explains why relying on the arithmetic mean (average) is misleading due to skew from outliers. Industry standards demand monitoring the 90th and 95th percentiles (p90, p95). The `http_req_duration` encapsulates the entire HTTP exchange (DNS, TLS connection, TTFB, and data download).",
    terminalOutput: `          /\\      |‾‾| /‾‾/   /‾‾/   
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
       vus_max........................: 10 min=10 max=10`,
    coreTakeaways: [
      "`http_req_duration` measures total round-trip latency (DNS lookup + TCP handshake + TLS negotiation + TTFB + Content Download).",
      "Always evaluate `p(90)` and `p(95)` percentiles rather than average to avoid being misled by outlier latency spikes.",
      "`http_req_failed` monitors the error rate percentage. In production-readiness SLAs, it should typically remain < 1%."
    ]
  },
  {
    id: "sec-math",
    title: "Concurrency Math: VUs vs. Iterations vs. Duration",
    emoji: "🧮",
    timestamp: "27:00 - 41:30",
    seconds: 1620,
    screenVisual: "Windows Notepad and Calculator opened. Types formulas: 'vus : 10', 'iter : 30', '30/10 = 3', 'user 1 = 4, user 2 = 2'. In Calculator: '25 * 10 = 250'. Explains shared iterations pool vs continuous duration testing.",
    transcriptionBanglaBanglish: "'Oneke confuse hoye jay VUs ar Iterations niye. Mone rakhben: VUs holo kotojon parallel user eksathe hit korche (threads). Ar Iteration holo mot koto bar function ta run hobe. Jodi 10 VUs ar 30 iterations den, tar mane 10 jon user mile mot 30 ta iteration complete korbe. Jar response fast hobe she beshi iteration korbe. Ar jodi duration den (dhoren 30s), tahole 30s dhore shobai continuous loop kortei thakbe!'",
    englishExplanation: "A deep dive into load testing mathematics. By default, k6 uses a shared-iterations executor where VUs draw from a common pool of iterations; faster VUs process more iterations. When a `duration` is set instead, VUs run continuously in parallel loops for that entire time window. Throughput (RPS) is directly derived as: RPS = (VUs) / (Response Time + Think Time).",
    coreTakeaways: [
      "In `shared-iterations`: Total executed requests = `iterations`, distributed dynamically among VUs based on system response speed.",
      "In `constant-vus` with a duration: Total requests = `(Duration / Iteration Time) * VUs`.",
      "Pacing: Think time (`sleep`) determines how many requests a fixed number of VUs can generate per second."
    ]
  },
  {
    id: "sec-lifecycle",
    title: "The 4-Stage Test Life Cycle: Init, Setup, VU, Teardown",
    emoji: "🔄",
    timestamp: "42:00 - 50:30",
    seconds: 2520,
    screenVisual: "VS Code with 'script0.js'. Shouvik types export function setup() and export function teardown(data). Runs test in CMD at [48:30] with 5 VUs for 10s. Terminal outputs setup logs once at start, VU executions during the test, and teardown logs once at end.",
    transcriptionBanglaBanglish: "'k6 e 4 ti lifecycle stage thake: 1. Init code (file imports & options), 2. setup() function, 3. default function (VU code), ebong 4. teardown() function. setup() ar teardown() shudhu ekbar kore run hoy. Tai login kora ba test data create korar kaj amra setup() e korbo, prottek VU er moddhe login korar dorkar nei!'",
    englishExplanation: "k6 enforces a strict lifecycle model designed for massive scalability. The `setup()` function runs once globally before any VU starts, returning a data object. The `default` function receives this data object as an argument in each iteration. Finally, `teardown(data)` runs once globally after all VUs have finished to clean up test data.",
    extractedCode: {
      filename: "script0.js",
      language: "javascript",
      command: "k6 run script0.js",
      code: `// 1. INIT STAGE (Runs once during test initialization)
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
}`
    },
    coreTakeaways: [
      "`setup()` and `teardown()` run in isolated execution contexts, exactly once per test run.",
      "Data returned by `setup()` is passed into `default(data)` as an immutable parameter across all VUs.",
      "Never put expensive one-time authentication in the default function; always authenticate in `setup()`."
    ]
  },
  {
    id: "sec-rest-api",
    title: "Real-World REST API Scripting: Authentication & Dynamic Token Chaining",
    emoji: "🌐",
    timestamp: "51:00 - 75:30",
    seconds: 3060,
    screenVisual: "Edge browser opens 'https://restful-booker.herokuapp.com' documentation. Shows POST /auth with username 'admin' and password 'password123', returning token. Then POST /booking with complex JSON payload. Shows Postman collection execution. Then switches to VS Code 'script2.js' at [65:00] writing JSON.stringify, http.post, and extracting res.json().token.",
    transcriptionBanglaBanglish: "'Ekhon amra ekta real-world enterprise scenario test korbo restful-booker API diye. Step 1 e amra /auth endpoint e POST request pathiye dynamic token collect korbo. Step 2 e oi token ta ke Cookie header e pass kore /booking endpoint e new reservation create korbo. JSON payload pathanor shomoy oboshshoi JSON.stringify() use korte hobe!'",
    englishExplanation: "Demonstrates authentic end-to-end API performance testing against the popular Restful-Booker system. The script performs authentication via `http.post()`, extracts the returned dynamic authentication token with `res.json().token`, and chains it into the `Cookie: token=${token}` header of a subsequent booking creation request.",
    extractedCode: {
      filename: "script2.js",
      language: "javascript",
      command: "k6 run script2.js",
      code: `import http from 'k6/http';
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

    // Extract dynamic authentication token
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
}`
    },
    coreTakeaways: [
      "Always use `JSON.stringify()` on JavaScript objects when sending JSON request bodies.",
      "`res.json()` parses the JSON response into a native JavaScript object for dynamic data correlation.",
      "Pass authentication credentials in `headers: { 'Cookie': ... }` or `Authorization: Bearer ...`."
    ]
  },
  {
    id: "sec-checks",
    title: "Assertions & Checks: Validating Response Codes & Body",
    emoji: "✅",
    timestamp: "76:00 - 89:30",
    seconds: 4560,
    screenVisual: "VS Code with checks syntax. CMD runs test showing green checkmarks '✓ status code is 200', '✓ response time < 500ms', and '✓ token exists'. Shouvik demonstrates deliberate check failures and shows that k6 does NOT abort the test on check failure.",
    transcriptionBanglaBanglish: "'Functional testing e assertion fail korle script thame jay. But performance testing e check fail korleo VU stop hoy na! k6 er check holo non-blocking assertion. Eta shudhu terminal output e pass percentage hishab kore. Check fail holeo load test continue korbe, jate overall system behaviour bojha jay.'",
    englishExplanation: "In k6, `check()` is fundamentally different from functional assertions. Checks validate status codes, response headers, latency limits, and body content without halting virtual user execution. They record success and failure rates in the aggregated summary report.",
    extractedCode: {
      filename: "checks-demo.js",
      language: "javascript",
      code: `import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const res = http.get('https://restful-booker.herokuapp.com/booking/1');

    check(res, {
        '✓ status code is 200': (r) => r.status === 200,
        '✓ response time < 700ms': (r) => r.timings.duration < 700,
        '✓ body has valid firstname': (r) => r.json().firstname !== undefined,
        '✓ content-type header is json': (r) => r.headers['Content-Type'].includes('application/json'),
    });
}`
    },
    coreTakeaways: [
      "`check(res, { 'assertion': (r) => boolean })` is non-blocking and does not abort test execution.",
      "`r.timings.duration` allows asserting response latency for individual specific requests.",
      "Checks provide rich diagnostic metrics in the test summary without prematurely halting virtual users."
    ]
  },
  {
    id: "sec-perf-auth",
    title: "High-Performance Architecture: Moving Auth to setup()",
    emoji: "🔐",
    timestamp: "90:00 - 99:30",
    seconds: 5400,
    screenVisual: "VS Code 'script3.js'. Mentor refactors the code to move the /auth HTTP POST into setup(). Explains that in a 100-user test running for 10 minutes, default() would generate 60,000 login hits, crashing the auth server. Moving to setup() reduces it to exactly 1 request.",
    transcriptionBanglaBanglish: "'Ei technique ta hocche industry standard performance engineering! Apni jodi 100 VUs diye 10 minute test chalayen, ar login rakhen default function e, tahole 60,000 bar login request jabe! Apnar booking system test hobar agei login server crash korbe. Tai setup() e matro 1 bar login kore token generate korben, ar shob VUs oi same token share kore booking create korbe!'",
    englishExplanation: "A crucial architectural pattern in enterprise load testing. Authenticating inside the VU iteration loop creates a false bottleneck by drowning the authentication provider in redundant requests. By relocating login logic to `setup()`, authentication occurs exactly once, and the resulting session token is safely passed to all concurrent VUs.",
    extractedCode: {
      filename: "script3.js",
      language: "javascript",
      command: "k6 run script3.js",
      code: `import http from 'k6/http';
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
}`
    },
    coreTakeaways: [
      "`setup()` isolates expensive pre-test setup from measured performance workloads.",
      "Prevents false bottlenecks on authentication microservices during high-concurrency tests.",
      "The returned object from `setup()` is accessible read-only via `data` in `default(data)`."
    ]
  },
  {
    id: "sec-stages",
    title: "Traffic Simulation with Stages (Load, Stress & Spike)",
    emoji: "📈",
    timestamp: "100:00 - 111:30",
    seconds: 6000,
    screenVisual: "VS Code 'script5.js'. Shows options with stages: ramp-up 15s to 10 VUs, stay 1m at 30 VUs, ramp-down 30s to 0 VUs. CMD runs test, live progress bar shows VU count ramping up smoothly from 0 to 10, then to 30.",
    transcriptionBanglaBanglish: "'Real world e kokhono eksathe 100 jon user abruptly jump kore na. Dhire dhire traffic bare, peak thake, tarpor kome. Ejonno k6 e stages use kora hoy. Stage 1: Ramp-up (system warm up hoy), Stage 2: Steady state (peak load sustain kore), Stage 3: Ramp-down (traffic normal hoye recovery test kore).'",
    englishExplanation: "Realistic traffic generation requires simulating organic load curves. The `stages` option allows developers to define target VU thresholds over specified durations. This enables progressive warm-up periods for database connection pools and caches, followed by sustained load and a controlled cool-down phase.",
    extractedCode: {
      filename: "script5.js",
      language: "javascript",
      command: "k6 run script5.js",
      code: `import http from 'k6/http';
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
}`
    },
    coreTakeaways: [
      "`stages` defines realistic traffic ramp-up, steady-state, and ramp-down phases.",
      "Ramp-up allows caches and connection pools to warm up naturally.",
      "Ramp-down tests server recovery and garbage collection behavior after traffic subsides."
    ]
  },
  {
    id: "sec-thresholds",
    title: "Thresholds: Automated Quality Gates & CI/CD Pass/Fail",
    emoji: "🎯",
    timestamp: "112:00 - 119:27",
    seconds: 6720,
    screenVisual: "VS Code 'script6.js'. Mentor types thresholds: http_req_duration: ['p(95)<1000'], http_req_failed: ['rate<0.01']. Runs in CMD. Shows green checkmarks under TOTAL RESULTS. Then changes threshold to 200ms to force failure, terminal prints red [✗] FAIL with exit status code 99.",
    transcriptionBanglaBanglish: "'Threshold holo CI/CD pipeline er pass/fail gate. Apni DevOps pipeline e k6 add korle shudhu log dekhe labh nei. Script ke bolte hobe: 95% request jodi 1000ms er niche thake ar error rate 1% er kom thake, tahole build pass (exit code 0). R threshold breach hole k6 exit code 99 dibe, jar karone GitHub Actions ba Jenkins pipeline build automatically fail hoye jabe!'",
    englishExplanation: "Thresholds elevate k6 into a mission-critical automated quality gate. By setting strict SLO criteria on metrics (e.g. `http_req_duration: ['p(95)<1000']`, `http_req_failed: ['rate<0.01']`), k6 evaluates results post-execution. If any threshold fails, k6 terminates with exit code 99, automatically halting unstable deployment pipelines.",
    extractedCode: {
      filename: "script6.js",
      language: "javascript",
      command: "k6 run script6.js",
      code: `import http from 'k6/http';
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
        // 99% of checks must pass
        checks: ['rate>0.99'],
    },
};

export default function () {
    const res = http.get('https://grafana.com/docs/k6/latest/');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}`
    },
    terminalOutput: `     ✓ http_req_duration..............: avg=312.45ms p(95)=480.12ms < 1000ms [✓ PASS]
     ✓ http_req_failed................: 0.00% < 1.00%                      [✓ PASS]
     ✓ checks.........................: 100.00% > 99.00%                    [✓ PASS]`,
    coreTakeaways: [
      "Thresholds act as programmatic Service Level Objectives (SLOs) enforceable in continuous deployment pipelines.",
      "Syntax like `'p(95)<1000'` and `'rate<0.01'` guarantees both latency bounds and maximum acceptable error rates.",
      "Threshold failures cause `k6 run` to return an exit status code of 99, seamlessly halting unstable deployments."
    ]
  }
];

const PREBUILT_QA = [
  {
    q: "Why use p95 or p90 percentile instead of average response time?",
    a: "Average (mean) response time is deceptive because extreme outliers (e.g., 99 requests taking 100ms and 1 request taking 10s) distort the calculation. A p95 metric guarantees that 95% of all users experienced response times at or below that exact latency, which reflects real user satisfaction and SLA agreements."
  },
  {
    q: "What is the difference between VUs and Iterations in k6?",
    a: "VUs (Virtual Users) represent concurrent execution threads running in parallel. Iterations represent the number of times the default function is executed. In 'shared-iterations', VUs pull from a shared queue of iterations. In 'duration-bound' tests, VUs loop continuously until time expires."
  },
  {
    q: "Why should we authenticate in setup() instead of the default function?",
    a: "If authentication is inside default(), each VU will hit the login endpoint on every single loop, generating millions of redundant auth requests and crashing your login server (a false bottleneck). By authenticating once in setup(), you obtain a single token and distribute it to all VUs, testing your actual business endpoints accurately."
  },
  {
    q: "What happens if a check() fails in k6?",
    a: "Checks are non-blocking. Unlike functional tests that crash on assertion failure, a failed check in k6 only marks a failure in the summary table while the test continues running. To halt or fail a test on errors, you must use Thresholds (e.g., checks: ['rate>0.99'])."
  },
  {
    q: "How does k6 signal failures to CI/CD pipelines?",
    a: "Through Thresholds. If any configured threshold is breached (such as error rate exceeding 1% or latency exceeding 1000ms), k6 exits with non-zero POSIX status code 99, which immediately instructs GitHub Actions, Jenkins, or GitLab CI to fail the deployment."
  }
];

// Helper to parse YouTube embed link
function getYouTubeEmbedUrl(url: string, startSeconds = 0): string | null {
  if (!url || typeof url !== 'string' || !url.trim()) return null;
  const trimmed = url.trim();
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  const videoId = match && match[1] ? match[1] : (trimmed.length === 11 ? trimmed : null);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&autoplay=1`;
}

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('k6_theme');
      if (stored) return stored !== 'light';
      return true; // Default dark
    } catch {
      return true;
    }
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      try {
        localStorage.setItem('k6_theme', next ? 'dark' : 'light');
      } catch {}
      return next;
    });
  };

  const [activeTab, setActiveTab] = useState<'textbook' | 'video_qa' | 'ai_prompts' | 'cheat_sheet'>('textbook');
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-intro");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedQa, setSelectedQa] = useState<number | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [qaSuggestionActive, setQaSuggestionActive] = useState<boolean>(false);
  const [videoTimestamp, setVideoTimestamp] = useState<number>(0);
  const [copiedNotion, setCopiedNotion] = useState(false);
  const [outlineOpenMobile, setOutlineOpenMobile] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Concurrency Calculator State
  const [calcVus, setCalcVus] = useState<number>(10);
  const [calcResponseTimeMs, setCalcResponseTimeMs] = useState<number>(350);
  const [calcThinkTimeSec, setCalcThinkTimeSec] = useState<number>(1);
  const [calcDurationSec, setCalcDurationSec] = useState<number>(30);

  const iterationDurationSec = (calcResponseTimeMs / 1000) + calcThinkTimeSec;
  const iterationsPerVu = Math.floor(calcDurationSec / iterationDurationSec);
  const totalRequests = iterationsPerVu * calcVus;
  const estimatedRps = (calcVus / iterationDurationSec).toFixed(1);

  const safeCopyText = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {}
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  };

  const handleCopy = (code: string, key: string) => {
    safeCopyText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const jumpToVideoTime = (seconds: number) => {
    setActiveTab('video_qa');
    setVideoTimestamp(seconds);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
    }
  };

  // Expanded Q&A knowledge matcher
  const handleAskQuestion = (queryText: string) => {
    const q = (queryText || customQuestion).trim().toLowerCase();
    if (!q) return;

    setCustomQuestion(queryText || customQuestion);
    setQaSuggestionActive(false);

    let answer = "";
    if (q.includes("jmeter") || q.includes("difference") || q.includes("why k6") || q.includes("compare")) {
      answer = "k6 vs JMeter: k6 is built in Go with modern JavaScript (ES6) scripting, CLI-first, lightweight, and cloud-native with seamless CI/CD integration. JMeter is Java-based, requires a heavy JVM, consumes large amounts of memory, and relies on complex XML GUI test plans.";
    } else if (q.includes("token") || q.includes("auth") || q.includes("login") || q.includes("setup")) {
      answer = "In k6, authenticate inside export function setup(). It runs ONCE globally before virtual users start and returns { token: res.json().token }. Then export default function(data) receives this data and passes it via Cookie: `token=${data.token}` to prevent overwhelming your auth service.";
    } else if (q.includes("threshold") || q.includes("fail") || q.includes("ci/cd") || q.includes("pipeline") || q.includes("slo") || q.includes("sla")) {
      answer = "Thresholds are pass/fail criteria (SLAs) for automated CI/CD pipelines. Example: thresholds: { http_req_duration: ['p(95)<1000'], http_req_failed: ['rate<0.01'] }. If breached, k6 exits with code 99 to fail the automated build.";
    } else if (q.includes("check") || q.includes("assert")) {
      answer = "k6 checks are non-blocking validations (e.g., check(res, { 'status is 200': (r) => r.status === 200 })). They record pass/fail percentages in the summary report without aborting the load test.";
    } else if (q.includes("stage") || q.includes("ramp") || q.includes("spike") || q.includes("stress") || q.includes("soak") || q.includes("traffic")) {
      answer = "Stages model realistic traffic curves. Example: stages: [{ duration: '15s', target: 10 }, { duration: '1m', target: 30 }, { duration: '30s', target: 0 }]. This warms up caches during ramp-up, sustains peak concurrency, and tests recovery during ramp-down.";
    } else if (q.includes("install") || q.includes("run") || q.includes("command") || q.includes("cli")) {
      answer = "To install k6 on Windows: `winget install k6` or `choco install k6`. On Mac: `brew install k6`. On Linux: `sudo apt-get install k6`. To run: `k6 run script.js` or with CLI flags: `k6 run --vus 20 --duration 1m script.js`.";
    } else if (q.includes("percentile") || q.includes("p95") || q.includes("p90") || q.includes("average") || q.includes("mean") || q.includes("metric")) {
      answer = "Percentiles (p90, p95) show the latency threshold for 90% or 95% of requests. Average (mean) is deceptive because a few fast requests can mask extreme user-facing latency spikes.";
    } else if (q.includes("vu") || q.includes("virtual user") || q.includes("iteration") || q.includes("rps") || q.includes("throughput")) {
      answer = "A VU (Virtual User) is a parallel execution thread running in an isolated JS runtime loop. RPS = VUs / (Response Time + Think Time). To scale throughput, adjust sleep duration or scale VUs.";
    } else {
      // Trigger friendly suggestion state
      setQaSuggestionActive(true);
      answer = "I couldn't find a direct answer to that query in the course transcript notes. Try asking one of these 3 common questions:";
    }

    setCustomAnswer(answer);
  };

  const filteredSections = CHAPTER_DATA.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.englishExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.transcriptionBanglaBanglish.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSection = CHAPTER_DATA.find(s => s.id === activeSectionId) || CHAPTER_DATA[0];

  // In-Memory Blob & Dynamic PDF Downloads (Guarantees zero network calls and bypasses proxy / cookie-check issues)
  const downloadPdf = () => {
    try {
      generateFullGuidePdf();
    } catch (e) {
      console.error('PDF generation error:', e);
      downloadTxt();
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([EMBEDDED_TXT], { type: 'text/plain;charset=utf-8' });
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'full_conversation_and_guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
  };

  const downloadMd = () => {
    const blob = new Blob([EMBEDDED_MARKDOWN], { type: 'text/markdown;charset=utf-8' });
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'k6_textbook_chapter.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
  };

  const copyMarkdownForNotion = () => {
    safeCopyText(EMBEDDED_MARKDOWN);
    setCopiedNotion(true);
    setTimeout(() => setCopiedNotion(false), 2500);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-50 px-4 sm:px-6 py-3.5 backdrop-blur transition-colors ${isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white/90 shadow-xs'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  100% Free • Open Source
                </span>
                <span className={`text-xs hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Batch 15 • Road to SDET
                </span>
              </div>
              <h1 className={`text-base sm:text-lg font-bold leading-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Grafana k6 Performance Engineering Masterclass
              </h1>
            </div>
          </div>

          {/* Controls: Nav Tabs, Downloads, Dark/Light Toggle */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
            {/* View Switcher Tabs */}
            <div className={`flex items-center p-1 rounded-xl border text-xs font-medium ${isDark ? 'bg-slate-850 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <button
                onClick={() => setActiveTab('textbook')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'textbook' 
                    ? 'bg-orange-600 text-white shadow-xs font-semibold' 
                    : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Textbook</span>
              </button>
              <button
                onClick={() => setActiveTab('video_qa')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'video_qa' 
                    ? 'bg-orange-600 text-white shadow-xs font-semibold' 
                    : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video & Q&A</span>
              </button>
              <button
                onClick={() => setActiveTab('ai_prompts')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'ai_prompts' 
                    ? 'bg-orange-600 text-white shadow-xs font-semibold' 
                    : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Prompts & 7 Tests</span>
              </button>
              <button
                onClick={() => setActiveTab('cheat_sheet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'cheat_sheet' 
                    ? 'bg-orange-600 text-white shadow-xs font-semibold' 
                    : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
                <span>Cheat Sheet & More</span>
              </button>
            </div>

            {/* Action Buttons: Notion Copy, PDF, TXT, MD */}
            <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
              <button
                onClick={copyMarkdownForNotion}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs shadow-indigo-600/20 transition-all shrink-0 cursor-pointer active:scale-95"
                title="Copy pure Markdown to clipboard — paste directly into Notion!"
              >
                {copiedNotion ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNotion ? 'Copied to Clipboard!' : '📋 Copy for Notion'}</span>
              </button>

              <button
                onClick={downloadPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs shadow-emerald-600/20 transition-all shrink-0 cursor-pointer active:scale-95"
                title="Download 5-page PDF (compatible with Adobe Acrobat)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Guide</span>
              </button>

              <button
                onClick={downloadTxt}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-xs shadow-sky-600/20 transition-all shrink-0 cursor-pointer active:scale-95"
                title="Download complete documentation as plain text"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Plain TXT</span>
              </button>

              <button
                onClick={downloadMd}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 cursor-pointer active:scale-95 ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
                title="Download Markdown file"
              >
                <Download className="w-3 h-3 text-amber-500" />
                <span>.MD</span>
              </button>

              {/* Dark / Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark and Light Mode"
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
                }`}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-x-hidden">
        {/* ========================================================================= */}
        {/* TAB 1: TEXTBOOK CHAPTER READER */}
        {/* ========================================================================= */}
        {activeTab === 'textbook' && (
          <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
            {/* Left Outline Sidebar - Responsive, Shows Full List on Page */}
            <aside className={`w-full lg:w-88 shrink-0 p-4 border-b lg:border-b-0 lg:border-r transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-100/60'
            }`}>
              {/* Header with Mobile Accordion Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Chapter Outline
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-mono">
                    {CHAPTER_DATA.length} Topics
                  </span>
                </div>

                {/* Mobile toggle button */}
                <button
                  onClick={() => setOutlineOpenMobile(!outlineOpenMobile)}
                  className={`lg:hidden px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <span>{outlineOpenMobile ? 'Hide List' : 'View All Topics'}</span>
                  {outlineOpenMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-3">
                <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <input 
                  type="text" 
                  placeholder="Search topics, codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full rounded-xl pl-9 pr-8 py-2 text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    isDark 
                      ? 'bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500' 
                      : 'bg-white border border-slate-300 text-slate-800 placeholder-slate-400'
                  }`}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Cross-tab search notice if searching */}
              {searchQuery && (
                <div className="mb-3 p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] flex items-center justify-between gap-1">
                  <span className="text-orange-500 dark:text-orange-400">
                    Search also active in Cheat Sheet!
                  </span>
                  <button
                    onClick={() => setActiveTab('cheat_sheet')}
                    className="font-bold underline text-orange-600 dark:text-orange-300 hover:text-orange-400 cursor-pointer"
                  >
                    View in Cheat Sheet →
                  </button>
                </div>
              )}

              {/* Topic List - Rendered fully on desktop, collapsible on mobile */}
              <div className={`space-y-1.5 ${outlineOpenMobile ? 'block' : 'hidden lg:block'}`}>
                {filteredSections.map((sec, idx) => {
                  const isActive = sec.id === activeSection.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setActiveSectionId(sec.id);
                        setOutlineOpenMobile(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isActive
                          ? 'bg-orange-500/10 border-orange-500/40 text-orange-600 dark:text-orange-400 font-semibold shadow-xs'
                          : isDark
                            ? 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{sec.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-medium">
                            {sec.timestamp.split(' - ')[0]}
                          </span>
                          <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            #{idx + 1}
                          </span>
                        </div>
                        <h4 className="text-xs font-medium leading-snug line-clamp-2">
                          {sec.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Main Content Area */}
            <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
              {/* Active Topic Banner */}
              <div className={`border rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors ${
                isDark 
                  ? 'border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/60' 
                  : 'border-slate-200 bg-gradient-to-br from-white to-orange-50/50 shadow-sm'
              }`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center gap-3 text-sm mb-2">
                  <span className="text-3xl">{activeSection.emoji}</span>
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs font-semibold">
                    Topic Breakdown
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-amber-600 dark:text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    <Clock className="w-3.5 h-3.5" />
                    Timestamp: [{activeSection.timestamp}]
                  </div>

                  <button
                    onClick={() => jumpToVideoTime(activeSection.seconds)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-300 hover:text-orange-700 dark:hover:text-white bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 transition-colors ml-auto cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch in Video</span>
                  </button>
                </div>

                <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeSection.title}
                </h2>
              </div>

              {/* Timestamped Visual Mapping Card */}
              <section className={`border rounded-2xl p-6 shadow-xs transition-colors ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-2.5 text-orange-600 dark:text-orange-400 font-semibold mb-3">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className={`text-base ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Timestamped Visual Mapping (Screen Representation)
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed p-4 rounded-xl border font-mono text-xs sm:text-sm ${
                  isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">[{activeSection.timestamp}]</span> {activeSection.screenVisual}
                </p>
              </section>

              {/* Bilingual Speech & English Explanation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className={`border rounded-2xl p-6 flex flex-col transition-colors ${
                  isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold mb-3 text-sm">
                    <span className="text-lg">🗣️</span>
                    <span>Mentor's Live Speech (Bilingual / Banglish)</span>
                  </div>
                  <div className={`flex-1 p-4 rounded-xl text-sm leading-relaxed italic border ${
                    isDark 
                      ? 'bg-amber-950/20 border-amber-800/30 text-amber-100/90' 
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}>
                    "{activeSection.transcriptionBanglaBanglish}"
                  </div>
                </section>

                <section className={`border rounded-2xl p-6 flex flex-col transition-colors ${
                  isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold mb-3 text-sm">
                    <span className="text-lg">📖</span>
                    <span>Technical Textbook Explanation (English)</span>
                  </div>
                  <div className={`flex-1 p-4 rounded-xl text-sm leading-relaxed border ${
                    isDark 
                      ? 'bg-sky-950/20 border-sky-800/30 text-slate-200' 
                      : 'bg-sky-50/70 border-sky-200 text-slate-800'
                  }`}>
                    {activeSection.englishExplanation}
                  </div>
                </section>
              </div>

              {/* Extracted Code or Terminal Blocks */}
              {activeSection.extractedCode && (
                <section className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-mono font-semibold text-slate-200">
                        {activeSection.extractedCode.filename}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeSection.extractedCode.command && (
                        <span className="font-mono text-[11px] bg-slate-950 px-2 py-1 rounded text-amber-300 border border-slate-800 hidden sm:inline">
                          $ {activeSection.extractedCode.command}
                        </span>
                      )}
                      <button
                        onClick={() => handleCopy(activeSection.extractedCode!.code, activeSection.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === activeSection.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === activeSection.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
                    <pre className="text-orange-200/90 whitespace-pre">
                      {activeSection.extractedCode.code}
                    </pre>
                  </div>
                </section>
              )}

              {/* Terminal Output */}
              {activeSection.terminalOutput && (
                <section className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-semibold text-slate-200">
                      Terminal Output: k6 Execution Summary
                    </span>
                  </div>
                  <pre className="p-4 sm:p-5 text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto">
                    {activeSection.terminalOutput}
                  </pre>
                </section>
              )}

              {/* Interactive Concurrency Calculator (on Math topic) */}
              {activeSection.id === "sec-math" && (
                <section className={`border rounded-2xl p-6 shadow-xl space-y-5 transition-colors ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-base">
                    <Calculator className="w-5 h-5" />
                    <h3>Interactive k6 Concurrency Calculator</h3>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Simulate how Virtual Users, Server Response Time, and Sleep Pacing govern your test's true Requests Per Second (RPS):
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <label className="text-xs font-medium text-slate-400 block mb-1">
                        Active VUs: <strong className="text-orange-500">{calcVus}</strong>
                      </label>
                      <input 
                        type="range" min="1" max="100" value={calcVus} 
                        onChange={e => setCalcVus(Number(e.target.value))} 
                        className="w-full accent-orange-500"
                      />
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <label className="text-xs font-medium text-slate-400 block mb-1">
                        Response Time: <strong className="text-amber-500">{calcResponseTimeMs}ms</strong>
                      </label>
                      <input 
                        type="range" min="50" max="2000" step="50" value={calcResponseTimeMs} 
                        onChange={e => setCalcResponseTimeMs(Number(e.target.value))} 
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <label className="text-xs font-medium text-slate-400 block mb-1">
                        Think Time (Sleep): <strong className="text-emerald-500">{calcThinkTimeSec}s</strong>
                      </label>
                      <input 
                        type="range" min="0" max="5" step="0.5" value={calcThinkTimeSec} 
                        onChange={e => setCalcThinkTimeSec(Number(e.target.value))} 
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <label className="text-xs font-medium text-slate-400 block mb-1">
                        Test Duration: <strong className="text-orange-500">{calcDurationSec}s</strong>
                      </label>
                      <input 
                        type="range" min="5" max="120" step="5" value={calcDurationSec} 
                        onChange={e => setCalcDurationSec(Number(e.target.value))} 
                        className="w-full accent-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="text-[11px] text-slate-400 block">Single Loop Time</span>
                      <span className="text-lg font-bold text-orange-500 font-mono">
                        {iterationDurationSec.toFixed(2)}s
                      </span>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="text-[11px] text-slate-400 block">Iters / VU</span>
                      <span className="text-lg font-bold text-amber-500 font-mono">
                        ~{iterationsPerVu}
                      </span>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="text-[11px] text-slate-400 block">Total Requests</span>
                      <span className="text-lg font-bold text-emerald-500 font-mono">
                        {totalRequests}
                      </span>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="text-[11px] text-slate-400 block">Expected RPS</span>
                      <span className="text-lg font-bold text-sky-500 font-mono">
                        ~{estimatedRps} /s
                      </span>
                    </div>
                  </div>
                </section>
              )}

              {/* Core Takeaways */}
              <section className={`border rounded-2xl p-6 shadow-md transition-colors ${
                isDark 
                  ? 'bg-gradient-to-r from-emerald-950/20 to-slate-900/90 border-emerald-800/40' 
                  : 'bg-emerald-50/60 border-emerald-200'
              }`}>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mb-4 text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3>Core Takeaways (What You Must Remember)</h3>
                </div>
                <ul className="space-y-2.5">
                  {activeSection.coreTakeaways.map((takeaway, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      <span className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Bottom Navigation */}
              <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                {(() => {
                  const curIdx = CHAPTER_DATA.findIndex(s => s.id === activeSection.id);
                  const prev = CHAPTER_DATA[curIdx - 1];
                  const next = CHAPTER_DATA[curIdx + 1];
                  return (
                    <>
                      {prev ? (
                        <button
                          onClick={() => setActiveSectionId(prev.id)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                            isDark 
                              ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white' 
                              : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          ← {prev.title.split(':')[0]}
                        </button>
                      ) : <div />}

                      {next ? (
                        <button
                          onClick={() => setActiveSectionId(next.id)}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-sm font-medium text-white shadow-lg shadow-orange-600/20 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          Next: {next.title.split(':')[0]} →
                        </button>
                      ) : (
                        <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>End of Chapter 1</div>
                      )}
                    </>
                  );
                })()}
              </div>
            </main>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: VIDEO PLAYER & INTERACTIVE Q&A */}
        {/* ========================================================================= */}
        {activeTab === 'video_qa' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-5xl mx-auto w-full">
            <div className={`border rounded-2xl overflow-hidden shadow-2xl transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
            }`}>
              <div className={`px-5 py-3 border-b flex items-center justify-between ${
                isDark ? 'bg-slate-850 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Video className="w-4 h-4 text-orange-500" />
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    Tutorial Video: K6_Part1 (Batch 15 Session)
                  </span>
                </div>
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Duration: 01:59:27
                </span>
              </div>
              
              {/* Video Player or Private Video Card */}
              {VIDEO_URL && getYouTubeEmbedUrl(VIDEO_URL, videoTimestamp) ? (
                <div className="aspect-video bg-black relative">
                  <iframe 
                    src={getYouTubeEmbedUrl(VIDEO_URL, videoTimestamp)!}
                    title="Grafana k6 Performance Engineering Masterclass"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className={`aspect-video p-6 flex flex-col items-center justify-center text-center relative overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900' 
                    : 'bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100'
                }`}>
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-3 shadow-lg shadow-orange-500/10">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono mb-2 border ${
                    isDark ? 'bg-slate-800/80 border-slate-700/80 text-slate-300' : 'bg-white border-slate-300 text-slate-700 shadow-xs'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Private Class Recording • 01:59:27 (Batch 15)</span>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    Full Class Video is Hosted Privately
                  </h3>
                  <p className={`text-xs sm:text-sm max-w-lg leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    The original 2-hour HD recording (320+ MB) is held in a private student repository. All 10 topics, visual screen mappings, extracted scripts, and takeaways are fully accessible in this textbook!
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="text-[11px] px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-medium">
                      💡 Click any topic marker below to review its exact timestamp and notes
                    </span>
                  </div>
                </div>
              )}

              {/* Fast Jump Chapter Markers */}
              <div className={`p-4 border-t ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Jump to Class Topic:
                </div>
                <div className="flex flex-wrap gap-2">
                  {CHAPTER_DATA.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        jumpToVideoTime(sec.seconds);
                        setActiveSectionId(sec.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors flex items-center gap-1.5 border cursor-pointer ${
                        sec.id === activeSectionId
                          ? 'bg-orange-500/20 border-orange-500/40 text-orange-600 dark:text-orange-300 font-semibold'
                          : isDark
                            ? 'bg-slate-800 hover:bg-orange-600 hover:text-white text-slate-300 border-slate-700'
                            : 'bg-white hover:bg-orange-600 hover:text-white text-slate-700 border-slate-300 shadow-xs'
                      }`}
                    >
                      <span>{sec.emoji}</span>
                      <span className="font-mono text-amber-500 font-bold">{sec.timestamp.split(' - ')[0]}</span>
                      <span className="truncate max-w-[130px]">{sec.title.split(':')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Q&A Assistant */}
            <div className={`border rounded-2xl p-6 shadow-xl space-y-5 transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white shadow-sm'
            }`}>
              <div className="flex items-center gap-2 text-orange-500 font-bold text-base">
                <HelpCircle className="w-5 h-5" />
                <h3>Ask Questions to the Course Knowledge Base</h3>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Type any performance testing question, or select a pre-built interview question to receive instant answers derived from the Batch 15 lecture!
              </p>

              {/* Custom Question Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. How do I pass a dynamic auth token? or Why use p95?"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion(customQuestion)}
                  className={`flex-1 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    isDark 
                      ? 'bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500' 
                      : 'bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400'
                  }`}
                />
                <button
                  onClick={() => handleAskQuestion(customQuestion)}
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold shadow-md transition-colors shrink-0 cursor-pointer"
                >
                  Ask
                </button>
              </div>

              {/* Answer Display */}
              {customAnswer && (
                <div className={`p-4 rounded-xl border leading-relaxed text-sm ${
                  isDark ? 'bg-orange-950/20 border-orange-500/30 text-orange-100' : 'bg-orange-50 border-orange-200 text-orange-950'
                }`}>
                  <div className="font-bold text-orange-500 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Answer:</span>
                  </div>
                  <p>{customAnswer}</p>

                  {/* Friendly Suggested Questions Fallback */}
                  {qaSuggestionActive && (
                    <div className="mt-3 pt-3 border-t border-orange-500/20 space-y-2">
                      <div className="text-xs font-semibold text-orange-600 dark:text-orange-300">
                        Try clicking one of these recommended questions:
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleAskQuestion("How does k6 compare to JMeter?")}
                          className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-slate-900 border-orange-500/30 text-slate-200 hover:bg-orange-600 hover:text-white' 
                              : 'bg-white border-orange-300 text-slate-800 hover:bg-orange-600 hover:text-white'
                          }`}
                        >
                          ⚡ How does k6 compare to JMeter?
                        </button>
                        <button
                          onClick={() => handleAskQuestion("How do I authenticate with setup()?")}
                          className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-slate-900 border-orange-500/30 text-slate-200 hover:bg-orange-600 hover:text-white' 
                              : 'bg-white border-orange-300 text-slate-800 hover:bg-orange-600 hover:text-white'
                          }`}
                        >
                          🔐 How do I authenticate with setup()?
                        </button>
                        <button
                          onClick={() => handleAskQuestion("What are thresholds and CI/CD quality gates?")}
                          className={`text-xs px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-slate-900 border-orange-500/30 text-slate-200 hover:bg-orange-600 hover:text-white' 
                              : 'bg-white border-orange-300 text-slate-800 hover:bg-orange-600 hover:text-white'
                          }`}
                        >
                          🎯 What are thresholds in CI/CD?
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Prebuilt Frequent Interview Questions */}
              <div className="space-y-2 pt-2">
                <div className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Top Interview Q&A from this Session:
                </div>
                <div className="space-y-2">
                  {PREBUILT_QA.map((item, i) => (
                    <div 
                      key={i} 
                      className={`border rounded-xl overflow-hidden transition-colors ${
                        isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedQa(selectedQa === i ? null : i)}
                        className={`w-full text-left p-3 text-xs sm:text-sm font-medium flex items-center justify-between gap-2 cursor-pointer ${
                          isDark ? 'text-slate-200 hover:text-orange-400' : 'text-slate-800 hover:text-orange-600'
                        }`}
                      >
                        <span>❓ {item.q}</span>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {selectedQa === i ? '▲' : '▼'}
                        </span>
                      </button>
                      {selectedQa === i && (
                        <div className={`px-4 pb-3.5 pt-1 text-xs sm:text-sm border-t leading-relaxed ${
                          isDark ? 'text-slate-300 border-slate-800 bg-slate-900/40' : 'text-slate-700 border-slate-200 bg-white'
                        }`}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: AI PROMPT STUDIO & 7 TEST VARIANTS */}
        {/* ========================================================================= */}
        {activeTab === 'ai_prompts' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 max-w-5xl mx-auto w-full">
            {/* Mega Prompt Section */}
            <div className={`border rounded-2xl p-6 sm:p-8 shadow-xl space-y-4 transition-colors ${
              isDark 
                ? 'border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900' 
                : 'border-amber-200 bg-gradient-to-br from-amber-50/50 to-white shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 text-amber-500 font-bold text-lg">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <h2>The Golden AI Mega-Prompt for k6 Scripts</h2>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Copy and paste this structured prompt into <strong>ChatGPT, Claude, or Gemini</strong> whenever you need to generate production-ready k6 load test scripts. It enforces standard k6 ES6 modules, think times, lifecycle architecture, and automated threshold SLAs!
              </p>

              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Copy-Paste Mega-Prompt</span>
                  <button
                    onClick={() => handleCopy(`You are an expert Performance Engineer writing tests with Grafana k6.
Please write a complete, production-grade k6 test script with the following requirements:

1. Target API:
   - Auth Endpoint: POST https://api.example.com/v1/auth
     Payload: { "username": "test_user", "password": "SecurePassword123" }
     Expected response: { "token": "<jwt_token>" }
   - Main Endpoint to Test: POST https://api.example.com/v1/orders
     Headers: Authorization: Bearer <token>, Content-Type: application/json
     Payload: { "productId": 402, "quantity": 1, "paymentMethod": "CARD" }

2. Architecture Requirements:
   - Use k6's 4-stage lifecycle: Authenticate ONCE in export function setup() and return the token.
   - The export default function(data) must use data.token to execute the main orders endpoint.
   - Use JSON.stringify() for all payloads and res.json() for response parsing.
   - Include realistic think time (sleep between 1 and 2 seconds).
   - Use only native k6 modules (k6/http, k6). Do NOT import Node.js packages.

3. Traffic Profile (Stages):
   - Ramp-up: 0 to 20 VUs in 30 seconds
   - Steady State: Sustain 20 VUs for 2 minutes
   - Ramp-down: 20 to 0 VUs in 20 seconds

4. Assertions & Quality Gates (SLAs):
   - Add check() blocks verifying: HTTP status is 200/201, response time < 600ms, and order ID is returned.
   - Configure thresholds in options:
     * http_req_duration: 95% of requests must complete under 800ms ('p(95)<800')
     * http_req_failed: Error rate must stay below 1% ('rate<0.01')
     * checks: 99% of checks must pass ('rate>0.99')

Provide only the clean, complete JavaScript file with comments.`, 'mega-prompt')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    {copiedKey === 'mega-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'mega-prompt' ? 'Copied Mega-Prompt!' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-amber-200/90 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`You are an expert Performance Engineer writing tests with Grafana k6.
Please write a complete, production-grade k6 test script with the following requirements:

1. Target API:
   - Auth Endpoint: POST https://api.example.com/v1/auth
     Payload: { "username": "test_user", "password": "SecurePassword123" }
     Expected response: { "token": "<jwt_token>" }
   - Main Endpoint to Test: POST https://api.example.com/v1/orders
     Headers: Authorization: Bearer <token>, Content-Type: application/json
     Payload: { "productId": 402, "quantity": 1, "paymentMethod": "CARD" }

2. Architecture Requirements:
   - Use k6's 4-stage lifecycle: Authenticate ONCE in export function setup() and return the token.
   - The export default function(data) must use data.token to execute the main orders endpoint.
   - Use JSON.stringify() for all payloads and res.json() for response parsing.
   - Include realistic think time (sleep between 1 and 2 seconds).
   - Use only native k6 modules (k6/http, k6). Do NOT import Node.js packages.

3. Traffic Profile (Stages):
   - Ramp-up: 0 to 20 VUs in 30 seconds
   - Steady State: Sustain 20 VUs for 2 minutes
   - Ramp-down: 20 to 0 VUs in 20 seconds

4. Assertions & Quality Gates (SLAs):
   - Add check() blocks verifying: HTTP status is 200/201, response time < 600ms, and order ID is returned.
   - Configure thresholds in options:
     * http_req_duration: 95% of requests must complete under 800ms ('p(95)<800')
     * http_req_failed: Error rate must stay below 1% ('rate<0.01')
     * checks: 99% of checks must pass ('rate>0.99')

Provide only the clean, complete JavaScript file with comments.`}
                </pre>
              </div>
            </div>

            {/* The 7 Performance Testing Variants */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    The 7 Performance Testing Variants in k6
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Copy the stage configurations directly into your scripts depending on your test objective:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Smoke Test */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-emerald-400">
                      <Zap className="w-4 h-4" />
                      <span>1. Smoke Test</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">1-2 VUs • 1m</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Sanity check to verify that the script works, URLs are responsive, and checks pass with minimal load before running heavy stress tests.
                  </p>
                  <pre className="text-[11px] font-mono bg-slate-900 p-3 rounded-lg text-emerald-300">
{`export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};`}
                  </pre>
                </div>

                {/* 2. Load Test */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-sky-400">
                      <Activity className="w-4 h-4" />
                      <span>2. Load Test</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">Standard Traffic</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Assesses system behavior under expected normal peak daily conditions over an extended steady state.
                  </p>
                  <pre className="text-[11px] font-mono bg-slate-900 p-3 rounded-lg text-sky-300">
{`export const options = {
  stages: [
    { duration: '5m', target: 50 },  // Ramp-up
    { duration: '20m', target: 50 }, // Steady state
    { duration: '3m', target: 0 },   // Ramp-down
  ],
};`}
                  </pre>
                </div>

                {/* 3. Stress Test */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-amber-400">
                      <Flame className="w-4 h-4" />
                      <span>3. Stress Test</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">Beyond Normal</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Pushes system beyond typical capacity limits to determine stability thresholds, find memory leaks, and test recovery.
                  </p>
                  <pre className="text-[11px] font-mono bg-slate-900 p-3 rounded-lg text-amber-300">
{`export const options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '10m', target: 250 }, // Extreme load
    { duration: '5m', target: 400 }, // Peak breaking point
    { duration: '5m', target: 0 },   // Recovery
  ],
};`}
                  </pre>
                </div>

                {/* 4. Spike Test */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-rose-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>4. Spike Test</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">Flash Surges</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Sudden massive burst within seconds (Flash Sales, Black Friday, Breaking News) to test cloud autoscaling recovery.
                  </p>
                  <pre className="text-[11px] font-mono bg-slate-900 p-3 rounded-lg text-rose-300">
{`export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '15s', target: 500 }, // Sudden spike!
    { duration: '1m', target: 500 },
    { duration: '20s', target: 10 },
  ],
};`}
                  </pre>
                </div>

                {/* 5. Soak / Endurance Test */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-purple-400">
                      <Clock className="w-4 h-4" />
                      <span>5. Soak / Endurance Test</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">Memory Leaks</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Continuous moderate load for 2 to 12 hours to catch slow memory leaks, database connection pool exhaustion, or disk bloat.
                  </p>
                  <pre className="text-[11px] font-mono bg-slate-900 p-3 rounded-lg text-purple-300">
{`export const options = {
  stages: [
    { duration: '10m', target: 30 },
    { duration: '4h', target: 30 }, // 4-hour soak
    { duration: '10m', target: 0 },
  ],
};`}
                  </pre>
                </div>

                {/* 6. Breakpoint Test */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-red-400">
                      <ShieldAlert className="w-4 h-4" />
                      <span>6. Breakpoint Test</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">Climb to Collapse</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Ramps up concurrency indefinitely in steps until the server totally collapses, providing true maximum infrastructure limits.
                  </p>
                  <pre className="text-[11px] font-mono bg-slate-900 p-3 rounded-lg text-red-300">
{`export const options = {
  stages: [
    { duration: '10m', target: 200 },
    { duration: '10m', target: 600 },
    { duration: '10m', target: 1200 }, // Keep climbing
  ],
};`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CHEAT SHEET & MORE */}
        {/* ========================================================================= */}
        {activeTab === 'cheat_sheet' && (
          <CheatSheetTab
            isDark={isDark}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleCopy={handleCopy}
            copiedKey={copiedKey}
          />
        )}
      </div>

      {/* Global Footer */}
      <footer className={`border-t py-6 px-4 text-center text-xs transition-colors ${
        isDark ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-white text-slate-600 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-orange-500" />
            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              Grafana k6 Performance Engineering Masterclass
            </span>
          </div>
          <p className={`text-[11px] sm:text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            Study notes made from a class by Road to SDET. All course content belongs to its original author
          </p>
        </div>
      </footer>
    </div>
  );
}
