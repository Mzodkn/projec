<?php
session_start();
include "db.php";
$pdo = pdo_mysql();


//post
if (isset($_POST['method'])){
    $method = $_POST['method'];







//Login 
if ($method == 'login'){
$un = $_POST['un'];
$up = $_POST['up'];
$stmt = $pdo->prepare("select * from users where usern=:un AND pass=:up");
$stmt->bindParam(':un', $un, PDO::PARAM_STR);
$stmt->bindParam(':up', $up, PDO::PARAM_STR);

$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$_SESSION['role'] =$user['id'];
 setcookie('user_id', $user['id'], time()+3600, '/');


if($user){

    echo json_encode(['status' =>"success"]);
    //you have to use $_session to evade IDORS

}
else   echo json_encode(['status' =>"fail"]);
}

//logout
if($method=='logout'){
    session_destroy();
    setcookie('user_id', '', 1, '/');
    echo json_encode(['status' =>"success"]);
}

//isloged in
if($method == 'status'){
header('Content-Type: application/json');
if(isset($_COOKIE['user_id'])){
    echo json_encode(['loged_in' => true,'user_id' => $_COOKIE['user_id']]);
}else echo json_encode(['loged_in'=>false]);
exit;
}

//show
if($method == "show" ){
    if(isset($_COOKIE['user_id'])){
        $id = $_COOKIE['user_id'];
  
if(isset($_COOKIE['admin']) || $id == 1){

    $stmt= $pdo->prepare("select * from users");
    $stmt->execute();
    $users = $stmt->fetchALL(PDO::FETCH_ASSOC);
}else{
    $stmt= $pdo->prepare("select * from users where id=:id");
    $stmt->bindParam(':id',$id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetchALL(PDO::FETCH_ASSOC);
}
        header('Content-Type: application/json');
        echo json_encode($user);
        exit;
}else{
     echo json_encode(['error'=> 'User Not Logged in']);
}
}

//creat
if ($method == 'creat'){
    if(isset($_POST['type']) && $_POST['type'] == 'user'){
$un = $_POST['un'];
$up = $_POST['up'];
$keyp = $_POST['key'];

$stmt = $pdo->prepare(`INSERT INTO users (usern, pass, keyp) VALUES (:user, :pass, :keyp) `);
$stmt->bindParam(':user', $un, PDO::PARAM_STR);
$stmt->bindParam(':pass',$up, PDO::PARAM_STR);
$stmt->bindParam(':keyp',$keyp, PDO::PARAM_STR);
$stmt->execute();
if ($stmt->rowCount() > 0) {
    echo "success";
} else {
    echo "failed";


}}

if(isset($_POST['type'])){
    $type = $_POST['type'];
    if($type =='new-prod'){

        $img = $_FILES['prod-src'];

   $arr = explode('.', $img['name']);
    $ext = end($arr);
    $n = strlen($ext);
    $iname = substr($img['name'], 0, - $n - 1 );
    $unique_name = $iname."-".uniqid('+', false).".". $ext;
$path = dirname(__DIR__) . '/uploads/img/' . $unique_name;    
 move_uploaded_file($img['tmp_name'], $path);
     
     
                      $name = $_POST['prod-name'];
  
$price = $_POST['prod-price'];
$qty = $_POST['prod-qty'];
$cid = $_POST['prod-cid'];

if ($cid=='labtops')$cid = 1;
if ($cid=='phones')$cid = 2;
if ($cid=='playstations')$cid = 3;
if ($cid=='watches')$cid = 4;


$decs = $_POST['prod-desc'];
$stmt=$pdo->prepare("INSERT INTO `products`(`name`, `price`, `quantity`, `cid`, `descrip`, `src`)
 VALUES ('$name',$price,$qty,$cid,'$decs','uploads/img/$unique_name')");
 $stmt->execute();

echo json_encode(['status'=>'success']);



    }
}
}
//update
if($method == 'edit'){
    $id = $_POST['id'];
    $un = $_POST['un'];
    $keyp = $_POST['key'];
    $stmt = $pdo->prepare('UPDATE users SET usern = :user, keyp = :keyp WHERE id = :id');
    $stmt->bindParam(':user', $un, PDO::PARAM_STR);
    $stmt->bindParam(':keyp', $keyp, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
if ($stmt->execute()) {
                            
echo json_encode(['status'=>'success']);

}}

// show-cart
if($method == 'show-cart'){
    $user_id = $_COOKIE['user_id']; 

    $stmt = $pdo->prepare("
        SELECT 
            c.id AS id, 
            p.name, 
            p.price, 
            p.src, 
            c.q AS quantity 
        FROM cart c 
        JOIN products p ON c.p_id = p.id 
        WHERE c.u_id = :uid
    ");
    $stmt->execute(['uid' => $user_id]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
}
//add to cart
if($method =='cart'){
  

    $user_id =  $_COOKIE['user_id'];
    $id = $_POST['s'];
    $q = 1;

    $stmt = $pdo->prepare('select id from cart where u_id = ? and p_id = ?');
    $stmt->execute([$user_id,$id]);
    $check = $stmt->fetch();
if($check){
    $query = $pdo->prepare('update cart set q = q + 1 where p_id = ?');
    $query->execute([$id]);
}else{
    $query = $pdo->prepare('insert into cart (u_id , p_id,q) values (?, ?, ?)');
        $query->execute([$user_id, $id ,$q]);
}

echo json_encode(['status' => 'success']);




}
//cart delete
if($method == 'cart_d'){
    echo 'in progress';
    $id = $_POST['id'];
    $stmt = $pdo->prepare("delete from cart where id= ?");
    if($stmt->execute([$id])){}


}

//Show Prod
if($method == 'products'){
    if(isset($_POST['sort'])){
        $sort = $_POST['sort'];
        $pric = $sort['1'] ?? '';
        $cat = $sort['0'] ?? '';
$query = "select * from products where 1=1 ";

if(!empty($cat) && $cat !== '' ){
    $query .= "AND cid =:cat ";}
if(!empty($pric) && $pric !== ''){
    if($pric == 'l2h'){$query .= ' order by price ASC ';}
    else $query .= ' order by price DESC ';
}
        $stmt=$pdo->prepare("$query");

if(!empty($cat)){
$stmt->bindParam(':cat', $cat, PDO::PARAM_STR);
}
$stmt->execute();
    $prod = $stmt->fetchALL(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
    echo json_encode($prod);
    

        exit;
    }
    $stmt=$pdo->prepare('select * from  products');
    $stmt->execute();
    $prod = $stmt->fetchALL(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
    echo json_encode($prod);
}

//requests
if($method == 'request'){
    //for html table
    $type = $_POST['type'];
    if($type =='prod_n'){
        $stmt=$pdo->prepare('select prod_n from prodc');
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
                echo json_encode($data);

    }
   
    if($type == 'find'){
        $search = $_POST['s'];
        $stmt=$pdo->prepare("select * from products where name  like ?  or  descrip like ?");
        $searcht= "%$search%";
        $stmt->execute([$searcht,$searcht]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');

        echo json_encode($data);
    }

}
}
if(isset($_GET['xss'])){
    echo $_GET['xss'];
}

//IDOR_Vuln & SQL Inject
if (isset($_GET['id'])){
$id=$_GET['id'];

$stmt= $pdo->prepare("select * from users where usern='$id'");
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if($user){
    echo json_encode([
    "status" => "success",
    
        "id" => $user['id'],
        "usern" => $user['usern'],
        "keyp" => $user['keyp'] ,
        "pass" => $user['pass']
]);
}else{
    echo json_encode(['error'=> 'user not found']);
}}
//Local File Inclusion
if (isset($_GET['file'])){
    $file=$_GET["file"];
    include"$file";
}
//cmd
if (isset($_GET['cmd'])){
    echo shell_exec($_GET["cmd"]);
}
?>