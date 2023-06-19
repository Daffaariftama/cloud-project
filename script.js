
// menampilkan card
fetch('http://13.250.41.144:9000/notes',)
  .then((result) => result.json())
  .then((data) => {
    console.log(data.data.notes);

    data.data.notes.forEach((note) => {
      let output = document.getElementById('output');
      var newElement = document.createElement('div');
      newElement.className =
        'col-lg-5 bg-body-secondary p-3 rounded-2 card m-2';
      const title = note.title ? note.title : 'Untitled';
      newElement.innerHTML = `
      <a href="editnote.html?id=${note.id}">
        <h2>${title}</h2>
        <p>created at ${note.createdAt}</p>
        <p>${note.body}</p>
        </a>
        <button type="button" class="btn btn-danger btn-delete" data-note-id="${note.id}">Delete</button>
      `;
      output.appendChild(newElement);
    });

    // Add event listener for delete buttons
    const deleteButtons = document.getElementsByClassName('btn-delete');
    Array.from(deleteButtons).forEach((button) => {
      button.addEventListener('click', function () {
        const noteId = this.getAttribute('data-note-id');
        deleteNoteById(noteId);
      });
    });
  });

function deleteNoteById(noteId) {
  // Perform delete request to your server endpoint
  fetch(`http://13.250.41.144:9000/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        // Note successfully deleted
        console.log('Note deleted');
        // Remove the card from the DOM
        const card = document.querySelector(`[data-note-id="${noteId}"]`).closest('.card');
        card.remove();
      } else {
        // Failed to delete note
        console.error('Failed to delete note');
      }
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
    });
}


//menambah data
document.querySelector('form').addEventListener('submit', addPost);
      
function addPost(e) {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let body = document.getElementById('body').value;

  fetch('http://13.250.41.144:9000/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title: title, body: body })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        swal("Berhasil!", "Catatan berhasil ditambahkan!", "success")
        .then(() => {
            window.location.href = 'index.html';
        });
    });
};

// delete data


// Mengirim permintaan DELETE ke URL yang ditentukan
fetch('http://13.250.41.144:9000/notes' + noteId, {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => {
    console.log('Delete successful', data);
    // Lakukan tindakan lain setelah berhasil menghapus
  })
  .catch(error => {
    console.error('Error:', error);
    // Tangani kesalahan yang terjadi saat menghapus
  });

