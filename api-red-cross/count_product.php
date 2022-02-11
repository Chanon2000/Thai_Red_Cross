<?php
    include('connectDB.php');



    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 101 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $Plasma_A = $row['num'];//ถ้าไม่ใช้numก็เรียนเป็น $row[0]
    // echo $Plasma_A;
    // echo var_dump($result);


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 102 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $Plasma_B = $row['num'];
    


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 103 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $Plasma_AB = $row['num'];
    


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 104 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $Plasma_O = $row['num'];
    


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 105 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $BCs_A = $row['num'];
    


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 106 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $BCs_B = $row['num'];
    


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 107 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $BCs_AB = $row['num'];


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 108 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $BCs_O = $row['num'];
    


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 109 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $Platelets_A = $row['num'];
    


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 110 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $Platelets_B = $row['num'];



    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 111 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $Platelets_AB = $row['num'];
    


    $sql = "SELECT COUNT(*) AS num FROM `Product` WHERE `Protype_ID` = 112 AND `Status`= 1";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($result);
    $Platelets_O = $row['num'];

    $countProduct;
    $countProduct['Plasma_A'] = $Plasma_A;
    $countProduct['Plasma_B'] = $Plasma_B;
    $countProduct['Plasma_AB'] = $Plasma_AB;
    $countProduct['Plasma_O'] = $Plasma_O;
    $countProduct['BCs_A'] = $BCs_A;
    $countProduct['BCs_B'] = $BCs_B;
    $countProduct['BCs_AB'] = $BCs_AB;
    $countProduct['BCs_O'] = $BCs_O;
    $countProduct['Platelets_A'] = $Platelets_A;
    $countProduct['Platelets_B'] = $Platelets_B;
    $countProduct['Platelets_AB'] = $Platelets_AB;
    $countProduct['Platelets_O'] = $Platelets_O;
    // $count = [$Plasma_A,$Plasma_B,$Plasma_AB,$Plasma_O,$BCs_A,$BCs_B,$BCs_AB,$BCs_O,$Platelets_A,$Platelets_B,$Platelets_AB,$Platelets_O];
    echo json_encode($countProduct);
    ?>