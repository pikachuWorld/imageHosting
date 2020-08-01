/**
 * 
 */
$(document).ready(function(){
  //$('#uploadBody').height($('.main').height()+100)
  //背景
   $('#particles').particleground({
     dotColor: '#e8ebeb',
     lineColor: '#e8ebeb',
     height:  $('.main').height()+100
   });
  //  function submitCheck(){
  //     $('#uploadForm input').each(function(key, item){
      
  //       let currVal = $(this).val()
  //       let curTip = $(this).attr('txt')
    
  //       if(!currVal){
  //         console.log(999, $(item.name+'Error'))
  //         $('#'+item.name+'Error').css('display', 'block')
  //         $('#'+item.name+'Error').text(curTip)
  //         return false;
  //       } else {
  //       $('#'+item.name+'Error').css('display', 'none')
  //       $('#'+item.name+'Error').text(curTip)
  //         return true;
  //       }
  //   })

  //  }
  function valid(){
    let isBool;
    $('#uploadForm input.validate').each(function(key, item){
   
       let currVal = $(this).val()
       let curTip = $(this).attr('txt')
       
       if(!currVal){
        
         $('#'+item.name+'Error').css('display', 'block')
         $('#'+item.name+'Error').text(curTip)
         isBool = false;
         return isBool
       } else {
        $('#'+item.name+'Error').css('display', 'none')
        $('#'+item.name+'Error').text(curTip)
        isBool = true;
        return isBool
       }
    })
    return isBool;
  } 
  

  //  $('#uploadForm').submit(function(e){
  //    e.preventDefault();
  //     console.log('---->', valid())
  //     if(valid()) {
  //       $('#uploadForm').submit()
  //     }
      
  //  })
  $('#uploadSubmit').click(function (e) { 
  
    e = e||window.event;
    e.preventDefault();    //阻止默认行为
    if(valid()) {
       $('#uploadForm').submit()
    }
   
  });
  var time = new Date();
  uploadTime = time.getFullYear()+ "/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes();
  console.log('---->time', uploadTime);
  $("#uploadTime").val(uploadTime)
  $(".right a").each(function () {
    if ($($(this))[0].href == String(window.location))
        $(this).addClass('active');
  });

});


