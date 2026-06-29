#!/usr/bin/env node
// Validates that every lesson title in localData has a matching entry in
// exercisesData and recipeImages. Run with: node scripts/validate-content.js

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function readFile(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

// Extract lesson titles from localData.ts
// Handles both single-quoted and escaped-single-quoted strings
function extractLessonTitles() {
  const content = readFile('constants/localData.ts');
  const titles = [];
  // Match: title: 'value' or title: "value"
  // For single-quoted: may contain \" but not unescaped '
  const dqRegex = /title:\s*"([^"]+)"/g;
  const sqRegex = /title:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  const pathTitlesKeywords = ['Cuisine', 'Barbecue', 'Pâtisserie', 'Vegan'];
  const skip = (t) => pathTitlesKeywords.some(k => t.includes(k));

  while ((m = dqRegex.exec(content)) !== null) {
    if (!skip(m[1])) titles.push(m[1]);
  }
  while ((m = sqRegex.exec(content)) !== null) {
    // Unescape \' → '
    const t = m[1].replace(/\\'/g, "'");
    if (!skip(t)) titles.push(t);
  }
  return titles;
}

// Extract top-level keys from exercisesData.ts (lines like: '  Key': [)
function extractExerciseKeys() {
  const content = readFile('constants/exercisesData.ts');
  const keys = [];
  // Match lines starting with exactly 2 spaces, then 'Key': [ or "Key": [
  const dqRegex = /^  "([^"]+)":\s*\[/gm;
  const sqRegex = /^  '([^']+)':\s*\[/gm;
  let m;
  while ((m = dqRegex.exec(content)) !== null) keys.push(m[1]);
  while ((m = sqRegex.exec(content)) !== null) keys.push(m[1]);
  return keys;
}

// Extract keys from recipeImages.ts (lines like: '  Key':)
function extractImageKeys() {
  const content = readFile('constants/recipeImages.ts');
  const keys = [];
  const dqRegex = /^  "([^"]+)":/gm;
  const sqRegex = /^  '([^']+)':/gm;
  let m;
  while ((m = dqRegex.exec(content)) !== null) keys.push(m[1]);
  while ((m = sqRegex.exec(content)) !== null) keys.push(m[1]);
  return keys;
}

const lessonTitles = extractLessonTitles();
const exerciseKeys = extractExerciseKeys();
const imageKeys = extractImageKeys();

const exerciseSet = new Set(exerciseKeys);
const imageSet = new Set(imageKeys);
const lessonSet = new Set(lessonTitles);

let errors = 0;
const missingExercises = [];
const missingImages = [];

console.log(`\n📋 Checking ${lessonTitles.length} lesson titles...\n`);

for (const title of lessonTitles) {
  const hasExercise = exerciseSet.has(title);
  const hasImage = imageSet.has(title);
  if (!hasExercise || !hasImage) {
    const missing = [];
    if (!hasExercise) { missing.push('exercisesData'); missingExercises.push(title); }
    if (!hasImage) { missing.push('recipeImages'); missingImages.push(title); }
    console.log(`❌ "${title}" → missing in: ${missing.join(', ')}`);
    errors++;
  }
}

console.log('\n📋 Checking for orphan exercise keys...\n');
let orphans = 0;
for (const key of exerciseKeys) {
  if (!lessonSet.has(key)) {
    console.log(`⚠️  Orphan exercise key: "${key}" (no matching lesson)`);
    orphans++;
  }
}

console.log('\n📊 Summary');
console.log(`   Lessons checked: ${lessonTitles.length}`);
console.log(`   Exercise keys:   ${exerciseKeys.length}`);
console.log(`   Image keys:      ${imageKeys.length}`);
console.log(`   Missing exercises: ${missingExercises.length}`);
console.log(`   Missing images:    ${missingImages.length}`);
console.log(`   Orphan keys:       ${orphans}`);

if (errors === 0 && orphans === 0) {
  console.log('\n✅ All titles consistent across localData, exercisesData, and recipeImages.\n');
  process.exit(0);
} else {
  console.log(`\n🚨 ${errors} mismatch(es), ${orphans} orphan(s) found.\n`);
  process.exit(1);
}
