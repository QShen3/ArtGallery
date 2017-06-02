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
		success: function (data) { // data 保存提交后返回的数据
			if (data.code == 200) {
				return true;
			} else if (data.code == 400) {
				return false;
			} else if (data.code == 401) {
				return false;
			} else if (data.code == 402) {
				return false;
			} else {
				alert("系统错误，请联系管理员。");
				$("#ajax-state").fadesOut();
			}
		}
	});
	// $(this).resetForm(); // 提交后重置表单
	return false; // 阻止表单自动提交事件
}