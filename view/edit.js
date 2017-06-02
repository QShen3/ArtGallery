var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;

if (typeof pageWidth != "number") {
    if (document.compatMode == "CSS1Compat") {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}

adjustEdit();
function adjustEdit () {
  pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;

    if (typeof pageWidth != "number") {
        if (document.compatMode == "CSS1Compat") {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }
  if (pageWidth > 768) {
    $("#home-logo").css({ "left": (pageWidth - $("#home-logo").width()) / 2 + "px" });
    $("#edit-content").css({ "left": (pageWidth - $("#edit-content").width()) / 2 + "px" });
    if (pageHeight > 400) {
        $("#edit-get").css({ "bottom": '-8em' });
        $("#edit-get").css({ "right": '0' });
        if (pageWidth < 330) {
            $("#edit-get").css({ "bottom": '-4em' });
            $("#edit-content").css({ "top": (pageHeight - $("#edit-content").height()) / 2 - 60 + "px" })
        } else {
            $("#edit-content").css({ "top": (pageHeight - $("#edit-content").height()) / 2 - 100 + "px" });
        }
    } else {
        $("#edit-content").css({ "top": (pageHeight - $("#edit-content").height()) / 2 + "px" });
        $("#edit-get").css({ "bottom": '0em' });
        $("#edit-get").css({ "right": '-5em' });
    }
}
}


function getPath(obj,fileQuery,transImg) {
 
  var imgSrc = '', imgArr = [], strSrc = '' ;
 
  if(window.navigator.userAgent.indexOf("MSIE")>=1){ // IE浏览器判断
  if(obj.select){
   obj.select();
   var path=document.selection.createRange().text;
   alert(path) ;
   obj.removeAttribute("src");
   imgSrc = fileQuery.value ;
   imgArr = imgSrc.split('.') ;
   strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
   if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
   obj.setAttribute("src",transImg);
   obj.style.filter=
    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path+"', sizingMethod='scale');"; // IE通过滤镜的方式实现图片显示
   }else{
   //try{
   throw new Error('File type Error! please image file upload..'); 
   //}catch(e){
   // alert('name: ' + e.name + 'message: ' + e.message) ;
   //}
   }
  }else{
   // alert(fileQuery.value) ;
   imgSrc = fileQuery.value ;
   imgArr = imgSrc.split('.') ;
   strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
   if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
   obj.src = fileQuery.value ;
   }else{
   //try{
   throw new Error('File type Error! please image file upload..') ;
   //}catch(e){
   // alert('name: ' + e.name + 'message: ' + e.message) ;
   //}
   }
 
  }
 
  } else{
  var file =fileQuery.files[0];
  var reader = new FileReader();
  reader.onload = function(e){
 
   imgSrc = fileQuery.value ;
   imgArr = imgSrc.split('.') ;
   strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
   if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
   obj.setAttribute("src", e.target.result) ;
   }else{
   //try{
   throw new Error('File type Error! please image file upload..') ;
   //}catch(e){
   // alert('name: ' + e.name + 'message: ' + e.message) ;
   //}
   }
 
   // alert(e.target.result); 
  }
  reader.readAsDataURL(file);
  }
 }
 
 function show(){
  //以下即为完整客户端路径
  var file_img=document.getElementById("artist-img"),
  iptfileupload = document.getElementById('iptfileupload') ;
  getPath(file_img,iptfileupload,file_img) ;
 }

 $("#nav-ul-me").click(
     function () {
        $("#login-button").fadeOut(400);
        $("#register-button").fadeOut(400);
        changePages();
        $("#home-logo").fadeOut(400, function () {
            $("#home-welcome-content").css('display', 'none');
            $("#home-logo").text("编辑个人信息");
            $("#home-logo").css('backgroundImage', 'url()');
            $(".edit-information-content").fadeIn(400);
            $("#login-pre").fadeIn(400);
            $("#home-logo").fadeIn(400);
            $("#edit-get").fadeIn(400);
        })
    }
)