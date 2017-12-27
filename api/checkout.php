<?php
    include "Crud.php";
    $crud= new Crud();
    
    $datainput=json_decode(file_get_contents("php://input"));
        if(sizeof($datainput)!=null){
            //start transction
            $query6="Start transaction";
            $data6=$crud->execute($query6);
        
            $username=$datainput->username;
            $query="select * from cart natural join product where username='$username' group by cart_id";
            $data=$crud->getData($query);
            
            $clearCart=array();
            for($i=0; $i<sizeof($data); $i++){
                $cart_id=$data[$i]['cart_id'];
                $prod_id=$data[$i]['id'];
                $quantity=$data[$i]['quantity'];
                $pricePay=$data[$i]['pricePay'];
                $shop_id=$data[$i]['shop_id'];
                $productname=$data[$i]['productname'];

                array_push($clearCart,$cart_id);

                $query1="INSERT INTO orders(firstname,lastname,shop_id,product_id,productname,quantity,pricePay,city,street,email,telephone) VALUES('$datainput->firstname','$datainput->lastname','$shop_id','$prod_id','$productname','$quantity','$pricePay','$datainput->city','$datainput->streetaddress','$datainput->email','$datainput->telephone')";
                $data1=$crud->execute($query1);

               }
            for($j=0;$j<sizeof($clearCart);$j++){
                $query4="delete from cart where cart_id ='$clearCart[$j]' limit 1";
                $dataExecute=$crud->execute($query4);
            }
        //end transaction
        $query7="commit";
        $data7=$crud->execute($query7);

        echo json_encode($data7);
    }
?>