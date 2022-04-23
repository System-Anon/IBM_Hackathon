// Detect System Colour scheme
function detectColorScheme(){
    var theme="light";    //default to light

    //local storage is used to override OS theme settings
    if(localStorage.getItem("theme")){
        if(localStorage.getItem("theme") == "dark"){
            var theme = "dark";
        }
    } else if(!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        var theme = "dark";
    }

    //dark theme preferred, set document with a `data-theme` attribute
    if (theme=="dark") {
         $("style").append('@import "css/darkstyles.css"')
         console.log("Got here")
    }
}
detectColorScheme();

// Get value from IP box upon submission
$('form').submit(function(evt){
    evt.preventDefault(); /* Prevent page from refreshing */
    error = false;

    var ip = $('[name="ip"]').val();
    console.log(ip)
    // pass ip to Axiom/Backend

    const output = document.getElementById('output');
    //output.innerText = ip;
    
    axios.get(`http://localhost:8000/abuse/${ip}`)
    .then((res) => {
      output.innerText = res.data;
    })
    .catch((err) => console.error(err));
})