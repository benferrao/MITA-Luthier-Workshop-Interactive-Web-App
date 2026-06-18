<template>
  <div class="app-container">

    <!-- Exit Tour confirmation -->
    <Transition name="popup">
      <div v-if="showExitConfirm" class="popup-overlay" @click.self="showExitConfirm = false">
        <div class="popup-card">
          <div class="popup-icon">🚪</div>
          <h3>Exit the tour?</h3>
          <p>You're on step {{ currentStep + 1 }} of {{ steps.length }}.</p>
          <div class="exit-actions">
            <button class="popup-btn" @click="navigateTo('/')">Go to Home</button>
            <button class="popup-btn ghost" @click="showExitConfirm = false">Continue Tour</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Persistent nav -->
    <nav class="top-nav">
      <NuxtLink to="/" class="nav-home-btn">🎻 Home</NuxtLink>
      <span class="nav-title">Guided Tour</span>
      <button class="nav-exit-btn" @click="showExitConfirm = true">Exit Tour ✕</button>
    </nav>

    <!-- Hero -->
    <header class="hero">
      <div class="hero-overlay">
        <h1>The Violin Workshop</h1>
        <p>A guided tour of the making process</p>
      </div>
    </header>

    <!-- Progress bar -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }" />
    </div>

    <!-- Step counter -->
    <div class="step-counter">
      <span>Step {{ currentStep + 1 }} of {{ steps.length }}</span>
      <span class="step-title">{{ steps[currentStep].title }}</span>
    </div>

    <!-- Main card -->
    <div class="tour-card">
      <div class="card-image-wrap">
        <img :src="steps[currentStep].image" :alt="steps[currentStep].title" class="tour-image" />
        <div class="step-badge">{{ currentStep + 1 }}</div>
      </div>
      <div class="card-content">
        <span class="card-tag">{{ steps[currentStep].tag }}</span>
        <h2>{{ steps[currentStep].title }}</h2>
        <p>{{ steps[currentStep].description }}</p>

        <!-- Grounding question -->
        <div v-if="showGrounding" class="grounding-box">
          <p class="grounding-prompt">{{ steps[currentStep].groundingQuestion }}</p>
          <p class="grounding-hint">Select one of the options below:</p>
          <div class="grounding-options">
            <button v-for="opt in steps[currentStep].options" :key="opt"
              class="option-btn" @click="selectOption(opt)">
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- Grounding answer -->
        <div v-if="groundingAnswer" class="answer-box">
          <p>{{ groundingAnswer }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="nav-buttons">
      <button class="nav-btn secondary" :disabled="currentStep === 0" @click="prevStep">← Previous</button>

      <button class="nav-btn primary" v-if="!showGrounding && !groundingAnswer" @click="triggerGrounding">
        Learn more
      </button>

      <button class="nav-btn primary"
        v-if="groundingAnswer && currentStep < steps.length - 1"
        @click="nextStep">
        Next →
      </button>

      <button class="nav-btn primary"
        v-if="groundingAnswer && currentStep === steps.length - 1"
        @click="finish">
        Finish tour ✓
      </button>

      <button class="nav-btn ghost"
        v-if="!groundingAnswer"
        :disabled="currentStep === steps.length - 1"
        @click="nextStep">
        Next →
      </button>
    </div>

    <!-- Finished overlay -->
    <div v-if="finished" class="finished-overlay">
      <div class="finished-card">
        <div class="finished-icon">🎻</div>
        <h2>Tour Complete!</h2>
        <p>You've just walked through the full process of making a Cremonese violin.</p>
        <div class="finished-actions">
          <button class="nav-btn primary" @click="restart">Restart Tour</button>
          <NuxtLink to="/identify-tools" class="nav-btn secondary">Explore Tools</NuxtLink>
          <NuxtLink to="/" class="nav-btn ghost">Go to Home</NuxtLink>
        </div>
      </div>
    </div>

    <footer class="app-footer">
      <p>THE VIOLIN WORKSHOP ~ CREMONSTERS</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref(0)
const showGrounding = ref(false)
const groundingAnswer = ref('')
const finished = ref(false)
const showExitConfirm = ref(false)

const steps = [
  {
    title: 'Selecting the Wood',
    tag: 'Stage 1 — Materials',
    image: '/images/mapple woodpiece.jpg',
    description: 'Everything begins with wood. Jönke sources spruce for the top plate and maple for the back, ribs, and neck — primarily from Romania and the Balkans. He visits specialist warehouses, inspects each piece by eye and tap tone, and selects by feel. A violin takes 200 to 250 hours to make, and choosing the right wood is considered half the job.',
    groundingQuestion: 'Why does wood choice matter so much for a violin?',
    options: ['It affects the sound', 'It affects the appearance', 'Both sound and appearance'],
    answers: {
      'It affects the sound': 'Correct — the density and grain of the wood directly shape how the violin resonates and projects. Spruce is used for the top because it vibrates freely; maple for the back because it reflects sound.',
      'It affects the appearance': 'Partly right — the flame pattern of maple is prized for beauty. But the acoustic properties are even more critical.',
      'Both sound and appearance': 'Exactly right — wood choice determines both how the violin sounds and how it looks. The flame pattern of figured maple is as much a mark of quality as the tap tone.'
    }
  },
  {
    title: 'Bending the Ribs',
    tag: 'Stage 2 — Body Construction',
    image: '/images/ribs 1.jpg',
    description: 'The ribs are thin strips of maple bent into shape using a bending iron — an electrically heated metal cylinder reaching 160 to 180°C. The wood is moistened slightly, pressed against the hot iron with gentle pressure, held for 10 to 20 seconds, then fanned to cool. The heat breaks down the lignin in the wood fibres, allowing them to reset permanently in the new curved shape.',
    groundingQuestion: 'What makes the wood hold its new curved shape permanently?',
    options: ['Glue is applied during bending', 'Heat breaks down lignin in the wood fibres', 'The wood is soaked in water'],
    answers: {
      'Glue is applied during bending': 'Not quite — no glue is used during bending. The ribs are glued later when assembled around the mold.',
      'Heat breaks down lignin in the wood fibres': 'Exactly right. The heat breaks down the lignin — the natural polymer giving wood its rigidity — allowing the fibres to reset as they cool.',
      'The wood is soaked in water': 'Water alone is not enough. Moisture softens the wood, but heat causes the lignin to break down and the shape to become permanent.'
    }
  },
  {
    title: 'Shaping the Plates',
    tag: 'Stage 3 — Carving',
    image: '/images/mini planer 1.jpg',
    description: 'The top and back plates are carved from flat slabs into gently arched shapes using a variety of planes. Jönke uses a compass plane with a curved sole for the main arch and a finger plane — a miniature hand plane held between two fingers — for final surface refinement. Everything is judged by eye and touch, not by measurement.',
    groundingQuestion: 'Why is the plate arched rather than flat?',
    options: ['It looks more beautiful', 'The arch creates structural strength and acoustic resonance', 'It makes the strings easier to play'],
    answers: {
      'It looks more beautiful': 'Beauty is a bonus, but not the reason. The arch serves a critical structural and acoustic purpose.',
      'The arch creates structural strength and acoustic resonance': 'Correct. The arch allows the thin plate to withstand enormous string pressure while creating the resonance modes that give the violin its tone.',
      'It makes the strings easier to play': 'The arch of the plate does not directly affect playability — that is controlled by the bridge height and neck angle.'
    }
  },
  {
    title: 'Smoothing with the Scraper',
    tag: 'Stage 4 — Finishing the Surface',
    image: '/images/dark  scraper.jpg',
    description: 'After the finger plane, the scraper removes the final thin layer of material to produce a perfectly smooth surface. There are multiple scrapers for different parts — a large flat one for the plates, curved ones for arched surfaces, and a tight curved one for the fingerboard. A properly sharpened scraper produces fine curling shavings, not dust.',
    groundingQuestion: 'How do you know a scraper is sharp enough?',
    options: ['It feels sharp to the touch', 'It produces fine curling shavings, not dust', 'It makes a ringing sound when flicked'],
    answers: {
      'It feels sharp to the touch': 'Touching the edge directly is not how luthiers test it — and it is dangerous. The real test is in how the scraper cuts.',
      'It produces fine curling shavings, not dust': 'Exactly right. A properly sharpened scraper produces fine, continuous curling shavings. If it produces dust or powder, the edge needs resharpening.',
      'It makes a ringing sound when flicked': 'That test is used for tone wood selection, not for scrapers. The shaving test is the correct indicator.'
    }
  },
  {
    title: 'Fitting the Sound Post',
    tag: 'Stage 5 — Internal Assembly',
    image: '/images/sound post raw.jpg',
    description: 'The sound post is a small cylindrical spruce rod wedged inside the body between the top and back plates, positioned just behind the treble foot of the bridge. It is inserted through the f-hole using a thin hooked rod. Moving it even a fraction of a millimetre changes the sound — closer to the bridge gives brightness; further away gives warmth.',
    groundingQuestion: 'What happens if you move the sound post slightly?',
    options: ['Nothing changes', 'The tone changes dramatically', 'The violin falls apart'],
    answers: {
      'Nothing changes': 'In fact even a fraction of a millimetre matters. The sound post is one of the most sensitive adjustments in the entire instrument.',
      'The tone changes dramatically': 'Correct. The sound post position is one of the most sensitive adjustments in violin making. A tiny shift changes the balance between brightness and warmth.',
      'The violin falls apart': 'The sound post provides structural support, but removing it does not cause the instrument to fall apart immediately.'
    }
  },
  {
    title: 'Applying the Ground Layer',
    tag: 'Stage 6 — Varnishing',
    image: '/images/UV cabin.jpg',
    description: 'Before the coloured varnish is applied, a ground layer is put on the bare wood and cured under ultraviolet light. Jönke uses a UV cabin — a few days under the lamp replicates what months of natural sunlight would do, giving the wood its characteristic golden-yellow base tone.',
    groundingQuestion: 'Why use UV light instead of just leaving the violin in the sun?',
    options: ['UV light is cheaper', 'UV light gives controlled, consistent results in days rather than months', 'Natural sunlight damages the wood'],
    answers: {
      'UV light is cheaper': 'Cost is not the main reason. A UV cabin is an investment — the reason is control and time.',
      'UV light gives controlled, consistent results in days rather than months': 'Exactly right. Natural sunlight works but takes months. The UV cabin replicates the same photochemical reaction in a controlled environment in just a few days.',
      'Natural sunlight damages the wood': 'Natural sunlight does not damage the wood — it is the traditional method. UV cabins simply accelerate the process.'
    }
  },
  {
    title: 'Applying the Varnish',
    tag: 'Stage 7 — Colour',
    image: '/images/varnish.jpg',
    description: 'Coloured oil varnish is applied in thin layers over the ground. Jönke uses just four pigments to mix every shade including the deep red-amber of classic Cremonese instruments. More pigment gives opacity; less allows the wood grain to show through. He declined to share the exact formula: "Amati would kill me."',
    groundingQuestion: 'Why is the exact varnish formula a closely guarded secret?',
    options: ['It is just tradition with no real reason', "The formula defines the colour and acoustic properties — it is the maker's signature", 'Varnish ingredients are expensive and rare'],
    answers: {
      'It is just tradition with no real reason': 'There is a real reason. The varnish formula defines both the appearance and acoustic properties — it is a core part of the maker\'s identity.',
      "The formula defines the colour and acoustic properties — it is the maker's signature": 'Correct. The varnish affects how the wood vibrates, how the instrument ages, and gives the maker a distinctive visual identity.',
      'Varnish ingredients are expensive and rare': 'Some pigments are specialist items, but scarcity is not the main reason for secrecy. It is about competitive advantage and artistic identity.'
    }
  },
  {
    title: 'Final Setup',
    tag: 'Stage 8 — Completion',
    image: '/images/bridge.jpg',
    description: 'The final stage brings the violin to life. The bridge is individually fitted — the feet carved to match the exact arch of the top, taking 1 to 2 hours per bridge. The sound post is positioned. Strings are installed. The instrument is played and listened to, then adjusted. Everything is judged by feel, not measurement.',
    groundingQuestion: 'Why does fitting the bridge take 1 to 2 hours?',
    options: ['It is a very large piece of wood', 'Each bridge must be carved to match the exact arch of that specific violin', 'The wood needs time to dry after cutting'],
    answers: {
      'It is a very large piece of wood': 'The bridge is actually quite small — typically about 3cm tall. The time comes from precision, not size.',
      'Each bridge must be carved to match the exact arch of that specific violin': 'Exactly right. No two violin tops have exactly the same arch. The luthier must carve the feet to fit perfectly flush against that specific instrument.',
      'The wood needs time to dry after cutting': 'Drying time is not the reason. The time is spent in careful carving and fitting.'
    }
  }
]

const progressPercent = computed(() =>
  Math.round(((currentStep.value + 1) / steps.length) * 100)
)

function triggerGrounding() {
  showGrounding.value = true
}

function selectOption(opt) {
  groundingAnswer.value = steps[currentStep.value].answers[opt]
}

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    showGrounding.value = false
    groundingAnswer.value = ''
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
    showGrounding.value = false
    groundingAnswer.value = ''
  }
}

function finish() { finished.value = true }

function restart() {
  currentStep.value = 0
  showGrounding.value = false
  groundingAnswer.value = ''
  finished.value = false
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background: #f5f0eb; color: #2c1810; }

.top-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 20px; background: #2c1810;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}
.nav-home-btn { color: #f5d090; text-decoration: none; font-size: 14px; font-weight: 600; padding: 7px 16px; border-radius: 20px; border: 1px solid rgba(245,208,144,.35); transition: all .2s; }
.nav-home-btn:hover { background: rgba(245,208,144,.15); border-color: #f5d090; }
.nav-title { color: rgba(255,255,255,.6); font-size: 13px; letter-spacing: .06em; }
.nav-exit-btn { background: transparent; color: rgba(255,255,255,.6); border: 1px solid rgba(255,255,255,.2); padding: 7px 14px; border-radius: 20px; font-size: 13px; cursor: pointer; transition: all .2s; font-family: 'Inter', sans-serif; }
.nav-exit-btn:hover { color: white; border-color: white; }

.hero { width: 100%; height: 130px; background: linear-gradient(135deg, #2c1810 0%, #8B4513 50%, #c8860a 100%); display: flex; align-items: center; justify-content: center; }
.hero-overlay { text-align: center; color: white; padding: 14px 20px; }
.hero-overlay h1 { font-family: 'Playfair Display', serif; font-size: 30px; margin-bottom: 4px; }
.hero-overlay p { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.9; }

.app-container { max-width: 860px; margin: 0 auto; padding: 0 0 40px; }

.progress-bar { height: 4px; background: #e0d5c8; }
.progress-fill { height: 100%; background: #8B4513; transition: width 0.4s ease; }

.step-counter { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: white; box-shadow: 0 1px 4px rgba(0,0,0,0.06); font-size: 13px; color: #888; }
.step-title { font-weight: 600; color: #2c1810; font-size: 14px; }

.tour-card { margin: 20px; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #ede5d8; }
.card-image-wrap { position: relative; }
.tour-image { width: 100%; height: 260px; object-fit: cover; display: block; }
.step-badge { position: absolute; top: 16px; left: 16px; width: 36px; height: 36px; background: #8B4513; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; }

.card-content { padding: 24px; }
.card-tag { display: inline-block; background: #f5ede0; color: #8B4513; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 10px; }
.card-content h2 { font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 12px; color: #2c1810; }
.card-content p { line-height: 1.7; color: #444; font-size: 15px; }

.grounding-box { margin-top: 20px; padding: 16px; background: #FFF8F0; border-radius: 12px; border-left: 4px solid #c8860a; }
.grounding-prompt { font-weight: 600; color: #2c1810; margin-bottom: 6px; }
.grounding-hint { font-size: 12px; color: #999; margin-bottom: 12px; }
.grounding-options { display: flex; flex-direction: column; gap: 8px; }
.option-btn { cursor: pointer; padding: 10px 16px; background: white; border: 2px solid #ddd; border-radius: 10px; text-align: left; font-size: 14px; color: #333; transition: all 0.2s; font-family: 'Inter', sans-serif; }
.option-btn:hover { border-color: #8B4513; background: #fdf5ee; }

.answer-box { margin-top: 16px; padding: 16px; background: #E8F5E9; border-radius: 12px; border-left: 4px solid #2e7d32; }
.answer-box p { color: #1b5e20; line-height: 1.6; font-size: 14px; }

.nav-buttons { display: flex; gap: 12px; justify-content: center; padding: 0 20px; margin-top: 20px; flex-wrap: wrap; }
.nav-btn { cursor: pointer; padding: 12px 24px; border-radius: 30px; font-size: 15px; font-weight: 600; border: none; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; font-family: 'Inter', sans-serif; }
.nav-btn.primary { background: #8B4513; color: white; }
.nav-btn.primary:hover { background: #6d3410; }
.nav-btn.secondary { background: white; color: #8B4513; border: 2px solid #8B4513; }
.nav-btn.secondary:hover { background: #fdf5ee; }
.nav-btn.ghost { background: transparent; color: #666; border: 1px solid #ccc; }
.nav-btn.ghost:hover { background: #f5f0eb; color: #2c1810; }
.nav-btn:disabled { opacity: 0.35; cursor: not-allowed; pointer-events: none; }

.popup-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(44,24,16,0.7); display: flex; align-items: center; justify-content: center; padding: 24px; }
.popup-card { background: white; border-radius: 24px; padding: 36px 32px; max-width: 400px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.popup-icon { font-size: 48px; margin-bottom: 14px; }
.popup-card h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: #2c1810; margin-bottom: 12px; }
.popup-card p { font-size: 14px; color: #666; line-height: 1.7; margin-bottom: 20px; }
.popup-btn { background: #8B4513; color: white; border: none; padding: 12px 32px; border-radius: 30px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-family: 'Inter', sans-serif; }
.popup-btn:hover { background: #6d3410; }
.popup-btn.ghost { background: transparent; color: #999; border: 1px solid #ddd; margin-top: 10px; display: block; width: 100%; }
.popup-btn.ghost:hover { background: #f5f0eb; }
.exit-actions { display: flex; flex-direction: column; gap: 10px; }
.popup-enter-active, .popup-leave-active { transition: opacity 0.25s; }
.popup-enter-from, .popup-leave-to { opacity: 0; }

.finished-overlay { position: fixed; inset: 0; background: rgba(44,24,16,0.85); display: flex; align-items: center; justify-content: center; z-index: 100; }
.finished-card { background: white; border-radius: 24px; padding: 40px; text-align: center; max-width: 420px; margin: 20px; }
.finished-icon { font-size: 64px; margin-bottom: 16px; }
.finished-card h2 { font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 12px; color: #2c1810; }
.finished-card p { color: #666; line-height: 1.6; margin-bottom: 24px; }
.finished-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

.app-footer { text-align: center; margin-top: 48px; padding: 20px; color: #999; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; border-top: 1px solid #e0d5c8; font-weight: 500; }

@media (max-width: 768px) {
  .hero { height: 100px; }
  .hero-overlay h1 { font-size: 22px; }
  .tour-image { height: 200px; }
  .nav-buttons { flex-direction: column; align-items: center; }
}
</style>