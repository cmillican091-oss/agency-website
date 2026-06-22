/* Max - Clearwater Digital chat assistant (scripted, self-contained) */
(function(){
  var css = ''
    + '#max-bubble{position:fixed;bottom:24px;right:24px;width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#0a6ebd,#1fb6c1);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.7rem;cursor:pointer;box-shadow:0 6px 20px rgba(10,110,189,0.4);z-index:9999;border:none;transition:transform .2s;}'
    + '#max-bubble:hover{transform:scale(1.08);}'
    + '#max-window{position:fixed;bottom:100px;right:24px;width:340px;max-width:calc(100vw - 48px);height:460px;background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,0.22);display:none;flex-direction:column;overflow:hidden;z-index:9999;font-family:Segoe UI,system-ui,sans-serif;}'
    + '#max-window.open{display:flex;}'
    + '#max-header{background:linear-gradient(135deg,#0a6ebd,#1fb6c1);color:#fff;padding:14px 18px;font-weight:600;display:flex;align-items:center;gap:8px;}'
    + '#max-header .dot{width:9px;height:9px;background:#5dff8f;border-radius:50%;}'
    + '#max-msgs{flex:1;padding:16px;overflow-y:auto;background:#f5fafc;}'
    + '.max-msg{margin-bottom:12px;display:flex;}'
    + '.max-msg.bot .b{background:#fff;color:#0f1b2d;border:1px solid #e6eef2;}'
    + '.max-msg.user{justify-content:flex-end;}'
    + '.max-msg.user .b{background:#0a6ebd;color:#fff;}'
    + '.max-msg .b{padding:9px 13px;border-radius:12px;max-width:80%;font-size:0.92rem;line-height:1.4;}'
    + '#max-input-row{display:flex;border-top:1px solid #e6eef2;}'
    + '#max-input{flex:1;border:none;padding:13px;font-size:0.92rem;outline:none;}'
    + '#max-send{border:none;background:#0a6ebd;color:#fff;padding:0 18px;cursor:pointer;font-weight:600;}';
  var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
  var bubble = document.createElement('button'); bubble.id='max-bubble'; bubble.setAttribute('aria-label','Chat with Max'); bubble.innerHTML='&#128172;';
  var win = document.createElement('div'); win.id='max-window';
  win.innerHTML = '<div id="max-header"><span class="dot"></span> Max &mdash; Clearwater Digital</div><div id="max-msgs"></div><div id="max-input-row"><input id="max-input" type="text" placeholder="Type your answer..." autocomplete="off" /><button id="max-send">Send</button></div>';
  document.body.appendChild(bubble); document.body.appendChild(win);
  var steps = [
    "Hi there! I'm Max from Clearwater Digital. We build clean, fast websites for local businesses. What kind of business do you run?",
    "Nice! Do you currently have a website? (If so, what don't you like about it?)",
    "Got it. What's your main goal — more calls, online booking, or just looking more professional?",
    "Perfect. What's the best name and email for a real person at Clearwater Digital to send you a free mockup?",
    "Awesome, thank you! A real person from Clearwater Digital will follow up shortly with a free mockup. Talk soon!"
  ];
  var step=0, answers=[];
  var msgs=win.querySelector('#max-msgs'), input=win.querySelector('#max-input'), send=win.querySelector('#max-send');
  function add(text, who){ var d=document.createElement('div'); d.className='max-msg '+who; var b=document.createElement('div'); b.className='b'; b.textContent=text; d.appendChild(b); msgs.appendChild(d); msgs.scrollTop=msgs.scrollHeight; }
  function botNext(){ if(step<steps.length){ add(steps[step],'bot'); } }
  var started=false;
  bubble.addEventListener('click', function(){ win.classList.toggle('open'); if(win.classList.contains('open') && !started){ started=true; botNext(); } });
  function handle(){ var v=input.value.trim(); if(!v) return; add(v,'user'); answers.push(v); input.value=''; step++; setTimeout(botNext,400); }
  send.addEventListener('click', handle);
  input.addEventListener('keydown', function(e){ if(e.key==='Enter') handle(); });
})();
