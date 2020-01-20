var pageSize=0;//每页显示行数
var currentPage_=1;//当前页全局变量，用于跳转时判断是否在相同页，在就不跳，否则跳转。
var totalPage;//总页数
var totalTr;//总行数
 
//跳转页面
function goPage(pno,psize){

	var itable = document.getElementById("listbody");
	var num = itable.rows.length;//表格所有行数(所有记录数)
	totalTr = num;
	//alert(num);
 
	pageSize = psize;//每页显示行数
    //总共分几页 
	if(num/pageSize > parseInt(num/pageSize)){   
		totalPage=parseInt(num/pageSize)+1;   
	}else{   
		totalPage=parseInt(num/pageSize);   
	}   
	var currentPage = pno;//当前页数
	currentPage_=currentPage;
	var startRow = (currentPage - 1) * pageSize+1; 
	var endRow = currentPage * pageSize;
	endRow = (endRow > num)? num : endRow;    
	//遍历显示数据实现分页
	/*for(var i=1;i<(num+1);i++){    
		var irow = itable.rows[i-1];
		if(i>=startRow && i<=endRow){
			irow.style.display = "";    
		}else{
			irow.style.display = "none";
		}
	}*/
 
	$("#listbody tr").hide();
	for(var i=startRow-1;i<endRow;i++)
	{
		$("#listbody tr").eq(i).show();
	}
	
	document.getElementById("total_tr").innerHTML = "共"+num+"条";
	document.getElementById("paging").value = pageSize+"条/页";
	document.getElementById("total_page").innerHTML = "共"+totalPage+"页";
     
	if(currentPage>1){
		$("#firstPage").on("click",function(){
			goPage(1,psize);
		}).removeClass("ban");
		$("#prePage").on("click",function(){
			goPage(currentPage-1,psize);
		}).removeClass("ban");   
	}else{
		$("#firstPage").off("click").addClass("ban");
		$("#prePage").off("click").addClass("ban");  
	}
 
	if(currentPage<totalPage){
		$("#nextPage").on("click",function(){
			goPage(currentPage+1,psize);
		}).removeClass("ban")
		$("#lastPage").on("click",function(){
			goPage(totalPage,psize);
		}).removeClass("ban")
	}else{
		$("#nextPage").off("click").addClass("ban");
		$("#lastPage").off("click").addClass("ban");
	}   
    
	$("#input_page").val(currentPage);
}
 
// 检验非0的正整数
function check_num(str) {
	var reg = /^\+?[1-9][0-9]*$/;
	if (!reg.test(str)) {
		return false;
	}
	return true;
}
 

function jumpPage2()
{
	if(false == check_num($("#input_page").val()))
	{
		alert("请输入非零的正整数");
	}
	else
	{
		var num = parseInt($("#input_page").val());
		//alert(num);
		if(num != currentPage_)
		{
			if(num > totalPage)
			{
				alert("超出最大页数，请重新输入");
			}
			else
			{
				goPage(num,pageSize);
			}
		}
	}
}


// 添加表格
function addlist(s1,s2,s3,s4){  
	//创建一个tr  
	var tr = document.createElement("tr");  
	//创建td   
	  
	var td1 = document.createElement("td");  
	td1.innerHTML = s1;  
	  
	var td2 = document.createElement("td");  
	td2.innerHTML = s2;  
	  
	var td3 = document.createElement("td");  
	td3.innerHTML = s3;  
	  
	var td4 = document.createElement("td");  
	td4.innerHTML = s4;

	  
	//将创建的td添加到tr中  
	tr.appendChild(td1);  
	tr.appendChild(td2);  
	tr.appendChild(td3);  
	tr.appendChild(td4);    
	//使用appendChild（tr）方法，将tr添加到listbody中  
	//其中获取的listbody是要将表格添加的位置的id  
	var listbody = document.getElementById("listbody");  
	listbody.appendChild(tr);  
};

// 获取信息
function get_info()
{
	$('#table1 tbody').html('');
	//建表
	for(var i=0; i<26; i++)
	{
		addlist(i, i+1, i+2, i+3);
	}
	
	goPage(1,15);
};