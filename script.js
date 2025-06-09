
document.getElementById('entry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.getElementById('entry-type').value;
    const category = document.getElementById('category').value;
    const subcategory = document.getElementById('subcategory').value;
    const amount = document.getElementById('amount').value;
    const mode = document.getElementById('payment-mode').value;
    const date = document.getElementById('date').value;

    const entry = { type, category, subcategory, amount, mode, date };
    let entries = JSON.parse(localStorage.getItem('money_entries')) || [];
    entries.push(entry);
    localStorage.setItem('money_entries', JSON.stringify(entries));
    alert('Entry Added!');
    this.reset();
    renderEntries();
});

function sendToGoogleSheets(entry) {
  fetch("https://script.google.com/macros/s/AKfycbx3gX9fZaAPWRM8sGJ20cbaCKwDNUBtIXuTx3N7EKf8ASEnc1wdYAr3TfPfPJPxmOVn/exec", {
    method: "POST",
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(data => console.log("Saved:", data))
  .catch(err => console.error("Error:", err));
}

function renderEntries() {
    const entriesDiv = document.getElementById('entries');
    const entries = JSON.parse(localStorage.getItem('money_entries')) || [];
    entriesDiv.innerHTML = '<h2>Entries</h2>';
    entries.forEach((entry, index) => {
        entriesDiv.innerHTML += `<div>${index + 1}. [${entry.type}] ${entry.category} > ${entry.subcategory || '-'} - ₹${entry.amount} (${entry.mode}) on ${entry.date}</div>`;
    });
}

document.addEventListener('DOMContentLoaded', renderEntries);
