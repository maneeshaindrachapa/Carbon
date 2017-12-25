<?php
include "Crud.php";
$crud= new Crud();

$data=json_decode(file_get_contents("php://input"));
$type=1;
if(sizeof($data)!=null){
    //print_r(($logindata));
    $query="INSERT INTO users(username,firstname,lastname,password,type) VALUES('$data->username','$data->firstname','$data->lastname','$data->password','$type')";

    $dataExecute=$crud->execute($query);
    echo json_encode($dataExecute);
}
?>