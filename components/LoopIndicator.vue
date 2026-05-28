<template>
  <div class="loop-indicator">
    <div v-for="stage in stages" :key="stage" class="stage"
      :class="{ active: stage === currentState, done: stageIndex(stage) < stageIndex(currentState) }">
      <div class="dot" />
      <span>{{ stage }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ currentState: { type: String, default: 'IDLE' } })
const stages = ['SENSE','INTERPRET','GROUND','ACT']
function stageIndex(s) { return stages.indexOf(s) }
</script>

<style scoped>
.loop-indicator { display: flex; justify-content: center; gap: 8px; padding: 16px 0; margin-bottom: 20px; }
.stage { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; background: #f0f0f0; color: #888; font-size: 13px; font-weight: 500; transition: all 0.3s; }
.stage.active { background: #2E75B6; color: white; }
.stage.done { background: #d4edda; color: #155724; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
</style>
