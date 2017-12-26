<?php
include "Crud.php";
$crud= new Crud();

$data=json_decode(file_get_contents("php://input"));
if(sizeof($data)!=null){
    $query="INSERT INTO product(shop_id,productname,price,details) VALUES('$data->shop_id','$data->productname','$data->price','$data->details')";

    $dataExecute=$crud->execute($query);
    echo json_encode($dataExecute);
}
?>