<template>
  <div class="result-panel">
    <div class="result-card">
      <img :src="item.image" :alt="item.name" />
      <div class="result-content">
        <h2>{{ item.name }}</h2>
        <span class="intent-badge">{{ intent.label }}</span>
        <p>{{ item.long }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="btn-secondary" @click="$emit('repair')">That is not what I meant</button>
      <button class="btn-primary" @click="$emit('reset')">Explore another tool</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ item: { type: Object, required: true }, intent: { type: Object, required: true } })
defineEmits(['repair', 'reset'])
</script>

<style scoped>
.result-panel { padding: 20px; }
.result-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.08); margin-bottom: 20px; }
.result-card img { width: 100%; height: 200px; object-fit: cover; }
.result-content { padding: 20px; }
.result-content h2 { margin: 0 0 8px; }
.intent-badge { display: inline-block; background: #E3F2FD; color: #1565C0; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin-bottom: 12px; }
.result-content p { line-height: 1.6; color: #333; }
.actions { display: flex; gap: 12px; justify-content: center; }
.btn-primary, .btn-secondary { cursor: pointer; padding: 10px 20px; border-radius: 8px; font-size: 14px; border: none; }
.btn-primary { background: #2E75B6; color: white; }
.btn-secondary { background: #f5f5f5; color: #666; border: 1px solid #ddd; }
</style>
