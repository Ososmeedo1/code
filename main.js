var titleInput = document.getElementById('titleInput');
var contentInput = document.getElementById('contentInput');
var rowDisplay = document.getElementById('rowDisplay');
var updateBtn = document.getElementById('updateBtn');
var updateBtn = document.getElementById('updateBtn');
var addBtn = document.getElementById('addBtn');
var updatedIndex;
var allNotes = [];

if (localStorage.getItem("notes")) {
  allNotes = JSON.parse(localStorage.getItem("notes"))
  displayNotes();
}

function addNote() {

  if (titleInput.value == "") {
    swal({
      icon: "error",
      title: "Please Enter Your Title",
    })
  } else if (contentInput.value == "") {
    swal({
      icon: "error",
      title: "Please Enter Your Content",
    });
  } else {
    var note = {
      title: titleInput.value,
      content: contentInput.value
    };

    allNotes.push(note)
    displayNotes();
    clearInputs();
    localStorage.setItem("notes", JSON.stringify(allNotes));
  }



}

function displayNotes() {
  var container = ``;

  for (var i = 0; i < allNotes.length; i++) {
    container += `
    <div class="col-md-4">
          <div class="content">
            <h1 class="fw-bold">${allNotes[i].title}</h1>
            <h5 >${allNotes[i].content}</h5>
            <div class="btns pt-3 d-flex justify-content-around">
              <button class="btn btn-outline-danger w-50 me-3" onclick="deleteNote(${i})"><i class="fas fa-trash-alt"></i> Delete</button>
              <button class="btn btn-outline-warning w-50" onclick="preUpdate(${i})"><i class="fas fa-pencil" onclick="preUpdate(${i})"></i> Edit</button>
            </div>
          </div>
        </div>
    `;
  }

  rowDisplay.innerHTML = container;
}

function clearInputs() {
  titleInput.value = "";
  contentInput.value = "";
}

function deleteNote(index) {

  Swal.fire({
    title: "Are you sure to delete this note ?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

      allNotes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(allNotes));
      displayNotes();

      Swal.fire({
        title: "Deleted!",
        text: "Your note has been deleted.",
        icon: "success"
      });
    }
  });
}

function preUpdate(index) {
  updatedIndex = index;

  titleInput.value = allNotes[index].title;
  contentInput.value = allNotes[index].content;



  addBtn.classList.add('d-none');
  updateBtn.classList.remove('d-none');

}

function updateNote() {
  var updatedNote = {
    title: titleInput.value,
    content: contentInput.value,
  }

  allNotes.splice(updatedIndex, 1, updatedNote);
  localStorage.setItem("notes", allNotes);
  displayNotes();
  clearInputs();

  addBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');
}

function searchByTitle(term) {
  var container = "";

  for (var i = 0; i < allNotes.length; i++) {
    if (allNotes[i].title.toLowerCase().includes(term.toLowerCase())) {
      container += `
      <div class="col-md-4">
          <div class="content">
            <h1>${allNotes[i].title}</h1>
            <h5>${allNotes[i].content}</h5>
            <div class="btns pt-3 d-flex justify-content-around">
              <button class="btn btn-outline-danger w-50 me-3" onclick="deleteNote(${i})"><i class="fas fa-trash-alt"></i> Delete</button>
              <button class="btn btn-outline-warning w-50" onclick="preUpdate(${i})"><i class="fas fa-pencil" onclick="preUpdate(${i})"></i> Edit</button>
            </div>
          </div>
        </div>
      `
    }
  }

  rowDisplay.innerHTML = container;
}

function searchByContent(term) {
  var container = "";

  for (var i = 0; i < allNotes.length; i++) {
    if (allNotes[i].content.toLowerCase().includes(term.toLowerCase())) {
      container += `
      <div class="col-md-4">
          <div class="content">
            <h1>${allNotes[i].title}</h1>
            <h5>${allNotes[i].content}</h5>
            <div class="btns pt-3 d-flex justify-content-around">
              <button class="btn btn-outline-danger w-50 me-3" onclick="deleteNote(${i})"><i class="fas fa-trash-alt"></i> Delete</button>
              <button class="btn btn-outline-warning w-50" onclick="preUpdate(${i})"><i class="fas fa-pencil" onclick="preUpdate(${i})"></i> Edit</button>
            </div>
          </div>
        </div>
      `
    }
  }

  rowDisplay.innerHTML = container;
}











