<?php
include("connectDB.php");
$bbdata = file_get_contents("php://input");
if(isset($bbdata) && !empty($bbdata)){
    $request = json_decode($bbdata);
    

    $BloodBag_ID = mysqli_real_escape_string($conn, $request->BloodBag_ID);
    $PhleCode = mysqli_real_escape_string($conn, $request->PhleCode);
    $DateofDonate = mysqli_real_escape_string($conn, $request->DateofDonate);
    $Bgroup = mysqli_real_escape_string($conn, $request->Bgroup);
    $volum = mysqli_real_escape_string($conn, (int)$request->volum);
    $Donor_ID = mysqli_real_escape_string($conn, (int)$request->Donor_ID);
    $Test_Status = mysqli_real_escape_string($conn, $request->Test_Status);


    // Update.
    $sql = "UPDATE `Blood_Bag` SET `PhleCode`=".$PhleCode.",`DateofDonate`='".$DateofDonate."',
    `Bgroup`='".$Bgroup."',`volum`=".$volum.",`Test_Status`=".$Test_Status.",`Donor_ID`=".$Donor_ID." 
    WHERE BloodBag_ID =".$BloodBag_ID;

  if(mysqli_query($conn, $sql))
  {
    // echo "New update successfully";
    http_response_code(204);
  }
  else
  {
    // echo "Error: " . $sql . "<br>" . $conn->error; 
    return http_response_code(422); 
  } 
}