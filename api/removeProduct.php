<?php
include "Crud.php";
$crud= new Crud();

$data=json_decode(file_get_contents("php://input"));
$type=1;
if(sizeof($data)!=null){
    
    $query="delete from product where id ='$data->id' limit 1";

    $dataExecute=$crud->execute($query);
    echo json_encode($dataExecute);
}
?>