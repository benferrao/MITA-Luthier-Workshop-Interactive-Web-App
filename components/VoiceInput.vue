<template>
  <div class="voice-input">
    <button class="mic-btn" :class="{ listening }" @click="toggleListening">
      {{ listening ? 'Listening...' : 'Speak' }}
    </button>
    <p v-if="transcript" class="transcript">"{{ transcript }}"</p>
    <p v-if="!supported" class="unsupported">Voice not supported. Use buttons.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const emit = defineEmits(['result'])
const listening = ref(false)
const transcript = ref('')
const supported = ref(true)
let recognition = null

onMounted(() => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) { supported.value = false; return }
  recognition = new SR()
  recognition.lang = 'en-US'
  recognition.continuous = false
  recognition.onresult = (e) => { transcript.value = e.results[0][0].transcript; emit('result', transcript.value); listening.value = false }
  recognition.onerror = () => { listening.value = false }
  recognition.onend = () => { listening.value = false }
})

function toggleListening() {
  if (!recognition) return
  if (listening.value) { recognition.stop() } else { transcript.value = ''; recognition.start(); listening.value = true }
}
</script>

<style scoped>
.voice-input { text-align: center; margin: 12px 0; }
.mic-btn { cursor: pointer; padding: 10px 20px; border-radius: 24px; border: 2px solid #ddd; background: white; font-size: 14px; transition: all 0.2s; }
.mic-btn.listening { border-color: #e53935; background: #ffebee; }
.transcript { margin-top: 8px; font-style: italic; color: #555; }
.unsupported { color: #999; font-size: 12px; }
</style>
