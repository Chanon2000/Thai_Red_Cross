<?php

    include("connectDB.php");

    $donors = [];
    $sql = "SELECT * FROM DonorDetail WHERE status = 0";
    if($result = mysqli_query($conn,$sql)){
        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $donors[$i]['Donor_ID'] = $row['Donor_ID'];
            $donors[$i]['NIN'] = $row['NIN'];
            $Name = explode(" ",$row['Name']);
            $donors[$i]['firstName'] = $Name[0];
            $donors[$i]['lastName'] = $Name[1];
            $donors[$i]['Brithday'] = $row['Brithday'];
            $donors[$i]['sex'] = $row['sex'];
            $donors[$i]['Age'] = $row['Age'];
            $donors[$i]['Cdisease'] = $row['Cdisease'];
            $donors[$i]['Bgroup'] = $row['Bgroup'];
            $donors[$i]['weight'] = $row['weight'];
            $donors[$i]['Address'] = $row['Address'];
            $donors[$i]['PhoneNumber'] = $row['PhoneNumber'];
            $donors[$i]['E-mail'] = $row['E-mail'];
            $donors[$i]['Career'] = $row['Career'];
            $donors[$i]['Status'] = $row['Status'];
            $i++;
        }
        

        echo json_encode($donors);
    }else{
        http_response_code(404);
    }



?>