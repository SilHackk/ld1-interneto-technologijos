// Funkcija perjungia šviesią/tamsią temą
function toggleTheme() { 
  // Perjungia 'dark-mode' klasę body elementui
  document.body.classList.toggle('dark-mode');
  // Išsaugo pasirinktą temą localStorage, kad ji būtų išsaugota tarp puslapio perkrovimų
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}
// Funkcija rodo arba slepia "grįžti į viršų" mygtuką
window.addEventListener('load', () => {
  // Patikrina, ar vartotojas jau yra pasirinkęs temą ir pritaiko ją
  const savedTheme = localStorage.getItem('theme');
  // Jei išsaugota tema yra 'dark', prideda 'dark-mode' klasę body elementui
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');

  // Gauk elementą su id 'year'
  const yearEl = document.getElementById('year');
  // Jei elementas su id 'year' egzistuoja, nustato jo tekstinę reikšmę į einamuosius metus
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Typed init (only if element exists) - inicijuoja "Typed.js" biblioteką, jei puslapyje yra elementas su klase 'typed'
  const typedEl = document.querySelector('.typed');
  // Jei elementas su klase 'typed' egzistuoja ir "Typed.js" biblioteka yra įkelta, inicijuoja naują "Typed" instanciją su nustatytais parametrais
  if (typedEl && window.Typed) {
    // Gauk reikšmes iš 'data-typed-items' atributo, padalina jas į masyvą ir pašalina tarpus
    const items = typedEl.getAttribute('data-typed-items').split(',').map(s => s.trim());
    // Inicijuoja "Typed.js" su nustatytais parametrais: rodo tekstus iš 'items' masyvo, nustato rašymo ir trynimo greitį, leidžia ciklą ir nustato pauzę tarp ciklų
    new Typed('.typed', { 
      // Nustato tekstus, kurie bus rodomi
      strings: items, 
      // Nustato rašymo greitį (milisekundėmis)
      typeSpeed: 30, 
      // Nustato trynimo greitį (milisekundėmis)
      backSpeed: 30, 
      // Leidžia ciklą, kad tekstai būtų rodomi nuolat
      loop: true,
      // Nustato pauzę tarp ciklų (milisekundėmis)
      backDelay: 1000
    });
  }
});
// Prideda įvykio klausytoją, kuris reaguoja į puslapio slinkimą
window.addEventListener('scroll', () => {
  // Gauk elementą su id 'scrollToTopBtn'
  const btn = document.getElementById('scrollToTopBtn');
  // Jei elementas su id 'scrollToTopBtn' neegzistuoja, išeina iš funkcijos
  if (!btn) return;
  // Rodo "grįžti į viršų" mygtuką, jei puslapis yra nuslinkęs daugiau nei 300 pikselių, kitaip slepia jį
  btn.style.display = (document.documentElement.scrollTop > 300) ? 'flex' : 'none';
});

function scrollToTop() {// Funkcija skirta slinkti į puslapio viršų
  // Naudoja "window.scrollTo" metodą su nustatytais parametrais: slinkti į viršų (top: 0) ir naudoti sklandų slinkimą (behavior: 'smooth')
  window.scrollTo({ top: 0, behavior: 'smooth' });
}