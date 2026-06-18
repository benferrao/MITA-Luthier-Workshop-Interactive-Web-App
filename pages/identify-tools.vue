<template>
  <div class="app-container">

    <!-- Chatbot popup -->
    <Transition name="popup">
      <div v-if="showPopup" class="popup-overlay" @click.self="showPopup = false">
        <div class="popup-card">
          <div class="popup-icon">🎙️</div>
          <h3>Voice Assistant Available</h3>
          <p>You can speak to the chatbot at any time — tap the microphone button in the bottom-right corner.</p>
          <button class="popup-btn" @click="showPopup = false">Got it</button>
        </div>
      </div>
    </Transition>

    <!-- Voice fallback modal -->
    <Transition name="popup">
      <div v-if="showVoiceFallback" class="popup-overlay" @click.self="showVoiceFallback = false">
        <div class="popup-card">
          <div class="popup-icon">🎙️</div>
          <h3>Describe the tool by voice</h3>
          <p>Tap the button below and say the name of the tool you're looking for.</p>
          <VoiceInput @result="handleVoiceFallback" />
          <button class="popup-btn ghost" @click="showVoiceFallback = false">Cancel</button>
        </div>
      </div>
    </Transition>

    <!-- Persistent nav -->
    <nav class="top-nav">
      <NuxtLink to="/" class="nav-home-btn">🎻 Home</NuxtLink>
      <span class="nav-title">Identify Tools</span>
      <NuxtLink to="/tour" class="nav-tour-btn">Guided Tour →</NuxtLink>
    </nav>

    <!-- Hero -->
    <header class="hero">
      <div class="hero-overlay">
        <h1>The Violin Workshop</h1>
        <p>Tap a tool on the workbench to identify it</p>
      </div>
    </header>

    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

    <!-- IDLE: tool grid -->
    <div v-if="currentState === 'IDLE'">
      <ToolSelector :items="items" @select="sense" />
    </div>

    <!-- SENSE / INTERPRET: loading -->
    <div v-if="currentState === 'SENSE' || currentState === 'INTERPRET'" class="loading-state">
      <div class="spinner" />
    </div>

    <!-- GROUND: disambiguation -->
    <DisambiguationPanel v-if="currentState === 'GROUND' && isAmbiguous && !selectedItem"
      :candidates="candidates" @select="selectCandidate" />

    <!-- GROUND: intent selection -->
    <div v-if="currentState === 'GROUND' && selectedItem" class="intent-touch">
      <div class="ground-header">
        <p class="ground-label">Here is what I found — choose what you'd like to know:</p>
      </div>
      <IntentPanel :item="selectedItem" :intents="intents" @select="selectIntent" />
    </div>

    <!-- ACT: result -->
    <ResultPanel v-if="currentState === 'ACT'"
      :item="selectedItem" :intent="selectedIntent"
      @repair="openRepairOptions" @reset="reset" />

    <!-- Visual repair options -->
    <Transition name="popup">
      <div v-if="showRepairOptions" class="popup-overlay" @click.self="showRepairOptions = false">
        <div class="popup-card">
          <h3>Not what you were looking for?</h3>
          <p>Choose how you'd like to continue:</p>
          <div class="repair-options">
            <button class="repair-btn" @click="reset">🔍 Browse all tools</button>
            <button class="repair-btn" @click="openVoiceFallback">🎙️ Describe it by voice</button>
            <NuxtLink to="/tour" class="repair-btn">🎻 Start the guided tour</NuxtLink>
            <NuxtLink to="/" class="repair-btn ghost">← Return to home</NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- History — clickable -->
    <aside v-if="history.length" class="history">
      <h4>Recent explorations</h4>
      <p class="history-hint">Tap any item to explore it again.</p>
      <button v-for="(h, i) in history" :key="i" class="history-item" @click="sense(h.itemId)">
        <span class="history-main"><strong>{{ h.item }}</strong> — {{ h.intent }}</span>
        <small>{{ h.time }}</small>
      </button>
    </aside>

    <footer class="app-footer">
      <p>THE VIOLIN WORKSHOP ~ CREMONSTERS</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGroundingLoop } from '~/composables/useGroundingLoop'

const {
  currentState, candidates,
  selectedItem, selectedIntent,
  errorMessage, history,
  items, intents,
  isAmbiguous,
  sense, selectCandidate,
  selectIntent, repair, reset
} = useGroundingLoop()

const showPopup = ref(false)
const showVoiceFallback = ref(false)
const showRepairOptions = ref(false)

onMounted(() => {
  // Pop the voice assistant hint as soon as you arrive on this page,
  // every time — previously this was gated behind a sessionStorage flag,
  // which made it look like it only ever appeared the first time you
  // clicked into the page from Home.
  setTimeout(() => { showPopup.value = true }, 500)
})

function openRepairOptions() { showRepairOptions.value = true }

function openVoiceFallback() {
  showRepairOptions.value = false
  showVoiceFallback.value = true
}

function handleVoiceFallback(text) {
  const lower = text.toLowerCase()
  const match = items.value?.find(item =>
    lower.includes(item.name.toLowerCase()) || lower.includes(item.id)
  )
  showVoiceFallback.value = false
  if (match) sense(match.id)
  else repair()
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background: #f5f0eb; color: #2c1810; }

.top-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 10px 20px; background: #2c1810; box-shadow: 0 2px 8px rgba(0,0,0,0.25); }
.nav-home-btn { color: #f5d090; text-decoration: none; font-size: 14px; font-weight: 600; padding: 7px 16px; border-radius: 20px; border: 1px solid rgba(245,208,144,.35); transition: all .2s; }
.nav-home-btn:hover { background: rgba(245,208,144,.15); border-color: #f5d090; }
.nav-title { color: rgba(255,255,255,.6); font-size: 13px; letter-spacing: .06em; }
.nav-tour-btn { color: rgba(255,255,255,.7); text-decoration: none; font-size: 13px; padding: 7px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,.2); transition: all .2s; }
.nav-tour-btn:hover { color: white; border-color: white; }

.hero { width: 100%; height: 130px; background: linear-gradient(135deg, #2c1810 0%, #8B4513 50%, #c8860a 100%); display: flex; align-items: center; justify-content: center; }
.hero-overlay { text-align: center; color: white; padding: 14px 20px; }
.hero-overlay h1 { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; margin-bottom: 4px; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.hero-overlay p { font-size: 12px; font-weight: 300; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.9; }

.app-container { max-width: 860px; margin: 0 auto; padding: 0 0 40px; }

.error-msg { text-align: center; color: #c0392b; background: #fdf0ed; padding: 10px 20px; border-radius: 8px; margin: 12px 20px; border-left: 4px solid #c0392b; }

.loading-state { text-align: center; padding: 60px 20px; }
.spinner { width: 44px; height: 44px; border: 3px solid #e8d5c0; border-top-color: #8B4513; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
.loading-label { color: #888; font-size: 14px; }
@keyframes spin { to { transform: rotate(360deg); } }

.ground-header { padding: 16px 20px 0; }
.ground-label { font-size: 14px; color: #2c1810; font-weight: 600; }

.popup-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(44,24,16,0.7); display: flex; align-items: center; justify-content: center; padding: 24px; }
.popup-card { background: white; border-radius: 24px; padding: 36px 32px; max-width: 380px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.popup-icon { font-size: 48px; margin-bottom: 14px; }
.popup-card h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: #2c1810; margin-bottom: 12px; }
.popup-card p { font-size: 14px; color: #666; line-height: 1.7; margin-bottom: 24px; }
.popup-btn { background: #8B4513; color: white; border: none; padding: 12px 32px; border-radius: 30px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-family: 'Inter', sans-serif; }
.popup-btn:hover { background: #6d3410; }
.popup-btn.ghost { background: transparent; color: #999; border: 1px solid #ddd; margin-top: 10px; display: block; width: 100%; }
.popup-btn.ghost:hover { background: #f5f0eb; }
.popup-enter-active, .popup-leave-active { transition: opacity 0.25s; }
.popup-enter-from, .popup-leave-to { opacity: 0; }

.repair-options { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
.repair-btn { display: block; width: 100%; padding: 12px 20px; background: #f5f0eb; color: #2c1810; border: 1px solid #ddd; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; transition: all .2s; text-align: left; font-family: 'Inter', sans-serif; }
.repair-btn:hover { background: #ede5d8; border-color: #8B4513; }
.repair-btn.ghost { color: #999; }

.history { margin: 40px 20px 0; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); border-top: 3px solid #8B4513; }
.history h4 { margin-bottom: 4px; color: #8B4513; font-family: 'Playfair Display', serif; font-size: 16px; }
.history-hint { font-size: 12px; color: #aaa; margin-bottom: 12px; }
.history-item { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 10px 12px; margin-bottom: 4px; background: none; border: none; border-bottom: 1px solid #f0e8e0; cursor: pointer; text-align: left; border-radius: 8px; transition: background .15s; font-family: 'Inter', sans-serif; font-size: 14px; color: #555; }
.history-item:hover { background: #f5f0eb; }
.history-main { display: flex; flex-direction: column; }
.history-item small { color: #bbb; font-size: 12px; white-space: nowrap; margin-left: 12px; }

.app-footer { text-align: center; margin-top: 48px; padding: 20px; color: #999; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; border-top: 1px solid #e0d5c8; font-weight: 500; }

@media (max-width: 768px) {
  .hero { height: 100px; }
  .hero-overlay h1 { font-size: 22px; }
}
</style>