<?php
include("connectDB.php");
$empdata = file_get_contents("php://input");
if(isset($empdata) && !empty($empdata)){
    $request = json_decode($empdata);
    

    $Donor_ID = mysqli_real_escape_string($conn, $request->Donor_ID);
    $NIN = mysqli_real_escape_string($conn, $request->NIN);
    $firstName = mysqli_real_escape_string($conn, $request->firstName);
    $lastName = mysqli_real_escape_string($conn, $request->lastName);
    $Name = $firstName.' '.$lastName;
    $Brithday = mysqli_real_escape_string($conn, $request->Brithday);
    $sex = mysqli_real_escape_string($conn, (int)$request->sex);
    $Age = mysqli_real_escape_string($conn, (int)$request->Age);
    $Cdisease = mysqli_real_escape_string($conn, $request->Cdisease);
    $Bgroup = mysqli_real_escape_string($conn, $request->Bgroup);
    $weight = mysqli_real_escape_string($conn, (int)$request->weight);
    $Address = mysqli_real_escape_string($conn, $request->Address);
    $PhoneNumber = mysqli_real_escape_string($conn, $request->PhoneNumber);
    $Email = mysqli_real_escape_string($conn, $request->Email);
    $Career = mysqli_real_escape_string($conn, $request->Career);
    $Status = mysqli_real_escape_string($conn, $request->Status);


    // Update.
  $sql = "UPDATE `DonorDetail` SET `Donor_ID`=$Donor_ID, `NIN`='$NIN',`Name`='$Name',`Brithday`='$Brithday',`sex`=$sex,`Age`=$Age,`Cdisease`='$Cdisease',`Bgroup`='$Bgroup',`weight`=$weight,`Address`='$Address', `PhoneNumber`='$PhoneNumber', `E-mail`='$Email', `Career`='$Career', `Status`=$Status WHERE `Donor_ID` = $Donor_ID LIMIT 1";

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