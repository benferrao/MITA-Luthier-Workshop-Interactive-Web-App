<template>
  <div class="disambiguation">
    <div class="system-message">
      <p>I see multiple tools that look similar. Which one are you looking at?</p>
    </div>
    <div class="candidate-row">
      <button v-for="item in candidates" :key="item.id" class="candidate-btn" @click="$emit('select', item.id)">
        <img :src="item.image" :alt="item.name" />
        <span>{{ item.name }}</span>
        <small>{{ item.short }}</small>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({ candidates: { type: Array, required: true } })
defineEmits(['select'])
</script>

<style scoped>
.disambiguation { text-align: center; padding: 20px; }
.system-message { background: #FFF3E0; border-radius: 12px; padding: 12px 20px; margin-bottom: 20px; }
.candidate-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.candidate-btn { cursor: pointer; border: 2px solid #ddd; border-radius: 12px; padding: 12px; background: white; width: 200px; transition: all 0.2s; }
.candidate-btn:hover { border-color: #2E75B6; background: #f0f7ff; }
.candidate-btn img { width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px; }
.candidate-btn span { display: block; font-weight: 600; margin-bottom: 4px; }
.candidate-btn small { display: block; color: #666; font-size: 12px; }
</style>
