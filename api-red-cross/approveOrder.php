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
        $check_Plasma=0;// 0 คือของไม่พอorder
        $check_BCs=0;
        $check_Platelets=0;
        
        

        //1. check_stock
        if ($Plasma_num > 0){ // check ว่า มากกว่า 0 มั้ย
            //หาrecord product ที่ เป็นtype Plasma จาก 'Plasma' และตัวแปร $Bgroup
            $sql="SELECT * FROM Product PD INNER JOIN Protype PT ON PD.Protype_ID = PT.Protype_ID 
            WHERE  PD.Status=1 AND PT.Protype_name LIKE 'Plasma_".$Bgroup."'ORDER BY `Product_ID` ASC LIMIT ".$Plasma_num;//LIMIT ".$Plasma_num คือเอามาตามจำนวนที่รับจาก $Plasma_num
            $result = mysqli_query($conn,$sql);
            if (mysqli_num_rows($result) == $Plasma_num){ // ถ้า recordที่หาได้ในstockมีเท่ากับ ค่า$Plasma_num(หรือจำนวนถุงที่หมอต้องการ)
                $check_Plasma=1; // 1 คือของพอOrder
            }else{
                $check_Plasma=0;
                //คำสั่งบางอย่างที่ทำแล้วออกจากไฟล์ไปเลยไม่ทำต่อมีมั้ย?
            }
        }else{
            $check_Plasma=1; //ถ้า $Plasma เป็น 0 คือไม่ได้สั่งสินค้านั้น ดังนั้นจึงพอstockแน่นอน
        }
        if ($BCs_num > 0){
            $sql="SELECT * FROM Product PD INNER JOIN Protype PT ON PD.Protype_ID = PT.Protype_ID 
            WHERE  PD.Status=1 AND PT.Protype_name LIKE 'Plasma_".$Bgroup."'ORDER BY `Product_ID` ASC LIMIT ".$BCs_num;
            $result = mysqli_query($conn,$sql);
            if (mysqli_num_rows ($result) == $BCs_num){
                $check_BCs=1;
            }else{
                $check_BCs=0;
            }
        }
        else{
            $check_BCs=1;
        }
        if ($Platelets_num > 0){
            $sql="SELECT * FROM Product PD INNER JOIN Protype PT ON PD.Protype_ID = PT.Protype_ID 
            WHERE  PD.Status=1 AND PT.Protype_name LIKE 'Plasma_".$Bgroup."'ORDER BY `Product_ID` ASC LIMIT ".$Platelets_num;
            $result = mysqli_query($conn,$sql);
            if (mysqli_num_rows ($result) == $Platelets_num){
                $check_Platelets=1;
            }else{
                $check_Platelets=0;
            }
        }else{
            $check_Platelets=1;
        }



        //2. ทำการ INSERT ลง LogOrder 
        if($check_Plasma==1 AND $check_BCs==1 AND $check_Platelets==1){
            if ($Plasma_num > 0){ //check ว่า มากกว่า 0 มั้ย //ต้องcheckอยู่เพราะว่า เมื่อ$Plasma=0ไม่ควรจะเข้ามาINSERTลงLogOrder
                $sql="SELECT * FROM Product PD INNER JOIN Protype PT ON PD.Protype_ID = PT.Protype_ID 
                WHERE PD.Status=1 AND PT.Protype_name LIKE 'Plasma_".$Bgroup."'ORDER BY `Product_ID` ASC LIMIT ".$Plasma_num;
                $result = mysqli_query($conn,$sql);
                //ก่อนหน้านี้คำสั่งsqlด้านบนคุณไม่กำหนดในWHEREว่าเอาStatus=1ด้วย เลยทำให้เมื่อถุงสถานะเป็น0(คือ"ใช้แล้ว")เป็นถุงเก่าสุด จะทำให้มันเมื่อเข้าwhileด้านล่างสถานะ0ก็ยังเป็นสถานะ0
                if (mysqli_num_rows ($result) == $Plasma_num){//หักstock
                    while($row = $result->fetch_assoc()) {//fetch เป็น array ที่ละ record
                        $sql="INSERT INTO `LogOrder`(`Product_ID`, `Order_ID`, `Protype_ID`) VALUES (".$row['Product_ID'].",".$Order_ID.",".$row['Protype_ID'].")";
                        if (mysqli_query($conn,$sql)) {
                            // echo "New record created successfully";
                            // header('location: ../html/Member_UI/ChangeOrder.php'); //กลับไปยังหน้าตาราง
                        } else {
                            echo "Error: " . $sql . "<br>" . $conn->error;
                        }//ทำการ update status record นี้ ของ Product
                        $sql="UPDATE Product PD  SET PD.Status=0 WHERE PD.Product_ID = ".$row['Product_ID'];
                        if (mysqli_query($conn,$sql)) {
                            // echo "New record created successfully";
                            // header('location: ../html/Member_UI/ChangeOrder.php'); //กลับไปยังหน้าตาราง
                        } else {
                            // echo "Error: " . $sql . "<br>" . $conn->error;
                        }
                    }
                }
            }
            if ($BCs_num > 0){
                $sql="SELECT * FROM Product PD INNER JOIN Protype PT ON PD.Protype_ID = PT.Protype_ID 
                WHERE  PD.Status=1 AND PT.Protype_name LIKE 'Plasma_".$Bgroup."'ORDER BY `Product_ID` ASC LIMIT ".$BCs_num;//คืนค่าrecordไม่เกิน BCs_num
                $result = mysqli_query($conn,$sql);

                if (mysqli_num_rows ( $result ) == $BCs_num){//หักstock
                    // $check_update=1;
                    while($row = $result->fetch_assoc()) {
                        $sql="INSERT INTO `LogOrder`(`Product_ID`, `Order_ID`, `Protype_ID`) VALUES (".$row['Product_ID'].",".$Order_ID.",".$row['Protype_ID'].")";
                        if (mysqli_query($conn,$sql)) {
                            // echo "New record created successfully";
                            // header('location: ../html/Member_UI/ChangeOrder.php'); //กลับไปยังหน้าตาราง
                        } else {
                            // echo "Error: " . $sql . "<br>" . $conn->error;
                        }
                        $sql="UPDATE Product PD INNER JOIN Protype PT ON PD.Protype_ID = PT.Protype_ID SET PD.Status=0 
                        WHERE PD.Product_ID = ".$row['Product_ID'];
                        if (mysqli_query($conn,$sql)) {
                            // echo "New record created successfully";
                            // header('location: ../html/Member_UI/ChangeOrder.php'); //กลับไปยังหน้าตาราง
                        } else {
                            // echo "Error: " . $sql . "<br>" . $conn->error;
                        }
                    }
                }
            }
            if ($Platelets_num > 0){
                $sql="SELECT * FROM Product PD INNER JOIN Protype PT ON PD.Protype_ID = PT.Protype_ID 
                WHERE  PD.Status=1 AND PT.Protype_name LIKE 'Plasma_".$Bgroup."'ORDER BY `Product_ID` ASC LIMIT ".$Plasma_num;
                $result = mysqli_query($conn,$sql);

                if (mysqli_num_rows ( $result ) == $Plasma_num){//หักstock
                    // $check_update=1;
                    while($row = $result->fetch_assoc()) {
                        $sql="INSERT INTO `LogOrder`(`Product_ID`, `Order_ID`, `Protype_ID`) VALUES (".$row['Product_ID'].",".$Order_ID.",".$row['Protype_ID'].")";
                        if (mysqli_query($conn,$sql)) {
                            // echo "New record created successfully";
                            // header('location: ../html/Member_UI/ChangeOrder.php'); //กลับไปยังหน้าตาราง
                        } else {
                            // echo "Error: " . $sql . "<br>" . $conn->error;
                        }
                        $sql="UPDATE Product PD INNER JOIN Protype PT ON PD.Protype_ID = PT.Protype_ID SET PD.Status=0 
                        WHERE PD.Product_ID = ".$row['Product_ID'];
                        if (mysqli_query($conn,$sql)) {
                            // echo "New record created successfully";
                            // header('location: ../html/Member_UI/ChangeOrder.php'); //กลับไปยังหน้าตาราง
                        } else {
                            // echo "Error: " . $sql . "<br>" . $conn->error;
                        }
                    }
                }
            }
        }

        //3. ทำการUPDATE สถานะของ Order
        if ($check_Plasma==1 AND $check_BCs==1 AND $check_Platelets==1){
            $sql="UPDATE Order_Blood SET Status = 1, Endorser_ID =".$Employee_ID." WHERE Order_ID = ".$Order_ID;
            if (mysqli_query($conn,$sql)) {
                $res = "Pass";
                echo json_encode($res);

            } else {
                // echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }else{//ถ้าของไม่พร้อมOrder การกลับไปหน้าเดิม

            $res = "No";
            echo json_encode($res); // คุณต้อง return เป็น json ให้ angular **********
        }
    }

    // คุณใส่ กรุ๊ป C มาได้ โดยให้ทุกชนิดเป็น 0 เพราะว่า มันเข้ามาแล้วทำupdate ในขั้นตอนที่ 3 เลย
?>