<?php
    include "Crud.php";
    $crud= new Crud();
    
    $datainput=json_decode(file_get_contents("php://input"));
        if(sizeof($datainput)!=null){
        $username=$datainput->username;
        $query="select * from owenrs natural join shopdetails where ownername='$username'";
        $data=$crud->getData($query);
        
        echo json_encode($data[0]);
    }
?>