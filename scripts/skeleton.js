//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./text/nav.html'));
    // (corey, commented out for now since we don't have a footer)
    // console.log($('#footerPlaceholder').load('./text/footer.html'));
}
loadSkeleton();  //invoke the function