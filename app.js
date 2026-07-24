// 1. Initializing quill editor
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  }
});

// Default Welcome Note
const defaultNote = {
  id: 'scribl-welcome-guide',
  title: 'Welcome to Scribl!',
  tags: ['guide', 'welcome'],
  content: `
   <h2>Hello and welcome to Scribl!</h2>
    <p>Scribl is a simple note taking application. Here is a quick guide to its features:</p>
    <p> - <strong>Rich Text Editing:</strong> Format your text using the toolbar above. Add lists, colors, and styling.</p>
    <p> - <strong>Tag Filtering:</strong> Add tags separated by commas. Use the sidebar search box to filter your notes by tag.</p>
    <p> - <strong>Exporting:</strong> Click "Export as PDF" or "Export as JPG" in the header to download your notes.</p>
    <p> - <strong>Customization:</strong> Open the Settings panel to switch between light and dark mode or pick a custom theme color.</p>
    <p> - <strong>Local Storage:</strong> Your notes are saved locally, so they will remain even after you close the app.</p> 
    <p><em>Click any note in the sidebar to edit it, or clear the editor to write a new one!</em></p>
  `,
  updatedAt: new Date().toISOString()
};

let notes = JSON.parse(localStorage.getItem('smart-notes'));
if (!notes || notes.length === 0) {
  notes = [defaultNote];
  localStorage.setItem('smart-notes', JSON.stringify(notes));
}

let activeNoteId = null;

function saveNote() {
  const title = document.getElementById('note-title').value;
  const tags = document.getElementById('note-tags').value.split(',').map(t => t.trim());
  const content = quill.root.innerHTML;

  if (!title) return alert('Please enter a title');

  const note = {
    id: activeNoteId || Date.now().toString(),
    title,
    tags,
    content,
    updatedAt: new Date().toISOString()
  };

  if (activeNoteId) {
    const index = notes.findIndex(n => n.id === activeNoteId);
    notes[index] = note;
  } else {
    notes.push(note);
    activeNoteId = note.id;
  }

  localStorage.setItem('smart-notes', JSON.stringify(notes));
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  localStorage.setItem('smart-notes', JSON.stringify(notes));
  if (activeNoteId === id) clearEditor();
  renderNotes();
}

function loadNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;
  
  activeNoteId = note.id;
  document.getElementById('note-title').value = note.title;
  document.getElementById('note-tags').value = note.tags.join(', ');
  quill.root.innerHTML = note.content;
  
  renderNotes(); 
}

function clearEditor() {
  activeNoteId = null;
  document.getElementById('note-title').value = '';
  document.getElementById('note-tags').value = '';
  quill.root.innerHTML = '';
}

function renderNotes(filterTag = '') {
  const list = document.getElementById('notes-list');
  list.innerHTML = ''; 

  const filteredNotes = filterTag 
    ? notes.filter(n => n.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase())))
    : notes;

  filteredNotes.forEach(note => {
    const div = document.createElement('div');
    div.className = `note-item ${note.id === activeNoteId ? 'active' : ''}`;
    
    const validTags = note.tags.filter(t => t.trim() !== "");
    let tagsHtml = '';
    
    if (validTags.length > 0) {
      tagsHtml = validTags.map(tag => `<span class="tag-badge">${tag}</span>`).join('');
    } else {
      tagsHtml = '<span style="font-size: 0.8em; color: gray;">No tags</span>';
    }
    
    div.innerHTML = `
      <div class="note-item-header">
        <strong>${note.title || 'Untitled Note'}</strong>
      </div>
      <div class="tags-container">
        ${tagsHtml}
      </div>
      <button class="delete-btn" onclick="deleteNote('${note.id}')"><i class="fas fa-trash"></i></button>
    `;
    
    div.addEventListener('click', (e) => {
      if(e.target.tagName !== 'BUTTON') loadNote(note.id);
    });
    
    list.appendChild(div);
  });
}

const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const toggleDarkBtn = document.getElementById('toggle-dark');

settingsBtn.addEventListener('click', () => {
  settingsPanel.classList.toggle('hidden');
});

document.addEventListener('click', (event) => {
  const container = document.querySelector('.settings-container');
  if (!container.contains(event.target)) {
    settingsPanel.classList.add('hidden');
  }
});

//Dark mode toggle
toggleDarkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  if (isDarkMode) {
    toggleDarkBtn.innerHTML = `<i class="hgi hgi-stroke hgi-rounded hgi-sun-03"></i>`;
  } else {
    toggleDarkBtn.innerHTML = `<i class="hgi hgi-stroke hgi-rounded hgi-moon-02"></i>`;
  }
});

document.getElementById('theme-color').addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--primary-color', e.target.value);
});

//Exports (PDF & JPEG)
document.getElementById('export-pdf').addEventListener('click', () => {
  const element = document.querySelector('.ql-editor');
  html2pdf().from(element).save('scribl-note.pdf');
});

document.getElementById('export-jpg').addEventListener('click', () => {
  const element = document.querySelector('.ql-editor');
  html2pdf().set({
    image: { type: 'jpeg', quality: 0.98 }
  }).from(element).outputImg().then(img => {
    const link = document.createElement('a');
    link.download = 'scribl-note.jpg';
    link.href = img.src;
    link.click();
  });
});

// Event Listeners
document.getElementById('save-note').addEventListener('click', saveNote);

document.getElementById('new-note').addEventListener('click', () => {
  clearEditor();
  renderNotes(); 
});

document.getElementById('search-tags').addEventListener('input', (e) => renderNotes(e.target.value));

// Initial Load
if (notes.length > 0) {
  loadNote(notes[0].id);
} else {
  renderNotes();
}
