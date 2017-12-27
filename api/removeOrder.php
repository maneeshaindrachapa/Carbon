<?php
include "Crud.php";
$crud= new Crud();

$data=json_decode(file_get_contents("php://input"));
$type=1;
if(sizeof($data)!=null){
    
    $query="delete from orders where order_id ='$data->order_id' limit 1";

    $dataExecute=$crud->execute($query);
    echo json_encode($dataExecute);
}