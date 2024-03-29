function Check_the_dob(dob) {
    var age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if (age < 18 || age > 55) {
        dob.setCustomValidity("The age should be between 18 and 55");
    } else {
        dob.setCustomValidity("");
    }
}

function Check_the_email(email) {
    if (email.value.includes("@") && email.value.includes(".")) {
        email.setCustomValidity("");
    } else {
        email.setCustomValidity("Invalid Email!");
    }
}

function Check_the_name(name_of_the_user)  {
    if (name_of_the_user.value.length < 3) {
        name_of_the_user.setCustomValidity("Name should be at least three characters!");
    } else {
        name_of_the_user.setCustomValidity("");
    }
}

function Check_the_tick(tick) {
    if (!tick.checked) {
        tick.setCustomValidity("Accept terms and conditions!");
    } else {
        tick.setCustomValidity("");
    }
}

var dob = document.getElementById("dob");
var password = document.getElementById("password");
var tick = document.getElementById("check-box");
var email = document.getElementById("email");
var name_of_the_user = document.getElementById("name");

email.addEventListener("input", () => Check_the_email(email));
dob.addEventListener("input", () => Check_the_dob(dob));
name_of_the_user.addEventListener("input", () => Check_the_name(name_of_the_user));
tick.addEventListener("input", () => Check_the_tick(tick));

var get_form = document.getElementById("user-form");
var user_entries = [];

function enter_to_the_table() {
    var object_list = localStorage.getItem("user_entries");
    user_entries = object_list ? JSON.parse(object_list) : [];
    return user_entries;
}

enter_to_the_table();

function create_list_of_object() {
    var check = tick.checked;
    var object_list = {
        dob: dob.value,
        password: password.value,
        email: email.value,
        checked: check,
        name: name_of_the_user.value,
    };
    return object_list;
}

function show_the_table() {
    var table = document.getElementById("user-table");
    var object_of_entries = user_entries;
    var word = `<tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Dob</th>
                      <th>Accepted terms?</th>
                  </tr>`;
    object_of_entries.forEach(entry => {
        word += `<tr>
                       <td>${entry.name}</td>
                       <td>${entry.email}</td>
                       <td>${entry.password}</td>
                       <td>${entry.dob}</td>
                       <td>${entry.checked}</td>
                </tr>`;
    });
    table.innerHTML = word;
}

get_form.addEventListener("submit", (e) => {
    e.preventDefault();
    var agree_the_condition = tick.checked;
    if (agree_the condition) {
        var object_list = create_list_of_object();
        user_entries.push(object_list);
        localStorage.setItem("user_entries", JSON.stringify(user_entries));
    }
    show_the_table();
});

window.onload = (event) => {
    show_the_table();
};

