function startBuilding() {
  var kw = document.getElementById('hero-kw').value.trim();
  if (!kw) {
    document.getElementById('hero-kw').focus();
    return;
  }
  window.location.href = 'https://app.seoplant.io/dashboard?kw=' + encodeURIComponent(kw);
}
