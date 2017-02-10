function goToTop() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
};

$(document).ready(function(){
	$(".nav").sticky({topSpacing:8});
});




