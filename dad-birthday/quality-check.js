/*
  FINAL CODE QUALITY MONITOR
  Project: Dad Birthday Website
  Author: Junior
  Purpose:
  - Validate structure
  - Validate resources
  - Validate images
  - Detect errors
  - Give honest 0–100 score
*/

let score = 100;
let issues = [];

/* ---------------- ERROR MONITORING ---------------- */

window.onerror = function (msg, src, line, col) {
    score -= 25;
    issues.push(`JavaScript error at line ${line}`);
};

/* ---------------- DOM STRUCTURE CHECK ---------------- */

document.addEventListener("DOMContentLoaded", () => {

    const requiredSelectors = [
        ".container",
        ".main-heading",
        ".intro",
        ".content-grid",
        ".message-box",
        ".strong-message",
        ".from",
        ".photos"
    ];

    requiredSelectors.forEach(selector => {
        if (!document.querySelector(selector)) {
            score -= 10;
            issues.push(`Missing element: ${selector}`);
        }
    });

    /* ---------------- IMAGE CHECK ---------------- */

    const images = document.querySelectorAll(".photos img");

    if (images.length !== 4) {
        score -= 20;
        issues.push("Exactly 4 images are required");
    }

    images.forEach((img, index) => {
        img.onerror = () => {
            score -= 10;
            issues.push(`Image ${index + 1} failed to load`);
        };
    });

    /* ---------------- CSS CHECK ---------------- */

    if (document.styleSheets.length === 0) {
        score -= 20;
        issues.push("CSS file not loaded");
    }
});

/* ---------------- FINAL RATING ---------------- */

window.addEventListener("load", () => {

    if (score < 0) score = 0;
    if (issues.length === 0) score = 100;

    console.log("════════ CODE QUALITY REPORT ════════");
    console.log(`⭐ FINAL SCORE: ${score}/100`);

    if (score === 100) {
        console.log("🏆 PERFECT – ALL CHECKS PASSED");
    } else if (score >= 85) {
        console.log("✅ VERY HIGH QUALITY");
    } else if (score >= 70) {
        console.log("⚠ GOOD – NEEDS IMPROVEMENT");
    } else {
        console.log("❌ POOR – FIX ISSUES");
    }

    if (issues.length > 0) {
        console.log("Issues found:");
        issues.forEach(issue => console.log("❌", issue));
    } else {
        console.log("✔ No issues detected");
        console.log("✔ Structure valid");
        console.log("✔ CSS loaded");
        console.log("✔ Images loaded");
        console.log("✔ No JavaScript errors");
    }

    console.log("═════════════════════════════════════");
});
