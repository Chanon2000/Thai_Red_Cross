<?php
// get ค่า doctor เพื่อเอาไปแสดงในหน้า แก้ไขหมอ
    include("connectDB.php");

    $emps = [];
    $sql = "SELECT * FROM EmployeeAccount WHERE Type_ID = 1";
    if($result = mysqli_query($conn,$sql)){
        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $emps[$i]['Employee_ID'] = $row['Employee_ID'];
            $emps[$i]['Username'] = $row['Username'];
            $emps[$i]['Password'] = $row['Password'];
            $name = explode(" ",$row['EmployeeName']);
            $emps[$i]['firstName'] = $name[0];
            $emps[$i]['lastName'] = $name[1];
            $emps[$i]['sex'] = $row['sex'];
            $emps[$i]['Age'] = $row['Age'];
            $emps[$i]['Address'] = $row['Address'];
            $emps[$i]['PhoneNumber'] = $row['PhoneNumber'];
            $emps[$i]['Type_ID'] = $row['Type_ID'];
            $emps[$i]['StartDate'] = $row['StartDate'];
            $i++;
        }
        echo json_encode($emps);
    }else{
        http_response_code(404);
    }



?>