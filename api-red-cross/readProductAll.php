<?php

    include("connectDB.php");

    $products = [];
    $sql = "SELECT * FROM Product WHERE status = 1"; // 1 คือ ยังอยู่ในคลัง
    if($result = mysqli_query($conn,$sql)){
        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $products[$i]['Product_ID'] = $row['Product_ID'];
            $products[$i]['Protype_ID'] = $row['Protype_ID'];
            $products[$i]['BloodBag_ID'] = $row['BloodBag_ID'];
            $products[$i]['volum'] = $row['volum'];
            $products[$i]['Test_Status'] = $row['Test_Status'];
            $products[$i]['Status'] = $row['Status'];
            $i++;
        }
        echo json_encode($products);
    }else{
        http_response_code(404);
    }



?>