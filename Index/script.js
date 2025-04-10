document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {

        localStorage.setItem('file', file.name);

        const reader = new FileReader();

        reader.onload = function(e) {
            localStorage.setItem('fileContent', e.target.result);
            window.location.href = '../Graph/Graph.html';
        };
        reader.readAsDataURL(file);
    }
});
