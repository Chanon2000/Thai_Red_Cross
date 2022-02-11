<?php
// session_start();
// session_destroy();
// header("Location: ../html/Login.html ");	


    include("connectDB.php");

    $Username = $_POST['Username'];
    $Password = $_POST['Password'];


    $sql="SELECT * FROM EmployeeAccount Where Username='".$Username."' and Password='".$Password."' ";
    $result = mysqli_query($conn,$sql);
    // echo $result;
    $row = mysqli_fetch_array($result);
    // echo $row;
    echo json_encode($row); // ถ้าไม่มีข้อมูลจะ return null
    

    // $sql="INSERT INTO `Log`( `EmployeeID`, `Username`) VALUES (".$row["Employee_ID"].",'".$row["Username"]."')";




?>