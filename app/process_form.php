<?php
$formName = $_POST['formName'];
if($formName == 'contact-form') {

	//  MAKE SURE THE "FROM" EMAIL ADDRESS DOESN'T HAVE ANY NASTY STUFF IN IT
	$pattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i"; 
    if (preg_match($pattern, trim(strip_tags($_POST['email'])))) { 
        $email = trim(strip_tags($_POST['email'])); 
    } else { 
        return "The email address you entered was invalid. Please try again!"; 
    } 

	$firstName = strip_tags($_POST['firstName']);
	$lastName = strip_tags($_POST['lastName']);
	$telephone = strip_tags($_POST['telephone']);
	$message = strip_tags($_POST['message']);
	$dept = strip_tags($_POST['dept']);
	if(isset($_POST['mailingList'])) {
		$mailingList = $_POST['mailingList'];	
	}
	$notSpam = $_POST['b_da9a0881ddc88eea35d96f896_1084d3a4fe']; // should be blank (bots would fill in with random text)
}


print $formName."<br />";
print $firstName."<br />";
print $lastName."<br />";
print $email."<br />";
print $telephone."<br />";
print $dept."<br />";
print $message."<br />";
print $mailingList."<br />";
print $notSpam."<br />";

// 1. first submit newsletter info
if(isset($mailingList) && $notSpam == '') {
	mailchimpSubmit($email, $firstName, $lastName);
} else {
	echo "Not sending to mailchimp";
}

// 2. then send the data via email
sendContactEmail($firstName, $lastName, $email, $telephone, $dept, $message);

// 3. then store the data in the database


// if just a newsletter signup, end process and redirect now




function mailchimpSubmit($email, $firstName='', $lastName='') {
	// print "Sending info to mailchimp<br />";

	// vars
	$mc_api_root = 'https://us13.api.mailchimp.com/3.0';
	$mc_api_key = 'd8aaeb0ca1c6d00006404d3506094937-us13';
	$mc_list_endpoint = '/lists/1084d3a4fe/members/'; // for subscribing to SJC list

	// check if user exists
	$curl_connection = curl_init($mc_api_root . $mc_list_endpoint . md5(strtolower($email)));
	curl_setopt($curl_connection, CURLOPT_HTTPHEADER, 
				array('Authorization: apikey '.$mc_api_key));
	curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);

	//show information regarding the request
	// echo "initial user check result:";
	$result = curl_exec($curl_connection);
	curl_close($curl_connection);
	$status = json_decode($result, true)['status'];
	// echo $status;

	//set data to be sent
	$post_items = array('email_address' => $email,
						'status' => 'subscribed',
						'status_if_new' => 'subscribed',
						'update_existing' => true,
						'merge_fields' => array(
											'FNAME' => $firstName,
											'LNAME' => $lastName)
						);
	$payload = json_encode( $post_items );


	if($status == 'subscribed') {
		$curl_connection = curl_init($mc_api_root . $mc_list_endpoint . md5(strtolower($email)));
		curl_setopt($curl_connection, CURLOPT_CUSTOMREQUEST, 'PUT');
	} else {
		$curl_connection = curl_init($mc_api_root . $mc_list_endpoint);	
	}
	//set options
	// curl_setopt($curl_connection, CURLOPT_USERNAME, 'apikey:'.$mc_api_key);
	curl_setopt($curl_connection, CURLOPT_POSTFIELDS, $payload );
	curl_setopt($curl_connection, CURLOPT_HTTPHEADER, 
				array('Content-Type:application/json',
						'Authorization: apikey '.$mc_api_key));
	curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);

	//perform our request
	// echo "user post/patch result";
	$result = curl_exec($curl_connection);

	//show information regarding the request
	// echo "<pre>$result</pre>";
	// echo json_decode($result, true)['status'];
	// print "<pre>";
	// print_r(curl_getinfo($curl_connection));
	// print "</pre>";
	// echo curl_errno($curl_connection) . '-' . 
	// 	curl_error($curl_connection);

	//close the connection
	curl_close($curl_connection);
}

function sendContactEmail($firstName, $lastName, $email, $telephone, $dept, $content) {
    // PREPARE THE BODY OF THE MESSAGE

	$message = '<html><body>';
	$message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
	$message .= '<tr style="border-bottom: 3px solid #EA634F"><td align="middle" colspan="2"><img src="http://joshgordonmusic.com/images/logo.png" width="114" height="58" alt="St Joseph\'s Cowper" /></td></tr>';
	$message .= "<tr style='background: #ffffff;'><td><strong>Name:</strong> </td><td>" . $firstName . " " . $lastName . "</td></tr>";
	$message .= "<tr style='background: #ffeed4;'><td><strong>Email:</strong> </td><td>" . $email . "</td></tr>";
	$message .= "<tr style='background: #ffffff;'><td><strong>Telephone:</strong> </td><td>" . $telephone . "</td></tr>";
	$message .= "<tr style='background: #ffeed4;'><td><strong>Requested Department:</strong> </td><td>" . $dept . "</td></tr>";
	$message .= "<tr style='background: #ffffff;'><td><strong>Message:</strong> </td><td>" . $content . "</td></tr>";
	$message .= "</table>";
	$message .= "</body></html>";
    
    //   CHANGE THE BELOW VARIABLES TO YOUR NEEDS
     
	$to = 'dan.laush@gmail.com';
	
	$subject = 'Website Form Submission';
	
	$headers = "From: " . $email . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    if (mail($to, $subject, $message, $headers)) {
      echo 'Your message has been sent.';
    } else {
      echo 'There was a problem sending the email.';
    }
}

function dbConnect() {

}