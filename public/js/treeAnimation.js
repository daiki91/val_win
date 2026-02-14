// Ce fichier gère l'animation avancée de l'arbre surprise (germination, croissance, feuilles, floraison, vent, feuilles qui tombent)
// Utilise SVG pour un rendu fluide et naturel

export function startTreeAnimation(svgRoot, options = {}) {
  // svgRoot : élément SVG dans lequel dessiner l'arbre
  // options : { onPhaseChange, onEnd, ... }
  // Phases : germination, croissance, feuilles, floraison, vent/boucle

  // 1. Nettoyer le SVG
  while(svgRoot.firstChild) svgRoot.removeChild(svgRoot.firstChild);

  // 2. Créer le sol
  const ground = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
  ground.setAttribute('cx','150');
  ground.setAttribute('cy','340');
  ground.setAttribute('rx','80');
  ground.setAttribute('ry','18');
  ground.setAttribute('fill','#b7a07a');
  ground.setAttribute('filter','url(#groundShadow)');
  svgRoot.appendChild(ground);

  // 3. Graine
  const seed = document.createElementNS('http://www.w3.org/2000/svg','circle');
  seed.setAttribute('cx','150');
  seed.setAttribute('cy','330');
  seed.setAttribute('r','7');
  seed.setAttribute('fill','#7c4f1d');
  seed.setAttribute('opacity','0');
  svgRoot.appendChild(seed);

  // 4. Fissure
  const crack = document.createElementNS('http://www.w3.org/2000/svg','path');
  crack.setAttribute('d','M145,340 Q150,345 155,340');
  crack.setAttribute('stroke','#6b4a1b');
  crack.setAttribute('stroke-width','2');
  crack.setAttribute('fill','none');
  crack.setAttribute('opacity','0');
  svgRoot.appendChild(crack);

  // 5. Pousse
  const sprout = document.createElementNS('http://www.w3.org/2000/svg','path');
  sprout.setAttribute('d','M150,330 Q150,320 150,310');
  sprout.setAttribute('stroke','#3a7d2c');
  sprout.setAttribute('stroke-width','4');
  sprout.setAttribute('fill','none');
  sprout.setAttribute('opacity','0');
  svgRoot.appendChild(sprout);

  // 6. Feuilles de la pousse
  const leafL = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
  leafL.setAttribute('cx','145');
  leafL.setAttribute('cy','315');
  leafL.setAttribute('rx','0');
  leafL.setAttribute('ry','0');
  leafL.setAttribute('fill','#4be04b');
  leafL.setAttribute('opacity','0');
  svgRoot.appendChild(leafL);
  const leafR = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
  leafR.setAttribute('cx','155');
  leafR.setAttribute('cy','315');
  leafR.setAttribute('rx','0');
  leafR.setAttribute('ry','0');
  leafR.setAttribute('fill','#4be04b');
  leafR.setAttribute('opacity','0');
  svgRoot.appendChild(leafR);

  // PHASE 1 : Germination
  // 0s : graine apparaît
  setTimeout(()=>{
    seed.setAttribute('opacity','1');
    ground.setAttribute('filter','drop-shadow(0 2px 12px #b7a07a88)');
  }, 100);
  // 0.5s : vibration sol
  setTimeout(()=>{
    ground.setAttribute('transform','translate(2,0)');
    setTimeout(()=>ground.setAttribute('transform','translate(-2,0)'), 60);
    setTimeout(()=>ground.setAttribute('transform','translate(1,0)'), 120);
    setTimeout(()=>ground.setAttribute('transform',''), 180);
  }, 500);
  // 1s : fissure
  setTimeout(()=>{
    crack.setAttribute('opacity','1');
  }, 1000);
  // 1.3s : pousse sort (glow vert)
  setTimeout(()=>{
    sprout.setAttribute('opacity','1');
    sprout.setAttribute('filter','drop-shadow(0 0 8px #4be04b)');
  }, 1300);
  // 1.7s : pousse grandit
  setTimeout(()=>{
    sprout.setAttribute('d','M150,330 Q150,300 150,270');
  }, 1700);
  // 2.2s : feuilles de la pousse pop
  setTimeout(()=>{
    leafL.setAttribute('opacity','1');
    leafR.setAttribute('opacity','1');
    leafL.setAttribute('rx','10');
    leafL.setAttribute('ry','5');
    leafR.setAttribute('rx','10');
    leafR.setAttribute('ry','5');
  }, 2200);
  // 2.5s : glow feuilles
  setTimeout(()=>{
    leafL.setAttribute('filter','drop-shadow(0 0 8px #4be04b)');
    leafR.setAttribute('filter','drop-shadow(0 0 8px #4be04b)');
  }, 2500);
  // 3s : fin phase 1, début phase 2
  setTimeout(()=>{
    if(options.onPhaseChange) options.onPhaseChange(2);
    // PHASE 2 : Croissance tronc et branches
    // Tronc principal (draw effect)
    const trunk = document.createElementNS('http://www.w3.org/2000/svg','path');
    trunk.setAttribute('d','M150,270 Q150,200 150,120');
    trunk.setAttribute('stroke','#8b4513');
    trunk.setAttribute('stroke-width','16');
    trunk.setAttribute('fill','none');
    trunk.setAttribute('stroke-linecap','round');
    trunk.setAttribute('stroke-linejoin','round');
    trunk.setAttribute('opacity','1');
    trunk.setAttribute('stroke-dasharray','180');
    trunk.setAttribute('stroke-dashoffset','180');
    svgRoot.appendChild(trunk);
    // Animation du tronc (draw)
    let t = 0;
    function animateTrunk(){
      t += 1.5;
      trunk.setAttribute('stroke-dashoffset', Math.max(180-t,0));
      if(t<180){
        requestAnimationFrame(animateTrunk);
      } else {
        // Branches principales
        growBranches();
      }
    }
    setTimeout(()=>{
      animateTrunk();
    }, 200);

    // Branches (courbes naturelles)
    function growBranches(){
      // Branches principales et secondaires (plus nombreuses)
      const branches = [];
      // Principales
      branches.push({d:'M150,180 Q120,140 100,90', w:8, len:110});
      branches.push({d:'M150,160 Q180,120 200,70', w:7, len:100});
      // Secondaires
      branches.push({d:'M150,200 Q130,170 120,130', w:5, len:60});
      branches.push({d:'M150,140 Q170,110 185,90', w:4, len:55});
      branches.push({d:'M150,170 Q110,120 90,60', w:3, len:70});
      branches.push({d:'M150,150 Q190,100 210,60', w:3, len:70});
      // Création SVG
      const branchElems = branches.map(b=>{
        const p = document.createElementNS('http://www.w3.org/2000/svg','path');
        p.setAttribute('d',b.d);
        p.setAttribute('stroke','#8b4513');
        p.setAttribute('stroke-width',b.w);
        p.setAttribute('fill','none');
        p.setAttribute('stroke-linecap','round');
        p.setAttribute('stroke-dasharray',b.len);
        p.setAttribute('stroke-dashoffset',b.len);
        svgRoot.appendChild(p);
        return {el:p, len:b.len};
      });
      // Animation branches
      let b = 0;
      function animateBranches(){
        b += 2.2;
        branchElems.forEach(obj=>{
          obj.el.setAttribute('stroke-dashoffset', Math.max(obj.len-b,0));
        });
        if(b<110){
          requestAnimationFrame(animateBranches);
        } else {
          // Épaissir légèrement le tronc
          trunk.setAttribute('stroke-width','20');
          // Début phase 3 (feuilles)
          setTimeout(()=>{
            if(options.onPhaseChange) options.onPhaseChange(3);
            // PHASE 3 : Apparition feuilles (plus nombreuses)
            const leaves = [];
            for(let i=0;i<18;i++){
              // Feuilles côté gauche
              leaves.push({
                x: 150 - 40 - Math.random()*45,
                y: 180 - i*7 - Math.random()*30,
                angle: -30-Math.random()*40,
                scale: 0.7+Math.random()*0.7
              });
            }
            for(let i=0;i<18;i++){
              // Feuilles côté droit
              leaves.push({
                x: 150 + 40 + Math.random()*45,
                y: 160 - i*7 - Math.random()*30,
                angle: 30+Math.random()*40,
                scale: 0.7+Math.random()*0.7
              });
            }
            // Apparition pop + oscillation
            leaves.forEach((leaf, idx)=>{
              setTimeout(()=>{
                const lf = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
                lf.setAttribute('cx',leaf.x);
                lf.setAttribute('cy',leaf.y);
                lf.setAttribute('rx',0);
                lf.setAttribute('ry',0);
                lf.setAttribute('fill','#4be04b');
                lf.setAttribute('opacity','0.8');
                lf.setAttribute('transform',`rotate(${leaf.angle} ${leaf.x} ${leaf.y}) scale(0.1)`);
                svgRoot.appendChild(lf);
                // Pop + bounce
                setTimeout(()=>{
                  lf.setAttribute('rx',12*leaf.scale);
                  lf.setAttribute('ry',7*leaf.scale);
                  lf.setAttribute('transform',`rotate(${leaf.angle} ${leaf.x} ${leaf.y}) scale(1.1)`);
                },120);
                setTimeout(()=>{
                  lf.setAttribute('transform',`rotate(${leaf.angle} ${leaf.x} ${leaf.y}) scale(1)`);
                },220);
                // Oscillation vent (léger)
                let phase = Math.random()*Math.PI*2;
                function oscillateLeaf(){
                  const t = Date.now()/700 + phase;
                  const sway = Math.sin(t)*4;
                  lf.setAttribute('transform',`rotate(${leaf.angle+sway} ${leaf.x} ${leaf.y}) scale(1)`);
                  lf._oscillateId = requestAnimationFrame(oscillateLeaf);
                }
                setTimeout(()=>oscillateLeaf(), 400);
              }, 200+idx*80+Math.random()*60);
            });
              // PHASE 4 : Floraison (fleurs, bloom, particules)
              setTimeout(()=>{
                if(options.onPhaseChange) options.onPhaseChange(4);
                // Fleurs sur une partie des feuilles
                const flowerColors = ['#ffb7e0','#fff6fa','#e0c6ff','#f7e6ff'];
                let poemLines = [
                  "Un an me dure la journée",
                  "Si je ne vois ma Dulcinée.",
                  "Mais, amour a peint son visage",
                  "Dans la fontaine et le nuage,",
                  "Dans chaque aurore et chaque fleur.",
                  "(Une journée semble une année sans elle, mais l’amour a rendu son visage présent dans la nature.)",
                  "",
                  "Te revoil, beauté imaginaire,",
                  "Qui viens me porter dans les airs…",
                  "(Elle est une étoile dans la nuit, source de bonheur et d’inspiration.)"
                ];
                const poemDiv = document.getElementById('surprisePoem');
                if(poemDiv){
                  poemDiv.innerHTML = '<h2 style="margin-top:0;">Poème</h2><div class="poem-text" id="poemTextAnim"></div>';
                  const poemText = document.getElementById('poemTextAnim');
                  let lineIdx = 0;
                  function showNextLine(){
                    if(lineIdx < poemLines.length){
                      const p = document.createElement('p');
                      p.style.opacity = '0';
                      p.style.transition = 'opacity 1.2s';
                      p.innerHTML = poemLines[lineIdx];
                      poemText.appendChild(p);
                      setTimeout(()=>{p.style.opacity='1';}, 60);
                      lineIdx++;
                      setTimeout(showNextLine, 400 + Math.random()*400);
                    }
                  }
                  showNextLine();
                }
                for(let i=0;i<leaves.length;i+=3){
                  setTimeout(()=>{
                    const leaf = leaves[i];
                    const fl = document.createElementNS('http://www.w3.org/2000/svg','circle');
                    fl.setAttribute('cx',leaf.x+Math.random()*8-4);
                    fl.setAttribute('cy',leaf.y+Math.random()*8-4);
                    fl.setAttribute('r','0');
                    fl.setAttribute('fill', flowerColors[Math.floor(Math.random()*flowerColors.length)]);
                    fl.setAttribute('opacity','0.85');
                    svgRoot.appendChild(fl);
                    // Bloom effet
                    setTimeout(()=>{
                      fl.setAttribute('r','10');
                      fl.setAttribute('filter','drop-shadow(0 0 8px #fff6fa)');
                    },80);
                    setTimeout(()=>{
                      fl.setAttribute('r','7');
                      fl.setAttribute('filter','');
                    },300);
                    // Particules lumineuses
                    for(let p=0;p<2;p++){
                      setTimeout(()=>{
                        const part = document.createElementNS('http://www.w3.org/2000/svg','circle');
                        part.setAttribute('cx',leaf.x+Math.random()*20-10);
                        part.setAttribute('cy',leaf.y+Math.random()*20-10);
                        part.setAttribute('r','0.5');
                        part.setAttribute('fill','#fff');
                        part.setAttribute('opacity','0.7');
                        svgRoot.appendChild(part);
                        setTimeout(()=>{
                          part.setAttribute('r','2.5');
                          part.setAttribute('opacity','0.2');
                        },100);
                        setTimeout(()=>{
                          part.remove();
                        },600);
                      }, 100+Math.random()*200);
                    }
                  }, 400+i*60);
                }
                // PHASE 5 : Vent et feuilles qui tombent (boucle)
                if(options.onPhaseChange) options.onPhaseChange(5);
                // Oscillation tronc et branches
                let windPhase = 0;
                function oscillateTree(){
                  windPhase += 0.012 + Math.random()*0.004;
                  const sway = Math.sin(windPhase)*4;
                  trunk.setAttribute('d',`M${150+sway/2},270 Q${150+sway},200 ${150+sway*1.5},120`);
                  branchElems.forEach((obj, i)=>{
                    let amp = 6 + (i%2)*2;
                    let angle = sway * (i%2===0?1:-1) * (0.7+Math.random()*0.2);
                    obj.el.setAttribute('transform',`rotate(${angle} 150 180)`);
                  });
                  requestAnimationFrame(oscillateTree);
                }
                oscillateTree();
                // Feuilles qui tombent
                function spawnFallingLeaf(){
                  // Position de départ aléatoire sur la canopée
                  const x0 = 120 + Math.random()*60;
                  const y0 = 80 + Math.random()*60;
                  const leaf = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
                  leaf.setAttribute('cx',x0);
                  leaf.setAttribute('cy',y0);
                  leaf.setAttribute('rx',10);
                  leaf.setAttribute('ry',6);
                  leaf.setAttribute('fill','#4be04b');
                  leaf.setAttribute('opacity','0.85');
                  svgRoot.appendChild(leaf);
                  // Animation chute
                  let t = 0;
                  const duration = 3200+Math.random()*1200;
                  const swayAmp = 18+Math.random()*10;
                  const rot0 = Math.random()*360;
                  function fall(){
                    t += 16;
                    const prog = t/duration;
                    const x = x0 + Math.sin(prog*4*Math.PI)*swayAmp*(1-prog);
                    const y = y0 + prog*220 + Math.sin(prog*2*Math.PI)*8;
                    const rot = rot0 + prog*180;
                    leaf.setAttribute('cx',x);
                    leaf.setAttribute('cy',y);
                    leaf.setAttribute('transform',`rotate(${rot} ${x} ${y})`);
                    leaf.setAttribute('opacity',String(0.85*(1-prog)));
                    if(prog<1){
                      requestAnimationFrame(fall);
                    } else {
                      leaf.remove();
                    }
                  }
                  setTimeout(fall, 40);
                }
                setInterval(()=>{
                  if(Math.random()<0.7) spawnFallingLeaf();
                }, 900);
              }, 2000+leaves.length*80);
          }, 600);
        }
      }
      setTimeout(()=>{
        animateBranches();
      }, 300);
    }
  }, 3000);
}
