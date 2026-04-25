let logged = false;
$(document).ready(function(){
function request(met, data = {}, callback) {
    $.ajax({
        url: "api/ajax.php",
        type: "POST",
        dataType: "json",
        data: { 
            method: met, 
            ...data // This "spreads" your extra data into the object
        },
        success: function(response) {
            if (callback) callback(response);
        },
        error: function(err) {
            console.error(`API Error in ${met}:`, err);
        }
    });
}
request('status',{},(data)=>{
    let navHtml = '';
    if(data.loged_in){
                    logged = true;
        if (data.user_id == 1) {
                admin_pan= '<a href="admin.html"  class="nav-link p-3"> <i class="fa-brands fa-black-tie me-1"></i>Admin Dashboard</a>';
                $('#admin-pan').html(admin_pan);}
                else{
                     navlogin = ' <a href="profile.html" class="nav-link p-3"><i class="fa-solid fa-user-tie me-1"></i>Profile</a>';
                $('#profile').html(navlogin);
                }

               
    }else {
        navHtml = '<a href="login.html"  class="nav-link  p-3"><i class="fas fa-vcard me-2"></i>Login</a>';
        $('#logout').html(navHtml);
        }

})

//show cart
   function cart_show(){
    request('show-cart',{},(data)=>{
let total = 0

           let row ="";
    data.forEach(function(response){
        total = total + (response.price * response.quantity)
      
                row += `
            <tr>
                <td class="text-muted" hidden >${response.id}</td>
                <td>
                   
                    <div>
                        <div class="fw-bold text-dark">${response.name}</div>
                    </div>
                    </div>
                </td>
                    <td class="">
                        <code class="text-primary fw-medium ">${response.price}</code>
                    </td>
                       <td>
                        <code class="text-primary fw-medium">${response.quantity}</code>
                    </td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-light rounded-pill text-danger ms-1 uprod-de"    e="d" data-id="${response.id}">
                        <i class="fas fa-trash me-1"></i>× Delete</button>
                </td>
            </tr>
    `;
/*                 <button class="btn btn-sm btn-outline-primary rounded-pill  uprod-de" e="e" data-id="${response.id}" >‎  Edit  
                            <i class="fas fa-edit"></i> 
                        </button>*/
});
    
        let forprice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        });

        $('#tbody').html(row); 
        $('#total-price').text(forprice.format(total)) // i ain't no stupid to let it .html :)

    })
}


//load products
    function showprod(){
        request('products',{},(data)=>{
                         let row =``;
             data.forEach(function(res){

row += `

    <div class="col-6 col-lg-3 mb-4">
        <div class="card  shadow-sm h-100  border-2">
            <div class="img-wrapper" style="height: 180px; overflow: hidden;">
                <img src="${res.src}" class="card-img-top w-100 h-100" style="object-fit: contain;">
            </div>
            <div class="card-body d-flex flex-column text-center">
                <h5 class="card-title text-truncate">${res.name}</h5>
                <p class="card-text fw-bold text-primary">$${res.price}</p>
                <small>${res.quantity}🍌 left</small>
                <div class="mt-auto">
                    <button class="btn btn-primary w-100"  id='add-cart' i=${res.id}>Add to cart</button>
                </div>
            </div>
        </div>
    </div>`;});

$('#prod-sh').html(row);
        });
}

//load users
function loadProfile() {
    request('show',{},(data)=>{
    let row ="";
   
    data.forEach(function(response){
        $('#user-name').val(response.usern);
        $('#user-id').val(response.id);
        $('#user-key').val(response.keyp);  
                row += `
            <tr>
                <td class="ps-4 text-muted">${response.id}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 35px; height: 35px;">
                        <span class="small">JD</span>
                        </div>
                    <div>
                        <div class="fw-bold text-dark">${response.usern}</div>
                    </div>
                    </div>
                </td>
                    <td>
                        <code class="text-primary fw-medium">${response.keyp}</code>
                    </td>
                    <td class="pe-4 text-end">
                        <button class="btn btn-sm btn-outline-primary rounded-pill px-3 user-de" e="e" data-id="${response.id}"  data-name="${response.usern}" data-key="${response.keyp}">‎  Edit  
                            <i class="fas fa-edit"></i> 
                        </button>
                        <button class="btn btn-sm btn-light rounded-pill text-danger ms-1 user-de"    e="d" data-id="${response.id}"   data-name="${response.usern}" data-key="${response.keyp}"><i class="fas fa-trash me-1"></i>× Delete</button>
                </td>
            </tr>
    `;

});
        $('#tbody').html(row); 
    })
    }


//get url path
var path =window.location.pathname;
var page = path.split('/').pop() || 'index.html';

//admin
if (page =='admin.html'){
    request('request',{type:'prod_n'},(data)=>{
        let i = "";
        data.forEach(function(res) {            
        i+= `<option>${res.prod_n}</option>`;
                    });
    $('#prod-cid').html(i);
    });

//img 
  $("#product-new").submit(function (event) {
    var form = new FormData(this);

   form.append('method','creat');
   form.append('type', 'new-prod');


$.ajax({
      type: "POST",
      url: "api/ajax.php",
      data:form ,
      processData: false, 
        contentType: false, 
      dataType: "json",
    }).done(function (data) {   
if(data.status === 'success') {
                    alert("Product saved successfully!");
                } else {
                    alert("Error: " + response.message);}
    });
    event.preventDefault();
  });
    }


//show users
if (page =='profile.html'){
    loadProfile();

} 


$(document).on("click",".user-de",function(e){
    e.preventDefault();
let event= $(this).attr('e');
if( event ==='e'){
let urid =$(this).data('id');
let urname =$(this).data('name');
let urkey =$(this).data('key');

$('#user-info').animate({opacity:0,},500,function(){
    $('#user-info').removeClass('d-none');
     $('#user-info').animate({opacity: 1},500);

});

$('#user-name').val(urname);
$('#user-id').val(urid);
$('#user-key').val(urkey);   
}
});

$("#btn-edit").on("click", function() {
    let btn = $(this);
    let currentText = btn.text(); 

    if (currentText !== 'Save Changes') {
        $('#user-key').removeAttr('disabled');
        $('#user-name').removeAttr('disabled');
        btn.text('Save Changes'); 
    }

    else {
        let urid = $('#user-id').val();
        let urname = $('#user-name').val();
        let urkey = $('#user-key').val();

        request('edit', {id: urid, un: urname, key: urkey}, (e) => {
            if (e.status === 'success') {
                alert("Updated successfully!");
                $('#user-key').attr('disabled', 'disabled');
                $('#user-name').attr('disabled', 'disabled');
                btn.text('Edit'); 
            } else {
                alert("Unknown error");
            }
        });
    }
});

//search
$('#search').on('keyup',function(){
    var search = $('#search').val();
    request('request',{type:'find',s:search},(data)=>{
    if (data == ''){}
    let row =``;
    data.forEach(function(res){
    row += `
        <div class="col-6 col-lg-3 mb-4">
            <div class="card  shadow-sm h-100  border-2">
                <div class="img-wrapper" style="height: 180px; overflow: hidden;">
                    <img src="${res.src}" class="card-img-top w-100 h-100" style="object-fit: contain;">
                </div>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title text-truncate">${res.name}</h5>
                    <p class="card-text fw-bold text-primary">$${res.price}</p>
                    <small>${res.quantity}🍌 left</small>
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>`; });
    if(data == ''){
       // $("#prod-sh").text("no result for :"+search); //to prevent XSS
        $("#prod-sh").html("no result for :"+search); // enable xss
        localStorage = ['Car',data] ;
    }else {
        $('#prod-sh').html(row);
    }
    });
});

//Add to cart
$(document).on("click","#add-cart",function(e){
    let prodid = $(this).attr("i");
    if(logged){
        request('cart',{s:prodid},(data)=>{
        alert("Saved to Account!");
    })

    localStorage.clear('gcart');
    }else{
        let cart = JSON.parse(localStorage.getItem('gcart')) || []; 
        const existitem = cart.find(item => item.id === prodid);
        if(existitem){
            existitem.quantity += 1 ;
        }else{
            cart.push({id:prodid ,quantity:1});
    }

        localStorage.setItem('gcart',JSON.stringify(cart));
        alert("Saved to Local Browser!");}
});
//show cart
if(page == 'cart.html'){
 cart_show()
}
// checkout
$('#checkout').on('click',function(e){
    alert(`You win the game (idk what to type )\n You WIN Perfect 
        \n now go do something usefull like touching the grass`)
});


//delete cart 
$(document).on("click",".uprod-de",function(e){
    e.preventDefault();
    let cart_a =  $(this).attr('e');
    let cart_id =  $(this).attr('data-id');

   if (cart_a == 'd' && confirm('Are you Sure Deleting This Product ! \n\r For the game')){
        request('cart_d',{id:cart_id},(data)=>{
        });
        cart_show()


   }


});




//show products
const pagelist = ['index.html','']
if (pagelist.includes(page)){
    showprod()
}

$('#prod-rest').on('click',function(){showprod();});

$('.select').on('change',function(){
    let sel_cat = $('select[i=cat]').val();
    let sel_pri = $('select[i=pri]').val();
    request('products',{sort:[sel_cat,sel_pri]},(data)=>{
        let row =``;
        data.forEach(function(res){
        row += `
        <div class="col-6 col-lg-3 mb-4">
            <div class="card  shadow-sm h-100  border-2">
                <div class="img-wrapper" style="height: 180px; overflow: hidden;">
                    <img src="${res.src}" class="card-img-top w-100 h-100" style="object-fit: contain;">
                </div>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title text-truncate">${res.name}</h5>
                    <p class="card-text fw-bold text-primary">$${res.price}</p>
                    <small>${res.quantity}🍌 left</small>
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100" id='add-cart' i=${res.id}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>`;});
        $('#prod-sh').html(row);});
});

//create users
$("#btn").on("click",function(){
    var btni =$(this).attr("i");
    var user = $("#name").val();
    var pass = $('#pass').val();
    if(btni === 'ct'){
        var key = $('#key').val();
        if(user ==="" || pass === ""||key === ""){
            alert('No data Please type your reconfirm');
            return;}

        request('creat',{type:'user',un:user,up:pass,key:key},(data)=>{
            var res =e.trim();
            alert(res)  
            if (res === "success"){
                window.location.assign("login.html");
                $("#db").html(e).css("color", "red");}
});
}
/////show



//login
if(btni === 'sn'){
if(user ==="" || pass === ""){
    alert('No data Please type your username and pass');
    return;}

request('login',{un:user,up:pass},(data)=>{
    if (data.status === "success"){
        logged = true ;
        window.location.assign("index.html");
        $("#db").html(data).css("color", "red");
    }else  $("#db").html("fail").css("color", "red")});
}
});

//logout
$(document).on("click","#logout-a",function(e){
    e.preventDefault();
    request('logout',{},(data)=>{
    window.location.assign("index.html");});
    });
});