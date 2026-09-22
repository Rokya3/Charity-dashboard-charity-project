
document.addEventListener("DOMContentLoaded", () => {
  
    updateCharityStats();
    
    
    renderInitialData();

    
    setupShowAllButtons();
    
    
    checkCharityAuth();
});


const extraDonations = [
    { id: 3, text: "تبرع بـ 20 قطعة (حريمي)", donor: "سارة محمود" },
    { id: 4, text: "تبرع بـ 5 أحذية رياضية", donor: "ياسين إبراهيم" },
    { id: 5, text: "تبرع ببطاطين شتاء (عدد 10)", donor: "فاعل خير" },
    { id: 6, text: "تبرع بـ 12 طقم أطفال", donor: "منى أحمد" }
];

const extraRequests = [
    { id: 103, text: "طلب بطاطين (عدد 5)", subtitle: "حالة ملحة" },
    { id: 104, text: "طلب طقم خروج (مقاس 14)", subtitle: "تجهيز مدارس" },
    { id: 105, text: "طلب ملابس رضع (حديث ولادة)", subtitle: "عاجل" },
    { id: 106, text: "طلب كسوة شتاء كاملة", subtitle: "أسرة متعففة" }
];


function renderInitialData() {
    const initialDonations = [
        { id: 1, text: "تبرع بـ 15 قطعة (أطفال)", donor: "محمد علي" },
        { id: 2, text: "تبرع بـ 10 قطع (رجالي)", donor: "أحمد حسن" }
    ];

    const initialRequests = [
        { id: 101, text: "طلب كسوة شتاء (رجالي - L)", subtitle: "نوفر قطع" },
        { id: 102, text: "طلب ملابس أطفال (حديث ولادة)", subtitle: "عاجل" }
    ];

    const donationsList = document.getElementById('donations-list');
    if (donationsList) {
        donationsList.innerHTML = initialDonations.map(don => createDonationHTML(don)).join('');
    }

    const beneficiaryList = document.getElementById('beneficiary-list');
    if (beneficiaryList) {
        beneficiaryList.innerHTML = initialRequests.map(req => createRequestHTML(req)).join('');
    }
}


function setupShowAllButtons() {
    const btnDonations = document.getElementById('show-all-donations');
    if (btnDonations) {
        btnDonations.onclick = (e) => {
            e.preventDefault();
            const list = document.getElementById('donations-list');
            list.insertAdjacentHTML('beforeend', extraDonations.map(don => createDonationHTML(don)).join(''));
            btnDonations.style.display = 'none'; 
        };
    }

    const btnRequests = document.getElementById('show-all-requests');
    if (btnRequests) {
        btnRequests.onclick = (e) => {
            e.preventDefault();
            const list = document.getElementById('beneficiary-list');
            list.insertAdjacentHTML('beforeend', extraRequests.map(req => createRequestHTML(req)).join(''));
            btnRequests.style.display = 'none'; 
        };
    }
}


function createDonationHTML(don) {
    return `
        <li class="list-group-item border-0 p-0 mb-2 mt-3">
            <div class="request-box">
                <div class="text-box">
                    <span class="text fw-bold">${don.text}</span>
                    <small class="sub-text">بواسطة ${don.donor}</small>
                </div>
                <button class="status-btn fw-bold" onclick="acceptDonation(${don.id})">قبول الاستلام</button>
            </div>
        </li>`;
}

function createRequestHTML(req) {
    return `
        <li class="list-group-item border-0 p-0 mt-3">
            <div class="request-box">
                <div class="text-box">
                    <span class="text fw-bold">${req.text}</span>
                    <small class="sub-text">${req.subtitle}</small>
                </div>
                <button class="button btn btn-sm" onclick="assignVolunteer(${req.id})">تعيين متطوع</button>
            </div>
        </li>`;
}

async function updateCharityStats() {
    try {
        await fetch('https://reqres.in/api/users?delay=1');
        const stats = { donations: 124, requests: 48, users: 15 };
        if (document.getElementById("total-donations")) document.getElementById("total-donations").textContent = stats.donations;
        if (document.getElementById("beneficiary-requests")) document.getElementById("beneficiary-requests").textContent = stats.requests;
        if (document.getElementById("active-volunteers")) document.getElementById("active-volunteers").textContent = stats.users;
    } catch (err) { console.error("Stats Error"); }
}

async function acceptDonation(id) {
    alert(`✅ تم قبول استلام التبرع رقم ${id} بنجاح!`);
}

function assignVolunteer(id) {
    const name = prompt("أدخل اسم المتطوع:");
    if (name) alert(`✅ تم تعيين المتطوع (${name})`);
}

function checkCharityAuth() {
    const userRole = localStorage.getItem("userRole") || 'charity'; 
    if (userRole !== "charity") console.log("غير مصرح");
}