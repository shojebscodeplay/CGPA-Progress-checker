document.getElementById('gpaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const semesters = document.querySelectorAll('.semester');
    const gpas = [];

    semesters.forEach(semester => {
        gpas.push(parseFloat(semester.value));
    });

    let progress = [];
    for (let i = 1; i < gpas.length; i++) {
        let progressPercentage = ((gpas[i] - gpas[i - 1]) / gpas[i - 1]) * 100;
        progress.push(progressPercentage.toFixed(2) + '%');
    }

    let resultHTML = '<h2>Progress Results</h2>';
    for (let i = 0; i < progress.length; i++) {
        resultHTML += `<p>Semester ${i + 2} compared to Semester ${i + 1}: ${progress[i]}</p>`;
    }
    document.getElementById('result').innerHTML = resultHTML;
});

document.getElementById('addSemester').addEventListener('click', function() {
    const semesterInputs = document.getElementById('semesterInputs');
    const currentSemesters = semesterInputs.getElementsByClassName('form-group').length;

    if (currentSemesters < 8) {
        const newSemesterDiv = document.createElement('div');
        newSemesterDiv.className = 'form-group';
        newSemesterDiv.id = `sem${currentSemesters + 1}-group`;

        const newSemesterLabel = document.createElement('label');
        newSemesterLabel.setAttribute('for', `sem${currentSemesters + 1}`);
        newSemesterLabel.textContent = `${currentSemesters + 1}th Semester GPA:`;

        const newSemesterInput = document.createElement('input');
        newSemesterInput.setAttribute('type', 'number');
        newSemesterInput.setAttribute('step', '0.01');
        newSemesterInput.setAttribute('id', `sem${currentSemesters + 1}`);
        newSemesterInput.className = 'semester';
        newSemesterInput.required = true;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'deleteSemester';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteSemester(newSemesterDiv.id);
        };

        newSemesterDiv.appendChild(newSemesterLabel);
        newSemesterDiv.appendChild(newSemesterInput);
        newSemesterDiv.appendChild(deleteButton);
        semesterInputs.appendChild(newSemesterDiv);
    }
});

function deleteSemester(id) {
    const semesterDiv = document.getElementById(id);
    semesterDiv.remove();
}
