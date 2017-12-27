<?php
    include "Crud.php";
    $crud= new Crud();
    
    $datainput=json_decode(file_get_contents("php://input"));
        if(sizeof($datainput)!=null){
        $shop_id=$datainput->shop_id;
        $query="select * from orders where shop_id='$shop_id'";
        $data=$crud->getData($query);
        
        echo json_encode($data);
    }
?>