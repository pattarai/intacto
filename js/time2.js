/* clock js */
$(function() {

    function update()
    {
      var date = new Date();
  
      let hrs = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
  
      hrs = addLeadingZero(hrs);
      min = addLeadingZero(min);
      sec = addLeadingZero(sec);
  
      render(converter(hrs), "h");
      render(converter(min), "m");
      render(converter(sec), "s");
  
      $('.hours .display').text(hrs);
      $('.minutes .display').text(min);
      $('.seconds .display').text(sec);
  
    }
  
    function render(bits, target)
    {
      for(i = 0; i < bits.length; i ++)
      {
        if((i != 6) || (target != "h"))
        {
          var t = "." + target +i.toString();
          if(bits[i] == 0) $(t).css({'opacity' : .2});
          else $(t).css({'opacity' : 1});
        }
      }
    }
  
    function fColumn(value)
    {
      var str = value.toString();
      if(str.length == 1) str = "0" + str;
      var fDigit = parseInt(str.charAt(1));
      var fColumn = decimalToBinary(fDigit, 4);
      return fColumn;
    }
  
    function sColumn(value)
    {
      var str = value.toString();
      if(str.length == 1) str = "0" + str;
      var sDigit = parseInt(str.charAt(0));
      var sColumn = decimalToBinary(sDigit, 3);
      return sColumn;
    }
  
    function converter(value)
    {
      var str = value.toString();
      if(str.length == 1) str = "0" + str;
      var fDigit = parseInt(str.charAt(1));
      var sDigit = parseInt(str.charAt(0));
      var fColumn = decimalToBinary(fDigit, 4);
      var sColumn = decimalToBinary(sDigit, 3);
      var result = fColumn.concat(sColumn);
      return result;
    }
  
    function decimalToBinary(decimal, length)
    {
      var bin = [];
      while((decimal / 2) > 0)
      {
        bin.push(parseInt(decimal % 2));
        decimal = parseInt(decimal / 2);
      }
      while(bin.length < length) bin.push(0);
      return bin;
    }
  
    function addLeadingZero(value)
    {
      return value < 10 ? "0" + value : value;
    }
  
    var interval = setInterval(update, 1000);
  
    update();
  
  });
/* AJAX Call */
$(function () {
  $(".save-button").on("click", function (e) {
    e.preventDefault();
    var answer = document.getElementById("answer").value;
    $.ajax({
      type: "POST",
      url: "https://intacto.thedanielmark.com/time2.php",
      datatype: "html",
      data: {
        answer: answer,
        email: localStorage.email,
        auth_token: localStorage.auth_token
      },
      success: function (response) {
        console.log(response);
        var parsedResponse = JSON.parse(response);
        if(parsedResponse == "correct") {
          window.location.replace("time3.html");
        }
        else if(parsedResponse == "failed") {
          document.writeln("Oops, something went wrong. Please reload the page the page and try again.");
        }
        else if(parsedResponse == "invalid") {
          localStorage.clear();
          window.location.replace("index.html");
        }
        else {
          window.alert("Please check your answers!");
        }
      },
      error: function (e){}
    });
  });
});