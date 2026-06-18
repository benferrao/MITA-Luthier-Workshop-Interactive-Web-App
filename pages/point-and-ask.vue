<template>
  <div class="app-container">

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

    <!-- Visual repair options -->
    <Transition name="popup">
      <div v-if="showRepairOptions" class="popup-overlay" @click.self="showRepairOptions = false">
        <div class="popup-card">
          <h3>Not what you were looking for?</h3>
          <p>Choose how you'd like to continue:</p>
          <div class="repair-options">
            <button class="repair-btn" @click="retakePhoto">📷 Take a new photo</button>
            <button class="repair-btn" @click="openVoiceFallback">🎙️ Describe it by voice</button>
            <NuxtLink to="/identify-tools" class="repair-btn">🔍 Browse tools manually</NuxtLink>
            <NuxtLink to="/tour" class="repair-btn">🎻 Start the guided tour</NuxtLink>
            <NuxtLink to="/" class="repair-btn ghost">← Return to home</NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Persistent nav -->
    <nav class="top-nav">
      <NuxtLink to="/" class="nav-home-btn">🎻 Home</NuxtLink>
      <span class="nav-title">Point &amp; Ask</span>
      <NuxtLink to="/tour" class="nav-tour-btn">Guided Tour →</NuxtLink>
    </nav>

    <!-- Hero -->
    <header class="hero">
      <div class="hero-overlay">
        <h1>Point &amp; Ask</h1>
        <p>Point your camera at a violin tool to identify it</p>
      </div>
    </header>

    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

    <!-- IDLE: camera only -->
    <div v-if="currentState === 'IDLE'" class="camera-page">

      <!-- Viewfinder -->
      <div class="camera-viewfinder" @click="triggerCamera">
        <img v-if="capturedImage" :src="capturedImage" class="captured-preview" alt="Captured photo" />
        <div v-else class="camera-placeholder">
          <div class="camera-icon-large">📷</div>
          <p class="camera-cta">Tap to open camera</p>
          <p class="camera-sub">Point at any violin tool or part</p>
        </div>
        <input
          ref="cameraInput"
          type="file"
          accept="image/*"
          capture="environment"
          class="hidden-input"
          @change="handleCameraCapture"
        />
      </div>

      <!-- Single clear action -->
      <button class="camera-btn-primary" @click="triggerCamera">
        📷 Take/Choose a Photo
      </button>

      <p class="camera-tip">The system will identify the tool automatically.</p>

      <!-- If a photo was taken but no match, show retry prompt -->
      <div v-if="capturedImage && !identifyingNow" class="retry-section">
        <p class="retry-label">Not identified? Try again or browse tools:</p>
        <div class="retry-actions">
          <button class="retry-btn" @click="retakePhoto">📷 Retake</button>
          <NuxtLink to="/identify-tools" class="retry-btn">🔍 Browse Tools</NuxtLink>
        </div>
      </div>
    </div>

    <!-- SENSE / INTERPRET: full-screen camera feedback -->
    <div v-if="currentState === 'SENSE' || currentState === 'INTERPRET'" class="loading-state">
      <div v-if="capturedImage" class="loading-img-wrap">
        <img :src="capturedImage" class="loading-preview" alt="Analysing photo" />
        <div class="loading-overlay">
          <div class="spinner" />
          <p class="loading-label">{{ currentState === 'SENSE' ? 'Reading your photo…' : 'Identifying the tool…' }}</p>
        </div>
      </div>
      <div v-else class="loading-plain">
        <div class="spinner" />
        <p class="loading-label">Identifying…</p>
      </div>
    </div>

    <!-- GROUND: disambiguation -->
    <DisambiguationPanel v-if="currentState === 'GROUND' && isAmbiguous && !selectedItem"
      :candidates="candidates" @select="selectCandidate" />

    <!-- GROUND: intent selection -->
    <div v-if="currentState === 'GROUND' && selectedItem">
      <div class="ground-header">
        <p class="ground-label">Here is what I found — choose what you'd like to know:</p>
      </div>
      <IntentPanel :item="selectedItem" :intents="intents" @select="selectIntent" />
    </div>

    <!-- ACT: result -->
    <ResultPanel v-if="currentState === 'ACT'"
      :item="selectedItem" :intent="selectedIntent"
      @repair="openRepairOptions" @reset="resetCamera" />

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
  errorMessage, items, intents,
  isAmbiguous,
  sense, selectCandidate,
  selectIntent, repair, reset
} = useGroundingLoop()

const capturedImage = ref(null)
const identifyingNow = ref(false)
const cameraInput = ref(null)
const showVoiceFallback = ref(false)
const showRepairOptions = ref(false)

function triggerCamera() {
  cameraInput.value?.click()
}

function handleCameraCapture(event) {
  const file = event.target.files[0]
  if (!file) return

  identifyingNow.value = true
  const reader = new FileReader()
  reader.onload = (e) => { capturedImage.value = e.target.result }
  reader.readAsDataURL(file)

  const filename = file.name.toLowerCase()
  const match = items.value?.find(item =>
    filename.includes(item.id) || filename.includes(item.name.toLowerCase())
  )
  if (match) {
    setTimeout(() => {
      identifyingNow.value = false
      sense(match.id)
    }, 800)
  } else {
    setTimeout(() => {
      identifyingNow.value = false
      errorMessage.value = "Could not identify the tool automatically. Try taking a clearer photo or use the options below."
    }, 800)
  }
}

function retakePhoto() {
  capturedImage.value = null
  errorMessage.value = ''
  identifyingNow.value = false
  if (cameraInput.value) cameraInput.value.value = ''
}

function resetCamera() {
  reset()
  retakePhoto()
}

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

.app-container { max-width: 600px; margin: 0 auto; padding: 0 0 40px; }

.error-msg { text-align: center; color: #c0392b; background: #fdf0ed; padding: 10px 20px; border-radius: 8px; margin: 12px 20px; border-left: 4px solid #c0392b; }

/* ── CAMERA PAGE ── */
.camera-page { display: flex; flex-direction: column; align-items: center; padding: 28px 20px 0; gap: 18px; }

.camera-viewfinder {
  width: 100%; max-width: 420px; height: 320px;
  border-radius: 24px; border: 3px dashed #8B4513;
  background: #1c0e06; display: flex; align-items: center; justify-content: center;
  cursor: pointer; overflow: hidden; position: relative; transition: border-color 0.2s;
}
.camera-viewfinder:hover { border-color: #c8860a; }
.camera-placeholder { text-align: center; color: white; padding: 20px; }
.camera-icon-large { font-size: 64px; margin-bottom: 16px; }
.camera-cta { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
.camera-sub { font-size: 13px; opacity: 0.6; }
.captured-preview { width: 100%; height: 100%; object-fit: cover; display: block; }
.hidden-input { display: none; }

.camera-btn-primary {
  background: #8B4513; color: white; border: none;
  padding: 16px 52px; border-radius: 30px;
  font-size: 18px; font-weight: 700; cursor: pointer;
  transition: background 0.2s; font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 16px rgba(139,69,19,.35);
}
.camera-btn-primary:hover { background: #6d3410; }

.camera-tip { font-size: 13px; color: #aaa; text-align: center; }

.retry-section { text-align: center; width: 100%; }
.retry-label { font-size: 13px; color: #888; margin-bottom: 12px; }
.retry-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.retry-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; background: white; color: #2c1810; border: 1.5px solid #ccc; border-radius: 20px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; transition: all .2s; font-family: 'Inter', sans-serif; }
.retry-btn:hover { border-color: #8B4513; background: #fdf5ee; }

/* ── LOADING ── */
.loading-state { padding: 32px 20px; }
.loading-img-wrap { position: relative; max-width: 420px; margin: 0 auto; border-radius: 20px; overflow: hidden; }
.loading-preview { width: 100%; height: 280px; object-fit: cover; display: block; filter: brightness(0.5); }
.loading-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; }
.loading-plain { text-align: center; padding: 60px 20px; }
.spinner { width: 44px; height: 44px; border: 3px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
.loading-plain .spinner { border: 3px solid #e8d5c0; border-top-color: #8B4513; }
.loading-label { color: white; font-size: 16px; font-weight: 500; }
.loading-plain .loading-label { color: #888; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── GROUND ── */
.ground-header { padding: 16px 20px 0; }
.ground-label { font-size: 14px; color: #2c1810; font-weight: 600; }

/* ── POPUPS ── */
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

.app-footer { text-align: center; margin-top: 48px; padding: 20px; color: #999; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; border-top: 1px solid #e0d5c8; font-weight: 500; }

@media (max-width: 768px) {
  .hero { height: 100px; }
  .hero-overlay h1 { font-size: 22px; }
  .camera-viewfinder { height: 260px; }
  .app-container { padding-bottom: 60px; }
}
</style>