<?php
    include("connectDB.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        // echo $postdata;
        $request = json_decode($postdata);
        // echo $postdata;


        $Username = mysqli_real_escape_string($conn, $request->Username);
        $Password = mysqli_real_escape_string($conn, $request->Password);
        $firstName = mysqli_real_escape_string($conn, $request->firstName);
        $lastName = mysqli_real_escape_string($conn, $request->lastName);
        $EmployeeName = $firstName.' '.$lastName;
        $sex = mysqli_real_escape_string($conn, (int)$request->sex);
        $Age = mysqli_real_escape_string($conn, (int)$request->Age);
        $Address = mysqli_real_escape_string($conn, $request->Address);
        $PhoneNumber = mysqli_real_escape_string($conn, $request->PhoneNumber);
        $Type_ID = mysqli_real_escape_string($conn, (int)$request->Type_ID);
        $StartDate = mysqli_real_escape_string($conn, $request->StartDate);

        $sql = "INSERT INTO `EmployeeAccount`(`Username`, `Password`, `EmployeeName`, `sex`, `Age`, `Address`, `PhoneNumber`, `Type_ID`, `StartDate`) 
     VALUES ('".$Username."','".$Password."','".$EmployeeName."',".$sex.",".$Age.",'".$Address."','".$PhoneNumber."',".$Type_ID.",'".$StartDate."')";


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

    // echo " ".$_POST['Username']." ".$_POST['Password']." ".$_POST['firstName']." ".$_POST['lastName'] ." ".$_POST['sex'].$_POST['Age'] ." ".$_POST['Address'] ." "
    // ." ".$_POST['PhoneNumber']." ".$_POST['Type_ID']." ".$_POST['StartDate'];

    
    // $Username=$_POST['Username'];
    // $Password=$_POST['Password'];
    // $firstName=$_POST['firstName'];
    // $lastName=$_POST['lastName'];
    // $EmployeeName = $firstName.' '.$lastName;
    // $sex=$_POST['sex'];
    // $Age=$_POST['Age'];
    // $Address=$_POST['Address'];
    // $PhoneNumber=$_POST['PhoneNumber'];
    // $Type_ID=$_POST['Type_ID'];
    // $StartDate=$_POST['StartDate'];



    // $sql = "INSERT INTO `EmployeeAccount`(`Username`, `Password`, `EmployeeName`, `sex`, `Age`, `Address`, `PhoneNumber`, `Type_ID`, `StartDate`) 
    // VALUES ('".$Username."','".$Password."','".$EmployeeName."',".$sex.",".$Age.",'".$Address."','".$PhoneNumber."',".$Type_ID.",'".$StartDate."')";

    


    // if ($conn->query($sql) === TRUE) {
    //     echo "New record created successfully";

    // } else {
    //     echo "Error: " . $sql . "<br>" . $conn->error;
    // }

    // $conn->close();

?>