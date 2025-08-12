function generateCalendar(year, month){
  const body = document.getElementById('calendar-body');
  if(!body) return;
  body.innerHTML = '';

  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const today = new Date();
  const isThisMonth = today.getFullYear() === year && today.getMonth() === month;

  let dayCounter = 1;
  let nextMonthStart = 1;

  for(let row = 0; row < 6; row++){
    const tr = document.createElement('tr');
    for(let col = 0; col < 7; col++){
      const td = document.createElement('td');
      const cellIndex = row * 7 + col;

      if(cellIndex < startWeekday){
        const day = prevMonthDays - startWeekday + col + 1;
        td.textContent = String(day);
        td.classList.add('muted');
      } else if(dayCounter <= daysInMonth){
        td.textContent = String(dayCounter);
        if(isThisMonth && dayCounter === today.getDate()){
          td.classList.add('today');
        }
        dayCounter++;
      } else {
        td.textContent = String(nextMonthStart++);
        td.classList.add('muted');
      }
      tr.appendChild(td);
    }
    body.appendChild(tr);
  }
}

(function init(){
  const monthEl = document.getElementById('cal-month');
  let current = new Date(2023, 9, 1); // 2023-10 default

  function update(){
    const y = current.getFullYear();
    const m = current.getMonth();
    monthEl.textContent = `${y}年 ${m+1}月`;
    generateCalendar(y, m);
  }

  document.getElementById('cal-prev').addEventListener('click', ()=>{
    current.setMonth(current.getMonth() - 1);
    update();
  });
  document.getElementById('cal-next').addEventListener('click', ()=>{
    current.setMonth(current.getMonth() + 1);
    update();
  });

  update();

  // Hero dots active toggle (visual only)
  const dots = Array.from(document.querySelectorAll('.hero-dots .dot'));
  let active = 0;
  setInterval(()=>{
    dots[active].classList.remove('is-active');
    active = (active + 1) % dots.length;
    dots[active].classList.add('is-active');
  }, 3500);
})();