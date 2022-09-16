async function fetchEmployees() {
  const spinner = document.createElement("div");
  spinner.className = "loading loading-lg";
  spinner.id = "spinner";
  spinner.style.padding = "300px 0px";
  document.getElementById("prueba").appendChild(spinner);

  await fetch("http://192.168.1.149:1111/employees")
    .then((data) => data.json())
    .then((employees) => {
      document.getElementById("spinner").style.display = "none";

      let i = 0;
      let typeOfClass;

      employees.map((employee) => {
        //simple way for stylize the table, switching between colors and making contrast
        if (i % 2 == 0) {
          typeOfClass = "active";
        } else {
          typeOfClass = "inactive";
        }

        document.getElementById("employee-table").innerHTML += `
          <tr class=${typeOfClass}>
                          <td class="name" id="first_name">${employee.first_name}</td>
                          <td id="last_name">${employee.last_name}</td>
                          <td id="email">${employee.email}</td>
                          <td id="gender">${employee.gender}</td>
                          <td class="action_buttons"></td>
                      </tr>
          `;

        i++;
      });
      var employeesTr = document.getElementsByTagName("tr");
      var actionButtonsDiv = document.getElementsByClassName("action_buttons");

      for (let i = 0; i < actionButtonsDiv.length; i++) {
        const edit_icon = document.createElement("i");
        edit_icon.className = "icon icon-edit";
        const edit_button = document.createElement("BUTTON");
        edit_button.textContent = "Edit ";
        edit_button.className = "btn btn-success employee_edit";
        edit_button.append(edit_icon);

        const delete_icon = document.createElement("i");
        delete_icon.className = "icon icon-delete";
        const delete_button = document.createElement("BUTTON");
        delete_button.textContent = "Delete ";
        delete_button.className = "btn btn-error employee_delete";
        delete_button.style = "margin-left:5px";
        // delete_button.append(delete_icon);

        actionButtonsDiv[i].appendChild(edit_button);
        actionButtonsDiv[i].appendChild(delete_button);
      }

      var editButtons = document.getElementsByClassName(
        "btn btn-success employee_edit"
      );
      for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].onclick = function () {
          editar();
        };
      }

      var deleteButton = document.getElementsByClassName(
        "btn btn-error employee_delete"
      );
      for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].onclick = function () {
          var first_name =
            employeesTr[i + 1].getElementsByTagName("td")[0].textContent;
          var second_name =
            employeesTr[i + 1].getElementsByTagName("td")[1].textContent;
          var email =
            employeesTr[i + 1].getElementsByTagName("td")[2].textContent;
          var gender =
            employeesTr[i + 1].getElementsByTagName("td")[3].textContent;
          borrar(first_name, second_name, email, gender);
        };
      }
    })
    .catch((error) => {
      console.error(error);
      /*
      setTimeout(() => {
        fetchEmployees();
      }, 3000);
      */
    });
}
fetchEmployees();

function borrar(first_name, second_name, email, gender) {
  const delete_modal = document.getElementById("delete_modal");
  delete_modal.style.display = "flex";
  const delete_modal_content = document.getElementById("delete_modal_content");

  const first_name_element = delete_modal_content.getElementsByTagName("p")[0];
  const second_name_element = delete_modal_content.getElementsByTagName("p")[1];
  const email_element = delete_modal_content.getElementsByTagName("p")[2];
  const gender_element = delete_modal_content.getElementsByTagName("p")[3];
  first_name_element.textContent = first_name;
  second_name_element.textContent = second_name;
  email_element.textContent = email;
  gender_element.textContent = gender;

  fetch(`192.168.1.149:5555/delete/${first_name}`)
    .then((response) => {
      console.log(response);
    })
    .then(fetchEmployees())
    .catch((error) => {
      console.error(error);
    });
}
function editar() {
  console.log("editar");
  document.getElementById("modal-id").style.display = "flex";
}

//EDIT MODAL LISTENER
document
  .getElementById("closeButtonModal")
  .addEventListener("click", function () {
    document.getElementById("modal-id").style.display = "none";
  });

document.getElementById("save_btn_edit_modal").addEventListener("click", () => {
  let first_name = document.getElementById("first_name_input");
  let second_name = document.getElementById("second_name_input");
  let email = document.getElementById("email_input");
  document.getElementById("modal-id").style.display = "none";
  alert(email.value);
});

//DELETE MODAL LISTENER
const delete_modal = document.getElementById("delete_modal");
const delete_modal_btn_no = document.getElementById("no_btn_delete_modal");
delete_modal_btn_no.addEventListener("click", () => {
  delete_modal.style.display = "none";
});
const delete_modal_btn_cross = document.getElementById(
  "delete_modal_btn_cross"
);
delete_modal_btn_cross.addEventListener("click", () => {
  delete_modal.style.display = "none";
});
