<template>
  <div class="home">
    <section class="hero">
      <!-- Left text -->
      <div class="hero-text">
        <p class="hero-eyebrow">Cremona · Italy · MITA Project 2025–26</p>
        <h1 class="hero-title">The Violin<br><em>Workshop</em></h1>
        <p class="hero-sub">Discover Cremona's ancient luthier tradition through multimodal interaction.</p>
        <div class="hero-btns">
          <NuxtLink to="/" class="btn-primary">🔍 Explore Tools</NuxtLink>
          <NuxtLink to="/tour" class="btn-secondary">🎻 Guided Tour</NuxtLink>
        </div>
        <p class="drag-hint">← Drag the violin to rotate</p>
      </div>

      <!-- Right: violin -->
      <div class="violin-container" ref="containerEl">
        <canvas ref="canvasEl" class="three-canvas"></canvas>

        <!-- Hotspots positioned by JS -->
        <button
          v-for="h in hotspots" :key="h.key"
          class="hotspot"
          :style="{
            left: h.x+'px',
            top:  h.y+'px',
            opacity: h.visible ? 1 : 0,
            pointerEvents: h.visible ? 'auto' : 'none',
            '--delay': h.delay+'s'
          }"
          @click="onHotspot(h)"
          @mouseenter="hoveredKey = h.key"
          @mouseleave="hoveredKey = null"
        >
          <span class="hs-ring"></span>
          <span class="hs-dot"></span>
          <span class="hs-tip">{{ h.label }}</span>
        </button>
      </div>

      <!-- Loop bar -->
      <div class="loop-bar">
        <div v-for="(s,i) in ['SENSE','INTERPRET','GROUND','ACT']" :key="s"
          class="ls" :class="{active: loopIdx===i, done: loopIdx>i}">
          <span class="ls-dot"></span>{{ s }}
        </div>
      </div>
    </section>

    <!-- MARQUEE -->
    <div class="marquee-wrap">
      <div class="marquee">
        <span v-for="(item,i) in [...marquee,...marquee]" :key="i" class="mi">
          {{ item }} <span class="ms">◆</span>
        </span>
      </div>
    </div>

    <!-- TASKS -->
    <section class="tasks">
      <div class="sec-hd">
        <h2>Three Ways to <em>Explore</em></h2>
        <p>Each task uses a different combination of camera, voice, and touch</p>
      </div>
      <div class="tgrid">
        <div v-for="t in tasks" :key="t.key" class="tcard"
          @click="playSound(); goTo(t.link)">
          <span class="t-icon">{{ t.icon }}</span>
          <span class="t-num">{{ t.num }}</span>
          <h3>{{ t.title }}</h3>
          <p>{{ t.desc }}</p>
          <span class="tbadge" :class="t.ready ? 'bready':'bsoon'">
            {{ t.ready ? 'Ready to explore' : 'Coming soon' }}
          </span>
          <span class="tarr">→</span>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about">
      <div class="about-in">
        <div>
          <p class="eyebrow">About the Workshop</p>
          <h2>Inside <em>Jönke's</em> Workshop<br>in Cremona</h2>
          <p>Every violin takes 200 to 250 hours to make. From selecting Romanian spruce to applying the legendary Cremonese varnish — this app guides you through each stage.</p>
          <div class="stats">
            <div><span class="sn" ref="sn1">0</span><span class="sl">Tools & Parts</span></div>
            <div><span class="sn" ref="sn2">0</span><span class="sl">Tour Stages</span></div>
            <div><span class="sn" ref="sn3">0h</span><span class="sl">Per Violin</span></div>
          </div>
        </div>
        <div class="acard">
          <blockquote>"Everything is judged by feel and eye, not fixed measurement."</blockquote>
          <cite>— Jönke, Luthier, Cremona</cite>
          <div class="atags">
            <span v-for="tag in ['Maple','Spruce','Varnish','Scraper','Bridge','Sound Post']" :key="tag" class="atag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Ready to <em>Discover</em> the Workshop?</h2>
      <p>Tap a tool, ask a question, and let the grounding loop guide you.</p>
      <div class="cta-btns">
        <NuxtLink to="/" class="btn-primary large">Start Exploring →</NuxtLink>
        <NuxtLink to="/tour" class="btn-secondary large">Take the Tour</NuxtLink>
      </div>
    </section>

    <footer class="home-footer">
      <p>The Violin Workshop · MITA Project · Politecnico di Milano · 2025–26</p>
    </footer>

    <!-- PART DETAIL PANEL -->
    <div class="side-panel" :class="{open: panel.open}">
      <button class="pcls" @click="panel.open=false">✕</button>
      <div class="panel-img-wrap">
        <img :src="panel.image" :alt="panel.name" class="panel-img" @error="imgError"/>
        <div class="panel-img-overlay"></div>
        <div class="panel-img-label">{{ panel.task }}</div>
      </div>
      <div class="pbody">
        <h3 class="ptitle">{{ panel.name }}</h3>
        <p class="pshort">{{ panel.short }}</p>
        <hr class="phr">
        <p class="plong">{{ panel.long }}</p>
        <button class="p-explore-btn" @click="goTo(panel.link); panel.open=false">
          Explore this part →
        </button>
        <button class="pbtn-gh" @click="panel.open=false">← Back to violin</button>
      </div>
    </div>

    <!-- Panel backdrop -->
    <div class="panel-backdrop" :class="{show: panel.open}" @click="panel.open=false"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

useHead({
  script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' }]
})

const canvasEl    = ref(null)
const containerEl = ref(null)
const sn1 = ref(null), sn2 = ref(null), sn3 = ref(null)
const loopIdx  = ref(0)
const hoveredKey = ref(null)
let loopTimer

const marquee = ['Bridge','F-holes','Scroll','Ribs','Violin Back','Finger Plane','Scraper','Sound Post','Varnish','UV Cabin','Tuning Peg']

const tasks = [
  { key:'camera', num:'01', icon:'📷', title:'Point & Ask',    desc:'Aim your camera at any violin part. The system identifies it and answers your questions.', ready:false, link:'/' },
  { key:'tools',  num:'02', icon:'🔍', title:'Identify Tools', desc:'Tap any tool on the workbench. The grounding loop resolves ambiguity and reveals its story.', ready:true,  link:'/' },
  { key:'tour',   num:'03', icon:'🎻', title:'Guided Tour',    desc:'Walk through all 8 stages of making a Cremonese violin, with questions at every step.',   ready:true,  link:'/tour' },
]

// ── 5 hotspots — worldPos matched to real violin anatomy ──
// These positions are calibrated to the GLB model's local space
// The violin stands vertically, head at +Y, body at -Y, front face at +Z
const hotspots = reactive([
  {
    key:'scroll',
    label:'Scroll',
    // Top of the violin — the peghead/scroll area
    worldPos: [0.05, 1.95, 0.18],
    delay: 0,
    x:0, y:0, visible:false,
    // Data from violinParts.json
    name: 'Scroll',
    short: "The decorative spiral at the top — the maker's artistic signature.",
    long: "The scroll is carved by hand using gouges and a Japanese restoration saw for the initial rough cut, followed by finer work with chisels. It serves no acoustic function but is the maker's signature — experts can identify a luthier just by the scroll.",
    image: '/images/violin scroll.jpg',
    task: 'Task 1 · Point & Ask',
    taskColor: '#8B4513',
    link: '/?item=scroll',
  },
  {
    key:'fholes',
    label:'F-holes',
    // Upper bout, slightly left, on the face
    worldPos: [-0.38, 0.18, 0.30],
    delay: 0.5,
    x:0, y:0, visible:false,
    name: 'F-holes',
    short: 'Sound holes that let air move in and out of the body.',
    long: "The f-holes are the two f-shaped openings cut into the belly of the violin. They allow air to move freely in and out of the body, essential for projection and tonal richness. They also allow clamps to be inserted during restoration to reglue open seams.",
    image: '/images/zoomed violin.jpg',
    task: 'Task 1 · Point & Ask',
    taskColor: '#8B4513',
    link: '/?item=f-holes',
  },
  {
    key:'bridge',
    label:'Bridge',
    // Center of body, on the face, between the f-holes
    worldPos: [0.12, -0.08, 0.33],
    delay: 1.0,
    x:0, y:0, visible:false,
    name: 'Bridge',
    short: 'Supports the strings and transmits vibrations to the body.',
    long: "The bridge is bought as a rough-cut maple blank and fitted individually to each instrument. The luthier carves the feet to match the exact arch of the top plate, sets the string height, and refines the curves — a process that takes 1 to 2 hours per bridge.",
    image: '/images/bridge.jpg',
    task: 'Task 1 · Point & Ask',
    taskColor: '#8B4513',
    link: '/?item=bridge',
  },
  {
    key:'ribs',
    label:'Ribs',
    // Side of the body — X offset to the right edge
    worldPos: [0.72, -0.55, 0.05],
    delay: 1.5,
    x:0, y:0, visible:false,
    name: 'Ribs',
    short: 'Thin maple strips bent to form the sides of the body.',
    long: "The ribs are thin strips of maple bent into shape using a bending iron — an electrically heated metal cylinder reaching up to 180°C. Each rib is dampened first, then carefully bent freehand. The luthier adjusts constantly by feel, watching for any sign of scorching.",
    image: '/images/ribs 1.jpg',
    task: 'Task 1 · Point & Ask',
    taskColor: '#8B4513',
    link: '/?item=ribs',
  },
  {
    key:'violin-back',
    label:'Violin Back',
    // Back face — Z is negative (behind the model)
    worldPos: [0, -0.6, -0.28],
    delay: 2.0,
    x:0, y:0, visible:false,
    name: 'Violin Back',
    short: 'The back plate, carved from figured maple.',
    long: "The back plate is typically carved from figured maple sourced from Romania and the Balkans. The luthier carves it to a precise arching profile, graduating the thickness from about 4mm at the centre to under 3mm at the edges. The figure in the wood — 'flames' — is purely aesthetic.",
    image: '/images/violin back.jpg',
    task: 'Task 1 · Point & Ask',
    taskColor: '#8B4513',
    link: '/?item=violin-back',
  },
])

const panel = reactive({
  open:false, name:'', short:'', long:'', image:'', task:'', taskColor:'#8B4513', link:'/'
})

function onHotspot(h) {
  playSound()
  Object.assign(panel, {
    open: true,
    name: h.name, short: h.short, long: h.long,
    image: h.image, task: h.task, taskColor: h.taskColor, link: h.link
  })
}

function imgError(e) {
  e.target.style.display = 'none'
}

function goTo(path) {
  navigateTo(path)
}

// Gentle pluck sound
function playSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const freq = 392
    ;[1,2,3,4,5].forEach((h,i) => {
      const w = [1,0.45,0.2,0.1,0.05]
      const osc = ctx.createOscillator(), g = ctx.createGain(), pan = ctx.createStereoPanner()
      osc.connect(g); g.connect(pan); pan.connect(ctx.destination)
      osc.type = 'sine'; osc.frequency.value = freq * h
      g.gain.setValueAtTime(0, ctx.currentTime)
      g.gain.linearRampToValueAtTime(0.055 * w[i], ctx.currentTime + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2)
      pan.pan.value = (Math.random()-0.5)*0.25
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 2.2)
    })
  } catch(e) {}
}

// Three.js
let renderer, scene, cam, violinGroup, hSpheres = []
let rotY = -0.3, tRotY = -0.3, velY = 0
let dragging = false, lastX = 0
let animId
let autoTimer = 0

function initThree() {
  if (!window.THREE) { setTimeout(initThree, 80); return }
  const T = window.THREE
  const canvas    = canvasEl.value
  const container = containerEl.value
  const W = container.clientWidth
  const H = container.clientHeight

  renderer = new T.WebGLRenderer({ canvas, antialias:true, alpha:true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(W, H)
  renderer.outputEncoding  = T.sRGBEncoding
  renderer.toneMapping     = T.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.5
  renderer.shadowMap.enabled   = true

  scene = new T.Scene()

  // Camera
  cam = new T.PerspectiveCamera(36, W/H, 0.1, 100)
  cam.position.set(0, 0.2, 6.8)

  // Lights
  scene.add(new T.AmbientLight(0x6b3010, 3.5))
  const key = new T.DirectionalLight(0xfff0d0, 5.5)
  key.position.set(3,8,6); key.castShadow = true; scene.add(key)
  const fill = new T.DirectionalLight(0xC8860A, 2)
  fill.position.set(-5,2,2); scene.add(fill)
  const rim = new T.DirectionalLight(0xffeedd, 1.8)
  rim.position.set(1,-5,-4); scene.add(rim)
  const pt = new T.PointLight(0xC8860A, 4, 14)
  pt.position.set(2,3,6); scene.add(pt)

  violinGroup = new T.Group()
  scene.add(violinGroup)

  // Load GLB
  const s = document.createElement('script')
  s.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js'
  s.onload = () => {
    new T.GLTFLoader().load('/violin.glb', gltf => {
      const model = gltf.scene
      const box = new T.Box3().setFromObject(model)
      const sz  = box.getSize(new T.Vector3())
      const sc  = 5.5 / Math.max(sz.x, sz.y, sz.z)
      model.scale.setScalar(sc)
      model.position.sub(box.getCenter(new T.Vector3()).multiplyScalar(sc))
      model.traverse(ch => {
        if (ch.isMesh) {
          ch.castShadow = true; ch.receiveShadow = true
          if (ch.material) {
            ch.material.roughness = Math.min(ch.material.roughness ?? 0.3, 0.28)
            ch.material.metalness = ch.material.metalness ?? 0.05
            ch.material.envMapIntensity = 1.5
          }
        }
      })
      violinGroup.add(model)
    }, undefined, () => buildFallback(T))
  }
  s.onerror = () => buildFallback(T)
  document.head.appendChild(s)

  // Hotspot spheres
  const hGeo = new T.SphereGeometry(0.12, 12, 12)
  const rGeo = new T.TorusGeometry(0.13, 0.015, 8, 32)
  hotspots.forEach((h, i) => {
    const hMat = new T.MeshStandardMaterial({ color:0xffffff, emissive:0xffffff, emissiveIntensity:2.8, roughness:0.05 })
    const sp = new T.Mesh(hGeo, hMat)
    sp.position.set(...h.worldPos)
    sp.userData = { key:h.key, index:i }
    violinGroup.add(sp)

    const rMat = new T.MeshStandardMaterial({ color:0xffffff, emissive:0xffffff, emissiveIntensity:2, transparent:true, opacity:0.5 })
    const ring = new T.Mesh(rGeo, rMat)
    ring.position.set(...h.worldPos)
    violinGroup.add(ring)

    hSpheres.push({ sp, ring, key:h.key, index:i })
  })

  // Raycaster for click
  const ray = new T.Raycaster()
  const m2  = new T.Vector2()
  function ndcFromEvent(e) {
    const r = canvas.getBoundingClientRect()
    m2.x =  (e.clientX - r.left) / r.width  * 2 - 1
    m2.y = -((e.clientY - r.top) / r.height) * 2 + 1
  }
  // DEBUG: double-click anywhere on violin to get local coordinates
  canvas.addEventListener('dblclick', e => {
    ndcFromEvent(e)
    ray.setFromCamera(m2, cam)
    const allMeshes = []
    violinGroup.traverse(c => { if (c.isMesh) allMeshes.push(c) })
    const hits = ray.intersectObjects(allMeshes, false)
    if (hits.length) {
      const worldPt = hits[0].point.clone()
      const localPt = violinGroup.worldToLocal(worldPt)
      const msg = `[${localPt.x.toFixed(3)}, ${localPt.y.toFixed(3)}, ${localPt.z.toFixed(3)}]`
      console.log('HOTSPOT COORDS:', msg)
      alert('Coords (copy these):\n' + msg)
    }
  })

  canvas.addEventListener('click', e => {
    ndcFromEvent(e)
    ray.setFromCamera(m2, cam)
    const hits = ray.intersectObjects(hSpheres.map(h=>h.sp))
    if (hits.length) {
      const idx = hits[0].object.userData.index
      onHotspot(hotspots[idx])
    }
  })

  // ── DRAG — LEFT/RIGHT ONLY (Y axis) ──
  const el = container

  function onStart(cx) {
    dragging = true; lastX = cx; velY = 0; autoTimer = 0
    el.style.cursor = 'grabbing'
  }
  function onMove(cx) {
    if (!dragging) return
    const dx = cx - lastX
    velY = dx * 0.013
    tRotY += dx * 0.013
    lastX = cx
  }
  function onEnd() {
    dragging = false; autoTimer = 0
    el.style.cursor = 'grab'
  }

  el.addEventListener('mousedown', e => { e.preventDefault(); onStart(e.clientX) })
  window.addEventListener('mousemove', e => onMove(e.clientX))
  window.addEventListener('mouseup',   onEnd)

  el.addEventListener('touchstart', e => { e.preventDefault(); onStart(e.touches[0].clientX) }, {passive:false})
  el.addEventListener('touchmove',  e => { e.preventDefault(); onMove(e.touches[0].clientX)  }, {passive:false})
  el.addEventListener('touchend',   onEnd)

  // Hover cursor
  canvas.addEventListener('mousemove', e => {
    if (dragging) return
    ndcFromEvent(e)
    ray.setFromCamera(m2, cam)
    const hits = ray.intersectObjects(hSpheres.map(h=>h.sp))
    el.style.cursor = hits.length ? 'pointer' : 'grab'
  })

  // Resize
  const onResize = () => {
    const W2 = container.clientWidth, H2 = container.clientHeight
    cam.aspect = W2/H2; cam.updateProjectionMatrix()
    renderer.setSize(W2, H2)
  }
  window.addEventListener('resize', onResize)

  const clock = new T.Clock()
  function tick() {
    animId = requestAnimationFrame(tick)
    const t  = clock.getElapsedTime()
    const dt = clock.getDelta()

    // Inertia + auto-rotate
    if (!dragging) {
      autoTimer += dt
      velY *= 0.94
      tRotY += velY
      if (autoTimer > 3) tRotY += 0.003   // slow auto spin
    }

    // Smooth damping — Y ONLY
    rotY += (tRotY - rotY) * 0.1
    violinGroup.rotation.y = rotY
    // NO position.y change → no size oscillation
    violinGroup.position.y = 0

    // Pulse hotspot rings only (no sphere scale change → dots stay same size)
    hSpheres.forEach((h, i) => {
      h.ring.scale.setScalar(1 + 0.5 * Math.abs(Math.sin(t * 1.8 + i * 1.4)))
      h.ring.material.opacity = 0.1 + 0.5 * Math.abs(Math.sin(t * 1.8 + i * 1.4))
      h.ring.rotation.z = t * 0.6
    })

    // Project each hotspot world pos → screen pos
    const rect = container.getBoundingClientRect()
    hSpheres.forEach((h, i) => {
      // Transform the fixed local-space position by the current rotation
      const wp = new T.Vector3(...hotspots[i].worldPos)
      wp.applyEuler(new T.Euler(0, rotY, 0, 'YXZ'))  // only Y rotation

      const proj = wp.clone().project(cam)
      // Behind camera check: proj.z > 1 means behind
      const visible = proj.z < 0.999 && proj.z > -1

      hotspots[i].x       = ((proj.x + 1) / 2) * rect.width
      hotspots[i].y       = ((-proj.y + 1) / 2) * rect.height
      hotspots[i].visible = visible
    })

    renderer.render(scene, cam)
  }
  tick()
}

function buildFallback(T) {
  // Simple violin geometry if GLB fails
  const bm = new T.MeshStandardMaterial({ color:0x8B4010, roughness:0.22, metalness:0.06 })
  const mm = new T.MeshStandardMaterial({ color:0x7A3E22, roughness:0.28 })
  const em = new T.MeshStandardMaterial({ color:0x0a0503, roughness:0.5 })
  const gm = new T.MeshStandardMaterial({ color:0xC8860A, roughness:0.18, metalness:0.65 })

  const shape = new T.Shape()
  shape.moveTo(0,1.3); shape.bezierCurveTo(1.15,1.3,1.55,0.9,1.5,0.28)
  shape.bezierCurveTo(1.42,-0.12,1.08,-0.22,0.96,-0.32)
  shape.bezierCurveTo(1.08,-0.58,0.84,-0.72,0.84,-0.72)
  shape.bezierCurveTo(0.84,-0.92,0.96,-1.05,1.54,-2.25)
  shape.bezierCurveTo(1.48,-2.85,1.02,-3.18,0,-3.18)
  shape.bezierCurveTo(-1.02,-3.18,-1.48,-2.85,-1.54,-2.25)
  shape.bezierCurveTo(-0.96,-1.05,-0.84,-0.92,-0.84,-0.72)
  shape.bezierCurveTo(-0.84,-0.72,-1.08,-0.58,-0.96,-0.32)
  shape.bezierCurveTo(-1.08,-0.22,-1.42,-0.12,-1.5,0.28)
  shape.bezierCurveTo(-1.55,0.9,-1.15,1.3,0,1.3)

  const geo = new T.ExtrudeGeometry(shape, {depth:0.26,bevelEnabled:true,bevelThickness:0.07,bevelSize:0.05,bevelSegments:5})
  geo.center()
  const body = new T.Mesh(geo, bm); body.position.y=-0.8; body.castShadow=true; violinGroup.add(body)
  const neck = new T.Mesh(new T.CylinderGeometry(0.11,0.16,1.45,10),mm); neck.position.set(0,1.48,0.02); violinGroup.add(neck)
  const fb   = new T.Mesh(new T.BoxGeometry(0.28,1.4,0.08),em); fb.position.set(0,1.48,0.13); violinGroup.add(fb)
  const sc   = new T.Mesh(new T.TorusGeometry(0.19,0.09,10,24,Math.PI*1.65),mm); sc.position.set(0,2.78,0.09); sc.rotation.z=-0.38; violinGroup.add(sc)
  const br   = new T.Mesh(new T.BoxGeometry(0.65,0.35,0.028),gm); br.position.set(0,-0.8,0.26); violinGroup.add(br)
  ;[-0.13,-0.043,0.043,0.13].forEach((sx,i)=>{
    const c=new T.CatmullRomCurve3([new T.Vector3(sx,2.35,0.19),new T.Vector3(sx*0.9,-0.78,0.32),new T.Vector3(sx*0.78,-2.1,0.23)])
    violinGroup.add(new T.Mesh(new T.TubeGeometry(c,24,0.005+i*0.002,5,false),new T.MeshStandardMaterial({color:0xd4a030,metalness:0.75,roughness:0.18})))
  })
}

function animCount(el, target, suffix, dur) {
  if (!el) return; let start=null
  const fn=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/dur,1);el.textContent=Math.round((1-Math.pow(1-p,3))*target)+(suffix||'');if(p<1)requestAnimationFrame(fn)}
  requestAnimationFrame(fn)
}

onMounted(() => {
  initThree()
  loopTimer = setInterval(() => { loopIdx.value=(loopIdx.value+1)%4 }, 1100)
  const st = document.querySelector('.stats')
  if (st) {
    new IntersectionObserver(([e])=>{ if(e.isIntersecting){ animCount(sn1.value,16,'',1400); animCount(sn2.value,8,'',1400); animCount(sn3.value,200,'h',1400) } },{threshold:0.3}).observe(st)
  }
})
onBeforeUnmount(() => {
  clearInterval(loopTimer)
  if (animId) cancelAnimationFrame(animId)
  renderer?.dispose()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#f5f0eb;color:#2c1810}

/* HERO */
.hero{
  height:100vh;
  background:linear-gradient(160deg,#2c1810 0%,#8B4513 55%,#c8860a 100%);
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:1fr auto;
  overflow:hidden;
}

/* Left */
.hero-text{
  grid-column:1;grid-row:1;
  display:flex;flex-direction:column;justify-content:center;
  padding:60px 40px 60px 64px;z-index:10;
}
.hero-eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,239,228,.45);margin-bottom:20px}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(44px,5.5vw,80px);font-weight:700;color:white;line-height:1.0;margin-bottom:18px;text-shadow:0 2px 28px rgba(0,0,0,.45)}
.hero-title em{font-style:italic;color:#f5d090;font-weight:400}
.hero-sub{font-size:15px;color:rgba(245,239,228,.7);line-height:1.75;margin-bottom:28px;font-weight:300}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:18px}
.drag-hint{font-size:11px;color:rgba(245,239,228,.3);letter-spacing:.04em}

/* Right: violin area */
.violin-container{
  grid-column:2;grid-row:1;
  position:relative;cursor:grab;user-select:none;
  height:100%;overflow:hidden;
}
.violin-container:active{cursor:grabbing}
.three-canvas{position:absolute;inset:0;width:100%;height:100%;display:block}

/* Hotspots */
.hotspot{
  position:absolute;width:26px;height:26px;
  transform:translate(-50%,-50%);
  background:none;border:none;padding:0;cursor:pointer;z-index:20;
  display:flex;align-items:center;justify-content:center;
  transition:opacity .3s ease;
}
.hs-ring{
  position:absolute;inset:-5px;
  border:2px solid rgba(255,255,255,.7);border-radius:50%;
  animation:hsp 2s ease-in-out var(--delay, 0s) infinite;
}
.hs-dot{
  width:14px;height:14px;background:white;border-radius:50%;
  box-shadow:0 0 18px rgba(255,255,255,1),0 0 8px rgba(200,134,10,.9);
  z-index:1;transition:transform .2s;flex-shrink:0;
}
.hotspot:hover .hs-dot{transform:scale(1.4)}
.hotspot:hover .hs-tip{opacity:1;transform:translateX(-50%) translateY(0)}
.hs-tip{
  position:absolute;bottom:calc(100%+12px);left:50%;
  transform:translateX(-50%) translateY(8px);
  white-space:nowrap;
  background:rgba(44,24,16,.95);color:#f5d090;
  font-family:'Inter',sans-serif;
  font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  padding:5px 14px;border-radius:20px;pointer-events:none;
  opacity:0;transition:all .2s;
  border:1px solid rgba(200,134,10,.4);
}
@keyframes hsp{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(2.6);opacity:0}}

/* Loop bar */
.loop-bar{grid-column:1/-1;grid-row:2;display:flex;justify-content:center;gap:8px;padding:14px;background:rgba(0,0,0,.28)}
.ls{display:flex;align-items:center;gap:6px;padding:7px 18px;border-radius:20px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.38);font-size:12px;font-weight:500;transition:all .35s}
.ls.active{background:white;color:#2c1810}
.ls.done{background:rgba(200,134,10,.3);color:#f5d090}
.ls-dot{width:6px;height:6px;border-radius:50%;background:currentColor;margin-right:2px}

/* Buttons */
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;background:white;color:#2c1810;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;border:none;border-radius:30px;cursor:pointer;text-decoration:none;transition:all .22s;box-shadow:0 4px 16px rgba(0,0,0,.2)}
.btn-primary:hover{background:#f5ede0;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.25)}
.btn-primary.large{padding:15px 36px;font-size:15px}
.btn-secondary{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;background:rgba(255,255,255,.12);color:white;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;border:2px solid rgba(255,255,255,.35);border-radius:30px;cursor:pointer;text-decoration:none;transition:all .22s}
.btn-secondary:hover{background:rgba(255,255,255,.22);border-color:white;transform:translateY(-2px)}
.btn-secondary.large{padding:15px 36px;font-size:15px}

/* Marquee */
.marquee-wrap{background:#8B4513;padding:11px 0;overflow:hidden}
.marquee{display:flex;white-space:nowrap;animation:mq 22s linear infinite}
.mi{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.6);padding:0 22px;font-weight:400}
.ms{color:rgba(255,255,255,.25);font-size:7px;vertical-align:middle}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* Tasks */
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
.bsoon{background:#f5ede0;color:#8B4513}
.tarr{position:absolute;bottom:18px;right:18px;font-size:18px;color:#8B4513;opacity:0;transform:translateX(-8px);transition:all .22s}

/* About */
.about{background:white;padding:70px 40px;border-top:1px solid #ede5d8}
.about-in{max-width:960px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8B4513;margin-bottom:10px;font-weight:500}
.about h2{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:#2c1810;line-height:1.2;margin-bottom:16px}
.about h2 em{font-style:italic;color:#8B4513;font-weight:400}
.about-in>div>p{font-size:15px;color:#666;line-height:1.8;margin-bottom:26px}
.stats{display:flex;gap:32px}
.sn{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;color:#8B4513;display:block;line-height:1}
.sl{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#aaa;margin-top:3px;display:block}
.acard{background:linear-gradient(135deg,#2c1810 0%,#8B4513 60%,#c8860a 100%);border-radius:20px;padding:32px;color:white}
.acard blockquote{font-family:'Playfair Display',serif;font-size:19px;font-style:italic;line-height:1.6;margin-bottom:12px;color:rgba(255,255,255,.9)}
.acard cite{font-size:12px;opacity:.55;letter-spacing:.06em}
.atags{display:flex;flex-wrap:wrap;gap:7px;margin-top:22px}
.atag{background:rgba(255,255,255,.11);color:rgba(255,255,255,.7);font-size:11px;letter-spacing:.09em;text-transform:uppercase;padding:4px 13px;border-radius:20px;border:1px solid rgba(255,255,255,.14)}

/* CTA */
.cta{background:linear-gradient(135deg,#2c1810 0%,#8B4513 60%,#c8860a 100%);padding:80px 40px;text-align:center}
.cta h2{font-family:'Playfair Display',serif;font-size:clamp(32px,5vw,50px);font-weight:700;color:white;margin-bottom:14px;text-shadow:0 2px 10px rgba(0,0,0,.3)}
.cta h2 em{font-style:italic;color:#f5d090;font-weight:400}
.cta p{font-size:15px;color:rgba(255,255,255,.65);margin-bottom:32px}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.home-footer{background:#2c1810;padding:22px;text-align:center;color:rgba(255,255,255,.28);font-size:11px;letter-spacing:.1em;text-transform:uppercase}

/* SIDE PANEL */
.panel-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:290;opacity:0;pointer-events:none;transition:opacity .3s}
.panel-backdrop.show{opacity:1;pointer-events:auto}
.side-panel{
  position:fixed;right:0;top:0;bottom:0;width:380px;
  background:white;border-left:1px solid #ede5d8;
  box-shadow:-8px 0 32px rgba(0,0,0,.18);
  display:flex;flex-direction:column;
  transform:translateX(100%);
  transition:transform .4s cubic-bezier(.16,1,.3,1);
  z-index:300;overflow-y:auto;
}
.side-panel.open{transform:translateX(0)}
.pcls{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.9);border:none;color:#555;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:10;box-shadow:0 2px 8px rgba(0,0,0,.15)}
.pcls:hover{background:white;color:#2c1810}

/* Panel image */
.panel-img-wrap{position:relative;width:100%;height:240px;flex-shrink:0;background:#2c1810;overflow:hidden}
.panel-img{width:100%;height:100%;object-fit:cover;display:block}
.panel-img-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(44,24,16,.7))}
.panel-img-label{
  position:absolute;bottom:14px;left:18px;
  font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(245,239,228,.8);
  background:rgba(44,24,16,.5);
  padding:4px 10px;border-radius:12px;
  border:1px solid rgba(245,239,228,.2);
}

.pbody{padding:24px}
.ptitle{font-family:'Playfair Display',serif;font-size:28px;color:#2c1810;margin-bottom:8px;line-height:1.1}
.pshort{font-size:14px;color:#888;margin-bottom:16px;line-height:1.6}
.phr{border:none;height:1px;background:#f0e8e0;margin-bottom:16px}
.plong{font-size:14px;color:#555;line-height:1.8;margin-bottom:24px}
.p-explore-btn{
  display:block;width:100%;padding:14px;
  background:#8B4513;color:white;border:none;border-radius:30px;
  font-family:'Inter',sans-serif;font-size:14px;font-weight:600;
  cursor:pointer;transition:all .22s;margin-bottom:10px;text-align:center;
}
.p-explore-btn:hover{background:#6d3410;transform:translateY(-2px)}
.pbtn-gh{width:100%;padding:11px;background:transparent;color:#aaa;border:1px solid #ddd;border-radius:30px;cursor:pointer;font-size:13px;transition:all .2s;font-family:'Inter',sans-serif}
.pbtn-gh:hover{background:#f5f0eb;color:#2c1810}

@media(max-width:768px){
  .hero{grid-template-columns:1fr;grid-template-rows:auto 1fr auto}
  .hero-text{grid-row:1;padding:60px 24px 20px}
  .violin-container{grid-column:1;grid-row:2;height:45vh}
  .loop-bar{grid-row:3;flex-wrap:wrap;gap:6px}
  .tgrid{grid-template-columns:1fr}
  .about-in{grid-template-columns:1fr}
  .side-panel{width:100%}
}
</style>
