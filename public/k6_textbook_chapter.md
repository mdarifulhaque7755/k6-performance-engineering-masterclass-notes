# 📘 Chapter 1: Performance Testing Mastery with Grafana k6
**Course Series:** Advanced Automation & Performance Engineering (Batch 15)  
**Instructor / Mentor:** Shouvik Datta (*Road to SDET*)  
**Source Video:** `K6_Part1_57b9a509.mp4` (Duration: 01:59:27)  
**Target Systems:** `https://quickpizza.grafana.com` & `https://restful-booker.herokuapp.com`

---

## 🚀 Topic 1: The Modern Performance Paradigm — Why k6 Over Apache JMeter?
**Timestamp:** [03:00 - 12:30]

### Visual Mapping
* **[03:00 - 09:30]**: Microsoft Edge browser showing PDF slide `K6_Details.pdf` with a comparison matrix titled `FEATURES: k6 vs APACHE JMeter`. Mentor highlights lightweight Go architecture, cloud-native design, and JavaScript scripting.
* **[10:00 - 10:45]**: Browser switches to `https://github.com/grafana/k6/releases` showing v1.2.2 with 28.6k GitHub stars.
* **[11:00 - 12:45]**: Windows Command Prompt opens executing `k6.exe --help`, showing flags: `--address`, `--config`, `--log-format`, `--no-color`, `--quiet`, `--verbose`.

### Mentor's Speech (Bilingual / Banglish)
> "JMeter amra onek bochor dhore use korchi, but JMeter holo Java/JVM-based and heavyweight. Onek memory consume kore, and XML-based test plan maintain kora complex hoye jay. On the other hand, k6 hocche developer-friendly, modern tool ja Go language diye lekha, ar scripts lekha hoy standard ES6 JavaScript e! k6 khub lightweight, Cloud-native apps er jonno perfect, and CI/CD pipeline er sathe bina plugin e directly integration kora jay."

### English Explanation
Grafana k6 is built in Go for high concurrency while providing developer-friendly JavaScript (ES6) scripting. Unlike JMeter which demands a heavy Java Runtime Environment (JRE) and complex XML GUI, k6 is CLI-first and code-as-configuration. It returns standard shell exit codes (0 for pass, non-zero for threshold breach) making automation pipeline triggers instant.

### Extracted Code / CLI Verification
```bash
# Verify installation and inspect CLI flags
C:\Users\ASUS> k6.exe --help
```

### Core Takeaways
1. k6 is built in Go for maximum performance and efficiency, while tests are written in readable modern JavaScript (ES6).
2. Unlike JMeter which demands a heavy Java Runtime Environment (JRE) and complex XML GUI, k6 is CLI-first and code-as-configuration.
3. Native CI/CD friendliness: k6 returns standard shell exit codes making automation pipeline triggers instant.

---

## 📝 Topic 2: Setting Up the First k6 Test Script & The Anatomy of a VU
**Timestamp:** [13:30 - 20:30]

### Visual Mapping
* **[13:30 - 18:30]**: VS Code opens in `K6_Codes`. Files: `script.js` and `package.json`. Mentor writes script targeting `https://quickpizza.grafana.com` with `import http from 'k6/http'` and `sleep(1)`.
* **[19:00 - 20:30]**: Windows Command Prompt opens at `P:\My Class Notes\K6\K6_Class\K6_Codes>` and executes `k6 run script.js`.

### Extracted Code: `script.js`
```javascript
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
```

### Core Takeaways
1. `import http from 'k6/http'` is the built-in HTTP client tailored specifically for load generation.
2. The exported `default function()` represents the core test scenario executed repeatedly by Virtual Users.
3. `sleep(duration)` mimics real human think-time between user actions, preventing unrealistically artificial hammering of the server.

---

## 📊 Topic 3: Deconstructing the k6 Terminal Output & Performance Metrics
**Timestamp:** [21:00 - 26:30]

### Visual Mapping
* **[21:00 - 26:30]**: CMD terminal displays the ASCII banner and formatted summary table under `TOTAL RESULTS`. Mentor selects lines with cursor explaining `http_req_duration`, `avg`, `min`, `med`, `max`, `p(90)`, `p(95)`, `http_req_failed`, and `iteration_duration`.

### Terminal Output
```text
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

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
```

### Core Takeaways
1. `http_req_duration` encapsulates the full round-trip HTTP lifecycle (DNS + TLS Handshake + TTFB + Content Transfer).
2. Percentiles (`p90`, `p95`, `p99`) are the industry gold standard for performance evaluation rather than the arithmetic average.
3. `http_req_failed` tracks the failure rate (HTTP 4xx/5xx errors). 0.00% indicates all requests succeeded.

---

## 🧮 Topic 4: Concurrency Math: VUs vs Iterations vs Duration
**Timestamp:** [27:00 - 41:30]

### Visual Mapping
* **[27:00 - 41:30]**: Windows Notepad and Calculator opened. Types formulas: `vus : 10`, `iter : 30`, `30/10 = 3`, `user 1 = 4, user 2 = 2`. In Calculator: `25 * 10 = 250`. Explains shared iterations pool vs continuous duration testing.

### Key Formula
$$\text{Throughput (RPS)} = \frac{\text{Active VUs}}{\text{Response Time} + \text{Think Time}}$$

### Core Takeaways
1. In `shared-iterations`, total requests equal the iteration count regardless of VU speed differences.
2. In `constant-vus` with a `duration`, total requests = `(Duration / Iteration Time) * VUs`.
3. Throughput is governed by server latency plus sleep pacing.

---

## 🔄 Topic 5: The 4-Stage Test Life Cycle: Init, Setup, VU, Teardown
**Timestamp:** [42:00 - 50:30]

### Extracted Code: `script0.js`
```javascript
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
```

### Core Takeaways
1. `setup()` and `teardown()` run in separate isolated environments, outside the VU iterations.
2. Never put login/auth in `default function` if you only need a single session token; put it in `setup()` to save unnecessary load on your authentication service.
3. Data returned from `setup()` is passed read-only to `default(data)` and `teardown(data)`.

---

## 🌐 Topic 6: Real-World REST API Scripting: Authentication & Dynamic Token Chaining
**Timestamp:** [51:00 - 75:30]

### Extracted Code: `script2.js`
```javascript
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
            'Cookie': `token=${token}`,
        },
    };

    const createRes = http.post(bookingUrl, bookingPayload, bookingHeaders);

    check(createRes, {
        'booking status is 200': (r) => r.status === 200,
    });

    sleep(1);
}
```

### Core Takeaways
1. Always `JSON.stringify()` JavaScript objects when sending HTTP request payloads.
2. `res.json()` parses the JSON response body into a native JS object, enabling dynamic value extraction like `res.json().token`.
3. Pass cookies and authorization headers in the `params.headers` object.

---

## ✅ Topic 7: Assertions & Checks: Validating Response Codes, Latency & JSON Body
**Timestamp:** [76:00 - 89:30]

### Extracted Code: `checks-demo.js`
```javascript
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
```

### Core Takeaways
1. `check(res, { name: (r) => condition })` records pass/fail metrics without terminating the virtual user.
2. `r.timings.duration` provides the response latency of that specific individual request.
3. Checks provide rich diagnostic visibility in the terminal summary without artificially failing the load generation process.

---

## 🔐 Topic 8: High-Performance Architecture — Moving Auth from VU Loop to `setup()`
**Timestamp:** [90:00 - 99:30]

### Extracted Code: `script3.js`
```javascript
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
            "Cookie": `token=${data.token}`,
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
```

### Core Takeaways
1. `setup()` is ideal for resource-heavy preparatory work (authenticating, fetching mock data catalogs, generating UUIDs).
2. Each VU receives the immutable data payload returned by `setup()` as the first parameter of `default(data)`.
3. Prevents false bottlenecks in auxiliary services like authentication and rate-limiters.

---

## 📈 Topic 9: Traffic Simulation with Stages (Load, Stress & Spike Testing)
**Timestamp:** [100:00 - 111:30]

### Extracted Code: `script5.js`
```javascript
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
```

### Core Takeaways
1. `stages` transitions VU counts smoothly between `target` values over specified `duration` windows.
2. Ramp-up lets caches warm up and database connection pools expand organically.
3. Ramp-down is critical to ensure that system memory, thread counts, and CPU return to baseline levels after traffic subsides.

---

## 🎯 Topic 10: Thresholds: Automated Quality Gates & CI/CD Pass/Fail
**Timestamp:** [112:00 - 119:27]

### Extracted Code: `script6.js`
```javascript
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
```

### Core Takeaways
1. Thresholds act as programmatic Service Level Objectives (SLOs) enforceable in continuous deployment pipelines.
2. Syntax like `'p(95)<1000'` and `'rate<0.01'` guarantees both latency bounds and maximum acceptable error rates.
3. Threshold failures cause `k6 run` to return an exit status code of 99, seamlessly halting unstable deployments.
