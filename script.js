document.getElementById("campaign-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Campaign launched successfully!");
  showModal();
});

function showModal() {
  document.getElementById("trainingModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("trainingModal").classList.add("hidden");
}
app.use(express.static('Dashboard'));
