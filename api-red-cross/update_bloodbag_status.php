<?php
    include("connectDB.php");
    $id=isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');

    // echo $id;
    $sql = "UPDATE `Blood_Bag` SET `Status`=0 WHERE `BloodBag_ID`= '$id'";
    if(mysqli_query($conn,$sql))
        {
            http_response_code(201);
        }
        else
        {
            http_response_code(422);
        }

?>