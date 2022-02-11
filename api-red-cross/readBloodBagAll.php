<?php

    include("connectDB.php");

    $bloodbags = [];
    $sql = "SELECT * FROM Blood_Bag WHERE status = 1";
    if($result = mysqli_query($conn,$sql)){
        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $bloodbags[$i]['BloodBag_ID'] = $row['BloodBag_ID'];
            $bloodbags[$i]['PhleCode'] = $row['PhleCode'];
            $bloodbags[$i]['DateofDonate'] = $row['DateofDonate'];
            $bloodbags[$i]['Bgroup'] = $row['Bgroup'];
            $bloodbags[$i]['volum'] = $row['volum'];
            $bloodbags[$i]['Donor_ID'] = $row['Donor_ID'];
            $bloodbags[$i]['Test_Status'] = $row['Test_Status'];
            $bloodbags[$i]['Status'] = $row['Status'];
            $i++;
        }
        echo json_encode($bloodbags);
    }else{
        http_response_code(404);
    }



?>