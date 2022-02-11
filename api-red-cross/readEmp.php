<?php
    include("connectDB.php");
    $id=isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');
    $emp;
    $sql = "SELECT * FROM EmployeeAccount WHERE Employee_ID = '$id'";
    if($result = mysqli_query($conn,$sql)){
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($result);
        $emp['Employee_ID'] = $row['Employee_ID'];
        $emp['Username'] = $row['Username'];
        $emp['Password'] = $row['Password'];
        $name = explode(" ",$row['EmployeeName']);
        $emp['firstName'] = $name[0];
        $emp['lastName'] = $name[1];
        $emp['sex'] = $row['sex'];
        $emp['Age'] = $row['Age'];
        $emp['Address'] = $row['Address'];
        $emp['PhoneNumber'] = $row['PhoneNumber'];
        $emp['Type_ID'] = $row['Type_ID'];
        $emp['StartDate'] = $row['StartDate'];

        echo json_encode($emp);
    }else{
        http_response_code(404);
    }



?>