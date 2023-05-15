"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyE1 = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("calculate-bmi-btn");
const deleteBtn = document.querySelector(".btn-danger");
const petArr = [];

const data1 = {
    id: "P001",
    name: "Tom",
    age: 3,
    type: "Cat",
    weight: 5,
    length: 50,
    color: "red",
    breed: "Tabby",
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: new Date(2022, 2, 1),
    bmi: "?",
};

const data2 = {
    id: "P002",
    name: "Tyke",
    age: 5,
    type: "Dog",
    weight: 3,
    length: 40,
    color: "green",
    breed: "Mixed Breed",
    vaccinated: false,
    dewormed: false,
    sterilized: false,
    date: new Date(2022, 2, 2),
    bmi: "?",
};

petArr.push(data1);
petArr.push(data2);

// INPUT FORM
const date = new Date();

function dateData() {
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}
submitBtn.addEventListener("click", function() {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date(),
    };

    //VALIDATE DATA
    function validateData(data) {
        let isValidate = true;
        if (data.id.trim() === "") {
            alert("Please select ID!");
            isValidate = false;
        }

        if (data.name.trim() === "") {
            alert("Please select Name!");
            isValidate = false;
        }

        if (isNaN(data.age)) {
            alert("Please select Age!");
            isValidate = false;
        }

        if (isNaN(data.weight)) {
            alert("Please select Weight!");
            isValidate = false;
        }

        if (isNaN(data.length)) {
            alert("Please select length!");
            isValidate = false;
        }

        for (let i = 0; i < petArr.length; i++) {
            if (data.id === petArr[i].id) {
                alert("ID must unique!");
                isValidate = false;
                break;
            } else if (data.age < 1 || data.age > 15 || !data.age) {
                alert("Age must be between 1 and 15!");
                return false;
            } else if (data.weight < 1 || data.weight > 15 || !data.weight) {
                alert("Weight must be between 1 and 15!");
                return false;
            } else if (data.length < 1 || data.length > 100 || !data.length) {
                alert("Length must be between 1 and 100!");
                return false;
            } else if (data.type === "Select Type") {
                alert("Please select Type");
                return false;
            } else if (data.breed === "Select Breed") {
                alert("Please select Breed");
                return false;
            } else {
                return true;
            }
        }

        return isValidate;
    }

    const validate = validateData(data);
    if (validate) {
        petArr.push(data);
        clearInput();
        console.log(petArr);
        renderTableData(petArr);
    }
});

// SHOW PET LIST

function renderTableData(petArr) {
    tableBodyE1.innerHTML = "";
    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
    <th scope="row" >${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}</td>
    <td>${petArr[i].length}</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${petArr[i].bmi}</td>
    <td>${dateData()}</td>
    <td><button  type="button"
    class="btn btn-danger"
    onclick="deletePet('${petArr[i].id}')">Delete</button>
    </td>`;
        tableBodyE1.appendChild(row);
    }
}

//Delete form

function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    (ageInput.value = ""), (typeInput.value = "Select Type");
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.value = "false";
    dewormedInput.value = "false";
    sterilizedInput.value = "false";
}

// Delete pet

function deletePet(petId) {
    const isDeleted = confirm("Are you sure");
    if (isDeleted) {
        for (let i = 0; i < petArr.length; i++) {
            if (petId === petArr[i].id) {
                petArr.splice(i, 1);
                renderTableData(petArr);
            }
        }
    }
}

//show pet health

let healthyCheck = true;

healthyBtn.addEventListener("click", function() {
    const healthyPetArr = [];
    if (healthyCheck === true) {
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
                healthyPetArr.push(petArr[i]);
            }
        }
        renderTableData(healthyPetArr);
        healthyBtn.textContent = "Show All Pet";
        healthyCheck = false;
    } else {
        renderTableData(petArr);
        healthyBtn.textContent = "Show Healthy Pet";
        healthyCheck = true;
    }

    // calculate bmi
});

calculateBmiBtn.onclick = function() {
    for (let i = 0; i < petArr.length; i++) {
        petArr[i].bmi =
            petArr[i].type === "Dog" ?
            ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2) :
            ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
    }
    renderTableData(petArr);
};