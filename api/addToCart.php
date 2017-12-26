<?php
include "Crud.php";
$crud= new Crud();

$data=json_decode(file_get_contents("php://input"));
$type=1;
if(sizeof($data)!=null){
    $query1="select * from cart where id='$data->id'";
    $dataexecute1=$crud->getData($query1);
    if(sizeof($dataexecute1)!=null){
        $quantity=(int)$data->quantity + (int)$dataexecute1[0]['quantity']; 
        $pricePay=(float)$data->price + (float)$dataexecute1[0]['pricePay'];

        $query2="UPDATE Cart SET quantity = '$quantity', pricePay= '$pricePay' WHERE id ='$data->id'";
        $dataexecute2=$crud->execute($query2);
        echo json_encode($dataexecute2);
    }else{
    $query="INSERT INTO cart(username,id,quantity,pricePay) VALUES('$data->username','$data->id','$data->quantity','$data->price')";

    $dataExecute=$crud->execute($query);
    echo json_encode($dataExecute);
    }
}
?>