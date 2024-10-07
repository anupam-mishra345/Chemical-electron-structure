// script.js
const elements = [
  { name: "Hydrogen", symbol: "H", electrons: 1 },
  { name: "Helium", symbol: "He", electrons: 2 },
  { name: "Lithium", symbol: "Li", electrons: 3 },
  { name: "Beryllium", symbol: "Be", electrons: 4 },
  { name: "Boron", symbol: "B", electrons: 5 },
  { name: "Carbon", symbol: "C", electrons: 6 },
  { name: "Nitrogen", symbol: "N", electrons: 7 },
  { name: "Oxygen", symbol: "O", electrons: 8 },
  { name: "Fluorine", symbol: "F", electrons: 9 },
  { name: "Neon", symbol: "Ne", electrons: 10 },
  { name: "Sodium", symbol: "Na", electrons: 11 },
  { name: "Magnesium", symbol: "Mg", electrons: 12 },
  { name: "Aluminum", symbol: "Al", electrons: 13 },
  { name: "Silicon", symbol: "Si", electrons: 14 },
  { name: "Phosphorus", symbol: "P", electrons: 15 },
  { name: "Sulfur", symbol: "S", electrons: 16 },
  { name: "Chlorine", symbol: "Cl", electrons: 17 },
  { name: "Argon", symbol: "Ar", electrons: 18 },
  { name: "Potassium", symbol: "K", electrons: 19 },
  { name: "Calcium", symbol: "Ca", electrons: 20 },
];

const elementsContainer = document.getElementById("elementsContainer");
const saveButton = document.getElementById("saveButton");

let selectedElement = null;

// Display elements
elements.forEach((element) => {
  const elementDiv = document.createElement("div");

  elementDiv.className = "element";

  elementDiv.textContent = `${element.name} (${element.electrons} Electrons)`;

  elementDiv.onclick = () => {
    // Deselect previously selected element
    if (selectedElement) {
      selectedElement.classList.remove("selected");
    }
    // Select new element
    selectedElement = elementDiv;
    selectedElement.classList.add("selected");

    // Store selected element in local storage
    localStorage.setItem(
      "selectedElement",
      JSON.stringify({
        name: element.name,
        electrons: element.electrons,
        symbol: element.symbol,
      })
    );
    saveButton.disabled = false;
  };

  saveButton.disabled = true;

  elementsContainer.appendChild(elementDiv);
});

// Save button functionality
saveButton.onclick = () => {
  if (selectedElement) {
    // alert(
    //   `Saved ${
    //     JSON.parse(localStorage.getItem("selectedElement")).name
    //   } to local storage!`
    // );
    window.location.href = "myAtom.html";
  } else {
    alert("Please select an element first.");
  }
};
