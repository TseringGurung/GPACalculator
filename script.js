document.addEventListener('DOMContentLoaded', function () {
    const courseTable = document.getElementById('courseTable').querySelector('tbody');
    const addRowButton = document.getElementById('addRow');
    const calculateButton = document.getElementById('calculateBtn');
    const resetButton = document.getElementById('resetBtn');
    const gpaElement = document.getElementById('gpa');

    let gradePoints = {
        "A+": 4.0, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "D-": 0.7,
        "F": 0.0
    };

    function addRow() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" checked></td>
            <td><input type="text" class="course-name" placeholder="Course Name"></td>
            <td>
                <select class="grade">
                    <option value="">--</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="D-">D-</option>
                    <option value="F">F</option>
                </select>
            </td>
            <td><input type="text" class="credits" placeholder="Credits"></td>
            <td><button class="removeRow">✕</button></td>
        `;
        courseTable.appendChild(row);

        row.querySelector('.removeRow').addEventListener('click', function () {
            row.remove();
        });
    }

    function calculateGPA() {
        let totalCredits = 0;
        let totalPoints = 0;

        const rows = courseTable.querySelectorAll('tr');
        rows.forEach(row => {
            const isChecked = row.querySelector('input[type="checkbox"]').checked;
            const gradeValue = row.querySelector('.grade').value;
            const creditsValue = parseFloat(row.querySelector('.credits').value);

            if (isChecked && gradeValue && !isNaN(creditsValue)) {
                totalCredits += creditsValue;
                totalPoints += creditsValue * gradePoints[gradeValue];
            }
        });

        let gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
        gpaElement.textContent = gpa;
    }

    function resetGPA() {
        const rows = courseTable.querySelectorAll('tr');
        rows.forEach(row => {
            row.querySelector('input[type="checkbox"]').checked = true;
            row.querySelector('.course-name').value = "";
            row.querySelector('.grade').value = "";
            row.querySelector('.credits').value = "";
        });
        gpaElement.textContent = "0.00";
    }

    addRowButton.addEventListener('click', addRow);
    calculateButton.addEventListener('click', calculateGPA);
    resetButton.addEventListener('click', resetGPA);

    // Add the first row on page load
    addRow();
});