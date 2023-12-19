var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var connToken = "90931460|-31949302871106085|90960531";

$("#studentRollNo").focus();

function validateAndGetFormData() {
    var studentRollNo = $("#studentRollNo").val();
    if (studentRollNo === "") {
        alert("Student Roll No Required Value");
        $("#studentRollNo").focus();
        return "";
    }
    var studentName = $("#studentName").val();
    if (studentName === "") {
        alert("student Name is Required Value");
        $("#studentName").focus();
        return "";
    }
    var studentClass = $("#studentClass").val();
    if (studentClass === "") {
        alert("Student Class is Required Value");
        $("#studentClass").focus();
        return "";
    }
    var studentDob = $("#studentDob").val();
    if (studentDob === "") {
        alert("Student birth date is Required Value");
        $("#studentDob").focus();
        return "";
    }
    var studentAdd = $("#studentAdd").val();
    if (studentAdd === "") {
        alert("Student Address is Required Value");
        $("#studentAdd").focus();
        return "";
    }
    var studentenrdate = $("#studentendate").val();
    if (studentendate === "") {
        alert("Student Enrollment Date is Required Value");
        $("#studentendate").focus();
        return "";
    }
    var jsonStrObj = {
        rollNo: studentRollNo,
        name: studentName,
        class: studentClass,
        dob: studentDob,
        address: studentAdd,
        enroll_date: studentendate
    };
    return JSON.stringify(jsonStrObj);
}


function resetForm() {
    $("#studentRollNo").val("")
    $("#studentName").val("");
    $("#studentClass").val("");
    $("#studentDob").val("");
    $("#studentAdd").val("");
    $("#studentendate").val("");
    $("#studentRollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#studentRollNo").focus();
}

function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken,
        jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
    alert(putReqStr);
    jQuery.ajaxSetup({
        async: false
    });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        jpdbBaseURL, jpdbIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({
        async: true
    });
    resetForm();
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, SCHOOL - DB, SCHOOL - TABLE, localStorage.getItem("recno"));
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({
        async: true
    });
    console.log(resJsonObj);
    resetForm();
    $("#studentRollNo").focus();
}

function saveRecNo2LS() {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno, lvData.rec_no);
    }

    function fillData(jsonObj) {
        var data = JSON.parse(jsonObj.data).record;
        $("#studentName").val(data.name);
        $("#studentClass").val(data.class);
        $("#studentDob").val(data.dob);
        $("#studentAdd").val(data.address);
        $("#studentendate").val(data.enroll_date);
    }

    function getStudentRollNoAsJsonObj() {
        $("#studentRollNo").val("")
        var jsonStr = {
            rollNo: studentRollNo
        }
        return JSON.stringify(jsonStrObj);
    }

    function getStudent() {
        var studentRollNoJsonObj = getStudentRollNoAsJsonObj();
        var getRequest = createGET_BY_KEYRequest(connToken, STUDENT - DB, STUDENT - TABLE, studentRollNoJsonObj);
        jQuery.ajaxSetup({
            async: false
        });
        var resJsonObj = executeCommandAtGivenBaseURL(getRequest, jpbdBaseURL, jpdbIRL);
        jQuery.ajaxSetup({
            async: true
        });
        if (resJsonObj.status === 400) {
            $("#save").prop("disabled", false);
            $("#reset").prop("disabled", false);
            $("#studentName").focus();
        } else if (resJsonObj.status === 200) {
            $("#studentRollNo").prop("disabled", true);
            fillData(resJsonObj);
            $("#change").prop("disabled", false);
            $("#reset").prop("disabled", false);
            $("#studentName").focus();
        }
    }