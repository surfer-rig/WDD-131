let participantCount = 1;

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add");
  const form = document.querySelector("form");
  const summary = document.getElementById("summary");

  addButton.addEventListener("click", addParticipant);
  form.addEventListener("submit", submitForm);
});

function participantTemplate(count) {
  return `
  <section class="participant${count}">
    <p>Participant ${count}</p>
    <div class="item">
      <label for="fname${count}"> First Name<span>*</span></label>
      <input id="fname${count}" type="text" name="fname${count}" required />
    </div>
    <div class="item activities">
      <label for="activity${count}">Activity #<span>*</span></label>
      <input id="activity${count}" type="text" name="activity${count}" />
    </div>
    <div class="item">
      <label for="fee${count}">Fee ($)<span>*</span></label>
      <input id="fee${count}" type="number" name="fee${count}" />
    </div>
    <div class="item">
      <label for="date${count}">Desired Date <span>*</span></label>
      <input id="date${count}" type="date" name="date${count}" />
    </div>
    <div class="item">
      <p>Grade</p>
      <select id="grade${count}">
        <option selected value="" disabled></option>
        ${[...Array(12)].map((_, i) => `<option value="${i + 1}">${i + 1}th</option>`).join("")}
      </select>
    </div>
  </section>
  `;
}

function addParticipant() {
  participantCount++;
  const newHTML = participantTemplate(participantCount);
  const addButton = document.getElementById("add");
  addButton.insertAdjacentHTML("beforebegin", newHTML);
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  return feeElements.reduce((sum, input) => {
    const fee = parseFloat(input.value) || 0;
    return sum + fee;
  }, 0);
}

function successTemplate({ name, total, count }) {
  return `
    <h2>Registration Successful</h2>
    <p>Thank you ${name} for registering.</p>
    <p>You have registered ${count} participant${count > 1 ? "s" : ""} and owe $${total} in Fees.</p>
  `;
}

function submitForm(event) {
  event.preventDefault();
  const total = totalFees();
  const name = document.getElementById("adult_name").value || "Camper";
  const form = document.querySelector("form");
  const summary = document.getElementById("summary");

  form.style.display = "none";
  summary.innerHTML = successTemplate({
    name,
    total,
    count: participantCount
  });
}
