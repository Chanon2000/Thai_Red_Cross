<?php
    include("connectDB.php");
    $donordata = file_get_contents("php://input");
    if(isset($donordata) && !empty($donordata)){
        $request = json_decode($donordata);

        // ไม่ได้ใส่ BloodBag_ID กับ Status
        $Donor_ID = mysqli_real_escape_string($conn, $request->Donor_ID);
        $NIN = mysqli_real_escape_string($conn, $request->NIN);
        $firstName = mysqli_real_escape_string($conn, $request->firstName);
        $lastName = mysqli_real_escape_string($conn, $request->lastName);
        $Name = $firstName.' '.$lastName;
        $Brithday = mysqli_real_escape_string($conn, $request->Brithday);
        $sex = mysqli_real_escape_string($conn, (int)$request->sex);
        $Age = mysqli_real_escape_string($conn, (int)$request->Age);
        $Cdisease = mysqli_real_escape_string($conn, $request->Cdisease);
        $Bgroup = mysqli_real_escape_string($conn, $request->Bgroup);
        $weight = mysqli_real_escape_string($conn, (int)$request->weight);
        $Address = mysqli_real_escape_string($conn, $request->Address);
        $PhoneNumber = mysqli_real_escape_string($conn, $request->PhoneNumber);
        $Email = mysqli_real_escape_string($conn, $request->Email);
        $Career = mysqli_real_escape_string($conn, $request->Career);
        $Status = mysqli_real_escape_string($conn, $request->Status);

        $sql = "INSERT INTO `DonorDetail`(`NIN`, `Name`, `Brithday`, `sex`, `Age`, `Cdisease`, `Bgroup`, `weight`, `Address`, `PhoneNumber`, `E-mail`, `Career`) 
    VALUES (".$NIN.",'".$Name."','".$Brithday."',".$sex.",".$Age.",'".$Cdisease."','".$Bgroup."',".$weight.",'".$Address."','".$PhoneNumber."','".$Email."','".$Career."')";


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