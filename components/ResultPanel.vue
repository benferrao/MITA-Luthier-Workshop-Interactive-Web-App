<template>
  <div class="result-panel">
<div class="result-card">
<img :src="item.image" :alt="item.name" />
<div class="result-content">
<h2>{{ item.name }}</h2>
<span class="intent-badge">{{ intent.label }}</span>
<p>{{ displayText }}</p>
</div>
</div>
<div class="actions">
<button class="btn-back" @click="$emit('reset')"><span class="arrow">←</span> Back to all tools</button>
</div>
</div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
item: { type: Object, required: true },
intent: { type: Object, required: true }
})
defineEmits(['reset'])
// Render the content specific to the selected intent. Falls back to the
// item's general description only if byIntent data is somehow missing,
// so the panel never shows a blank result.
const displayText = computed(() => {
const byIntent = props.item.byIntent
if (byIntent && byIntent[props.intent.id]) {
return byIntent[props.intent.id]
  }
return props.item.long
})
</script>
<style scoped>
.result-panel { padding: 20px; }
.result-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.08); margin-bottom: 20px; }
.result-card img { width: 100%; height: 200px; object-fit: cover; }
.result-content { padding: 20px; }
.result-content h2 { margin: 0 0 8px; }
.intent-badge { display: inline-block; background: #E3F2FD; color: #1565C0; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin-bottom: 12px; }
.result-content p { line-height: 1.6; color: #333; }
.actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

.btn-back {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 24px 11px 20px;
  background: #8B4513;
  color: white;
  border: none;
  border-radius: 24px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(139,69,19,0.25);
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.btn-back .arrow { transition: transform 0.2s ease; }
.btn-back:hover {
  background: #6d3410;
  box-shadow: 0 6px 18px rgba(139,69,19,0.32);
  transform: translateY(-1px);
}
.btn-back:hover .arrow { transform: translateX(-3px); }
.btn-back:active { transform: translateY(0); }
</style>