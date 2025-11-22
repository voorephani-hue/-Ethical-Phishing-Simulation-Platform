document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("campaignForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      subject: form.subject.value,
      template: form.template.value,
      emails: form.emails.value.split(',').map(e => e.trim())
    };

    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    alert(json.message);
  });
});
