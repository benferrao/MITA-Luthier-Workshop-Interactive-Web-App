<template>
  <div class="legacy">
    <section class="legacy-hero">
      <svg class="legacy-bg" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2c1810"/>
            <stop offset="55%" stop-color="#8B4513"/>
            <stop offset="100%" stop-color="#e3a13a"/>
          </linearGradient>
          <radialGradient id="cs-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff3d6" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#fff3d6" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <rect width="800" height="420" fill="url(#cs-sky)"/>
        <circle cx="590" cy="230" r="90" fill="url(#cs-sun)"/>
        <circle cx="590" cy="230" r="34" fill="#fff3d6" opacity="0.85"/>

        <!-- distant rooftops -->
        <g fill="#1f0f06" opacity="0.55">
          <rect x="0"   y="330" width="120" height="60"/>
          <rect x="100" y="310" width="90"  height="80"/>
          <polygon points="60,330 100,300 140,330"/>
          <rect x="640" y="320" width="160" height="70"/>
          <rect x="700" y="295" width="70"  height="95"/>
          <polygon points="690,320 730,290 770,320"/>
        </g>

        <!-- Baptistery (octagonal, domed) -->
        <g fill="#22100a">
          <rect x="170" y="270" width="120" height="120"/>
          <polygon points="170,270 230,225 290,270"/>
          <ellipse cx="230" cy="225" rx="34" ry="14"/>
          <rect x="222" y="200" width="16" height="26"/>
          <circle cx="230" cy="195" r="6"/>
        </g>

        <!-- Cathedral (Duomo) with rose window and campanile -->
        <g fill="#1c0e04">
          <rect x="330" y="250" width="170" height="140"/>
          <polygon points="330,250 415,180 500,250"/>
          <circle cx="415" cy="232" r="20" fill="none" stroke="#e3a13a" stroke-width="4"/>
          <circle cx="415" cy="232" r="20" fill="#e3a13a" opacity="0.18"/>
          <rect x="400" y="350" width="30" height="40" rx="14"/>
          <rect x="500" y="120" width="46" height="270"/>
          <polygon points="500,120 523,90 546,120"/>
          <rect x="514" y="150" width="18" height="34"/>
          <rect x="514" y="210" width="18" height="34"/>
        </g>

        <!-- Torrazzo, Cremona's iconic bell tower -->
        <g fill="#150b05">
          <rect x="600" y="40" width="58" height="350"/>
          <rect x="596" y="100" width="66" height="10"/>
          <rect x="596" y="170" width="66" height="10"/>
          <rect x="596" y="240" width="66" height="10"/>
          <rect x="616" y="55" width="26" height="36" rx="13"/>
          <polygon points="600,40 629,4 658,40"/>
          <circle cx="629" cy="6" r="4"/>
        </g>

        <rect x="0" y="388" width="800" height="32" fill="#150b05"/>
      </svg>

      <div class="legacy-overlay"></div>

      <a href="/" class="back-link">← Home</a>
      <div class="legacy-content">
        <p class="legacy-eyebrow">Cremona · Italy</p>
        <h1 class="legacy-title">The Cremona<br><em>Legacy</em></h1>
        <p class="legacy-text">
          Cremona, a quiet city in Lombardy, became the birthplace of the
          modern violin in the 1500s, when Andrea Amati established the
          proportions and elegant outline that luthiers still follow. A
          century later, Antonio Stradivari (1644–1737) refined the form
          further, working from a single workshop for over six decades and
          producing more than a thousand instruments. He experimented
          constantly — adjusting arching, wood selection, and varnish —
          until his violins reached an acoustic quality still considered
          unsurpassed. Around 650 "Stradivarius" instruments survive today,
          played by leading soloists worldwide. Cremona's luthier tradition,
          recognised by UNESCO, continues unbroken in workshops across the
          city.
        </p>
        <a href="/" class="legacy-cta">Back to the Workshop →</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#f5f0eb;color:#2c1810}

.legacy{min-height:100vh}
.legacy-hero{
  min-height:100vh;
  position:relative;
  display:flex;align-items:center;justify-content:center;
  padding:80px 24px;
  overflow:hidden;
}
.legacy-bg{
  position:absolute;inset:0;
  width:100%;height:100%;
  z-index:0;
}
.legacy-overlay{
  position:absolute;inset:0;
  background:rgba(20,10,5,0.45);
  z-index:1;
}

.back-link{
  position:absolute;top:24px;left:24px;
  color:rgba(255,255,255,.8);text-decoration:none;
  font-size:13px;font-weight:500;letter-spacing:.05em;
  padding:8px 16px;border-radius:20px;
  border:1px solid rgba(255,255,255,.3);
  transition:all .2s;
  z-index:2;
}
.back-link:hover{color:white;border-color:white;background:rgba(255,255,255,.1)}

.legacy-content{max-width:640px;text-align:center;position:relative;z-index:2}
.legacy-eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,239,228,.55);margin-bottom:18px}
.legacy-title{font-family:'Playfair Display',serif;font-size:clamp(40px,7vw,72px);font-weight:700;color:white;line-height:1.05;margin-bottom:28px;text-shadow:0 2px 28px rgba(0,0,0,.55)}
.legacy-title em{font-style:italic;color:#f5d090;font-weight:400}
.legacy-text{font-size:16px;color:rgba(245,239,228,.92);line-height:1.9;font-weight:300;text-align:left;margin-bottom:36px;text-shadow:0 1px 12px rgba(0,0,0,.4)}
.legacy-cta{
  display:inline-flex;align-items:center;gap:8px;
  padding:13px 28px;background:white;color:#2c1810;
  font-size:14px;font-weight:600;border-radius:30px;
  text-decoration:none;transition:all .22s;
  box-shadow:0 4px 16px rgba(0,0,0,.2);
}
.legacy-cta:hover{background:#f5ede0;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.25)}

@media(max-width:600px){
  .legacy-hero{padding:80px 24px 40px}
  .legacy-text{font-size:14.5px;line-height:1.8}
}
</style>