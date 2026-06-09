var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=class{animations=new Map;currentAnimName=`idle`;currentFrameIndex=0;isPlayingOnce=!1;fallbackAnimName=`idle`;constructor(e){this.parseFile(e)}parseFile(e){let t=e.replace(/\r/g,``).split(`
`),n=``,r=[],i=[];for(let e of t){if(e.startsWith(`===ANIMATION:`)){n&&r.length>0&&(i.push(r.join(`
`)),this.animations.set(n,i)),n=e.split(`===ANIMATION:`)[1].split(`===`)[0].trim(),r=[],i=[];continue}if(e.trim()===`===`){r.length>0&&(i.push(r.join(`
`)),r=[]);continue}n&&r.push(e)}n&&r.length>0&&(i.push(r.join(`
`)),this.animations.set(n,i))}tick(){let e=this.animations.get(this.currentAnimName);!e||e.length<=1||(this.currentFrameIndex++,this.isPlayingOnce&&this.currentFrameIndex>=e.length?(this.isPlayingOnce=!1,this.currentAnimName=this.fallbackAnimName,this.currentFrameIndex=0):this.currentFrameIndex%=e.length)}playOnce(e,t=`idle`){if(!this.animations.has(e)){console.warn(`Анимация "${e}" не найдена!`);return}this.currentAnimName=e,this.currentFrameIndex=0,this.isPlayingOnce=!0,this.fallbackAnimName=t}changeLoop(e){this.currentAnimName!==e&&this.animations.has(e)&&(this.currentAnimName=e,this.currentFrameIndex=0,this.isPlayingOnce=!1)}getCurrentFrame(){let e=this.animations.get(this.currentAnimName);return e?e[this.currentFrameIndex]||``:`[ Ошибка: Анимация "${this.currentAnimName}" не найдена.\nДоступны: ${Array.from(this.animations.keys()).join(`, `)} ]`}},r=class{text;key;onClick;constructor(e,t,n){this.text=e,this.key=t,this.onClick=n}getHtml(){return h.registerButtonCallback(this.key,this.onClick),`<button data-action-id="${this.key}">[ ${this.text} ]</button>`}},i=class{name;art;buttons;constructor(e,t,n){this.name=e,this.art=t,h.addAnimation(this.art),this.buttons=n}render(){let e=this.art.getCurrentFrame().replace(`\r`,``).split(`
`);if(e.length<1+this.buttons.length)for(let t=0;t<e.length-(1+this.buttons.length);t++)e.push(``);let t=Math.max(...e.map(e=>e.length));for(let n=0;n<this.buttons.length;n++)e[n+1]=e[n+1].padEnd(t+4,` `)+this.buttons[n].getHtml();return e.join(`
`)}},a={Axe:0},o=class extends i{requiredTool;constructor(e,t,n,i,a){super(e,t,[new r(i,`mining`,a)]),this.requiredTool=n}},s=`===ANIMATION: idle===\r
      _-_\r
   /~~   ~~\\\r
/~~         ~~\\\r
{               }\r
 \\  _-     -_  /\r
   ~  \\\\ //  ~\r
       ||  \r
       ||     \r
     '----'\r
===\r
      _-_\r
   /~~   ~~\\\r
/~~         ~~\\\r
{               }\r
 \\  _-     -_  /\r
  ~   \\\\ // ~-\r
       ||  \r
       ||      \r
     '----'     \r
===\r
      _-_\r
   /~~   ~~\\\r
/~~         ~~\\\r
{               }\r
  \\  _-     -_  /\r
  -~  \\\\ //  ~\r
       ||     /  \r
       ||      \r
     '----'    \r
===\r
      _-_\r
   /~~   ~~\\\r
/~~         ~~\\\r
{               }\r
 \\  _-     -_  /\r
   ~  \\\\ //  ~\r
 /     ||  \r
       ||     |\r
     '----'\r
===\r
      _-_\r
   /~~   ~~\\\r
/~~         ~~\\\r
{               }\r
 \\  _-     -_  /\r
  ~   \\\\ // ~\r
       ||  \r
 |     ||      \r
     '----'    \\\r
===\r
      _-_\r
   /~~   ~~\\\r
/~~         ~~\\\r
{               }\r
  \\  _-     -_  /\r
   ~  \\\\ //  ~\r
       ||  \r
       ||      \r
\\    '----'    `,c=t({Tree:()=>l}),l=class extends o{constructor(){super(`Tree`,new n(s),a.Axe,`Рубить дерево`,()=>{})}},u=class{state;onUpdate;constructor(e,t){this.state=e,this.onUpdate=t}padLines(e,t){return e.replace(/\r/g,``).split(`
`).map(e=>e.padEnd(t,` `)).join(`
`)}},d=class{wood=0;hasFire=!1;fireTicks=1e3;maxFireTicks=1e3;forestStep=0;currentScreen;unlockedFireRow=!1;unlockedLightBtn=!1;unlockedForestBtn=!1;getFirePercent(){return Math.round(this.fireTicks/this.maxFireTicks*1e3)/10}checkUnlocks(){(this.wood>=30||this.hasFire)&&(this.unlockedFireRow=!0),this.wood>=30&&(this.unlockedLightBtn=!0),this.hasFire&&this.fireTicks>40&&(this.unlockedForestBtn=!0)}updateAll(){this.checkUnlocks()}},f=class extends u{currentEncounter=h.getRandomForestEncounter();constructor(e,t){super(e,t)}render(){let e=``;if(e+=`Экспедиция в тайгу. Текущий шаг: ${this.state.forestStep}\n`,e+=`Остаток жара костра на базе: ${this.state.getFirePercent()}%\n`,e+=`==================================================

`,this.state.forestStep>0&&this.currentEncounter?(e+=this.currentEncounter.render()+`

`,e+=`Становится холоднее...

`):e+=`
     Вы стоите на опушке леса...


`,e+=`==================================================

`,e+=`Действия:
`,this.state.fireTicks>0){let t=new r(`Сделать шаг вперед`,`step`,()=>{this.state.forestStep++,this.state.hasFire&&(this.state.fireTicks-=50,this.state.fireTicks<=0&&(this.state.fireTicks=0,this.state.hasFire=!1)),this.onUpdate()});e+=`  `+t.getHtml()+`
`}else e+=`  [ Слишком холодно, чтобы идти дальше! ]
`;let t=new r(`Вернуться к костру`,`return`,()=>{h.changeScreen(new m(this.state,this.onUpdate))});e+=`
  `+t.getHtml()+`
`,e=this.padLines(e,100);let n=``,i=!1;for(let t=0;t<e.length;t++){let r=e[t];r==`<`?i=!0:r==`>`&&(i=!1),Math.random()<(1-this.state.fireTicks/100)/32&&r==` `&&!i&&(r=`*`),n+=r}return n}},p=`===ANIMATION: idle===\r
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
    /=====\\`,m=class extends u{timerId=null;fireAnimation;constructor(e,t){super(e,t),this.startCampTimer(),this.fireAnimation=new n(p),h.addAnimation(this.fireAnimation)}startCampTimer(){this.timerId=setInterval(()=>{this.state.hasFire&&(--this.state.fireTicks,this.state.fireTicks<=0&&(this.state.hasFire=!1,this.state.fireTicks=0),this.onUpdate())},1e3)}stopCampTimer(){this.timerId!=null&&(clearInterval(this.timerId),this.timerId=null)}render(){let e=``;e+=`Древесина: ${this.state.wood}\n`,this.state.unlockedFireRow&&(e+=`Костер:    ${this.state.hasFire?this.state.getFirePercent()+`%`:`не зажжен`}\n`),e+=`==================================================

`,this.state.hasFire?e+=this.fireAnimation.getCurrentFrame()+`

`:e+=`     [ ПОЛНАЯ ТЕМНОТА ]
     Вокруг лишь холодный мрак...

`,e+=`==================================================

`,e+=`Действия:
`;let t=new r(`Собрать ветки`,`gather`,()=>{this.state.wood++,this.onUpdate()});if(e+=`  `+t.getHtml()+`
`,this.state.unlockedLightBtn&&!this.state.hasFire)if(this.state.wood>=30){let t=new r(`Разжечь костер (30 дерева)`,`light`,()=>{this.state.wood-=30,this.state.hasFire=!0,this.state.fireTicks=this.state.maxFireTicks,this.onUpdate()});e+=`  `+t.getHtml()+`
`}else e+=`  [ Разжечь костер (Нужно 30 дерева) ]
`;if(this.state.hasFire)if(this.state.wood>0){let t=new r(`Подкинуть 1 дерево`,`fuel`,()=>{this.state.wood--,this.state.fireTicks=Math.min(this.state.fireTicks+25,this.state.maxFireTicks),this.onUpdate(),this.fireAnimation.playOnce(`flash`)});e+=`  `+t.getHtml()+`
`}else e+=`  [ Нет дерева ]
`;if(this.state.unlockedForestBtn)if(this.state.hasFire&&this.state.fireTicks>0){let t=new r(`Идти в глубь леса`,`to_forest`,()=>{this.stopCampTimer(),this.state.forestStep=0,h.changeScreen(new f(this.state,this.onUpdate))});e+=`
  `+t.getHtml()+`
`}else e+=`
  [ Идти в глубь леса (Слишком холодно) ]
`;return e}},h;new class{state;terminalContainer;activeAnimations=[];buttonRegistry=new Map;forestEncountersRegistry=[];domLines=[];constructor(){h=this,this.state=new d,this.terminalContainer=document.getElementById(`game-terminal`),this.state.currentScreen=new m(this.state,()=>this.update());let e=Object.assign({"./forest/resources/Tree.ts":c});for(let t in e){let n=e[t],r=Object.values(n)[0];this.forestEncountersRegistry.push(r)}console.log(this.forestEncountersRegistry),this.initClickListener(),this.initTimers(),this.update()}getRandomForestEncounter(){return new this.forestEncountersRegistry[Math.floor(Math.random()*this.forestEncountersRegistry.length)]}registerButtonCallback(e,t){this.buttonRegistry.set(e,t)}clearButtonRegistry(){this.buttonRegistry.clear()}initClickListener(){this.terminalContainer.addEventListener(`mousedown`,e=>{let t=e.target.getAttribute(`data-action-id`);if(t){e.preventDefault();let n=this.buttonRegistry.get(t);n&&n()}})}addAnimation(e){this.activeAnimations.includes(e)||this.activeAnimations.push(e)}removeAnimation(e){this.activeAnimations=this.activeAnimations.filter(t=>t!==e)}clearAllAnimations(){this.activeAnimations=[]}update(){if(this.state.updateAll(),this.state.currentScreen){this.clearButtonRegistry();let e=this.state.currentScreen.render().replace(/\r/g,``).split(`
`);for(;this.domLines.length<e.length;){let e=document.createElement(`pre`);e.className=`terminal-line`,this.terminalContainer.appendChild(e),this.domLines.push(e)}for(;this.domLines.length>e.length;){let e=this.domLines.pop();e&&this.terminalContainer.removeChild(e)}for(let t=0;t<e.length;t++){let n=e[t],r=this.domLines[t];r.innerHTML!==n&&(r.innerHTML=n)}}}changeScreen(e){this.terminalContainer.innerHTML=``,this.domLines=[],this.state.currentScreen=e,this.update()}initTimers(){setInterval(()=>{this.activeAnimations.length>0&&(this.activeAnimations.forEach(e=>e.tick()),this.update())},500)}};