<?php

    include("connectDB.php");
    $id=isset($_GET['id']) ? $_GET['id'] : die('ERROR: Record ID not found.');
    $orders = [];
    $sql = "SELECT * FROM Order_Blood WHERE Employee_ID = '$id'"; // 1 คือ ยังอยู่ในคลัง
    if($result = mysqli_query($conn,$sql)){
        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $orders[$i]['Order_ID'] = $row['Order_ID'];
            $orders[$i]['Employee_ID'] = $row['Employee_ID'];
            $orders[$i]['Plasma_num'] = $row['Plasma_num'];
            $orders[$i]['BCs_num'] = $row['BCs_num'];
            $orders[$i]['Platelets_num'] = $row['Platelets_num'];
            $orders[$i]['Order_date'] = $row['Order_date'];
            $orders[$i]['Status'] = $row['Status'];
            $orders[$i]['Endorser_ID'] = $row['Endorser_ID'];
            $orders[$i]['Bgroup'] = $row['Bgroup'];
            $i++;
        }
        echo json_encode($orders);
    }else{
        http_response_code(404);
    }



?>