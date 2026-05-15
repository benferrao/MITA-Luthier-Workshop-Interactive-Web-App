<template>
  <div class="tool-selector">
    <div class="section-header">
      <h2>Explore the Workbench</h2>
      <p>Tap any tool or violin part to identify it</p>
    </div>
    <div class="tool-grid">
      <div v-for="item in items" :key="item.id" class="tool-card" @click="$emit('select', item.id)">
        <div class="card-image">
          <img :src="item.image" :alt="item.name" />
          <div class="card-overlay">
            <span>Tap to explore</span>
          </div>
        </div>
        <div class="card-body">
          <span class="card-type">{{ item.type.replace('_', ' ') }}</span>
          <h3 class="card-title">{{ item.name }}</h3>
          <p class="card-short">{{ item.short }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ items: { type: Array, required: true } })
defineEmits(['select'])
</script>

<style scoped>
.tool-selector { padding: 24px 20px; }

.section-header {
  text-align: center;
  margin-bottom: 28px;
}

.section-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: #2c1810;
  margin-bottom: 6px;
}

.section-header p {
  color: #888;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.tool-card {
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid #ede5d8;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139,69,19,0.15);
  border-color: #8B4513;
}

.card-image {
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tool-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(44, 24, 16, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.tool-card:hover .card-overlay {
  opacity: 1;
}

.card-overlay span {
  color: white;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
}

.card-body {
  padding: 14px;
}

.card-type {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #8B4513;
  font-weight: 600;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: #2c1810;
  margin: 4px 0 6px;
}

.card-short {
  font-size: 12px;
  color: #888;
  line-height: 1.5;
}
</style>
