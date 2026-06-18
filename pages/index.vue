<template>
  <div class="home">
    <section class="hero">
      <div class="hero-text">
        <p class="hero-eyebrow">Cremona · Italy · MITA Project 2025–26</p>
        <h1 class="hero-title">The Violin<br><em>Workshop</em></h1>
        <p class="hero-sub">
          For five centuries, Cremona has been the heart of violin making.
          Andrea Amati founded the craft here in the 1500s, and a century later
          Antonio Stradivari refined it into instruments still considered
          unrivalled today. This workshop lets you step inside that tradition — tool by tool, part by part.
        </p>
        <NuxtLink to="/legacy" class="hero-link">The Cremona Legacy →</NuxtLink>
      </div>

      <!-- SVG Violin with interactive hotspots -->
      <div class="violin-container" ref="violinContainer">
        <svg
          class="violin-svg"
          viewBox="0 0 320 680"
          role="img"
          aria-label="Interactive illustration of a violin"
          xmlns="http://www.w3.org/2000/svg"
          @mouseleave="activeHotspot = null"
        >
          <defs>
            <linearGradient id="vh-wood" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#c1583c"/>
              <stop offset="45%" stop-color="#8b3220"/>
              <stop offset="100%" stop-color="#4a1810"/>
            </linearGradient>
            <linearGradient id="vh-woodNeck" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#9c4128"/>
              <stop offset="50%" stop-color="#8b3220"/>
              <stop offset="100%" stop-color="#4a1810"/>
            </linearGradient>
            <radialGradient id="vh-sheen" cx="35%" cy="28%" r="65%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.30"/>
              <stop offset="60%" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="vh-peg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#4a2810"/>
              <stop offset="50%" stop-color="#1c0e04"/>
              <stop offset="100%" stop-color="#3a1d08"/>
            </linearGradient>
            <linearGradient id="vh-bow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#a8632e"/>
              <stop offset="50%" stop-color="#8a4a20"/>
              <stop offset="100%" stop-color="#5c2f12"/>
            </linearGradient>
            <filter id="vh-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000" flood-opacity="0.35"/>
            </filter>
            <clipPath id="vh-clip">
              <path d="M110,278 C146,279 166,288 174,304 C180,318 180,326 178,338 C176,352 169,360 164,374 C159,388 154,394 154,406 C154,418 159,424 164,438 C169,454 184,470 186,500 C192,536 178,570 152,590 C133,604 120,607 110,606 C100,607 87,604 68,590 C42,570 28,536 30,500 C32,470 52,454 60,438 C61,424 66,418 66,406 C61,394 56,388 56,374 C51,360 44,352 42,338 C40,326 40,318 42,304 C54,288 74,279 110,278 Z"/>
            </clipPath>
          </defs>

          <ellipse cx="175" cy="665" rx="155" ry="13" fill="#000" opacity="0.28"/>

          <!-- BOW -->
          <g>
            <path d="M256,646 C262,478 280,200 292,30" stroke="#f0e6d8" stroke-width="1.3" fill="none" opacity="0.92"/>
            <path d="M264,650 C270,480 288,200 299,26" stroke="url(#vh-bow)" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            <path d="M299,26 C302,22 304,18 301,14 C297,12 294,16 296,22 Z" fill="#1c0e04"/>
            <rect x="296.5" y="16" width="5" height="2" fill="#f0e6d8"/>
            <rect x="255" y="636" width="16" height="22" rx="2.5" fill="#1c0e04" stroke="#3a1d08" stroke-width="0.8"/>
            <rect x="256" y="630" width="14" height="6" rx="1.5" fill="#caa24a"/>
            <circle cx="263" cy="660" r="3" fill="#1c0e04"/>
            <line x1="260" y1="612" x2="271" y2="610" stroke="#caa24a" stroke-width="1.4"/>
            <line x1="260.5" y1="618" x2="271.5" y2="616" stroke="#caa24a" stroke-width="1.4"/>
            <line x1="261" y1="624" x2="272" y2="622" stroke="#caa24a" stroke-width="1.4"/>
          </g>

          <!-- VIOLIN BODY -->
          <g transform="translate(50,15)" filter="url(#vh-soft)">
            <path id="vh-body" fill="url(#vh-wood)" stroke="#3a0f08" stroke-width="2" stroke-linejoin="round" d="M110,278 C146,279 166,288 174,304 C180,318 180,326 178,338 C176,352 169,360 164,374 C159,388 154,394 154,406 C154,418 159,424 164,438 C169,454 184,470 186,500 C192,536 178,570 152,590 C133,604 120,607 110,606 C100,607 87,604 68,590 C42,570 28,536 30,500 C32,470 52,454 60,438 C61,424 66,418 66,406 C61,394 56,388 56,374 C51,360 44,352 42,338 C40,326 40,318 42,304 C54,288 74,279 110,278 Z"/>
            <g clip-path="url(#vh-clip)" stroke="#3a1408" stroke-width="0.6">
              <line x1="72" y1="268" x2="66" y2="612" opacity="0.16"/>
              <line x1="100" y1="265" x2="99" y2="614" opacity="0.18"/>
              <line x1="127" y1="266" x2="130" y2="613" opacity="0.16"/>
              <line x1="155" y1="270" x2="162" y2="610" opacity="0.16"/>
            </g>
            <use href="#vh-body" transform="translate(110,442) scale(0.965) translate(-110,-442)" fill="none" stroke="#2a1408" stroke-width="1.2" opacity="0.65"/>
            <use href="#vh-body" fill="url(#vh-sheen)" stroke="none"/>
            <path fill="url(#vh-woodNeck)" stroke="#3a0f08" stroke-width="2" d="M99,64 L92,278 L128,278 L121,64 Z"/>
            <path fill="#2a1408" d="M101,72 L96,266 L124,266 L119,72 Z"/>
            <path fill="url(#vh-woodNeck)" stroke="#3a0f08" stroke-width="2" d="M97,30 L92,64 L128,64 L123,30 Z"/>
            <path fill="#2a1408" d="M99,36 L95,60 L125,60 L121,36 Z"/>
            <!-- Scroll -->
            <path fill="none" stroke="#6b2415" stroke-width="3.2" stroke-linecap="round" d="M122.5,17.0 L122.0,19.3 L121.0,21.4 L119.4,23.2 L117.5,24.7 L115.3,25.8 L112.8,26.4 L110.4,26.5 L107.9,26.2 L105.7,25.5 L103.7,24.3 L102.1,22.9 L101.0,21.2 L100.3,19.4 L100.1,17.5 L100.4,15.7 L101.1,14.0 L102.2,12.5 L103.7,11.3 L105.4,10.4 L107.3,9.9 L109.2,9.7 L111.1,9.9 L112.8,10.4 L114.3,11.2 L115.6,12.2 L116.5,13.5 L117.1,14.8 L117.3,16.2 L117.2,17.6 L116.7,18.8 L115.9,19.9 L114.8,20.9 L113.6,21.5 L112.3,22.0 L111.0,22.1 L109.6,22.0 L108.4,21.7"/>
            <circle cx="111" cy="17" r="1.6" fill="#3a0f08"/>
            <path fill="none" stroke="#6b2415" stroke-width="3.2" stroke-linecap="round" d="M100.1,17.5 C95,20 92,26 92,30"/>
            <path fill="none" stroke="#6b2415" stroke-width="3.2" stroke-linecap="round" d="M122.5,17.0 C127,20 128,26 128,30"/>
            <!-- Pegs -->
            <ellipse cx="78" cy="38" rx="9" ry="4.5" fill="url(#vh-peg)" stroke="#1a0e04"/>
            <ellipse cx="78" cy="58" rx="9" ry="4.5" fill="url(#vh-peg)" stroke="#1a0e04"/>
            <ellipse cx="142" cy="44" rx="9" ry="4.5" fill="url(#vh-peg)" stroke="#1a0e04"/>
            <ellipse cx="142" cy="64" rx="9" ry="4.5" fill="url(#vh-peg)" stroke="#1a0e04"/>
            <!-- F-holes -->
            <g fill="#2a1408">
              <path d="M165,422 C156,427 158,438 151,445 C158,452 152,464 160,470 C153,471 146,465 148,456 C150,447 143,443 148,436 C153,429 160,424 165,422 Z"/>
              <circle cx="167" cy="416" r="3.6"/>
              <circle cx="158" cy="477" r="3.6"/>
              <path d="M55,422 C64,427 62,438 69,445 C62,452 68,464 60,470 C67,471 74,465 72,456 C70,447 77,443 72,436 C67,429 60,424 55,422 Z"/>
              <circle cx="53" cy="416" r="3.6"/>
              <circle cx="62" cy="477" r="3.6"/>
            </g>
            <!-- Bridge -->
            <path fill="#e8d9bf" stroke="#a9926c" stroke-width="1" d="M86,488 C86,478 96,473 110,473 C124,473 134,478 134,488 L134,497 C125,497 125,490 116,490 L104,490 C95,490 95,497 86,497 Z"/>
            <!-- Tailpiece -->
            <path fill="#1c0e04" stroke="#3a1d08" stroke-width="1" d="M96,497 L124,497 L113,575 C111,581 109,581 107,575 Z"/>
            <!-- Strings -->
            <line x1="100" y1="14" x2="103" y2="497" stroke="#e8d9bf" stroke-width="0.8" opacity="0.85"/>
            <line x1="106" y1="14" x2="107.5" y2="497" stroke="#e8d9bf" stroke-width="0.8" opacity="0.85"/>
            <line x1="114" y1="14" x2="112.5" y2="497" stroke="#e8d9bf" stroke-width="0.8" opacity="0.85"/>
            <line x1="120" y1="14" x2="117" y2="497" stroke="#e8d9bf" stroke-width="0.8" opacity="0.85"/>

            <!-- HOTSPOT AREAS — invisible click targets -->
            <circle
              v-for="h in hotspots" :key="h.key"
              :cx="h.cx" :cy="h.cy" :r="h.r"
              fill="transparent"
              class="hotspot-target"
              @mouseenter="activeHotspot = h.key"
              @click="openHotspot(h)"
              :aria-label="h.label"
              role="button"
            />

            <!-- HOTSPOT DOTS — visible pulses -->
            <g v-for="h in hotspots" :key="'dot-' + h.key">
              <circle
                :cx="h.cx" :cy="h.cy" r="7"
                fill="white" opacity="0.9"
                class="hotspot-dot"
                :class="{ 'hotspot-active': activeHotspot === h.key }"
                @mouseenter="activeHotspot = h.key"
                @click="openHotspot(h)"
              />
              <circle
                :cx="h.cx" :cy="h.cy" r="13"
                fill="none" stroke="white" stroke-width="1.5"
                opacity="0.5"
                class="hotspot-ring"
              />
            </g>
          </g>
        </svg>

        <!-- Hotspot tooltip — positioned absolutely over violin -->
        <Transition name="tip">
          <div
            v-if="activeHotspot"
            class="hs-tooltip"
            :style="tooltipStyle"
          >
            {{ hotspots.find(h => h.key === activeHotspot)?.label }}
          </div>
        </Transition>
      </div>
    </section>

    <!-- Hotspot detail panel -->
    <Transition name="panel">
      <div v-if="panel.open" class="side-panel">
        <button class="panel-close" @click="panel.open = false">✕</button>
        <div class="panel-img-wrap">
          <img :src="panel.image" :alt="panel.name" class="panel-img" @error="e => e.target.style.display='none'" />
        </div>
        <div class="panel-body">
          <h3>{{ panel.name }}</h3>
          <p class="panel-short">{{ panel.short }}</p>
          <hr class="panel-hr">
          <p class="panel-long">{{ panel.long }}</p>
        </div>
      </div>
    </Transition>
    <div v-if="panel.open" class="panel-backdrop" @click="panel.open = false"></div>

    <!-- Marquee -->
    <div class="marquee-wrap">
      <div class="marquee">
        <span v-for="(item,i) in [...marquee,...marquee]" :key="i" class="mi">
          {{ item.text }} <span class="ma">— {{ item.author }}</span> <span class="ms">◆</span>
        </span>
      </div>
    </div>

    <!-- Task cards -->
    <section class="tasks">
      <div class="sec-hd">
        <h2>Three Ways to <em>Explore</em></h2>
        <p>Each task uses a different combination of camera, voice, and touch</p>
      </div>
      <div class="tgrid">
        <div
          v-for="t in tasks" :key="t.key" class="tcard"
          @click="playSound(); navigateTo(t.link)"
          role="button" tabindex="0"
          @keydown.enter="navigateTo(t.link)"
        >
          <span class="t-icon">{{ t.icon }}</span>
          <span class="t-num">{{ t.num }}</span>
          <h3>{{ t.title }}</h3>
          <p>{{ t.desc }}</p>
          <span class="tarr">→</span>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="process">
      <div class="sec-hd">
        <h2>From Tree to <em>Violin</em></h2>
        <p>Four stages, spanning years of waiting and months of craftsmanship</p>
      </div>
      <div class="pgrid">
        <div v-for="s in stages" :key="s.num" class="pcard">
          <span class="p-num">{{ s.num }}</span>
          <h3>{{ s.title }}</h3>
          <span class="p-duration">{{ s.duration }}</span>
          <p>{{ s.desc }}</p>
        </div>
      </div>
      <blockquote class="workshop-quote">
        "Everything is judged by feel and eye, not fixed measurement."
        <cite>— Ralf Jönke, Violin maker, Cremona</cite>
      </blockquote>
    </section>

    <footer class="home-footer">
      <p>THE VIOLIN WORKSHOP ~ CREMONSTERS</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Force full page reload when navigating back to home
onMounted(() => {
  window.scrollTo(0, 0)
})

const activeHotspot = ref(null)

const hotspots = [
  {
    key: 'scroll', label: 'Scroll', cx: 111, cy: 32,  r: 22,
    name: 'The Scroll',
    short: "The maker's artistic signature — carved entirely by hand.",
    long: "The scroll is carved using gouges and a Japanese restoration saw. It serves no acoustic function but is the maker's personal signature — expert luthiers can identify who made a violin just by examining the scroll shape and the depth of its chamfer.",
    image: '/images/violin scroll.jpg',
    tipX: '50%', tipY: '5%'
  },
  {
    key: 'fholes', label: 'F-holes', cx: 110, cy: 430, r: 28,
    name: 'F-holes',
    short: 'Two asymmetric openings that project sound outward.',
    long: "Cut with a knife after the top plate is graduated. Their precise position affects tone projection more than almost any other single decision. The inner notches of the f-holes mark exactly where the bridge feet must sit.",
    image: '/images/zoomed violin.jpg',
    tipX: '60%', tipY: '55%'
  },
  {
    key: 'bridge', label: 'Bridge', cx: 110, cy: 490, r: 22,
    name: 'The Bridge',
    short: 'Transmits string vibration to the body — never glued, held only by string tension.',
    long: "Cut from aged Bosnian maple. The luthier carves the feet to perfectly match the arch of the top plate — a process that takes 1 to 2 hours per bridge. Its position is adjusted by ear, sliding it millimetre by millimetre until the tone locks in.",
    image: '/images/bridge.jpg',
    tipX: '60%', tipY: '65%'
  },
]

const panel = reactive({ open: false, name: '', short: '', long: '', image: '' })

function openHotspot(h) {
  Object.assign(panel, { open: true, name: h.name, short: h.short, long: h.long, image: h.image })
  playSound()
}

const tooltipStyle = computed(() => {
  const h = hotspots.find(h => h.key === activeHotspot.value)
  if (!h) return {}
  return { left: h.tipX, top: h.tipY }
})

const marquee = [
  { text: '"The true mission of the violin is to imitate the accents of the human voice."', author: 'Charles-Auguste de Bériot' },
  { text: '"The soul is like a violin string: it makes music only when it is stretched."', author: 'Neal A. Maxwell' },
  { text: '"There is a real communication between voice and violin."', author: 'Itzhak Perlman' },
]

const tasks = [
  { key:'camera', num:'01', icon:'📷', title:'Point & Ask',    desc:'Aim your camera at any violin part. The system identifies it and answers your questions.', link:'/point-and-ask' },
  { key:'tools',  num:'02', icon:'🔍', title:'Identify Tools', desc:'Tap any tool on the workbench. The grounding loop resolves ambiguity and reveals its story.', link:'/identify-tools' },
  { key:'tour',   num:'03', icon:'🎻', title:'Guided Tour',    desc:'Walk through all 8 stages of making a Cremonese violin, with questions at every step.',  link:'/tour' },
]

const stages = [
  { num:'01', title:'Wood Selection', duration:'10–20 years', desc:"Spruce for the top, maple for the back and neck — aged for decades before any tool touches it." },
  { num:'02', title:'Woodworking',    duration:'80–120 hours', desc:"Ribs are bent over a heated iron, plates are graduated by hand, the scroll carved from solid maple." },
  { num:'03', title:'Varnishing',     duration:'1–3 months', desc:"4 to 15 ultra-thin coats of oil varnish, each left to dry for days or weeks before the next." },
  { num:'04', title:'The Setup',      duration:'10–15 hours', desc:"Bridge, pegs, fingerboard and sound post are fitted with millimetre precision." },
]

function playSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const freq = 392
    ;[1,2,3,4,5].forEach((h,i) => {
      const w = [1,0.45,0.2,0.1,0.05]
      const osc = ctx.createOscillator(), g = ctx.createGain()
      osc.connect(g); g.connect(ctx.destination)
      osc.type = 'sine'; osc.frequency.value = freq * h
      g.gain.setValueAtTime(0, ctx.currentTime)
      g.gain.linearRampToValueAtTime(0.055 * w[i], ctx.currentTime + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2)
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 2.2)
    })
  } catch(e) {}
}
</script>

<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#f5f0eb;color:#2c1810}

/* ── HERO ── */
.hero{
  min-height:100vh;
  background:linear-gradient(160deg,#2c1810 0%,#8B4513 55%,#c8860a 100%);
  display:grid; grid-template-columns:1fr 1fr; overflow:hidden;
}
.hero-text{
  grid-column:1; display:flex; flex-direction:column; justify-content:center;
  padding:60px 40px 60px 64px; z-index:10;
}
.hero-eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,239,228,.45);margin-bottom:20px}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(44px,5.5vw,80px);font-weight:700;color:white;line-height:1.0;margin-bottom:18px;text-shadow:0 2px 28px rgba(0,0,0,.45)}
.hero-title em{font-style:italic;color:#f5d090;font-weight:400}
.hero-sub{font-size:15px;color:rgba(245,239,228,.7);line-height:1.75;margin-bottom:24px;font-weight:300;max-width:480px}
.hero-link{display:inline-flex;align-items:center;gap:6px;color:#f5d090;font-size:14px;font-weight:600;text-decoration:none;border-bottom:1px solid rgba(245,208,144,.35);padding-bottom:4px;width:fit-content;transition:all .22s;}
.hero-link:hover{color:white;border-color:white}

/* ── VIOLIN ── */
.violin-container{
  grid-column:2; position:relative; height:100%; width:100%;
  display:flex; align-items:center; justify-content:center;
  padding:40px; overflow:visible;
}
.violin-svg{width:100%;height:100%;display:block;overflow:visible;max-height:90vh}

/* Hotspot interaction */
.hotspot-target{cursor:pointer;}
.hotspot-dot{
  cursor:pointer; transition:all .2s;
  filter:drop-shadow(0 0 6px rgba(255,255,255,0.9));
}
.hotspot-dot.hotspot-active{r:10; filter:drop-shadow(0 0 12px rgba(200,134,10,1));}
.hotspot-ring{animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{r:13;opacity:.5}50%{r:20;opacity:0}}

/* Tooltip */
.hs-tooltip{
  position:absolute; transform:translate(-50%,-130%);
  background:rgba(44,24,16,.95); color:#f5d090;
  font-family:'Inter',sans-serif; font-size:12px; font-weight:600;
  letter-spacing:.1em; text-transform:uppercase;
  padding:5px 14px; border-radius:20px; pointer-events:none;
  white-space:nowrap; border:1px solid rgba(200,134,10,.4);
  z-index:20;
}
.tip-enter-active,.tip-leave-active{transition:opacity .15s}
.tip-enter-from,.tip-leave-to{opacity:0}

/* ── SIDE PANEL ── */
.panel-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:290;}
.side-panel{
  position:fixed;right:0;top:0;bottom:0;width:360px;
  background:white;border-left:1px solid #ede5d8;
  box-shadow:-8px 0 32px rgba(0,0,0,.18);
  display:flex;flex-direction:column;z-index:300;overflow-y:auto;
}
.panel-close{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.9);border:none;color:#555;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;z-index:10;box-shadow:0 2px 8px rgba(0,0,0,.15)}
.panel-close:hover{background:white;color:#2c1810}
.panel-img-wrap{width:100%;height:220px;background:#2c1810;overflow:hidden;flex-shrink:0}
.panel-img{width:100%;height:100%;object-fit:cover;display:block}
.panel-body{padding:24px}
.panel-body h3{font-family:'Playfair Display',serif;font-size:26px;color:#2c1810;margin-bottom:8px}
.panel-short{font-size:14px;color:#888;margin-bottom:14px;line-height:1.6}
.panel-hr{border:none;height:1px;background:#f0e8e0;margin-bottom:14px}
.panel-long{font-size:14px;color:#555;line-height:1.8}
.panel-enter-active,.panel-leave-active{transition:transform .35s cubic-bezier(.16,1,.3,1)}
.panel-enter-from,.panel-leave-to{transform:translateX(100%)}

/* ── MARQUEE ── */
.marquee-wrap{background:#8B4513;padding:13px 0;overflow:hidden}
.marquee{display:flex;white-space:nowrap;animation:mq 60s linear infinite}
.mi{font-size:13px;color:rgba(255,255,255,.75);padding:0 28px;font-weight:300;font-family:'Playfair Display',serif;font-style:italic}
.ma{font-style:normal;font-family:'Inter',sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-left:4px}
.ms{color:rgba(255,255,255,.25);font-size:7px;vertical-align:middle;margin-left:14px}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ── TASKS ── */
.tasks{background:#f5f0eb;padding:70px 40px}
.sec-hd{text-align:center;max-width:560px;margin:0 auto 48px}
.sec-hd h2{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#2c1810;margin-bottom:10px}
.sec-hd h2 em{font-style:italic;color:#8B4513;font-weight:400}
.sec-hd p{font-size:14px;color:#999;font-weight:300}
.tgrid{max-width:960px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.tcard{background:white;border-radius:20px;padding:30px 22px;box-shadow:0 2px 12px rgba(0,0,0,.06);border:1px solid #ede5d8;cursor:pointer;position:relative;overflow:hidden;transition:all .28s}
.tcard:hover{transform:translateY(-6px);box-shadow:0 12px 32px rgba(139,69,19,.14);border-color:#c8860a}
.tcard:hover .tarr{opacity:1;transform:translateX(0)}
.t-icon{font-size:32px;margin-bottom:14px;display:block}
.t-num{position:absolute;top:14px;right:18px;font-family:'Playfair Display',serif;font-size:48px;font-weight:700;color:rgba(44,24,16,.05);line-height:1}
.tcard h3{font-family:'Playfair Display',serif;font-size:20px;color:#2c1810;margin-bottom:8px}
.tcard p{font-size:13px;color:#888;line-height:1.65;margin-bottom:14px}
.tbadge{display:inline-block;font-size:11px;font-weight:600;padding:3px 12px;border-radius:20px}
.bready{background:#e8f5e9;color:#2e7d32}
.tarr{position:absolute;bottom:18px;right:18px;font-size:18px;color:#8B4513;opacity:0;transform:translateX(-8px);transition:all .22s}

/* ── PROCESS ── */
.process{background:white;padding:70px 40px;border-top:1px solid #ede5d8}
.pgrid{max-width:960px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.pcard{background:#f5f0eb;border-radius:18px;padding:24px 20px;border:1px solid #ede5d8}
.p-num{font-family:'Playfair Display',serif;font-size:34px;font-weight:700;color:#c8860a;opacity:.5;display:block;line-height:1;margin-bottom:8px}
.pcard h3{font-family:'Playfair Display',serif;font-size:17px;color:#2c1810;margin-bottom:4px}
.p-duration{display:inline-block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#8B4513;font-weight:600;margin-bottom:10px}
.pcard p{font-size:12.5px;color:#888;line-height:1.6}
.workshop-quote{max-width:680px;margin:48px auto 0;text-align:center;font-family:'Playfair Display',serif;font-size:19px;font-style:italic;color:#5a3a20;line-height:1.6;}
.workshop-quote cite{display:block;margin-top:10px;font-size:12px;font-style:normal;letter-spacing:.06em;color:#aaa}

/* ── FOOTER ── */
.home-footer{background:#2c1810;padding:22px;text-align:center;color:rgba(255,255,255,.4);font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:500}

@media(max-width:768px){
  .hero{grid-template-columns:1fr;grid-template-rows:auto auto}
  .hero-text{padding:40px 24px 10px}
  .violin-container{grid-column:1;height:65vh;padding:16px}
  .tgrid{grid-template-columns:1fr}
  .pgrid{grid-template-columns:1fr 1fr;gap:12px}
  .side-panel{width:100%}
}
</style>