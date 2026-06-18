<template>
  <div class="app-container">


    <!-- Welcome popup — shown immediately when the page loads -->
    <Transition name="popup">
      <div v-if="showWelcome" class="popup-overlay welcome-overlay">
        <div class="popup-card welcome-card">
          <div class="jonke-welcome-avatar" :class="{ 'jonke-bounce': welcomeBounce }">
            <svg viewBox="0 0 300 340" role="img" aria-label="Jönke the luthier">
              <defs>
                <linearGradient id="wjk-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd9b3"/><stop offset="100%" stop-color="#f0b888"/></linearGradient>
                <linearGradient id="wjk-apron" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c8860a"/><stop offset="100%" stop-color="#8B4513"/></linearGradient>
                <linearGradient id="wjk-shirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5b7c99"/><stop offset="100%" stop-color="#3d5a73"/></linearGradient>
                <radialGradient id="wjk-cheek" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff8a6b" stop-opacity="0.55"/><stop offset="100%" stop-color="#ff8a6b" stop-opacity="0"/></radialGradient>
              </defs>
              <path d="M70,340 L70,260 Q70,225 150,222 Q230,225 230,260 L230,340 Z" fill="url(#wjk-shirt)"/>
              <path d="M95,340 L95,250 Q150,238 205,250 L205,340 Z" fill="url(#wjk-apron)" stroke="#5a2c0c" stroke-width="2"/>
              <path d="M115,250 L115,232 Q150,224 185,232 L185,250" fill="none" stroke="#5a2c0c" stroke-width="6" stroke-linecap="round"/>
              <rect x="128" y="260" width="44" height="34" rx="4" fill="#6d3410" opacity="0.4"/>
              <rect x="135" y="205" width="30" height="30" fill="url(#wjk-skin)"/>
              <ellipse cx="150" cy="150" rx="68" ry="74" fill="url(#wjk-skin)"/>
              <ellipse cx="120" cy="168" rx="14" ry="10" fill="url(#wjk-cheek)"/>
              <ellipse cx="180" cy="168" rx="14" ry="10" fill="url(#wjk-cheek)"/>
              <ellipse cx="80" cy="155" rx="11" ry="16" fill="url(#wjk-skin)"/>
              <ellipse cx="220" cy="155" rx="11" ry="16" fill="url(#wjk-skin)"/>
              <g fill="#c0431f">
                <path d="M150,76 C140,40 160,20 150,55 C155,15 185,15 165,55 C185,25 205,35 178,62 C205,40 220,55 190,70 C215,55 225,75 195,82"/>
                <path d="M150,76 C160,40 140,20 150,55 C145,15 115,15 135,55 C115,25 95,35 122,62 C95,40 80,55 110,70 C85,55 75,75 105,82"/>
              </g>
              <path d="M88,110 Q90,72 150,68 Q210,72 212,110 Q205,85 150,80 Q95,85 88,110 Z" fill="#c0431f"/>
              <path d="M104,128 Q118,118 134,126" stroke="#a8381a" stroke-width="6" fill="none" stroke-linecap="round"/>
              <path d="M166,126 Q182,118 196,128" stroke="#a8381a" stroke-width="6" fill="none" stroke-linecap="round"/>
              <g>
                <circle cx="120" cy="148" r="26" fill="#cfe3ee" stroke="#3a5a6e" stroke-width="5" opacity="0.9"/>
                <circle cx="180" cy="148" r="26" fill="#cfe3ee" stroke="#3a5a6e" stroke-width="5" opacity="0.9"/>
                <path d="M146,148 L154,148" stroke="#3a5a6e" stroke-width="5"/>
                <path d="M94,144 L78,150" stroke="#3a5a6e" stroke-width="5" stroke-linecap="round"/>
                <path d="M206,144 L222,150" stroke="#3a5a6e" stroke-width="5" stroke-linecap="round"/>
              </g>
              <circle cx="120" cy="150" r="7" fill="#2c1810"/>
              <circle cx="180" cy="150" r="7" fill="#2c1810"/>
              <circle cx="122" cy="147" r="2" fill="white"/>
              <circle cx="182" cy="147" r="2" fill="white"/>
              <path d="M150,150 Q142,178 150,186 Q158,182 154,172" fill="url(#wjk-skin)" stroke="#d99a6c" stroke-width="2"/>
              <g fill="#c0431f">
                <path d="M150,196 C130,188 95,196 75,220 C90,212 105,210 118,214 C100,222 85,235 80,250 C100,234 118,224 134,220 C124,228 116,238 116,248 C128,232 140,222 150,220 Z"/>
                <path d="M150,196 C170,188 205,196 225,220 C210,212 195,210 182,214 C200,222 215,235 220,250 C200,234 182,224 166,220 C176,228 184,238 184,248 C172,232 160,222 150,220 Z"/>
              </g>
              <path d="M132,206 Q150,224 168,206 Q165,216 150,218 Q135,216 132,206 Z" fill="#7a2418"/>
              <path d="M136,207 Q150,216 164,207" fill="white" stroke="none"/>
            </svg>
          </div>
          <p class="welcome-eyebrow">Benvenuti a Cremona</p>
          <h3>Meet Jönke, your luthier guide</h3>
          <p class="welcome-body">
            <em>"Ah, welcome! You have found your way to my workshop."</em><br><br>
            I am Jönke — and for the next few minutes I will take you through every stage of making a Cremonese violin, from the raw wood to the final setup. Eight stages, decades of tradition, all for you.
          </p>
          <div class="welcome-actions">
            <button class="popup-btn welcome-yes" @click="beginTour">Let's begin! 🎻</button>
            <NuxtLink to="/" class="popup-btn ghost">Not now</NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

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

    <!-- Respond to Jönke: voice + touch grounding loop -->
    <Transition name="popup">
      <div v-if="showRespond" class="popup-overlay" @click.self="closeRespond">
        <div class="popup-card respond-card">
          <div class="popup-icon">🎻</div>
          <h3>Respond to Jönke</h3>
          <p>Say or tap how you'd like to continue:</p>

          <div class="respond-options">
            <button class="respond-btn" :disabled="currentStep === 0" @click="handleRespond('previous')">
              ← Previous
            </button>
            <button class="respond-btn" @click="handleRespond('learn more')">
              🔍 Learn more
            </button>
            <button class="respond-btn" :disabled="currentStep === steps.length - 1" @click="handleRespond('next')">
              Next →
            </button>
          </div>

          <VoiceInput @result="handleVoiceRespond" />

          <!-- Grounding repair: shown if voice input didn't match a known command -->
          <div v-if="respondNotUnderstood" class="respond-repair">
            <p>I didn't catch a command there. Try saying "next", "previous", or "learn more" — or tap a button above.</p>
          </div>

          <button class="popup-btn ghost" @click="closeRespond">Cancel</button>
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

    <!-- Jönke the luthier -->
    <div class="jonke-section">
      <div class="jonke-avatar" :class="{ talking: jonkeTalking }">
        <svg viewBox="0 0 300 340" role="img" aria-label="Jönke the luthier">
          <defs>
            <linearGradient id="jk-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffd9b3"/>
              <stop offset="100%" stop-color="#f0b888"/>
            </linearGradient>
            <linearGradient id="jk-apron" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#c8860a"/>
              <stop offset="100%" stop-color="#8B4513"/>
            </linearGradient>
            <linearGradient id="jk-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#5b7c99"/>
              <stop offset="100%" stop-color="#3d5a73"/>
            </linearGradient>
            <radialGradient id="jk-cheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ff8a6b" stop-opacity="0.55"/>
              <stop offset="100%" stop-color="#ff8a6b" stop-opacity="0"/>
            </radialGradient>
          </defs>

          <path d="M70,340 L70,260 Q70,225 150,222 Q230,225 230,260 L230,340 Z" fill="url(#jk-shirt)"/>
          <path d="M95,340 L95,250 Q150,238 205,250 L205,340 Z" fill="url(#jk-apron)" stroke="#5a2c0c" stroke-width="2"/>
          <path d="M115,250 L115,232 Q150,224 185,232 L185,250" fill="none" stroke="#5a2c0c" stroke-width="6" stroke-linecap="round"/>
          <rect x="128" y="260" width="44" height="34" rx="4" fill="#6d3410" opacity="0.4"/>
          <line x1="150" y1="260" x2="150" y2="294" stroke="#5a2c0c" stroke-width="1.5" opacity="0.5"/>

          <rect x="135" y="205" width="30" height="30" fill="url(#jk-skin)"/>

          <ellipse cx="150" cy="150" rx="68" ry="74" fill="url(#jk-skin)"/>
          <ellipse cx="120" cy="168" rx="14" ry="10" fill="url(#jk-cheek)"/>
          <ellipse cx="180" cy="168" rx="14" ry="10" fill="url(#jk-cheek)"/>

          <ellipse cx="80" cy="155" rx="11" ry="16" fill="url(#jk-skin)"/>
          <ellipse cx="220" cy="155" rx="11" ry="16" fill="url(#jk-skin)"/>

          <g fill="#c0431f">
            <path d="M150,76 C140,40 160,20 150,55 C155,15 185,15 165,55 C185,25 205,35 178,62 C205,40 220,55 190,70 C215,55 225,75 195,82"/>
            <path d="M150,76 C160,40 140,20 150,55 C145,15 115,15 135,55 C115,25 95,35 122,62 C95,40 80,55 110,70 C85,55 75,75 105,82"/>
          </g>
          <path d="M88,110 Q90,72 150,68 Q210,72 212,110 Q205,85 150,80 Q95,85 88,110 Z" fill="#c0431f"/>

          <path d="M104,128 Q118,118 134,126" stroke="#a8381a" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M166,126 Q182,118 196,128" stroke="#a8381a" stroke-width="6" fill="none" stroke-linecap="round"/>

          <g>
            <circle cx="120" cy="148" r="26" fill="#cfe3ee" stroke="#3a5a6e" stroke-width="5" opacity="0.9"/>
            <circle cx="180" cy="148" r="26" fill="#cfe3ee" stroke="#3a5a6e" stroke-width="5" opacity="0.9"/>
            <path d="M146,148 L154,148" stroke="#3a5a6e" stroke-width="5"/>
            <path d="M94,144 L78,150" stroke="#3a5a6e" stroke-width="5" stroke-linecap="round"/>
            <path d="M206,144 L222,150" stroke="#3a5a6e" stroke-width="5" stroke-linecap="round"/>
          </g>

          <circle cx="120" cy="150" r="7" fill="#2c1810"/>
          <circle cx="180" cy="150" r="7" fill="#2c1810"/>
          <circle cx="122" cy="147" r="2" fill="white"/>
          <circle cx="182" cy="147" r="2" fill="white"/>

          <path d="M150,150 Q142,178 150,186 Q158,182 154,172" fill="url(#jk-skin)" stroke="#d99a6c" stroke-width="2"/>

          <g fill="#c0431f">
            <path d="M150,196 C130,188 95,196 75,220 C90,212 105,210 118,214 C100,222 85,235 80,250 C100,234 118,224 134,220 C124,228 116,238 116,248 C128,232 140,222 150,220 Z"/>
            <path d="M150,196 C170,188 205,196 225,220 C210,212 195,210 182,214 C200,222 215,235 220,250 C200,234 182,224 166,220 C176,228 184,238 184,248 C172,232 160,222 150,220 Z"/>
          </g>

          <path class="jonke-mouth" d="M132,206 Q150,224 168,206 Q165,216 150,218 Q135,216 132,206 Z" fill="#7a2418"/>
          <path d="M136,207 Q150,216 164,207" fill="white" stroke="none"/>

          <g fill="#f5d090" opacity="0.85">
            <circle cx="245" cy="90" r="3"/>
            <circle cx="258" cy="105" r="2"/>
            <circle cx="240" cy="115" r="2"/>
          </g>
        </svg>
        <span class="jonke-name-tag">Jönke</span>
      </div>

      <!-- Subtitles -->
      <div class="subtitle-box">
        <p class="subtitle-text">{{ jonkeLine }}</p>
      </div>
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
              class="option-btn"
              :class="{
                'opt-correct': groundingAnswer && opt === steps[currentStep].correctAnswer,
                'opt-wrong':   groundingAnswer && opt !== steps[currentStep].correctAnswer,
                'opt-selected': selectedOption === opt
              }"
              :disabled="!!groundingAnswer"
              @click="selectOption(opt)">
              <span class="opt-icon" v-if="groundingAnswer">
                {{ opt === steps[currentStep].correctAnswer ? '✓' : '✗' }}
              </span>
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

    <!-- Respond to Jönke button + stop speaking -->
    <div class="respond-row">
      <button class="respond-to-jonke-btn" @click="openRespond">
        🎻 Respond to Jönke
      </button>
      <button v-if="jonkeTalking" class="stop-speaking-btn" @click="stopSpeaking">
        ⏹ Stop
      </button>
    </div>

    <!-- Navigation
         States are mutually exclusive:
         1. Default (no grounding started):   Previous | Learn more | Next →
         2. Grounding open (question shown):  Previous | [question visible — no nav until answered]
         3. Grounding answered:               Previous | Next → (or Finish)
    -->
    <div class="nav-buttons">
      <button class="nav-btn secondary" :disabled="currentStep === 0" @click="prevStep">
        ← Previous
      </button>

      <!-- Learn more: disabled once used for this step -->
      <button class="nav-btn primary"
        v-if="!showGrounding && !groundingAnswer"
        :disabled="learnMoreUsed.has(currentStep)"
        :class="{ 'btn-used': learnMoreUsed.has(currentStep) }"
        @click="triggerGrounding">
        {{ learnMoreUsed.has(currentStep) ? 'Already explored ✓' : 'Learn more' }}
      </button>

      <!-- Skip / Next: only when grounding hasn't started -->
      <button class="nav-btn ghost"
        v-if="!showGrounding && !groundingAnswer"
        :disabled="currentStep === steps.length - 1"
        @click="nextStep">
        Next →
      </button>

      <!-- After answering — continue forward -->
      <button class="nav-btn primary"
        v-if="groundingAnswer && currentStep < steps.length - 1"
        @click="nextStep">
        Next stage →
      </button>

      <button class="nav-btn primary"
        v-if="groundingAnswer && currentStep === steps.length - 1"
        @click="finish">
        Finish tour ✓
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const currentStep = ref(0)
const showGrounding = ref(false)
const groundingAnswer = ref('')
const selectedOption = ref('')
const learnMoreUsed = ref(new Set())
const finished = ref(false)
const showExitConfirm = ref(false)
const showRespond = ref(false)
const respondNotUnderstood = ref(false)
const jonkeTalking = ref(false)
const showWelcome = ref(false)
const welcomeBounce = ref(false)
let synth = null
let voiceRef = null

const steps = [
  {
    title: 'Selecting the Wood',
    tag: 'Stage 1 — Materials',
    image: '/images/mapple woodpiece.jpg',
    description: 'Everything begins with wood. Jönke sources spruce for the top plate and maple for the back, ribs, and neck — primarily from Romania and the Balkans. He visits specialist warehouses, inspects each piece by eye and tap tone, and selects by feel. A violin takes 200 to 250 hours to make, and choosing the right wood is considered half the job.',
    jonkeLine: "Every violin starts with wood — I choose each piece by tap, by eye, by feel.",
    groundingQuestion: 'Why does wood choice matter so much for a violin?',
    correctAnswer: 'Both sound and appearance',
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
    jonkeLine: "We bend the ribs over a hot iron. The wood remembers its new shape forever.",
    groundingQuestion: 'What makes the wood hold its new curved shape permanently?',
    correctAnswer: 'Heat breaks down lignin in the wood fibres',
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
    jonkeLine: "Carving the arch is everything. I trust my hands, never a ruler.",
    groundingQuestion: 'Why is the plate arched rather than flat?',
    correctAnswer: 'The arch creates structural strength and acoustic resonance',
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
    jonkeLine: "Listen for the shavings, not the dust — a sharp scraper sings as it cuts.",
    groundingQuestion: 'How do you know a scraper is sharp enough?',
    correctAnswer: 'It produces fine curling shavings, not dust',
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
    jonkeLine: "We call this rod the soul. Move it a hair's width and the whole voice of the violin changes.",
    groundingQuestion: 'What happens if you move the sound post slightly?',
    correctAnswer: 'The tone changes dramatically',
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
    jonkeLine: "A few days under this lamp does what the sun takes months to do — patience, accelerated.",
    groundingQuestion: 'Why use UV light instead of just leaving the violin in the sun?',
    correctAnswer: 'UV light gives controlled, consistent results in days rather than months',
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
    jonkeLine: "My varnish formula goes with me to the grave. Amati would kill me otherwise!",
    groundingQuestion: 'Why is the exact varnish formula a closely guarded secret?',
    correctAnswer: "The formula defines the colour and acoustic properties — it is the maker's signature",
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
    image: '/images/zoomed violin.jpg',
    description: 'The final stage brings the violin to life. The bridge is individually fitted — the feet carved to match the exact arch of the top, taking 1 to 2 hours per bridge. The sound post is positioned. Strings are installed. The instrument is played and listened to, then adjusted. Everything is judged by feel, not measurement.',
    jonkeLine: "And now we listen. Every adjustment from here is judged by ear alone.",
    groundingQuestion: 'Why does fitting the bridge take 1 to 2 hours?',
    correctAnswer: 'Each bridge must be carved to match the exact arch of that specific violin',
    options: ['It is a very large piece of wood', 'Each bridge must be carved to match the exact arch of that specific violin', 'The wood needs time to dry after cutting'],
    answers: {
      'It is a very large piece of wood': 'The bridge is actually quite small — typically about 3cm tall. The time comes from precision, not size.',
      'Each bridge must be carved to match the exact arch of that specific violin': 'Exactly right. No two violin tops have exactly the same arch. The luthier must carve the feet to fit perfectly flush against that specific instrument.',
      'The wood needs time to dry after cutting': 'Drying time is not the reason. The time is spent in careful carving and fitting.'
    }
  }
]

const jonkeLine = computed(() => steps[currentStep.value].jonkeLine)

// Mouth animation only — speaking is triggered explicitly by
// nextStep / prevStep / beginTour, not by this watcher, to prevent
// the line being spoken twice whenever the step changes.
watch(jonkeLine, () => {
  if (showWelcome.value) return
  jonkeTalking.value = true
}, { immediate: false })

onMounted(() => {
  synth = window.speechSynthesis

  // Chrome requires waiting for voices to load before speaking.
  // We store the preferred voice once it's available.
  function loadVoices() {
    const voices = synth.getVoices()
    // Priority: Daniel (refined British male on macOS/iOS) → any local
    // British English → any British English → any English → first available
    voiceRef = voices.find(v => v.name === 'Daniel')
      || voices.find(v => v.name === 'Arthur')
      || voices.find(v => v.name === 'Oliver')
      || voices.find(v => v.lang === 'en-GB' && v.localService)
      || voices.find(v => v.lang === 'en-GB')
      || voices.find(v => v.lang === 'en-US' && v.name.includes('Male'))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0]
      || null
  }

  // getVoices() is async in Chrome — voices arrive via this event
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.addEventListener('voiceschanged', loadVoices)
    loadVoices() // also call immediately in case voices are already loaded (Firefox/Safari)
  }

  // Show welcome popup after a short delay so the page renders first
  setTimeout(() => {
    showWelcome.value = true
    welcomeBounce.value = true
    setTimeout(() => { welcomeBounce.value = false }, 800)
  }, 350)
})

onBeforeUnmount(() => {
  if (synth) synth.cancel()
})

function speakLine(text) {
  if (!synth) return
  synth.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  if (voiceRef) utt.voice = voiceRef
  utt.lang = 'en-GB'
  utt.rate = 0.82   // measured, unhurried — like a craftsman explaining his work
  utt.pitch = 0.95  // slightly lower pitch = more mature, authoritative
  utt.volume = 1
  jonkeTalking.value = true
  utt.onend = () => { jonkeTalking.value = false }
  utt.onerror = () => { jonkeTalking.value = false }
  // requestAnimationFrame ensures the user-gesture context is preserved
  requestAnimationFrame(() => {
    setTimeout(() => synth.speak(utt), 120)
  })
}

function stopSpeaking() {
  if (synth) synth.cancel()
  jonkeTalking.value = false
}

function beginTour() {
  showWelcome.value = false
  // Speak step 1 line — this fires inside a click handler (user gesture)
  setTimeout(() => speakLine(steps[0].jonkeLine), 500)
}

const progressPercent = computed(() =>
  Math.round(((currentStep.value + 1) / steps.length) * 100)
)

function triggerGrounding() {
  if (showGrounding.value || groundingAnswer.value) return
  learnMoreUsed.value = new Set([...learnMoreUsed.value, currentStep.value])
  showGrounding.value = true
}

function selectOption(opt) {
  selectedOption.value = opt
  groundingAnswer.value = steps[currentStep.value].answers[opt]
}

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    showGrounding.value = false
    groundingAnswer.value = ''
    selectedOption.value = ''
    speakLine(steps[currentStep.value].jonkeLine)
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
    showGrounding.value = false
    groundingAnswer.value = ''
    speakLine(steps[currentStep.value].jonkeLine)
  }
}

function finish() { finished.value = true }

function restart() {
  currentStep.value = 0
  showGrounding.value = false
  groundingAnswer.value = ''
  selectedOption.value = ''
  learnMoreUsed.value = new Set()
  finished.value = false
}

// --- Respond to Jönke: grounding loop for voice/touch navigation ---

function openRespond() {
  respondNotUnderstood.value = false
  showRespond.value = true
}

function closeRespond() {
  showRespond.value = false
  respondNotUnderstood.value = false
}

const jonkeReplies = {
  next:       'Good — let us move on.',
  previous:   'Of course, let us go back.',
  'learn more': 'Excellent question — here is more.',
}

function handleRespond(command) {
  respondNotUnderstood.value = false
  showRespond.value = false
  // Hide "Learn more" immediately so it never flashes back into view
  // during the spoken reply delay
  if (command === 'learn more') {
    learnMoreUsed.value = new Set([...learnMoreUsed.value, currentStep.value])
    showGrounding.value = true
  }
  const reply = jonkeReplies[command] || ''
  if (reply) {
    speakLine(reply)
    const delay = reply.length * 58 + 400
    setTimeout(() => {
      if (command === 'next' && currentStep.value < steps.length - 1) {
        nextStep()
      } else if (command === 'previous' && currentStep.value > 0) {
        prevStep()
      }
      // 'learn more': showGrounding is already true, grounding box now visible
    }, delay)
  } else {
    if (command === 'next' && currentStep.value < steps.length - 1) nextStep()
    else if (command === 'previous' && currentStep.value > 0) prevStep()
    else if (command === 'learn more' && !showGrounding.value && !groundingAnswer.value) triggerGrounding()
  }
}

// Voice input is matched against a small set of known commands. If
// nothing matches, the grounding loop "repairs" by keeping the dialog
// open and showing a hint rather than silently failing.
function handleVoiceRespond(text) {
  const lower = text.toLowerCase()
  if (lower.includes('next') || lower.includes('forward') || lower.includes('continue')) {
    handleRespond('next')
  } else if (lower.includes('previous') || lower.includes('back') || lower.includes('go back')) {
    handleRespond('previous')
  } else if (lower.includes('learn') || lower.includes('more') || lower.includes('tell me')) {
    handleRespond('learn more')
  } else {
    respondNotUnderstood.value = true
  }
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

/* Jönke avatar + subtitles */
.jonke-section {
  display: flex; align-items: center; gap: 16px;
  padding: 20px; margin: 0 20px;
  background: linear-gradient(135deg, #fff8f0, #f5ede0);
  border-radius: 20px; margin-top: 16px;
  border: 1px solid #ede5d8;
}
.jonke-avatar {
  position: relative; flex-shrink: 0;
  width: 96px; height: 109px;
  perspective: 400px;
  animation: jk-idle 3s ease-in-out infinite;
}
.jonke-avatar svg {
  width: 100%; height: 100%; display: block;
  transform-style: preserve-3d;
  filter: drop-shadow(4px 8px 12px rgba(44,24,16,0.35));
  transition: transform 0.4s ease;
}
.jonke-avatar:hover svg {
  transform: rotateY(-12deg) rotateX(4deg) scale(1.06);
}
@keyframes jk-idle {
  0%, 100% { transform: translateY(0px) rotateZ(0deg); }
  25%       { transform: translateY(-4px) rotateZ(0.8deg); }
  75%       { transform: translateY(-2px) rotateZ(-0.5deg); }
}
.jonke-avatar.talking .jonke-mouth {
  animation: jk-talk 0.28s ease-in-out infinite;
  transform-origin: 150px 212px;
}
@keyframes jk-talk {
  0%, 100% { transform: scaleY(1) translateY(0); }
  50%       { transform: scaleY(1.8) translateY(2px); }
}
.jonke-name-tag {
  position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
  background: #8B4513; color: white; font-size: 10px; font-weight: 700;
  padding: 2px 10px; border-radius: 10px; letter-spacing: .04em;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
}

/* Welcome popup */
.welcome-overlay { align-items: center; }
.welcome-card { max-width: 460px; padding: 28px 28px 32px; }
.jonke-welcome-avatar {
  width: 110px; height: 125px;
  margin: 0 auto 14px;
  perspective: 500px;
  animation: jk-idle 3s ease-in-out infinite;
}
.jonke-welcome-avatar svg {
  width: 100%; height: 100%; display: block;
  filter: drop-shadow(4px 10px 14px rgba(44,24,16,0.4));
  transform-style: preserve-3d;
}
.jonke-welcome-avatar.jonke-bounce {
  animation: jk-bounce 0.6s cubic-bezier(.36,.07,.19,.97), jk-idle 3s ease-in-out 0.6s infinite;
}
@keyframes jk-bounce {
  0%   { transform: translateY(0); }
  25%  { transform: translateY(-18px) rotate(-3deg); }
  50%  { transform: translateY(-8px) rotate(2deg); }
  75%  { transform: translateY(-14px) rotate(-1deg); }
  100% { transform: translateY(0); }
}
.welcome-eyebrow {
  font-size: 11px; letter-spacing: .2em; text-transform: uppercase;
  color: #8B4513; font-weight: 600; margin-bottom: 8px;
}
.welcome-card h3 {
  font-family: 'Playfair Display', serif; font-size: 22px; color: #2c1810; margin-bottom: 14px;
}
.welcome-body {
  font-size: 14px; color: #555; line-height: 1.75; margin-bottom: 22px; text-align: left;
}
.welcome-body em { font-style: italic; color: #8B4513; }
.welcome-actions { display: flex; flex-direction: column; gap: 10px; }
.welcome-yes {
  font-size: 16px; padding: 14px 32px;
  background: linear-gradient(135deg, #8B4513, #c8860a);
  transition: all 0.2s;
}
.welcome-yes:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(139,69,19,0.35); }
.subtitle-box {
  flex: 1; background: rgba(44,24,16,0.06); border-radius: 14px;
  padding: 14px 18px; border-left: 3px solid #8B4513;
}
.subtitle-text {
  font-style: italic; color: #2c1810; font-size: 14.5px; line-height: 1.6;
}

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
.option-btn { cursor: pointer; padding: 10px 16px; background: white; border: 2px solid #ddd; border-radius: 10px; text-align: left; font-size: 14px; color: #333; transition: all 0.2s; font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 8px; }
.option-btn:hover:not(:disabled) { border-color: #8B4513; background: #fdf5ee; }
.option-btn:disabled { cursor: default; }
.opt-correct { background: #e8f5e9 !important; border-color: #2e7d32 !important; color: #1b5e20 !important; font-weight: 600; }
.opt-wrong   { background: #ffebee !important; border-color: #e53935 !important; color: #b71c1c !important; opacity: 0.75; }
.opt-icon    { font-weight: 700; font-size: 15px; flex-shrink: 0; }
.btn-used    { opacity: 0.55; cursor: not-allowed; }

.answer-box { margin-top: 16px; padding: 16px; background: #E8F5E9; border-radius: 12px; border-left: 4px solid #2e7d32; }
.answer-box p { color: #1b5e20; line-height: 1.6; font-size: 14px; }

/* Respond to Jönke button */
.respond-row { display: flex; justify-content: center; padding: 0 20px; margin-top: 16px; }
.respond-row { gap: 10px; }
.respond-to-jonke-btn {
  cursor: pointer; padding: 13px 30px;
  border-radius: 30px; font-size: 15px; font-weight: 700;
  border: 2px solid #8B4513; background: white; color: #8B4513;
  transition: all 0.2s; font-family: 'Inter', sans-serif;
}
.respond-to-jonke-btn:hover { background: #8B4513; color: white; }
.stop-speaking-btn {
  cursor: pointer; padding: 10px 20px;
  border-radius: 30px; font-size: 13px; font-weight: 600;
  border: 2px solid #e53935; background: #ffebee; color: #e53935;
  transition: all 0.2s; font-family: 'Inter', sans-serif;
  animation: pulse-red 1.2s ease-in-out infinite;
}
.stop-speaking-btn:hover { background: #ffd7d7; }
@keyframes pulse-red {
  0%, 100% { box-shadow: 0 0 0 0 rgba(229,57,53,0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(229,57,53,0); }
}

.nav-buttons { display: flex; gap: 12px; justify-content: center; padding: 0 20px; margin-top: 16px; flex-wrap: wrap; }
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
.popup-btn.ghost { background: transparent; color: #999; border: 1px solid #ddd; margin-top: 14px; display: block; width: 100%; }
.popup-btn.ghost:hover { background: #f5f0eb; }
.exit-actions { display: flex; flex-direction: column; gap: 10px; }
.popup-enter-active, .popup-leave-active { transition: opacity 0.25s; }
.popup-enter-from, .popup-leave-to { opacity: 0; }

/* Respond to Jönke modal specifics */
.respond-options { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }
.respond-btn {
  cursor: pointer; padding: 10px 18px; border-radius: 20px;
  border: 2px solid #8B4513; background: white; color: #8B4513;
  font-size: 13px; font-weight: 600; transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}
.respond-btn:hover { background: #fdf5ee; }
.respond-btn:disabled { opacity: 0.35; cursor: not-allowed; border-color: #ccc; color: #ccc; }
.respond-repair {
  margin-top: 14px; padding: 12px; background: #FFF3E0;
  border-radius: 10px; border-left: 3px solid #c8860a;
}
.respond-repair p { font-size: 13px; color: #8B4513; line-height: 1.5; margin: 0; }

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
  .jonke-section { flex-direction: column; text-align: center; }
  .subtitle-box { border-left: none; border-top: 3px solid #8B4513; }
}
</style>