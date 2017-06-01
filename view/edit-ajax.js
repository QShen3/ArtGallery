var artist=new Object();
$.get("/v1/user/info", function (artist, result) {
    if (result == "success") {
      	if(userInfo.name!=null){
        	frmEdit.artistName.value=userInfo.name;
        }
        if(userInfo.gender!=null){
            frmEdit.sex.value=userInfo.gender;
        }
        if(userInfo.age!=null){
            frmEdit.artistAge.value=userInfo.age;
        }
        if(userInfo.avater!=null){
            $("#artist-img").attr("src", avater);
        }   
    }
});

function submitClick(){
	$("#edit-get").ajaxSubmit({
		type: 'post',
		url: '/v1/user/update',
		info: {
			'name': name,
			'galleryName': galleryName,
			'avater': avater,
			'gender': gender,
			'proof': proof,
			'age': age
		},
		success: function (info) { // data 保存提交后返回的数据
			if (info.code == 200) {
				return true;
				alert("true");
			} else {
				return false;
				alert("lala");
			}
		}
	});
	// $(this).resetForm(); // 提交后重置表单
	return false; // 阻止表单自动提交事件
}