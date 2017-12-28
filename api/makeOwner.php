<?php
include "Crud.php";
$crud= new Crud();

$data=json_decode(file_get_contents("php://input"));
$type=1;
if(sizeof($data)!=null){
     //start transction
    $query6="Start transaction";
    $data6=$crud->execute($query6);
    
    $username=$data->ownername;
    $shop_id=$data->shop_id;

    $query1="UPDATE users SET type =2 WHERE username ='$username'";
    $data1=$crud->execute($query1);

    $query2="SELECT * from owners where ownername='$username'";
    $data2=$crud->getData($query2);
    if(sizeof($data2)==0){
        $query3="INSERT INTO owners(ownername,shop_id) VALUES('$username','$shop_id')";
        $data3=$crud->execute($query3);

        //end transaction
        $query7="commit";
        $data7=$crud->execute($query7);
        echo json_encode($data7);
    }else{
        $query4="UPDATE owners SET shop_id ='$shop_id' WHERE ownername ='$username'";
        $data4=$crud->execute($query4);
        //end transaction
        $query7="commit";
        $data7=$crud->execute($query7);
        echo json_encode($data7);

    }    
}

?>