<?php
    include "Crud.php";
    $crud= new Crud();
    
    $logindata=json_decode(file_get_contents("php://input"));
    if(sizeof($logindata)!=0){
        $errors="";

        $username=$logindata->username;
        $password=$logindata->password;
        
        $query="SELECT username,password,type FROM users where username='$logindata->username'";
        $data=$crud->getData($query);
        if($data[0]["password"]==$password){        
            echo json_encode($data[0]);
        }
    }

?>