// Sample data to be displayed
const softwareData = [
    {
        name: "Videohub",
        logo: "assets/logoA.png",
        version: "10.0",
        releaseDate: "2023-09-15",
        downloadLink: "https://www.blackmagicdesign.com/developer/partial/videohub/sdk-and-software#",
        vendorDescription: "Vendor A provides excellent software solutions.",
        vendor: "Vendor A",
        category: "Utility"
    }
    {
        name: "Software B",
        logo: "assets/logoB.png",
        version: "4.5.6",
        releaseDate: "2023-07-20",
        downloadLink: "https://vendor-b.com/download",
        vendorDescription: "Vendor B specializes in enterprise software.",
        vendor: "Vendor B",
        category: "Enterprise"
    }
    {
        name: "Software C",
        logo: "assets/logoC.png",
        version: "4.5.6",
        releaseDate: "2023-07-20",
        downloadLink: "https://vendor-C.com/download",
        vendorDescription: "Vendor C specializes in enterprise software.",
        vendor: "Vendor C",
        category: "Enterprise"
    }
    // Add more software items as needed
];

document.addEventListener("DOMContentLoaded", function() {
    populateTable(softwareData);
    populateFilters();
});

// Function to populate the software table
function populateTable(data) {
    const tableBody = document.getElementById("softwareList");
    tableBody.innerHTML = "";

    data.forEach(software => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${software.name}</td>
            <td><img src="${software.logo}" alt="${software.name} logo" style="width: 50px;"></td>
            <td>${software.version}</td>
            <td>${software.releaseDate}</td>
            <td><a href="${software.downloadLink}" target="_blank">Download</a></td>
            <td>${software.vendorDescription}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to populate filter dropdowns
function populateFilters() {
    const vendors = new Set(softwareData.map(software => software.vendor));
    const categories = new Set(softwareData.map(software => software.category));
    
    const vendorFilter = document.getElementById("vendorFilter");
    const categoryFilter = document.getElementById("categoryFilter");

    vendors.forEach(vendor => {
        const option = document.createElement("option");
        option.value = vendor;
        option.textContent = vendor;
        vendorFilter.appendChild(option);
    });

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to apply filters and sort
function applyFilters() {
    const vendor = document.getElementById("vendorFilter").value;
    const category = document.getElementById("categoryFilter").value;
    const sortOption = document.getElementById("sortOption").value;

    let filteredData = softwareData;

    if (vendor !== "all") {
        filteredData = filteredData.filter(software => software.vendor === vendor);
    }

    if (category !== "all") {
        filteredData = filteredData.filter(software => software.category === category);
    }

    if (sortOption === "releaseDate") {
        filteredData.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (sortOption === "versionNumber") {
        filteredData.sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
    }

    populateTable(filteredData);
}
