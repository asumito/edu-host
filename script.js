// script.js - automatically list all PDFs in /assets folder
const pdfList = document.getElementById('pdf-list');
const searchInput = document.getElementById('search');

// List of PDFs - Netlify lets us use a simple JSON file generated at build time
// We'll fetch a tiny manifest.json that contains the file list
async function loadpdfs() {
  try {
    const response = await fetch('/assets/manifest.json');
    if (!response.ok) throw new Error('manifest not found');
    const files = await response.json();

    // Sort alphabetically
    files.sort((a, b) => a.localeCompare(b));

    renderpdfs(files);
    
    // Setup live search
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      const filtered = files.filter(file => file.toLowerCase().includes(term));
      renderpdfs(filtered);
    });

  } catch (err) {
    pdfList.innerHTML = '<li class="no-results">Error loading PDFs. Check console.</li>';
    console.error(err);
  }
}

function renderpdfs(files) {
  if (files.length === 0) {
    pdfList.innerHTML = '<li class="no-results">No PDFs found matching your search.</li>';
    return;
  }

  pdfList.innerHTML = files
    .map(filename => {
      const cleanName = filename
        .replace(/.pdf$/i, '')
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase()); // Simple title case

      return `
        <li>
          <a href="/assets/${filename}" target="_blank" rel="noopener">
            📄 ${cleanName}
          </a>
        </li>
      `;
    })
    .join('');
}

// Start loading
loadpdfs();
