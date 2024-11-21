function displayFileNames() {
    const input = document.getElementById('image');
    const fileNames = Array.from(input.files).map(file => file.name).join(', ');
    const fileNamesElement = document.getElementById('file-names');

    if (input.files.length > 0) {
        fileNamesElement.textContent = fileNames;  // Display the selected file names
    } else {
        fileNamesElement.textContent = "No files selected";  // If no file selected
    }
}