import { jsPDF } from 'jspdf';
import { METRICS_GLOSSARY, EXECUTORS_DATA, TOP_10_MISTAKES, INTERVIEW_QUESTIONS, NEXT_STEPS_PATH, CHAPTER_MAP_DATA } from '../data/cheatSheetData';

export function generateFullGuidePdf() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin + 10;
      // Add subtle running header on subsequent pages
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(140, 140, 140);
      doc.text('Grafana k6 Performance Engineering Masterclass — Study Guide', margin, margin - 15);
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, margin - 10, pageWidth - margin, margin - 10);
      doc.setTextColor(30, 41, 59);
    }
  };

  // Header Banner
  doc.setFillColor(234, 88, 12); // Orange primary
  doc.rect(margin, y, contentWidth, 54, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('Grafana k6 Performance Engineering Masterclass', margin + 14, y + 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Batch 15 • Road to SDET (Shouvik Datta) | Complete Architecture, Glossary & Interview Guide', margin + 14, y + 42);

  y += 70;

  // Overview / Attribution Note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const noteLines = doc.splitTextToSize(
    '100% Free & Open Source Reference Guide. Notes compiled from the Advanced Automation & Performance Engineering Masterclass by Road to SDET. All course content belongs to its original author.',
    contentWidth
  );
  doc.text(noteLines, margin, y);
  y += noteLines.length * 11 + 14;

  // SECTION 1: BUILT-IN METRICS GLOSSARY
  checkPageBreak(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text('1. k6 Built-in Metrics Glossary & Health Targets', margin, y);
  y += 18;

  doc.setFontSize(8.5);
  METRICS_GLOSSARY.forEach((m) => {
    checkPageBreak(38);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`• ${m.metric} (${m.type})`, margin + 6, y);
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const meaning = doc.splitTextToSize(`Meaning: ${m.meaning}`, contentWidth - 12);
    doc.text(meaning, margin + 12, y);
    y += meaning.length * 10;

    doc.setTextColor(13, 148, 136); // Teal for healthy value
    const healthy = doc.splitTextToSize(`Healthy Target: ${m.healthyValue}`, contentWidth - 12);
    doc.text(healthy, margin + 12, y);
    y += healthy.length * 10 + 6;
  });

  // SECTION 2: EXECUTORS & SCENARIOS
  checkPageBreak(50);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text('2. Executors & Scenarios Explained', margin, y);
  y += 18;

  EXECUTORS_DATA.forEach((ex) => {
    checkPageBreak(36);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`• ${ex.name} [${ex.type}]`, margin + 6, y);
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const desc = doc.splitTextToSize(`Summary: ${ex.summary}`, contentWidth - 12);
    doc.text(desc, margin + 12, y);
    y += desc.length * 10;

    doc.setTextColor(2, 132, 199);
    const useCase = doc.splitTextToSize(`When to use: ${ex.whenToUse}`, contentWidth - 12);
    doc.text(useCase, margin + 12, y);
    y += useCase.length * 10 + 6;
  });

  // SECTION 3: TOP 10 BEGINNER MISTAKES
  checkPageBreak(50);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text('3. Top 10 Common Beginner Mistakes & Solutions', margin, y);
  y += 18;

  TOP_10_MISTAKES.forEach((mst) => {
    checkPageBreak(44);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(185, 28, 28);
    doc.text(mst.title, margin + 6, y);
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const prob = doc.splitTextToSize(`Problem: ${mst.problem}`, contentWidth - 12);
    doc.text(prob, margin + 12, y);
    y += prob.length * 10;

    doc.setTextColor(21, 128, 61); // Green fix
    const fix = doc.splitTextToSize(`Fix: ${mst.fix}`, contentWidth - 12);
    doc.text(fix, margin + 12, y);
    y += fix.length * 10 + 6;
  });

  // SECTION 4: 15 SDET INTERVIEW QUESTIONS
  checkPageBreak(50);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text('4. 15 High-Yield SQA / SDET Interview Questions', margin, y);
  y += 18;

  INTERVIEW_QUESTIONS.forEach((q) => {
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    const qLines = doc.splitTextToSize(`Q${q.id}: ${q.question}`, contentWidth - 6);
    doc.text(qLines, margin + 6, y);
    y += qLines.length * 10.5 + 2;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const aLines = doc.splitTextToSize(`Answer: ${q.answer}`, contentWidth - 12);
    doc.text(aLines, margin + 12, y);
    y += aLines.length * 10 + 6;
  });

  // SECTION 5: NEXT STEPS LEARNING PATH
  checkPageBreak(50);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text('5. Next Steps QA Learning Roadmap', margin, y);
  y += 18;

  NEXT_STEPS_PATH.forEach((st) => {
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`Step ${st.step}: ${st.title} (${st.duration})`, margin + 6, y);
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const desc = doc.splitTextToSize(st.description, contentWidth - 12);
    doc.text(desc, margin + 12, y);
    y += desc.length * 10 + 6;
  });

  // SECTION 6: REAL-TIME MONITORING (GRAFANA + INFLUXDB & PROMETHEUS)
  checkPageBreak(50);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text('6. Real-Time Telemetry: Grafana + InfluxDB 1.8', margin, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const influxText = doc.splitTextToSize(
    'Architecture: k6 executes Virtual Users and streams live metric points over HTTP. InfluxDB 1.8 stores measurements in the "k6" database on port 8086. Grafana visualizes real-time throughput and p95 latency on port 3000.\n' +
    'Run Command: k6 run --out influxdb=http://localhost:8086/k6 script.js\n' +
    'Grafana Setup: Data Source URL http://influxdb:8086, database k6. Import Dashboard ID 2587 from the Grafana community library.\n' +
    'Modern Alternative: Prometheus remote-write (k6 run -o experimental-prometheus-rw=http://localhost:9090/api/v1/write script.js).',
    contentWidth
  );
  doc.text(influxText, margin, y);
  y += influxText.length * 11 + 10;

  // SECTION 7: ENVIRONMENT VARIABLES
  checkPageBreak(50);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text('7. Passing Values with Environment Variables', margin, y);
  y += 18;

  const envText = doc.splitTextToSize(
    'CLI Syntax: k6 run -e BASE_URL=https://orders-api.company.internal script.js\n' +
    'Code: const BASE_URL = __ENV.BASE_URL || "https://orders-api.company.internal";\n' +
    'Windows PowerShell: $env:BASE_URL="..."; k6 run script.js  OR  k6 run -e BASE_URL=...\n' +
    'Windows CMD: set BASE_URL=... && k6 run script.js\n' +
    'macOS / Linux: BASE_URL=https://orders-api.company.internal k6 run script.js',
    contentWidth
  );
  doc.text(envText, margin, y);
  y += envText.length * 11 + 10;

  // SECTION 8: CLASS BOOK CHAPTER MAP
  checkPageBreak(60);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text('8. Your Class Book Chapter Map', margin, y);
  y += 18;

  CHAPTER_MAP_DATA.forEach((row) => {
    checkPageBreak(36);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`• ${row.selfStudyChapter}`, margin + 6, y);
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const concepts = doc.splitTextToSize(`Concepts: ${row.coreConcepts}`, contentWidth - 12);
    doc.text(concepts, margin + 12, y);
    y += concepts.length * 10;

    doc.setTextColor(234, 88, 12);
    doc.text(`Location: ${row.whereItLives}`, margin + 12, y);
    y += 14;
  });

  // Save the PDF
  doc.save('k6_performance_testing_masterclass_guide.pdf');
}
