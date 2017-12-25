<?php
    include "Crud.php";
    $crud= new Crud();

    $login_data=json_decode(file_get_contents("php://input"));
    if(sizeOf($login_data->username)!=0){
        $query="SELECT * From users where username='$login_data->username'";

        $data=$crud->getData($query);
        
        echo json_encode($data[0]);
    }
?>