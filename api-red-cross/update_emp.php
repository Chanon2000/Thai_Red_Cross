<?php
include("connectDB.php");
$empdata = file_get_contents("php://input");
if(isset($empdata) && !empty($empdata)){
    $request = json_decode($empdata);
    

    $Employee_ID = mysqli_real_escape_string($conn, $request->Employee_ID);
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


    // Update.
  $sql = "UPDATE `EmployeeAccount` SET `Employee_ID`=$Employee_ID, `Username`='$Username',`Password`='$Password',`EmployeeName`='$EmployeeName',`sex`=$sex,`Age`=$Age,`Address`='$Address',`PhoneNumber`='$PhoneNumber',`Type_ID`=$Type_ID,`StartDate`='$StartDate' WHERE `Employee_ID` = $Employee_ID LIMIT 1";

  if(mysqli_query($conn, $sql))
  {
    echo "New update successfully";
    http_response_code(204);
  }
  else
  {
    echo "Error: " . $sql . "<br>" . $conn->error; 
    return http_response_code(422); 
  } 
}




  
    


   

?>


