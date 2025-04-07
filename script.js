const hotels = [
    "STALWART JAJATI", "PIPUL RESTAURANT", "HOTEL SHIROSE", "BANDHAN INN",
    "TRIUMPH INN", "ANN'S CAFE", "THE BOMBAI(BBS)", "BOMBAI CAFE(CTC)",
    "MAD MULE", "HOTEL UPASANA", "DEV'S GARDEN", "HOTEL SUTRUPTI",
    "SV NIRTAR", "OCEAN VIEW"
  ];
  
  let serviceData = JSON.parse(localStorage.getItem("mpsData")) || {};
  
  document.getElementById("loginBtn").addEventListener("click", () => {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("homePage").classList.remove("hidden");
    loadHomePage();
    loadServiceList();
  });
  
  function toggleMenu() {
    document.getElementById("menu").classList.toggle("hidden");
  }
  
  function showPage(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(page).classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
  }
  
  function loadHomePage() {
    const tbody = document.getElementById("scheduleTable");
    tbody.innerHTML = "";
  
    hotels.forEach(hotel => {
      if (!serviceData[hotel]) {
        serviceData[hotel] = [];
      }
  
      const count = serviceData[hotel].length;
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${count}</td>
        <td>${hotel}</td>
        <td><input type="date" id="date-${hotel}" /></td>
        <td>
          <select id="type-${hotel}">
            <option value="">Select</option>
            <option>AMC</option>
            <option>RODENT CONTROL</option>
            <option>BED BUG CONTROL</option>
            <option>COCKROACH CONTROL</option>
            <option>TERMITE CONTROL</option>
            <option>OTHERS</option>
          </select>
        </td>
        <td><button onclick="submitService('${hotel}')">Submit</button></td>
      `;
  
      tbody.appendChild(row);
    });
  }
  
  function submitService(hotel) {
    const date = document.getElementById(`date-${hotel}`).value;
    const type = document.getElementById(`type-${hotel}`).value;
    if (!date || !type) return alert("Please select both date and service type.");
  
    serviceData[hotel].push({ date, type });
    localStorage.setItem("mpsData", JSON.stringify(serviceData));
    loadHomePage();
    loadServiceList();
  }
  
  function loadServiceList() {
    const ul = document.getElementById("hotelList");
    ul.innerHTML = "";
  
    hotels.forEach(hotel => {
      const li = document.createElement("li");
      li.innerHTML = `${hotel} - <button onclick="downloadExcel('${hotel}')">Download Excel</button>`;
      ul.appendChild(li);
    });
  }
  
  function downloadExcel(hotel) {
    const data = serviceData[hotel];
    if (!data || data.length === 0) return alert("No service data available.");
  
    let csv = `Hotel: ${hotel}\nDate,Service Type\n`;
    data.forEach(d => {
      csv += `${d.date},${d.type}\n`;
    });
  
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${hotel.replace(/ /g, "_")}_Service_Report.csv`;
    a.click();
  }
  