<?php
    include('connectDB.php');
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


        $sql="UPDATE Order_Blood SET Status = 2, Endorser_ID =".$Employee_ID." WHERE Order_ID = ".$Order_ID;
        if (mysqli_query($conn,$sql)) {
            $res = "Pass";
            echo json_encode($res);
            // echo "New record created successfully";
        } else {
            // echo "Error: " . $sql . "<br>" . $conn->error;
            $res = "No";
            echo json_encode($res);
        }



    }

    

$conn->close();
?>