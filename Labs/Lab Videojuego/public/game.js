const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

// Configuración base
const LANES = 4;
const LANE_WIDTH = W / LANES;
const CAR_WIDTH = 32;
const CAR_HEIGHT = 56;
const DASH_HEIGHT = 28;
const DASH_GAP = 22;
const BASE_ROAD_SPEED = 320;
const BASE_SPAWN_INTERVAL = 0.9;

function laneToX(lane) {
  return lane * LANE_WIDTH + (LANE_WIDTH - CAR_WIDTH) / 2;
}

// Estado mutable
let roadSpeed = BASE_ROAD_SPEED;
const player = { lane: 1, y: H - 80 };
let roadOffset = 0;
const enemies = [];
let spawnTimer = 0;
let gameOver = false;
let score = 0;
let scoreSubmitted = false;

function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx &&
         ay < by + bh && ay + ah > by;
}

async function submitScore() {
  if (scoreSubmitted) return;
  scoreSubmitted = true;

  const name = (prompt('GAME OVER\nTu nombre (max 12):', 'ANON') || 'ANON').trim() || 'ANON';

  try {
    const res = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score: Math.floor(score) })
    });
    const top = await res.json();
    console.log('Nuevo top 10:', top);
  } catch (err) {
    console.error('No se pudo enviar el score', err);
  }
}

// --- Input ---
window.addEventListener('keydown', (e) => {
  if (gameOver) {
    if (e.key === ' ') {
      enemies.length = 0;
      spawnTimer = 0;
      gameOver = false;
      player.lane = 1;
      score = 0;
      roadSpeed = BASE_ROAD_SPEED;
      scoreSubmitted = false;
    }
    return;
  }
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    player.lane = Math.max(0, player.lane - 1);
  }
  if (e.key === 'ArrowRight' || e.key === 'd') {
    player.lane = Math.min(LANES - 1, player.lane + 1);
  }
});

function update(dt) {
  if (gameOver) return;

  score += dt * 100;

  // Dificultad creciente
  roadSpeed = BASE_ROAD_SPEED + Math.min(score / 8, 960);

  roadOffset = (roadOffset + roadSpeed * dt) % (DASH_HEIGHT + DASH_GAP);

  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnTimer = Math.max(0.35, BASE_SPAWN_INTERVAL - score / 5000);
    enemies.push({
      lane: Math.floor(Math.random() * LANES),
      y: -CAR_HEIGHT
    });
  }

  for (const e of enemies) {
    e.y += roadSpeed * dt;
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].y > H) enemies.splice(i, 1);
  }

  const px = laneToX(player.lane);
  for (const e of enemies) {
    const ex = laneToX(e.lane);
    if (rectsOverlap(px, player.y, CAR_WIDTH, CAR_HEIGHT,
                     ex, e.y, CAR_WIDTH, CAR_HEIGHT)) {
      gameOver = true;
      submitScore();
      break;
    }
  }
}

function render() {
  // Fondo
  ctx.fillStyle = '#111122';
  ctx.fillRect(0, 0, W, H);

  // Líneas divisorias
  ctx.fillStyle = '#3a3a5a';
  for (let lane = 1; lane < LANES; lane++) {
    const x = lane * LANE_WIDTH - 2;
    for (let y = -DASH_HEIGHT + roadOffset; y < H; y += DASH_HEIGHT + DASH_GAP) {
      ctx.fillRect(x, y, 4, DASH_HEIGHT);
    }
  }

  // Rivales
  ctx.fillStyle = '#ff66cc';
  for (const e of enemies) {
    ctx.fillRect(laneToX(e.lane), e.y, CAR_WIDTH, CAR_HEIGHT);
  }

  // Jugador con glow
  ctx.shadowColor = '#00ffaa';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#00ffaa';
  ctx.fillRect(laneToX(player.lane), player.y, CAR_WIDTH, CAR_HEIGHT);
  ctx.shadowBlur = 0;

  // Score
  ctx.fillStyle = '#00ffaa';
  ctx.font = 'bold 16px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SCORE: ' + Math.floor(score), 10, 24);

  // Indicador de velocidad
  ctx.fillStyle = '#888';
  ctx.font = '12px "Courier New", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('SPEED ' + Math.floor(roadSpeed), W - 10, 22);

  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ff66cc';
    ctx.font = 'bold 28px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', W / 2, H / 2 - 10);

    ctx.fillStyle = '#e0e0ff';
    ctx.font = '14px "Courier New", monospace';
    ctx.fillText('Presiona ESPACIO para reiniciar', W / 2, H / 2 + 20);
  }
}

let lastTime = performance.now();
function loop(now) {
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  update(dt);
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
