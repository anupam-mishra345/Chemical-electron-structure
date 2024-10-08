var selectedShell = "";
var selectedElement;
var shellNames = ["k", "l", "m", "n"];
var electronsCount = 0;
var electronDistanceFromCenter = {
  k: window.innerWidth > 768 ? "50px" : "37.5px", // width of k-shell / 2
  l: window.innerWidth > 768 ? "100px" : "75px",
  m: window.innerWidth > 768 ? "150px" : "112.5px",
};
var actionList = [];

var body = document.getElementsByTagName("body")[0];
body.addEventListener("click", () => {
  shellNames.forEach((shell) => {
    removeHighlightShellClass(document.getElementsByClassName(shell));
  });
  selectedShell = "";
});

window.addEventListener("resize", resetHandle);

function highlightShell(className) {
  selectedShell = className;
  shellNames.forEach((shell) => {
    removeHighlightShellClass(document.getElementsByClassName(shell));
  });
  //   document
  //     .getElementsByClassName(className)[0]
  //     .classList.add("highlight-shell");
  addHighlightShellClass(document.getElementsByClassName(className));
  event.stopPropagation();
}

function removeHighlightShellClass(classes) {
  for (let i = 0; i < classes.length; i++) {
    classes[i]?.classList.remove("highlight-shell");
  }
}
function addHighlightShellClass(classes) {
  for (let i = 0; i < classes.length; i++) {
    classes[i]?.classList.add("highlight-shell");
  }
}

function addElectronsInStore() {
  checkForelectronNumber();
  var electronsStore = document.getElementsByClassName("electrons-div")[0];
  for (let i = 0; i < electronsCount; i++) {
    const div = document.createElement("div");
    div.className = `electron electron-${i}`;
    div.id = `electron-${i}`;
    div.onclick = shellElectronHandle;
    electronsStore.appendChild(div);
  }
}

function checkForelectronNumber() {
  selectedElement = JSON.parse(localStorage.getItem("selectedElement"));
  if (selectedElement.electrons > 0) {
    electronsCount = selectedElement.electrons;
    document.getElementById("selectedElementName").innerHTML =
      selectedElement.name;
    document.getElementById("selectedElementElectron").innerHTML =
      " (" + selectedElement.electrons + ")";
  } else {
    window.location.href = "mainPage.html";
  }
}

function changeElement() {
  window.location.href = "mainPage.html";
}

function shellElectronHandle(event) {
  event.stopPropagation();
  var electronCount = 0;

  if (selectedShell === "") {
    alert("Please select a shell");
    return 0;
  } else {
    electronCount =
      document.getElementsByClassName(selectedShell)[0].childElementCount - 2;
  }

  if (!checkElectronsCapacityInShell(electronCount)) {
    return 0;
  }

  if (!checkPreviousShellCapacity()) {
    alert("Add electrons to previous shell first.");
    return 0;
  }

  event.target.classList.add("hide-electron");
  addElectronToShell(event.target.id);
}

function checkElectronsCapacityInShell(electronCount) {
  if (selectedShell === "k" && electronCount === 2) {
    alert("Only 2 electrons can be added in K-shell");
    return false;
  } else if (selectedShell === "l" && electronCount === 8) {
    alert("Only 8 electrons can be added in L-shell");
    return false;
  } else if (selectedShell === "m" && electronCount === 18) {
    alert("Only 18 electrons can be added in M-shell");
    return false;
  }
  return true;
}

function checkPreviousShellCapacity() {
  if (selectedShell === "l") {
    if (document.getElementsByClassName("k")[0].childElementCount === 2 + 2) {
      return true;
    }
    return false;
  } else if (selectedShell === "m") {
    if (document.getElementsByClassName("l")[0].childElementCount === 8 + 2) {
      return true;
    }
    return false;
  }
  return true;
}

function addElectronToShell(id) {
  var targetShell = document.getElementsByClassName(selectedShell)[0];
  var childCount = targetShell.childElementCount;
  var electronToBeAdded = document.createElement("div");
  electronToBeAdded.classList.add("dot");
  electronToBeAdded.style.setProperty("--i", childCount - 1);
  electronToBeAdded.id = id;
  actionList.push(id); // used for UndoHandle
  targetShell.appendChild(electronToBeAdded);
  var distanceFromCenter = "0px";
  var distanceBetweenElectron = "0deg";
  var { distanceFromCenter, distanceBetweenElectron } = getDegreeAndDistance();
  electronToBeAdded.style.transform = `translate(-50%, -50%) rotate(calc(var(--i) * ${distanceBetweenElectron})) translate(${distanceFromCenter})`;
  showCompletedStatus();
}

function getDegreeAndDistance() {
  var distanceFromCenter = 0;
  var distanceBetweenElectron = 0;
  switch (selectedShell) {
    case "k":
      distanceFromCenter = electronDistanceFromCenter.k;
      distanceBetweenElectron = "180deg"; // 360deg/2 electron
      break;
    case "l":
      distanceFromCenter = electronDistanceFromCenter.l;
      distanceBetweenElectron = "45deg"; // 360deg/8 electron
      break;
    case "m":
      distanceFromCenter = electronDistanceFromCenter.m;
      distanceBetweenElectron = "20deg"; // 360deg/18 electron
      break;
    default:
      break;
  }
  return { distanceFromCenter, distanceBetweenElectron };
}

function resetHandle() {
  location.reload();
}

function undoHandle() {
  if (actionList.length > 0) {
    var lastElectronAdded = actionList.pop();

    // Unhide electron in store
    var electronStore = document.getElementsByClassName("electrons-div")[0];
    electronStore
      .querySelector(`#${lastElectronAdded}`)
      .classList.remove("hide-electron");

    // remove electron from shell
    var electronShell = document.getElementsByClassName("temp-outer-class")[0];
    electronShell.querySelector(`#${lastElectronAdded}`).remove();
  }
  showCompletedStatus();
}

function showCompletedStatus() {
  if (actionList.length === selectedElement.electrons) {
    console.log("Atomic structure is completed");
    document.getElementsByClassName("completed-status")[0].innerHTML =
      "Atomic structure is completed";
  } else {
    console.log(
      "Atomic structure is incompleted",

      actionList
    );
    document.getElementsByClassName("completed-status")[0].innerHTML = "";
  }
}
