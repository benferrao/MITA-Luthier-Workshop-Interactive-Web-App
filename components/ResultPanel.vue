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
      <button class="btn-back" @click="$emit('reset')">← Back to all tools</button>
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
.btn-back, 
.btn-back { background: #2E75B6; color: white; }
.btn-back:hover { background: #235d92; }


</style>