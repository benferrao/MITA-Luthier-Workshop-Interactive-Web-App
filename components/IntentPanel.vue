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
  </div>
</template>

<script setup>
defineProps({ item: { type: Object, required: true }, intents: { type: Array, required: true } })
defineEmits(['select'])
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
</style>
