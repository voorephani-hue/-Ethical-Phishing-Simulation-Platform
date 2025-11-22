// Dummy initial campaign list
const campaigns = [
  { name: "HR Policy Update", group: "HR", template: "HR Policy Update", created: "2025-08-20" },
  { name: "Fake Invoice", group: "Finance", template: "Fake Invoice", created: "2025-08-21" }
];

const form = document.getElementById('campaignForm');
const table = document.getElementById('campaignTable');

// Render existing campaigns
function renderCampaigns() {
  table.innerHTML = ''; // Clear existing rows
  campaigns.forEach(c => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.group}</td>
      <td>${c.template}</td>
      <td>${c.created}</td>
    `;
    table.appendChild(row);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const group = document.getElementById('group').value;
  const template = document.getElementById('template').value;
  const created = new Date().toISOString().split('T')[0];

  const newCampaign = { name, group, template, created };
  campaigns.unshift(newCampaign); // Add to top
  renderCampaigns();
  form.reset();
  alert(" Campaign created (demo only)");
});

renderCampaigns(); // Initial render
