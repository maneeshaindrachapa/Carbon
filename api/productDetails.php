<?php
    header('Access-Control-Allow-Origin: *');

    include "Crud.php";
    $crud= new Crud();
    
    $datainput=json_decode(file_get_contents("php://input"));
    if(sizeof($datainput)!=0){
        $shop_id=$datainput->shopid;
        
        $query="SELECT * from productfull where shop_id='$shop_id'";
        $data=$crud->getData($query);

        echo (json_encode($data));
    }
?>