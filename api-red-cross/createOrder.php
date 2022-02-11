<?php
    include("connectDB.php");
    $order = file_get_contents("php://input");
    if(isset($order) && !empty($order)){
        $request = json_decode($order);

        $Order_ID = mysqli_real_escape_string($conn, $request->Order_ID);
        $Employee_ID = mysqli_real_escape_string($conn, (int)$request->Employee_ID);
        $Plasma_num = mysqli_real_escape_string($conn, (int)$request->Plasma_num);
        $BCs_num = mysqli_real_escape_string($conn, (int)$request->BCs_num);
        $Platelets_num = mysqli_real_escape_string($conn, (int)$request->Platelets_num);
        $Order_date = mysqli_real_escape_string($conn, $request->Order_date);
        $Status = mysqli_real_escape_string($conn, $request->Status);
        $Endorser_ID = mysqli_real_escape_string($conn, $request->Endorser_ID);
        $Bgroup = mysqli_real_escape_string($conn, $request->Bgroup);



        $sql = "INSERT INTO `Order_Blood`( `Employee_ID`, `Plasma_num`, `BCs_num`, `Platelets_num`,  
      `Bgroup`) 
    VALUES (".$Employee_ID.",".$Plasma_num.",".$BCs_num.",".$Platelets_num.",'".$Bgroup."')";


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