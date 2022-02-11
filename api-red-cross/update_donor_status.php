<?php
    include("connectDB.php");
    $id=isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');

    // echo $id;
    $sql = "UPDATE `DonorDetail` SET `Status`=1 WHERE `Donor_ID`= '$id'";
    if(mysqli_query($conn,$sql))
        {
            // $conn->query($sql) === TRUE ในที่นี้ใช้คำสั่งนี้แล้วไม่ผ่าน
            // echo "New update successfully"; // **** ใส่อันนี้ แล้วทำให้  http_response_code(201); ไป error ที่ angular
            http_response_code(201);
            
        }
        else
        {
            // echo "Error: " . $sql . "<br>" . $conn->error; 
            http_response_code(422);
        }

?>