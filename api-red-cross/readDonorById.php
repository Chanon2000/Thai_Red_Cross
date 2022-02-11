<?php
    include("connectDB.php");
    $id=isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');
    $donor;
    $sql = "SELECT * FROM DonorDetail WHERE Donor_ID = '$id'";
    if($result = mysqli_query($conn,$sql)){
        $row = mysqli_fetch_assoc($result);
        $donor['Donor_ID'] = $row['Donor_ID'];
        $donor['NIN'] = $row['NIN'];
        $Name = explode(" ",$row['Name']);
        $donor['firstName'] = $Name[0];
        $donor['lastName'] = $Name[1];
        $donor['Brithday'] = $row['Brithday'];
        $donor['sex'] = $row['sex'];
        $donor['Age'] = $row['Age'];
        $donor['Cdisease'] = $row['Cdisease'];
        $donor['Bgroup'] = $row['Bgroup'];
        $donor['weight'] = $row['weight'];
        $donor['Address'] = $row['Address'];
        $donor['PhoneNumber'] = $row['PhoneNumber'];
        $donor['Email'] = $row['E-mail'];
        $donor['Career'] = $row['Career'];
        $donor['Status'] = $row['Status'];

        echo json_encode($donor);
    }else{
        http_response_code(404);
    }



?>