// Big Freight Form Validation Scripts

// Experimental: Code to detect HTML5 form features. This can be used to serve HTML5 form validation instead of this JS script. Need to find out about IE usage stats first. 
/*if (typeof document.createElement("input").checkValidity == "function") {
    alert("Your browser has built-in form validation!");
}
else{
   alert("No forms for you...");	
}*/








// Main form validation functions. 


var global_element = null;
var checked = false;
var checkflag = false;
var good_form = true;


function focusIt(){
	if (global_element != null){
		global_element.select();
		global_element.focus();

	}
}

// Functions for Form Validation:

function highlightField(field){
    field.style.backgroundColor = "#fee";	
	field.style.border = "2px solid #800";
	field.style.boxShadow = "0px 0px 4px #f00";
}


function stripSpace(element,id){
	  // convert the data to a string.
			var el_str = String(element.value);
		
  	//check for any spaces and remove them.
			el_str = el_str.replace(/ /g,'');

    // put the spaceless content back into the field.
			document.getElementById(id).value = el_str;
	  
		
			return el_str;

}

// Email Validation:
function validateEmailAddress(id)
{

	var user_good = false;
	var domain_good = false;
	var tld_good = false;
    var element = document.getElementById(id);

		
		//call function to strip spaces.
    el_str = stripSpace(element,id);

    //element = document.getElementById(id);

		//split the address up at the @ symbol
		var address_array = el_str.split('@');
		
		// THe user name is the beginning, Sherlock.
		var user_name = address_array[0];
		
		//make sure that there is only one @ symbol
		if(address_array.length > 2){
			alert('You have too many "@" symbols in your address. Only one is allowed in a proper address.');
			global_element = element;
			focusIt();
			return false;
		}
		if(address_array.length == 1){
			alert('Your email address does not contain an "@" symbol. Every email address must have this symbol.');
			global_element = element;
			focusIt();
			return false;
		}
		
		// Assuming that the @ symbol is present, split the part after it up at the period
		var non_user_string = address_array[1]
		var non_user_array = non_user_string.split('.');
 
        // Make sure there is at LEAST 1 dot.
		if (non_user_array.length == 1){
			alert('Your email address does not contain a dot (".", or period character).\n This is necessary for a proper email address such as "john@xyz.com"');
			global_element = element;
			focusIt();
			return false;			
		}
		
		// check the location of the dot. There could be more than one, so get the last one. The rest is the domain name.
  
  //pournima@
  //webmail.uwinnipeg.ca
  
		var last_dot = non_user_array[non_user_array.length-1];
	
    
		// No restrictions on the length of the TLD, because of the recent '.museum' addition.
		// However, we should make sure it's not an illegal 1 character TLD.
		if(last_dot.length < 2){
			alert('Please check the last part of your email address (you entered "'+last_dot+'"). It should end with something like .com, .net, .org, .co.uk, .ca, etc. \n A single letter at the end is incorrect.');
			global_element = element;
			focusIt();
			return false;			
		}
		// Check each section of the email after the @ to make sure they are not less than 2 characters.
		for (i=0; i<non_user_array.length -1; i++){
			if(non_user_array[i].length < 2){
				alert('The second part of your email address (before the ".", and after the "@" symbol) is too short. It must be at least 2 characters, such as "user@domain.com"');
				global_element = element;
				focusIt();
				return false;				
			}
		}
		
		//find out where the @ symbol is, and give the user explicit feedback about it if there is a problem.
		var at_location = el_str.indexOf('@');
		if (at_location == 0){
			alert('Your "@" symbol is at the beginning of your email address. This is incorrect. \n Email addresses take the form: username@domain.com');
			global_element = element;
			focusIt();
			return false;			
		}
		// Extract the domain name. We will assume it's the first part after the @ symbol.
		var domain_name = non_user_array[0];//webamil
		// Assuming the TLD is the last part
		var tld = non_user_array[non_user_array.length-1];//uwinnipeg
		
		// NOTE: There can be more sections, but it's impossible to know if the middle ones are a 2 part TLD or a domain.
		// Example: steve@support.apple.com vs. liz@royalty.co.uk 
		// Therefore, we will run the domain rex ex checking on any extra parts. 		
		
		// Once proper form and length is determined, use regular expressions to check for proper characters now.
		
		var user_patt = new RegExp(/[^a-zA-Z0-9_\-\.]/);
		var domain_patt = new RegExp(/[^a-zA-Z0-9\-\.]/);
		var tld_patt = new RegExp (/[^a-zA-Z]/);
		
   if(user_name.match(user_patt)!=null){
		  username_problem = user_name.match(user_patt);
			alert('The "'+username_problem+'" character in the "'+user_name+'" part of your email address is not allowed. Please fix it.');
			global_element = element;
			focusIt();
	 }
	 else{
		 user_good = true; 
	 }
	
   if(domain_name.match(domain_patt)!=null){
		  domain_problem = domain_name.match(domain_patt);
			alert('The "'+domain_problem+'" character in the "'+domain_name+'" part of your email address is not allowed. Please fix it.');
			global_element = element;
			focusIt();
	 }
	 else{
		 domain_good = true; 
	 }

   if(tld.match(tld_patt)!=null){
		  tld_problem = tld.match(tld_patt);
			alert('The "'+tld_problem+'" character in the "'+tld+'" part of your email address is not allowed. Please fix it.');
			global_element = element;
			focusIt();
	 }
	 else{
		 tld_good = true; 
	 }
					
		
// if((!element.value.match(regex)) && (element.value.length < 64))
   if((user_good) && (domain_good) && (tld_good))

		{
     //alert('good email');
				global_element = null;
				return true;
    }
    else
    {
			   if(!checked){
	/*				  id_string = id.toString();
						which_type = id.substring(0,4);
						if(which_type == 'ship'){which_type += 'p';}
						problem = element.value.match(regex);
					  alert('There seems to be a problem with your '+which_type+'ing email address. \n The "'+problem+'" character is not allowed.');
						*/
						global_element = element;
		                highlightField(element);						
						focusIt();
				 }
            return false;	
    }
}


function validatePhone(id)
{
    var regex = new RegExp(/[^0-9\-\.]/);
    var element = document.getElementById(id);
    if(element.value.length < 9){
		alert('Your telephone number consists of only '+element.value.length+' digits. It must contain at least 9 digits.');
		global_element = element;
		focusIt();
		return false;
	}
	if(element.value.length > 32){
		alert('Your telephone number consists of '+element.value.length+' digits. This is longer than the allowed 32 digits.');
		global_element = element;
		focusIt();
		return false;			
	}
    if(!element.value.match(regex)){
		global_element = null;
        return true;
    }
    else{				  
		problem = element.value.match(regex);
	    alert('There seems to be a problem with your telephone number:  \n The "'+problem+'" character is not allowed. \n Format of phone number should be: 204-555-5555');
		global_element = element;
		focusIt();
		
        return false;	
    }
}

function validateNumber(id){
    var element = document.getElementById(id);
    if(isNaN(parseInt(element))){
	 alert("You have entered non-numeric characters. Please use only numbers");
	 showMessage(false,"Please enter a valid number.");
	 global_element = element;
	 focusIt();
	 highlightField(global_element);
	 return false;  
  }	
}

function showMessage(checkflag,text){
  var message1="There are some problems with your information:<br /><br /> ";	
  if(!checkflag){
	document.getElementById("msg").style.display="block";
	document.getElementById("msg").innerHTML = message1 + "<strong>" + text + "</strong>";
	//document.getElementById("msg").style.top = pos;
	return false;
  }
  else{
    document.getElementById("msg").style.display="none";
	document.getElementById("msg").innerHTML = "";
  }	
}

function resetField(field){
	//alert("resetting");
	//showMessage(true,"");
	//field.style.fontWeight = "bold";
	field.style.backgroundColor="#eee"; 
	field.style.border= "0px solid #000";
	field.style.boxShadow="inset 1px 1px 3px rgba(0,0,0,0.25)";
}

// check if any checkboxes are checked within a specified DIV
function checkBoxes(div,realname){
	var flag = false
    var checks = document.getElementById(div).getElementsByTagName('input');
	for(i = 0; i < checks.length; i++){
	  if(checks[i].checked){
		flag = true;  
	  }
	}
	
	if(!flag){
	  showMessage(false,"You have not checked any options in the " + realname + " area. Please select at least one.");
	  return false;	
	}
	
	return true;
}




function checkFormContact(the_form){

   var flagged = false
   var problem = "";
   
   var required_fields = new Array();
   required_fields[0] = "first_name";
   required_fields[1] = "last_name";
   required_fields[2] = "email";
   required_fields[3] = "comments";   
   
   var field_names = new Array();
   field_names[0] = "First Name";
   field_names[1] = "Last Name";
   field_names[2] = "Email Address";
   field_names[3] = "Comments";
	
   for (i=0; i<required_fields.length; i++){
	 current_obj = document.getElementById(required_fields[i]);
	 resetField(current_obj);
	 if(current_obj.value == ""){
		 flagged=true;
		 problem += field_names[i] + "\n";
		 highlightField(current_obj);
	 }
   }
   if (flagged){
	   alert("Several fields are empty. You need to fill out the following fields:\n"+problem);
	   showMessage(false,"Required fields are not filled in.");
	   return false;
   }

  checked_email = validateEmailAddress("email");
  showMessage(checked_email,"Please fix your email address. Example: user@domain.com"); 
  if(!checked_email){
	  highlightField(global_element);
	  return false;
  }

   if(document.getElementById("phone").value != ''){
    checked_phone = validatePhone("phone");
    showMessage(checked_phone,"Please fix your phone number. Example: 204-555-1212");
    if(!checked_phone){
	 highlightField(global_element);
	 return false
    } 
   }


  //Everything is good, submit the form. 

  document.getElementById(the_form).action = "scriptz/form_mailer.php";
  document.getElementById(the_form).submit();
}









