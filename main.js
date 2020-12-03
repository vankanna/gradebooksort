$(document).ready(function () {

    var students = [];

    function createStudent(student) {

        var percent = (student.points_earned / student.points_possible) * 100;
        console.log(percent);
        var grade = '';

        if (percent >= 90) {
            grade = "A";
        } else if (percent >= 80) {
            grade = "B";
        } else if (percent >= 70){
            grade = "C";
        } else if (percent >= 60) {
            grade = "D"
        } else {
            grade = "F"
        }

        student.percent = percent;
        student.grade = grade;


        students.push(student);
    };

    function sortByName(students) {
        students.sort(function(a, b) {
            var nameA = a.last_name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.last_name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
    }

    function sortByPercent(students) {
        students.sort(function (a, b) {
            return a.percent - b.percent;
          });
          
    }

    function printStudent (student) {
        return `
        <span>${student.first_name.toUpperCase()} ${student.last_name.toUpperCase()}</span>
        <span>Percentage: ${student.percent.toFixed(0)}%
        <span>Grade: ${student.grade}
        <span id="line"></span>
        `;
    }

    function printStudents(students) {
        var studentsString = ''
        for (var i = 0; i < students.length; i++) {
            studentsString += printStudent(students[i]);
        }
        $("#grade-message").html(studentsString);
    }

    function getStudent() {
        return {
            first_name: $("#first-name").val(),
            last_name: $("#last-name").val(),
            points_earned: parseInt($("#points-earned").val()),
            points_possible: parseInt($("#points-possible").val()),
        }
    }

    function validate() {
    
        var pointsEarned = parseFloat($("#points-earned").val());
        var pointsPossible = parseFloat($("#points-possible").val());
        var firstName = $("#first-name").val();
        var lastName = $("#last-name").val();



        var pointsEarnedCheck = false;
        var pointsPossibleCheck = false;
        var firstNameCheck = false;
        var lastNameCheck = false;

        if (typeof pointsEarned === "number" && !isNaN(pointsEarned)) {
            pointsEarnedCheck = true;
        } else {
            $("#points-earned-error").text('Must Be Numeric');
        }
        
        if (typeof pointsPossible === "number" && !isNaN(pointsPossible)) {
            pointsPossibleCheck = true;
        } else {
            $("#points-possible-error").text("Must Be Numeric");
        }

        if (typeof firstName === "string" && firstName.length >= 2) {
            firstNameCheck = true;
          
        } else {
            $("#first-name-error").text("Must Be String");
        }

        if (typeof lastName === "string" && lastName.length >= 2) {
            lastNameCheck = true;
        } else {
            $("#last-name-error").text("Must Be String");
        }

        return pointsEarnedCheck && pointsPossibleCheck && firstNameCheck && lastNameCheck;
    }

    $(document).on('keypress',function(e) {
        if(e.key === "Enter") {
            var pass = validate();
            if (pass) {
                createStudent(getStudent());
                printStudents(students);
            }
        }
    });

    $("#sort-by-name").click(function (e) {
        e.preventDefault();
        sortByName(students);
        printStudents(students);
    })

    $("#sort-by-percent").click(function (e) {
        e.preventDefault();
        sortByPercent(students);
        printStudents(students);
    })


    $("#calculate").click(function (e) {
        e.preventDefault();
        var pass = validate();
        if (pass) {
            createStudent(getStudent());
            printStudents(students);
        }
    })

});