<?php
    include("connectDB.php");
    $bbdata = file_get_contents("php://input");
    if(isset($bbdata) && !empty($bbdata)){
        $request = json_decode($bbdata);

        // ไม่ได้ใส่ BloodBag_ID กับ Status
        $BloodBag_ID = mysqli_real_escape_string($conn, $request->BloodBag_ID);
        $PhleCode = mysqli_real_escape_string($conn, $request->PhleCode);
        $DateofDonate = mysqli_real_escape_string($conn, $request->DateofDonate);
        $Bgroup = mysqli_real_escape_string($conn, $request->Bgroup);
        $volum = mysqli_real_escape_string($conn, (int)$request->volum);
        $Donor_ID = mysqli_real_escape_string($conn, (int)$request->Donor_ID);
        $Test_Status = mysqli_real_escape_string($conn, $request->Test_Status);

        $sql = "INSERT INTO `Blood_Bag`(`PhleCode`, `DateofDonate`, `Bgroup`, `volum`, `Test_Status`, `Donor_ID`) 
        VALUES (".$PhleCode.",'".$DateofDonate."','".$Bgroup."',".$volum.",".$Test_Status.",".$Donor_ID.")";


        if(mysqli_query($conn,$sql))
        {
            // echo "New record created successfully";
            http_response_code(201);
            
        }
        else
        {
            // echo "Error: " . $sql . "<br>" . $conn->error; 
            http_response_code(422);
        }

    }


?>