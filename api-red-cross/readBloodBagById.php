<?php
    include("connectDB.php");
    $id=isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');
    $bloodbag;
    $sql = "SELECT * FROM Blood_Bag WHERE BloodBag_ID = '$id'";
    if($result = mysqli_query($conn,$sql)){
        $row = mysqli_fetch_assoc($result);
        $bloodbag['BloodBag_ID'] = $row['BloodBag_ID'];
        $bloodbag['PhleCode'] = $row['PhleCode'];
        $bloodbag['DateofDonate'] = $row['DateofDonate'];
        $bloodbag['Bgroup'] = $row['Bgroup'];
        $bloodbag['volum'] = $row['volum'];
        $bloodbag['Donor_ID'] = $row['Donor_ID'];
        $bloodbag['Test_Status'] = $row['Test_Status'];
        $bloodbag['Status'] = $row['Status'];

        echo json_encode($bloodbag);
    }else{
        http_response_code(404);
    }



?>