function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// Give the URL parameters variable names
var source = ' '+getParameterByName('utm_source');
var medium = ' '+getParameterByName('utm_medium');
var campaign = ' '+getParameterByName('utm_campaign');
var content = ' '+getParameterByName('utm_content');
//var campaignid=getParameterByName('ea.campaign.id');


function getlist(){
	// Put your public token on next line
	var en_token='YOUR-PUBLIC-TOKEN';
	
	$.ajax({
  		url: 'https://e-activist.com/ea-dataservice/data.service?service=RollCall&token='+en_token+'&contentType=json&dataSet=1&detailRows=20&campaignId='+campaignid,
  		dataType: "jsonp",
  		////json_obj.rows[0].columns[4].value 
  		success: function (data) {
  			var name,city,country='';
  			json_obj=data.rows;
  			$.each(json_obj,function( index, value ) {  
  			  	name='';city='';

  				$.each(value.columns, function (k , v){
  					
  					//console.log(v.value
  					if (v.name==="firstName"){name=v.value;}
  					if (v.name==="city"){city=v.value;}
  					if (v.name==="country"){
  						if (v.value){
  							country=v.value;
  							}
  						else{
  							country='zzz';
  							}
  						}
  					});
  				$('.rollcall').append('<div class="rollcall_wrapper" id="list'+index+'"><span class="rollcall_flag"><img style="width:20px;" src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/1827/flag_'+country.toLowerCase()+'.svg"></span><span class="rollcall_name"> '+name+' </span></div>' ); 
  				//console.log('<div id="list'+index+'"><span class="name">'+name+'</span><span class="city">'+city+country+'</span><span class="flag"><img src="flag/'+country.toLowerCase()+'.svg"></span></div>' ); 
 
  				//console.log( index + ": " + value ); 
  				});
  			//console.log(json_obj.row[0].columns[4].value);
  			}
		});
	}
