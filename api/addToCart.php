<?php
include "Crud.php";
$crud= new Crud();

$data=json_decode(file_get_contents("php://input"));
$type=1;
if(sizeof($data)!=null){
    
    $query="INSERT INTO cart(username,id,quantity,price) VALUES('$data->username','$data->id','$data->quantity','$data->price')";

    $dataExecute=$crud->execute($query);
    echo json_encode($dataExecute);
}
?>