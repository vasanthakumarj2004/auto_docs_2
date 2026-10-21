/**
 * Motion study: reference_video.mp4, 0–3.4s before its product-view transition.
 * The data plane travels left/down at about 130/40 reference pixels per second.
 * Tiles, labels, junctions and routes share that camera; pulses move independently.
 * The original video includes foreground UI, so this reconstructs its background
 * instead of placing a recording of the page behind the live page.
 */
const WIDTH = 1106;
const HEIGHT = 910;
const TILE = 230;
const SPEED = 128;
const PERIOD = TILE * 16;
const TAU = Math.PI * 2;

type Point = { x: number; y: number };

const modulo = (value: number, size: number) => ((value % size) + size) % size;
const seed = (column: number, row: number) => {
  const value = Math.sin(modulo(column, 16) * 127.1 + row * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

// Oblique projection keeps lettering and tiles on the same tilted ledger plane.
const project = (u: number, v: number, camera: number): Point => ({
  x: u - camera + v * 0.56,
  y: 390 - (u - camera) * 0.31 + v * 0.67,
});

const path = (ctx: CanvasRenderingContext2D, points: Point[]) => {
  ctx.beginPath();
  points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
};

function glow(ctx: CanvasRenderingContext2D, p: Point, radius: number, opacity: number, mint = true) {
  const rgb = mint ? '126,255,224' : '222,249,255';
  const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5);
  gradient.addColorStop(0, `rgba(${rgb},${opacity * 0.65})`);
  gradient.addColorStop(0.25, `rgba(${rgb},${opacity * 0.2})`);
  gradient.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(p.x - radius * 5, p.y - radius * 5, radius * 10, radius * 10);
  ctx.beginPath();
  ctx.ellipse(p.x, p.y, radius, radius * 0.55, -0.28, 0, TAU);
  ctx.fillStyle = `rgba(230,255,251,${opacity})`;
  ctx.fill();
}

function tile(ctx: CanvasRenderingContext2D, u: number, v: number, camera: number, column: number, row: number) {
  const n = seed(column, row);
  const origin = project(u, v, camera);
  if (origin.x < -350 || origin.x > WIDTH + 200 || origin.y < -180 || origin.y > HEIGHT + 200) return;
  const corners = [project(u, v, camera), project(u + TILE - 5, v, camera), project(u + TILE - 5, v + TILE - 5, camera), project(u, v + TILE - 5, camera)];
  path(ctx, corners);
  ctx.closePath();
  ctx.fillStyle = n > 0.82 ? 'rgba(40,180,159,0.14)' : `rgba(135,181,202,${0.035 + n * 0.065})`;
  ctx.fill();
  ctx.strokeStyle = 'rgba(162,210,225,0.085)';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  const center = project(u + 28, v + 85, camera);
  const soft = center.y < 200 ? 2.8 : center.y > 800 ? 2.4 : 0.35;
  ctx.save();
  ctx.translate(center.x, center.y);
  ctx.transform(1, -0.31, 0.56, 0.67, 0, 0);
  ctx.filter = `blur(${soft}px)`;
  ctx.fillStyle = n > 0.7 ? 'rgba(98,239,203,0.7)' : 'rgba(220,243,248,0.64)';
  ctx.font = `600 ${n > 0.55 ? 29 : 21}px Arial, sans-serif`;
  const values = ['51,335', '-30.243', '189.545', '49,918', '10,448', '8.73%', '14,239', '20,681'];
  ctx.fillText(values[Math.floor(n * values.length)], 0, 0);
  ctx.fillStyle = 'rgba(101,235,203,0.3)';
  if (n > 0.45) ctx.fillRect(0, 13, 24 + n * 46, 5);
  ctx.restore();

  ctx.fillStyle = 'rgba(207,242,247,0.35)';
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, 1.6, 0, TAU);
  ctx.fill();
}

function documentNode(ctx: CanvasRenderingContext2D, point: Point, kind: number, time: number) {
  ctx.save();
  ctx.translate(point.x, point.y - 5 - Math.sin(time * 1.2 + kind) * 2);
  ctx.transform(1, -0.31, 0.56, 0.67, 0, 0);
  ctx.shadowColor = 'rgba(1,21,34,0.45)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = 'rgba(113,160,176,0.95)';
  ctx.beginPath();
  ctx.roundRect(-29, -25, 65, 56, 10);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = 'rgba(200,242,246,0.42)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = 'rgba(224,250,250,0.92)';
  if (kind % 2) {
    ctx.fillRect(-14, -10, 24, 19);
    ctx.fillRect(11, -4, 11, 13);
    ctx.fillStyle = '#426c7b';
    ctx.fillRect(13, -2, 6, 5);
    ctx.fillStyle = '#dbf9f4';
    for (const x of [-8, 15]) { ctx.beginPath(); ctx.arc(x, 12, 4, 0, TAU); ctx.fill(); }
  } else {
    ctx.beginPath(); ctx.roundRect(-11, -15, 25, 32, 3); ctx.fill();
    ctx.fillStyle = 'rgba(67,122,134,0.8)';
    for (let i = 0; i < 3; i++) ctx.fillRect(-6, -8 + i * 7, 15 - i * 2, 2);
  }
  ctx.restore();
}

function routePoint(u: number, lane: number, camera: number): Point {
  const v = 260 + lane * 235 + Math.sin((u / PERIOD) * TAU * 3 + lane * 1.6) * 180
    + Math.sin((u / PERIOD) * TAU * 6 + lane) * 44;
  return project(u, v, camera);
}

export function drawHeroStageFrame(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  if (!width || !height) return;
  ctx.save();
  const scale = Math.max(width / WIDTH, height / HEIGHT);
  ctx.scale(scale, scale);
  ctx.translate(0, (height / scale - HEIGHT) / 2);
  // Keep camera distance continuous: resetting it would make junctions jump.
  const camera = time * SPEED;
  const firstColumn = Math.floor((camera - 1400) / TILE);
  // Draw back to front: a shared camera moves every surface feature coherently.
  for (let row = -7; row < 7; row++) {
    for (let column = firstColumn; column < firstColumn + 16; column++) {
      tile(ctx, column * TILE, row * TILE, camera, column, row);
    }
  }

  for (let lane = -2; lane <= 2; lane++) {
    const points: Point[] = [];
    for (let u = camera - 1300; u <= camera + 1600; u += 12) points.push(routePoint(u, lane, camera));
    path(ctx, points);
    ctx.strokeStyle = lane === 0 || lane === 1 ? 'rgba(100,235,215,0.14)' : 'rgba(207,235,242,0.06)';
    ctx.lineWidth = lane === 0 ? 11 : 6;
    ctx.stroke();
    ctx.strokeStyle = lane === 0 || lane === 1 ? 'rgba(140,249,226,0.72)' : 'rgba(202,231,240,0.32)';
    ctx.lineWidth = lane === 0 ? 2.6 : 1.5;
    ctx.stroke();

    const start = Math.floor((camera - 1300) / 340);
    for (let index = start; index < start + 10; index++) {
      const p = routePoint(index * 340, lane, camera);
      if (p.x < -80 || p.x > WIDTH + 80 || p.y < -80 || p.y > HEIGHT + 80) continue;
      const opacity = 0.62 + Math.sin(time * 2 + index + lane) * 0.16;
      glow(ctx, p, lane === 0 ? 5 : 3.4, opacity, lane >= 0);
      if (lane === 0 && modulo(index, 3) === 1) documentNode(ctx, p, modulo(index, 6), time);
    }

    // Bright packets travel along the curves, independent of the plane's drift.
    for (let packet = -1; packet < 4; packet++) {
      const u = camera - 1000 + modulo(time * (170 + lane * 13) + packet * 690 + lane * 120, 2900);
      const p = routePoint(u, lane, camera);
      if (p.x < -50 || p.x > WIDTH + 50 || p.y < 0 || p.y > HEIGHT) continue;
      if (lane === 0 || lane === 1) {
        const tail: Point[] = [];
        for (let offset = -48; offset <= 0; offset += 6) tail.push(routePoint(u + offset, lane, camera));
        path(ctx, tail);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(174,255,230,0.5)';
        ctx.stroke();
        glow(ctx, p, 4, 0.9);
      }
    }
  }

  // Out-of-focus foreground particles pass the lens instead of pulsing in place.
  for (let i = 0; i < 20; i++) {
    const x = modulo(i * 193 - time * (48 + i % 4 * 16), WIDTH + 160) - 80;
    const y = modulo(i * 139 + time * (12 + i % 3 * 5), HEIGHT + 160) - 80;
    const radius = 4 + i % 4 * 2;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
    gradient.addColorStop(0, 'rgba(164,233,230,0.15)');
    gradient.addColorStop(1, 'rgba(164,233,230,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius * 2, y - radius * 2, radius * 4, radius * 4);
  }
  ctx.restore();
}
