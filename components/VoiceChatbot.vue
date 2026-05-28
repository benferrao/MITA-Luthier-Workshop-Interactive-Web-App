<template>
  <div class="chatbot-wrapper">
    <!-- Floating button -->
    <button class="chatbot-fab" :class="{ active: isOpen }" @click="toggleOpen">
      <span v-if="!isOpen">🎙️</span>
      <span v-else>✕</span>
    </button>

    <!-- Chat panel -->
    <div v-if="isOpen" class="chatbot-panel">
      <div class="chatbot-header">
        <h3>Ask the Luthier</h3>
        <p>Ask me anything about violin making</p>
      </div>

      <!-- Messages -->
      <div class="chatbot-messages" ref="messagesEl">
        <div v-if="messages.length === 0" class="chatbot-empty">
          <p>👋 Ask me something!</p>
          <p class="examples">Try: "What is a bridge?" or "How is varnish made?"</p>
        </div>
        <div v-for="(msg, i) in messages" :key="i"
          class="message" :class="msg.role">
          <div class="bubble">{{ msg.text }}</div>
        </div>
        <div v-if="thinking" class="message system">
          <div class="bubble thinking">
            <span>.</span><span>.</span><span>.</span>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="chatbot-input">
        <!-- Text input -->
        <div class="text-input-row">
          <input
            v-model="textInput"
            type="text"
            placeholder="Type a question..."
            class="text-input"
            @keydown.enter="handleTextSubmit"
          />
          <button class="send-btn" @click="handleTextSubmit">→</button>
        </div>

        <!-- Voice button -->
        <button v-if="supported" class="mic-btn" :class="{ listening }" @click="startListening">
          {{ listening ? '🔴 Listening...' : '🎙️ Or speak' }}
        </button>
        <p v-if="!supported" class="unsupported">Voice not supported — type your question above</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import partsData from '~/data/violinParts.json'

const isOpen = ref(false)
const listening = ref(false)
const thinking = ref(false)
const supported = ref(true)
const messages = ref([])
const messagesEl = ref(null)
const textInput = ref('')
let recognition = null
let synth = null

onMounted(() => {
  synth = window.speechSynthesis
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) { supported.value = false; return }
  recognition = new SR()
  recognition.lang = 'en-US'
  recognition.continuous = false
  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript
    listening.value = false
    handleUserMessage(text)
  }
  recognition.onerror = () => { listening.value = false }
  recognition.onend = () => { listening.value = false }
})

function toggleOpen() {
  isOpen.value = !isOpen.value
}

function startListening() {
  if (!recognition) return
  recognition.start()
  listening.value = true
}

function handleTextSubmit() {
  const text = textInput.value.trim()
  if (!text) return
  textInput.value = ''
  handleUserMessage(text)
}

function handleUserMessage(text) {
  messages.value.push({ role: 'user', text })
  scrollToBottom()
  thinking.value = true
  setTimeout(() => {
    thinking.value = false
    const answer = findAnswer(text)
    messages.value.push({ role: 'system', text: answer })
    speak(answer)
    scrollToBottom()
  }, 800)
}

function findAnswer(question) {
  const lower = question.toLowerCase()
  const items = partsData.items

  const matchedItem = items.find(item =>
    lower.includes(item.name.toLowerCase()) ||
    lower.includes(item.id.toLowerCase()) ||
    item.name.toLowerCase().split(' ').some(word =>
      word.length > 3 && lower.includes(word)
    )
  )

  if (matchedItem) {
    if (lower.includes('sound') || lower.includes('tone') || lower.includes('acoustic')) {
      return `${matchedItem.name}: ${matchedItem.long} This affects the sound because every part of the violin contributes to how vibrations travel through the instrument.`
    }
    if (lower.includes('history') || lower.includes('origin') || lower.includes('old') || lower.includes('cremona')) {
      return `${matchedItem.name} has deep roots in Cremona's luthier tradition. ${matchedItem.long}`
    }
    return `${matchedItem.name}: ${matchedItem.long}`
  }

  if (lower.includes('violin') && (lower.includes('make') || lower.includes('build') || lower.includes('long'))) {
    return 'Making a violin takes between 200 and 250 hours of careful work. The luthier selects wood, carves the plates, bends the ribs, fits all the parts together, and applies multiple layers of varnish — each cured before the next is added.'
  }

  if (lower.includes('cremona')) {
    return 'Cremona is a city in northern Italy famous for producing the world\'s greatest violins. Masters like Stradivari, Guarneri, and Amati worked here in the 17th and 18th centuries. Today the tradition continues with modern luthiers like Jönke, whose workshop we visited.'
  }

  if (lower.includes('varnish') || lower.includes('colour') || lower.includes('color')) {
    return 'The Cremonese varnish is one of the great mysteries of violin making. Jönke uses just four pigments to mix every shade, including the deep red-amber of classic instruments. The exact formula is a closely guarded secret — as he put it, Amati would kill me.'
  }

  if (lower.includes('wood') || lower.includes('maple') || lower.includes('spruce')) {
    return 'Violin makers use spruce for the top plate and maple for the back, ribs, and neck. The wood is sourced mainly from Romania and the Balkans. Choosing the right piece — by eye, tap tone, and feel — is considered half the job of making a great violin.'
  }

  if (lower.includes('stradivari') || lower.includes('stradivarius')) {
    return 'Antonio Stradivari was the greatest violin maker in history, working in Cremona in the 17th and 18th centuries. His instruments are still considered the finest ever made and are worth millions today. Many of his original molds are preserved at the Museo del Violino in Cremona.'
  }

  return "I am not sure about that one. Try asking about a specific part like the bridge, scroll, f-holes, or a tool like the scraper or finger plane."
}

function speak(text) {
  if (!synth) return
  synth.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.9
  utterance.pitch = 1
  synth.speak(utterance)
}

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
}

.chatbot-fab {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: #8B4513;
  color: white; border: none;
  font-size: 22px; cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.chatbot-fab:hover { background: #6d3410; transform: scale(1.05); }
.chatbot-fab.active { background: #2c1810; }

.chatbot-panel {
  position: absolute;
  bottom: 70px; right: 0;
  width: 320px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  overflow: hidden;
  border: 1px solid #ede5d8;
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.chatbot-header {
  background: linear-gradient(135deg, #2c1810, #8B4513);
  padding: 16px; color: white;
}
.chatbot-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 16px; margin-bottom: 2px;
}
.chatbot-header p { font-size: 12px; opacity: 0.8; }

.chatbot-messages {
  flex: 1; overflow-y: auto;
  padding: 16px;
  display: flex; flex-direction: column;
  gap: 10px; min-height: 180px;
}

.chatbot-empty {
  text-align: center; color: #999;
  font-size: 13px; margin: auto;
}
.chatbot-empty .examples {
  margin-top: 8px; font-style: italic; font-size: 12px;
}

.message { display: flex; }
.message.user { justify-content: flex-end; }
.message.system { justify-content: flex-start; }

.bubble {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 13px; line-height: 1.5;
}
.message.user .bubble {
  background: #8B4513; color: white;
  border-bottom-right-radius: 4px;
}
.message.system .bubble {
  background: #f5f0eb; color: #2c1810;
  border-bottom-left-radius: 4px;
}

.thinking span {
  animation: blink 1.2s infinite; font-size: 18px;
}
.thinking span:nth-child(2) { animation-delay: 0.2s; }
.thinking span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

.chatbot-input {
  padding: 12px 16px;
  border-top: 1px solid #f0e8e0;
  display: flex; flex-direction: column; gap: 8px;
}

.text-input-row {
  display: flex; gap: 8px;
}

.text-input {
  flex: 1; padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 20px;
  font-size: 13px; outline: none;
  transition: border-color 0.2s;
}
.text-input:focus { border-color: #8B4513; }

.send-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: #8B4513; color: white;
  border: none; font-size: 16px;
  cursor: pointer; transition: background 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.send-btn:hover { background: #6d3410; }

.mic-btn {
  cursor: pointer; padding: 8px 16px;
  border-radius: 24px;
  border: 2px solid #8B4513;
  background: white; color: #8B4513;
  font-size: 13px; font-weight: 600;
  transition: all 0.2s; width: 100%;
}
.mic-btn:hover { background: #fdf5ee; }
.mic-btn.listening { background: #ffebee; border-color: #e53935; color: #e53935; }
.unsupported { font-size: 11px; color: #999; text-align: center; }

@media (max-width: 768px) {
  .chatbot-panel { width: 280px; }
  .chatbot-wrapper { bottom: 16px; right: 16px; }
}
</style>
