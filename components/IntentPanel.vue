<template>
  <div class="intent-panel">
<div class="selected-item">
<img :src="item.image" :alt="item.name" />
<h3>{{ item.name }}</h3>
<p>{{ item.short }}</p>
</div>
<div class="system-message">
<p>What would you like to know about the <strong>{{ item.name }}</strong>?</p>
</div>
<div class="intent-buttons">
<button v-for="intent in intents" :key="intent.id" class="intent-btn" @click="$emit('select', intent.id)">
        {{ intent.label }}
</button>
</div>
<div class="actions">
<button class="btn-back" @click="$emit('reset')"><span class="arrow">←</span> Back to all tools</button>
</div>
</div>
</template>
<script setup>
defineProps({ item: { type: Object, required: true }, intents: { type: Array, required: true } })
defineEmits(['select', 'reset'])
</script>
<style scoped>
.intent-panel { text-align: center; padding: 20px; }
.selected-item { margin-bottom: 20px; }
.selected-item img { width: 200px; height: 140px; object-fit: cover; border-radius: 12px; border: 3px solid #2E75B6; }
.selected-item h3 { margin: 8px 0 4px; }
.selected-item p { color: #666; font-size: 14px; }
.system-message { background: #E8F5E9; border-radius: 12px; padding: 12px 20px; margin-bottom: 20px; }
.intent-buttons { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
.intent-btn { cursor: pointer; border: 2px solid #ddd; border-radius: 10px; padding: 10px 18px; background: white; font-size: 14px; transition: all 0.2s; }
.intent-btn:hover { border-color: #2E75B6; background: #f0f7ff; }

.actions { margin-top: 20px; display: flex; justify-content: center; }

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