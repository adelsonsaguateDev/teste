const fs = require("fs");
const sharp = require("sharp");

// Logo ULTRA INTUITIVO - Mapa com "VOCÊ ESTÁ AQUI" + Seta para sala
const ultraIntuitiveLogo = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563EB"/>
      <stop offset="100%" style="stop-color:#1E40AF"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <!-- Fundo azul -->
  <rect width="512" height="512" rx="90" fill="url(#bg)"/>
  
  <!-- Mapa de papel (fundo branco) -->
  <rect x="56" y="120" width="400" height="320" rx="10" fill="white" filter="url(#shadow)"/>
  
  <!-- Grade do mapa (corredores) -->
  <g opacity="0.3">
    <line x1="156" y1="120" x2="156" y2="440" stroke="#94A3B8" stroke-width="2"/>
    <line x1="256" y1="120" x2="256" y2="440" stroke="#94A3B8" stroke-width="2"/>
    <line x1="356" y1="120" x2="356" y2="440" stroke="#94A3B8" stroke-width="2"/>
    <line x1="56" y1="220" x2="456" y2="220" stroke="#94A3B8" stroke-width="2"/>
    <line x1="56" y1="340" x2="456" y2="340" stroke="#94A3B8" stroke-width="2"/>
  </g>
  
  <!-- Salas (quadrados) -->
  <g>
    <!-- Linha superior de salas -->
    <rect x="80" y="140" width="60" height="60" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <text x="110" y="175" text-anchor="middle" fill="#64748B" font-size="20" font-family="Arial">B1</text>
    
    <rect x="180" y="140" width="60" height="60" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <text x="210" y="175" text-anchor="middle" fill="#64748B" font-size="20" font-family="Arial">B2</text>
    
    <rect x="280" y="140" width="60" height="60" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1"/>
    <text x="310" y="175" text-anchor="middle" fill="#64748B" font-size="20" font-family="Arial">B3</text>
    
    <!-- SALA DESTINO (destacada em verde) -->
    <rect x="372" y="140" width="60" height="60" fill="#10B981" stroke="#059669" stroke-width="3"/>
    <text x="402" y="175" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Arial">A1</text>
  </g>
  
  <!-- VOCÊ ESTÁ AQUI (pin vermelho pulsante) -->
  <g transform="translate(156, 340)">
    <!-- Sombra do pin -->
    <ellipse cx="0" cy="40" rx="20" ry="6" fill="black" opacity="0.2"/>
    
    <!-- Pin vermelho -->
    <path d="M 0 -30 C -20 -30 -35 -15 -35 5 C -35 25 0 50 0 50 S 35 25 35 5 C 35 -15 20 -30 0 -30 Z" 
          fill="#EF4444" stroke="white" stroke-width="3" filter="url(#shadow)"/>
    
    <!-- Centro do pin -->
    <circle cx="0" cy="0" r="12" fill="white"/>
    <circle cx="0" cy="0" r="8" fill="#EF4444"/>
    
    <!-- Texto "VOCÊ" -->
    <rect x="-35" y="-55" width="70" height="20" rx="10" fill="#EF4444"/>
    <text x="0" y="-42" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="Arial">VOCÊ</text>
  </g>
  
  <!-- Seta animada mostrando o caminho -->
  <g>
    <!-- Caminho pontilhado -->
    <line x1="156" y1="340" x2="402" y2="200" 
          stroke="#3B82F6" stroke-width="3" stroke-dasharray="10,5" opacity="0.5"/>
    
    <!-- Seta grande apontando para a sala -->
    <g transform="translate(320, 240) rotate(-30)">
      <path d="M 0 0 L 40 0 L 40 -10 L 60 10 L 40 30 L 40 20 L 0 20 Z" 
            fill="#3B82F6" opacity="0.8"/>
    </g>
  </g>
  
  <!-- Texto explicativo no topo -->
  <text x="256" y="80" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="Arial">LOCALIZADOR DE SALAS</text>
  
  <!-- Legenda embaixo -->
  <g transform="translate(256, 480)">
    <rect x="-100" y="-15" width="200" height="25" rx="12" fill="white" opacity="0.2"/>
    <text x="0" y="-2" text-anchor="middle" fill="white" font-size="16" font-family="Arial">Encontre sua sala de exame</text>
  </g>
</svg>
`;

// Versão super simplificada para ícones pequenos
const simpleLogo = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgSimple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563EB"/>
      <stop offset="100%" style="stop-color:#1E40AF"/>
    </linearGradient>
  </defs>
  
  <rect width="512" height="512" rx="100" fill="url(#bgSimple)"/>
  
  <!-- Mapa simplificado -->
  <rect x="106" y="156" width="300" height="250" rx="20" fill="white"/>
  
  <!-- Pin VOCÊ -->
  <circle cx="200" cy="320" r="35" fill="#EF4444"/>
  <circle cx="200" cy="320" r="15" fill="white"/>
  
  <!-- Sala A1 -->
  <rect x="280" y="200" width="80" height="80" rx="10" fill="#10B981"/>
  <text x="320" y="250" text-anchor="middle" fill="white" font-size="36" font-weight="bold" font-family="Arial">A1</text>
  
  <!-- Seta -->
  <path d="M 220 300 L 280 240" stroke="white" stroke-width="8" stroke-linecap="round"/>
  <path d="M 270 240 L 280 240 L 280 250" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

// Logo alternativo - conceito GPS
const gpsLogo = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="gpsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0EA5E9"/>
      <stop offset="100%" style="stop-color:#2563EB"/>
    </linearGradient>
  </defs>
  
  <rect width="512" height="512" rx="90" fill="url(#gpsGrad)"/>
  
  <!-- Tela de GPS/Mapa -->
  <rect x="76" y="106" width="360" height="300" rx="20" fill="#1E293B" stroke="white" stroke-width="4"/>
  
  <!-- Interface do GPS -->
  <rect x="96" y="126" width="320" height="260" fill="#0F172A"/>
  
  <!-- Ruas do mapa -->
  <g stroke="#334155" stroke-width="2">
    <line x1="96" y1="206" x2="416" y2="206"/>
    <line x1="96" y1="306" x2="416" y2="306"/>
    <line x1="196" y1="126" x2="196" y2="386"/>
    <line x1="316" y1="126" x2="316" y2="386"/>
  </g>
  
  <!-- Rota em destaque -->
  <path d="M 196 306 L 196 206 L 316 206" 
        stroke="#10B981" stroke-width="6" fill="none" 
        stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Ponto inicial (vermelho) -->
  <g transform="translate(196, 306)">
    <circle cx="0" cy="0" r="15" fill="#EF4444" stroke="white" stroke-width="3"/>
    <circle cx="0" cy="0" r="6" fill="white"/>
  </g>
  
  <!-- Ponto final (verde) com "A1" -->
  <g transform="translate(316, 206)">
    <rect x="-25" y="-25" width="50" height="50" rx="8" fill="#10B981" stroke="white" stroke-width="3"/>
    <text x="0" y="8" text-anchor="middle" fill="white" font-size="24" font-weight="bold" font-family="Arial">A1</text>
  </g>
  
  <!-- Indicador de distância -->
  <rect x="106" y="146" width="120" height="40" rx="20" fill="#3B82F6" opacity="0.9"/>
  <text x="166" y="172" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="Arial">50 metros</text>
  
  <!-- Título na tela -->
  <text x="256" y="60" text-anchor="middle" fill="white" font-size="32" font-weight="bold" font-family="Arial">GPS DE SALAS</text>
  
  <!-- Instrução -->
  <rect x="156" y="430" width="200" height="40" rx="20" fill="white" opacity="0.2"/>
  <text x="256" y="455" text-anchor="middle" fill="white" font-size="20" font-family="Arial">Siga a rota verde</text>
</svg>
`;

async function generateIntuitiveLogo() {
  console.log("🗺️  Gerando Logo Ultra Intuitivo - Portal do Candidato\n");
  console.log(
    '📍 Conceito: Mapa visual com "VOCÊ ESTÁ AQUI" e seta para sala\n'
  );

  if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
  }

  try {
    // Salvar todos os SVGs
    fs.writeFileSync("./public/logo.svg", ultraIntuitiveLogo);
    console.log("✅ logo.svg - Logo principal ultra intuitivo");

    fs.writeFileSync("./public/logo-simple.svg", simpleLogo);
    console.log("✅ logo-simple.svg - Versão simplificada");

    fs.writeFileSync("./public/logo-gps.svg", gpsLogo);
    console.log("✅ logo-gps.svg - Versão GPS alternativa");

    // Gerar PNGs
    const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];

    console.log("\n📦 Gerando ícones PNG...\n");

    for (const size of sizes) {
      const svgToUse = size < 128 ? simpleLogo : ultraIntuitiveLogo;

      await sharp(Buffer.from(svgToUse))
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(`./public/icon-${size}.png`);

      console.log(`   ✅ icon-${size}.png`);
    }

    // Arquivos especiais
    console.log("\n🎨 Criando versões especiais...\n");

    // PWA
    await sharp(Buffer.from(ultraIntuitiveLogo))
      .resize(192, 192)
      .png()
      .toFile("./public/icon-192.png");
    console.log("✅ icon-192.png (PWA)");

    await sharp(Buffer.from(ultraIntuitiveLogo))
      .resize(512, 512)
      .png()
      .toFile("./public/icon-512.png");
    console.log("✅ icon-512.png (PWA grande)");

    // Favicon
    await sharp(Buffer.from(simpleLogo))
      .resize(32, 32)
      .png()
      .toFile("./public/favicon.png");
    console.log("✅ favicon.png");

    // Tela de login
    await sharp(Buffer.from(ultraIntuitiveLogo))
      .resize(300, 300)
      .png()
      .toFile("./public/logo-login.png");
    console.log("✅ logo-login.png (para tela de login)");

    // Versão GPS para tela de login alternativa
    await sharp(Buffer.from(gpsLogo))
      .resize(300, 300)
      .png()
      .toFile("./public/logo-gps-login.png");
    console.log("✅ logo-gps-login.png (alternativa GPS)");

    // Adicione no script generateIntuitiveLogo.js
    await sharp(Buffer.from(ultraIntuitiveLogo))
      .resize(180, 180)
      .png()
      .toFile("./public/icon-180.png");
    console.log("✅ icon-180.png (Apple Touch Icon)");

    console.log("\n🎉 Todos os logos foram gerados com sucesso!\n");
    console.log("📌 Elementos visuais intuitivos:");
    console.log('   • Pin vermelho "VOCÊ" = Localização atual do candidato');
    console.log('   • Sala verde "A1" = Destino destacado');
    console.log("   • Seta azul = Direção a seguir");
    console.log("   • Mapa com salas = Contexto espacial claro");
    console.log("\n💡 Qualquer pessoa entende imediatamente o propósito!");
  } catch (error) {
    console.error("❌ Erro:", error);
    console.log("\nCertifique-se de ter instalado: npm install sharp");
  }
}

generateIntuitiveLogo();
