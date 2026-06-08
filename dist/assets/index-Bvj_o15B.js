(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{state;onUpdate;game;constructor(e,t,n){this.state=e,this.onUpdate=t,this.game=n}padLines(e,t){return e.replace(/\r/g,``).split(`
`).map(e=>e.padEnd(t,` `)).join(`
`)}},t=class{wood=0;hasFire=!1;fireTicks=100;forestStep=0;maxRadius=5;currentScreen;unlockedFireRow=!1;unlockedLightBtn=!1;unlockedForestBtn=!1;updateMaxRadius(){this.hasFire?this.maxRadius=Math.max(3,Math.floor(20*(this.fireTicks/100))):this.maxRadius=3}checkUnlocks(){(this.wood>=30||this.hasFire)&&(this.unlockedFireRow=!0),this.wood>=30&&(this.unlockedLightBtn=!0),this.hasFire&&this.fireTicks>40&&(this.unlockedForestBtn=!0)}updateAll(){this.updateMaxRadius(),this.checkUnlocks()}},n=class{text;key;onClick;constructor(e,t,n){this.text=e,this.key=t,this.onClick=n}getHtml(e){return e.registerButtonCallback(this.key,this.onClick),`<button data-action-id="${this.key}">[ ${this.text} ]</button>`}},r=`      _-_\r
   /~~   ~~\\\r
/~~         ~~\\\r
{               }\r
 \\  _-     -_  /\r
   ~  \\\\ //  ~\r
    _  || _\r
   (_  ||  )\r
     \`----'\r
`,i=class extends e{constructor(e,t,n){super(e,t,n)}render(){let e=``;if(e+=`Экспедиция в тайгу. Текущий шаг: ${this.state.forestStep} из ${this.state.maxRadius}\n`,e+=`Остаток жара костра на базе: ${this.state.fireTicks}%\n`,e+=`==================================================

`,this.state.forestStep>0?(e+=r+`

`,e+=`Вы углубились в лес на ${this.state.forestStep} шагов. Становится холоднее...\n\n`):e+=`
     Вы стоите на опушке леса. Впереди сплошные деревья...


`,e+=`==================================================

`,e+=`Действия:
`,this.state.forestStep<this.state.maxRadius&&this.state.fireTicks>0){let t=new n(`Сделать шаг вперед`,`step`,()=>{this.state.forestStep++,this.state.hasFire&&(this.state.fireTicks-=5,this.state.fireTicks<=0&&(this.state.fireTicks=0,this.state.hasFire=!1)),this.onUpdate()});e+=`  `+t.getHtml(this.game)+`
`}else this.state.fireTicks<=0?e+=`  [ Костер на базе полностью ПОТУХ! Вы не можете идти дальше от холода ]
`:e+=`  [ Слишком холодно, чтобы идти дальше! Костер на базе слишком слаб ]
`;let t=new n(`Вернуться к костру`,`return`,()=>{this.game.changeScreen(new s(this.state,this.onUpdate,this.game))});e+=`
  `+t.getHtml(this.game)+`
`,e=this.padLines(e,100);let i=``,a=!1;for(let t=0;t<e.length;t++){let n=e[t];n==`<`?a=!0:n==`>`&&(a=!1),Math.random()<(1-this.state.fireTicks/100)/24&&n==` `&&!a&&(n=`*`),i+=n}return i}},a=`===ANIMATION: idle===\r
\r
\r
      ^\\ *\r
   * /\\ ^\\   .\r
    ( v   )\r
    /=====\\\r
===\r
\r
\r
  *    /^\r
    / ^/ /\\   *\r
    (^  v  ) .\r
    /=====\\\r
===ANIMATION: flash===\r
        /*\r
     /\\  \\\\\r
  .  / ^ v /\r
  ^/ v    ^/\\    .\r
 * (  * ^ v )\r
    /=====\\\r
===\r
\r
       *  ^\\    *\r
 .    /   \\\r
    /  /\\  /\\\r
   (  v v*  ) .\r
    /=====\\`,o=class{animations=new Map;currentAnimName=`idle`;currentFrameIndex=0;isPlayingOnce=!1;fallbackAnimName=`idle`;constructor(e){this.parseFile(e)}parseFile(e){let t=e.replace(/\r/g,``).split(`
`),n=``,r=[],i=[];for(let e of t){if(e.startsWith(`===ANIMATION:`)){n&&r.length>0&&(i.push(r.join(`
`)),this.animations.set(n,i)),n=e.split(`===ANIMATION:`)[1].split(`===`)[0].trim(),r=[],i=[];continue}if(e.trim()===`===`){r.length>0&&(i.push(r.join(`
`)),r=[]);continue}n&&r.push(e)}n&&r.length>0&&(i.push(r.join(`
`)),this.animations.set(n,i))}tick(){let e=this.animations.get(this.currentAnimName);!e||e.length<=1||(this.currentFrameIndex++,this.isPlayingOnce&&this.currentFrameIndex>=e.length?(this.isPlayingOnce=!1,this.currentAnimName=this.fallbackAnimName,this.currentFrameIndex=0):this.currentFrameIndex%=e.length)}playOnce(e,t=`idle`){if(!this.animations.has(e)){console.warn(`Анимация "${e}" не найдена!`);return}this.currentAnimName=e,this.currentFrameIndex=0,this.isPlayingOnce=!0,this.fallbackAnimName=t}changeLoop(e){this.currentAnimName!==e&&this.animations.has(e)&&(this.currentAnimName=e,this.currentFrameIndex=0,this.isPlayingOnce=!1)}getCurrentFrame(){let e=this.animations.get(this.currentAnimName);return e?e[this.currentFrameIndex]||``:`[ Ошибка: Анимация "${this.currentAnimName}" не найдена.\nДоступны: ${Array.from(this.animations.keys()).join(`, `)} ]`}},s=class extends e{timerId=null;fireAnimation;constructor(e,t,n){super(e,t,n),this.startCampTimer(),this.fireAnimation=new o(a),this.game.addAnimation(this.fireAnimation)}startCampTimer(){this.timerId=setInterval(()=>{this.state.hasFire&&(--this.state.fireTicks,this.state.fireTicks<=0&&(this.state.hasFire=!1,this.state.fireTicks=0),this.onUpdate())},1e3)}stopCampTimer(){this.timerId!=null&&(clearInterval(this.timerId),this.timerId=null)}render(){let e=``;e+=`Древесина: ${this.state.wood}\n`,this.state.unlockedFireRow&&(e+=`Костер:    ${this.state.hasFire?this.state.fireTicks+`%`:`не зажжен`}\n`),this.state.hasFire&&(e+=`Радиус безопасности: ${this.state.maxRadius} шагов\n`),e+=`==================================================

`,this.state.hasFire?e+=this.fireAnimation.getCurrentFrame()+`

`:e+=`     [ ПОЛНАЯ ТЕМНОТА ]
     Вокруг лишь холодный мрак...

`,e+=`==================================================

`,e+=`Действия:
`;let t=new n(`Собрать ветки`,`gather`,()=>{this.state.wood++,this.onUpdate()});if(e+=`  `+t.getHtml(this.game)+`
`,this.state.unlockedLightBtn&&!this.state.hasFire)if(this.state.wood>=30){let t=new n(`Разжечь костер (30 дерева)`,`light`,()=>{this.state.wood-=30,this.state.hasFire=!0,this.state.fireTicks=100,this.onUpdate()});e+=`  `+t.getHtml(this.game)+`
`}else e+=`  [ Разжечь костер (Нужно 30 дерева) ]
`;if(this.state.hasFire)if(this.state.wood>0){let t=new n(`Подкинуть 1 дерево`,`fuel`,()=>{this.state.wood--,this.state.fireTicks=Math.min(this.state.fireTicks+2,100),this.onUpdate(),this.fireAnimation.playOnce(`flash`)});e+=`  `+t.getHtml(this.game)+`
`}else e+=`  [ Нет дерева ]
`;if(this.state.unlockedForestBtn)if(this.state.hasFire&&this.state.fireTicks>0){let t=new n(`Идти в глубь леса`,`to_forest`,()=>{this.stopCampTimer(),this.state.forestStep=0,this.game.changeScreen(new i(this.state,this.onUpdate,this.game))});e+=`
  `+t.getHtml(this.game)+`
`}else e+=`
  [ Идти в глубь леса (Слишком холодно) ]
`;return e}};new class{state;terminalContainer;activeAnimations=[];buttonRegistry=new Map;domLines=[];constructor(){this.state=new t,this.terminalContainer=document.getElementById(`game-terminal`),this.state.currentScreen=new s(this.state,()=>this.update(),this),this.initClickListener(),this.initTimers(),this.update()}registerButtonCallback(e,t){this.buttonRegistry.set(e,t)}clearButtonRegistry(){this.buttonRegistry.clear()}initClickListener(){this.terminalContainer.addEventListener(`mouseup`,e=>{let t=e.target.getAttribute(`data-action-id`);if(t){e.preventDefault();let n=this.buttonRegistry.get(t);n&&n()}})}addAnimation(e){this.activeAnimations.includes(e)||this.activeAnimations.push(e)}removeAnimation(e){this.activeAnimations=this.activeAnimations.filter(t=>t!==e)}clearAllAnimations(){this.activeAnimations=[]}update(){if(this.state.updateAll(),this.state.currentScreen){this.clearButtonRegistry();let e=this.state.currentScreen.render().replace(/\r/g,``).split(`
`);for(;this.domLines.length<e.length;){let e=document.createElement(`pre`);e.className=`terminal-line`,this.terminalContainer.appendChild(e),this.domLines.push(e)}for(;this.domLines.length>e.length;){let e=this.domLines.pop();e&&this.terminalContainer.removeChild(e)}for(let t=0;t<e.length;t++){let n=e[t],r=this.domLines[t];r.innerHTML!==n&&(r.innerHTML=n)}}}changeScreen(e){this.terminalContainer.innerHTML=``,this.domLines=[],this.state.currentScreen=e,this.update()}initTimers(){setInterval(()=>{this.activeAnimations.length>0&&(this.activeAnimations.forEach(e=>e.tick()),this.update())},500)}};