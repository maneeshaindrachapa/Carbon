<?php
include "Crud.php";
$crud= new Crud();

$data=json_decode(file_get_contents("php://input"));
$type=1;
if(sizeof($data)!=null){
    $query="INSERT INTO shopdetails(shopname,description,profilePic) VALUES('$data->shopname','$data->description','$data->profilePic')";

    $dataExecute=$crud->execute($query);
    echo json_encode($dataExecute);
}
?>