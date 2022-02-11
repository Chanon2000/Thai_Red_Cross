<?php
    include("connectDB.php");
    $product = file_get_contents("php://input");
    if(isset($product) && !empty($product)){
        $request = json_decode($product);

        // ไม่ได้ใส่ BloodBag_ID กับ Status
        $Product_ID = mysqli_real_escape_string($conn, $request->Product_ID);
        $Plasma = mysqli_real_escape_string($conn, (int)$request->Plasma);
        $BCs = mysqli_real_escape_string($conn, (int)$request->BCs);
        $Platelets = mysqli_real_escape_string($conn, (int)$request->Platelets);
        $Bgroup = mysqli_real_escape_string($conn, $request->Bgroup);
        $BloodBag_ID = mysqli_real_escape_string($conn, $request->BloodBag_ID);
        $volum = mysqli_real_escape_string($conn, (int)$request->volum);
        $Test_Status = mysqli_real_escape_string($conn, $request->Test_Status);
        $Status = mysqli_real_escape_string($conn, $request->Status);


        if ($Plasma > 0){
            $sql="SELECT * FROM `Protype` WHERE `Protype_name` LIKE '%".$Bgroup."' AND `Protype_name` LIKE 'Plasma%'";
            $result = mysqli_query($conn,$sql);//คือการ query
            $row = mysqli_fetch_array($result);
            for($i=0;$i<$Plasma;$i++){
                $sql="INSERT INTO `Product`(`Protype_ID`, `BloodBag_ID`, `volum`, `Test_Status`) 
                VALUES (".$row['Protype_ID'].",".$BloodBag_ID.",".$volum.",".$Test_Status.")";
                if (mysqli_query($conn,$sql)) {
                    // echo "New record created successfully";
                } else {
                    // echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
        }
        if ($BCs > 0){
            $sql="SELECT * FROM `Protype` WHERE `Protype_name` LIKE '%".$Bgroup."' AND `Protype_name` LIKE 'BCs%'";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_array($result);
            for($i=0;$i<$BCs;$i++){
                $sql="INSERT INTO `Product`(`Protype_ID`, `BloodBag_ID`, `volum`, `Test_Status`) 
                VALUES (".$row['Protype_ID'].",".$BloodBag_ID.",".$volum.",".$Test_Status.")";
                if (mysqli_query($conn,$sql)) {
                    // echo "New record created successfully";
                } else {
                    // echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
        }
        if ($Platelets > 0){
            $sql="SELECT * FROM `Protype` WHERE `Protype_name` LIKE '%".$Bgroup."' AND `Protype_name` LIKE 'Platelets%'";
            $result = mysqli_query($conn,$sql);
            $row = mysqli_fetch_array($result);
            for($i=0;$i<$Platelets;$i++){
                $sql="INSERT INTO `Product`(`Protype_ID`, `BloodBag_ID`, `volum`, `Test_Status`) 
                VALUES (".$row['Protype_ID'].",".$BloodBag_ID.",".$volum.",".$Test_Status.")";
                if (mysqli_query($conn,$sql)) {
                    // echo "New record created successfully";
                } else {
                    // echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
        }


        // if(mysqli_query($conn,$sql))
        // {
        //     echo "New record created successfully";
        //     http_response_code(201);
            
        // }
        // else
        // {
        //     echo "Error: " . $sql . "<br>" . $conn->error; 
        //     http_response_code(422);
        // }

    }


?>