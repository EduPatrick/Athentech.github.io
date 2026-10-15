const header=document.querySelector('.site-header');const menu=document.querySelector('.menu');const links=document.querySelector('.nav-links');const year=document.querySelector('#year');
year.textContent=new Date().getFullYear();
const setHeader=()=>header.classList.toggle('scrolled',scrollY>12);setHeader();addEventListener('scroll',setHeader,{passive:true});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));links.classList.toggle('open',!open)});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('visible');observer.unobserve(item.target)}}),{threshold:.12});
document.querySelectorAll('section>div,.card,.project').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
// Keep the reader at the same section when switching between static languages.
document.querySelectorAll('.language-switch a').forEach(a=>{
  const update=()=>{const url=new URL(a.href,location.origin);url.hash=location.hash;a.href=url.pathname+url.hash};
  update();addEventListener('hashchange',update);
});
const contactForm=document.querySelector('#contact-form');
contactForm?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!contactForm.reportValidity())return;
  const data=new FormData(contactForm);
  const pt=document.documentElement.lang==='pt-BR';
  const name=String(data.get('name')).trim();
  const email=String(data.get('email')).trim();
  const subject=String(data.get('subject')).trim();
  const message=String(data.get('message')).trim();
  const body=`${pt?'Nome':'Name'}: ${name}\nEmail: ${email}\n\n${message}`;
  const url=`mailto:contato@athentech.com.br?subject=${encodeURIComponent('Athentech — '+subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#contact-status').textContent=pt
    ?'Confirme o envio no seu aplicativo de e-mail. Se ele não abrir, envie sua mensagem diretamente para contato@athentech.com.br.'
    :'Confirm sending in your email app. If it does not open, send your message directly to contato@athentech.com.br.';
  window.location.href=url;
});
